const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Set security HTTP headers
app.use(helmet());

// List of allowed frontend URLs (Origins)
// You can easily add more frontend domains here in the future
const allowedOrigins = [
  'http://localhost:3000',     // Local development
  'https://www.kagazkit.site', // Your production domain (with www)
  'https://kagazkit.site'      // Your production domain (without www)
];

// Configure CORS to only allow requests from the allowedOrigins list
const corsOptions = {
  origin: function (origin, callback) {
    // If there is no origin (e.g., Postman/curl) or it's in the allowed list, allow it.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS. Request from unauthorized origin.'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with the restrictive options
app.use(cors(corsOptions));

// Configure rate limiting: Max 15 requests per IP every 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter specifically to the compression endpoint
app.use('/compress', limiter);

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('INVALID_FILE_TYPE'), false);
    }
  }
});

// Create uploads directory if it doesn't exist, or clean it if it does
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
} else {
  // Cleanup any orphaned files from previous crashed runs
  fs.readdirSync('uploads').forEach(file => {
    try {
      fs.unlinkSync(path.join('uploads', file));
    } catch (err) {
      console.error(`Failed to delete orphaned file ${file}:`, err);
    }
  });
  console.log('Cleaned up orphaned files in uploads directory.');
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// AI Receipt Scanner Endpoint
const receiptResponseSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Name of the item purchased' },
          quantity: { type: 'number', description: 'Quantity of the item' },
          price: { type: 'number', description: 'Total price for this line item, if found' }
        },
        required: ['name']
      }
    },
    subtotal: { type: 'number', description: 'Subtotal amount before tax' },
    tax: { type: 'number', description: 'Total tax amount' },
    total: { type: 'number', description: 'Final total amount paid' },
    merchant: { type: 'string', description: 'Name of the store or merchant' },
    date: { type: 'string', description: 'Date of the transaction in YYYY-MM-DD format if available' }
  },
  required: ['items']
};

app.post('/extract-receipt', express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: 'Missing image data' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Extract the items, prices, tax, and total from this receipt.' },
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: receiptResponseSchema,
        temperature: 0.1,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response text from Gemini");
    }

    const data = JSON.parse(resultText);
    return res.json({ success: true, data });

  } catch (error) {
    console.error('Error extracting receipt:', error);
    return res.status(500).json({ 
      error: 'Failed to extract data. Please ensure the image is clear and try again.' 
    });
  }
});

app.post('/compress', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Expect the frontend to send the exact target DPI and grayscale flag
  const requestedDpi = parseInt(req.body.dpi, 10) || 150; // default 150 DPI
  const convertToGrayscale = req.body.grayscale === 'true';
  
  // Safe bounds check to ensure Ghostscript doesn't get crazy values
  const dpi = Math.max(72, Math.min(300, requestedDpi));
  
  console.log(`[START] Compressing: ${req.file.originalname} | Size: ${(req.file.size / 1024 / 1024).toFixed(2)} MB | DPI: ${dpi} | Grayscale: ${convertToGrayscale}`);

  const inputPath = req.file.path;
  const outputPath = `${inputPath}-compressed.pdf`;

  // Ghostscript command args with granular DPI control
  const gsArgs = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    '-dNOPAUSE',
    '-dQUIET',
    '-dBATCH',
    '-dNumRenderingThreads=1', // Limit CPU threads
    '-dBufferSpace=50000000', // 50MB hard limit on RAM buffer
    '-dMaxBitmap=50000000', // Force bitmap rendering to disk if it exceeds 50MB
    '-dDownsampleColorImages=true',
    '-dDownsampleGrayImages=true',
    '-dDownsampleMonoImages=true',
    `-dColorImageResolution=${dpi}`,
    `-dGrayImageResolution=${dpi}`,
    `-dMonoImageResolution=${dpi}`,
    '-dColorImageDownsampleThreshold=1.0',
    '-dGrayImageDownsampleThreshold=1.0',
    '-dMonoImageDownsampleThreshold=1.0'
  ];

  if (convertToGrayscale) {
    gsArgs.push('-sColorConversionStrategy=Gray');
    gsArgs.push('-dProcessColorModel=/DeviceGray');
  }

  gsArgs.push(`-sOutputFile=${outputPath}`);
  gsArgs.push(inputPath);

  // Run Ghostscript with custom env to force temp files to our disk directory
  // Added a strict 60-second timeout to prevent zombie processes
  console.log(`[EXEC] Running gs with DPI=${dpi}`);
  const gsProcess = spawn('gs', gsArgs, {
    env: { ...process.env, TMPDIR: path.join(__dirname, 'uploads') },
    timeout: 60000 // 60 seconds
  });

  gsProcess.on('error', (error) => {
    console.error('Failed to start ghostscript:', error);
    cleanUpFiles(inputPath, outputPath);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Compression service failed to start.' });
    }
  });

  gsProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Ghostscript process exited with code ${code}`);
      cleanUpFiles(inputPath, outputPath);
      if (!res.headersSent) {
        return res.status(500).json({ error: 'Failed to compress PDF.' });
      }
      return;
    }

    // Read the output file and send it back
    console.log(`[SUCCESS] Finished compressing ${req.file.originalname}. Sending back to client...`);
    res.download(outputPath, 'compressed.pdf', (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      cleanUpFiles(inputPath, outputPath);
    });
  });
});

function cleanUpFiles(inputPath, outputPath) {
  try {
    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  } catch (err) {
    console.error('Error cleaning up files:', err);
  }
}

// Error handling middleware for Multer and other generic errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File is too large. Maximum allowed size is 50MB.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    if (err.message === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
    }
    console.error('Unhandled server error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  next();
});

app.listen(port, () => {
  console.log(`PDF Compression API listening on port ${port}`);
});
