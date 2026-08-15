const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS so the Next.js frontend can communicate with this backend
app.use(cors());

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/compress', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const compressionPercent = req.body.compressionPercent ? parseInt(req.body.compressionPercent, 10) : 50; // default 50%
  
  // 0% compression -> 300 DPI (high quality)
  // 100% compression -> 100 DPI (low quality, but not overly destructive)
  const dpi = Math.round(300 - (compressionPercent / 100) * (300 - 100));
  
  console.log(`[START] Compressing: ${req.file.originalname} | Size: ${(req.file.size / 1024 / 1024).toFixed(2)} MB | Compression %: ${compressionPercent} | DPI: ${dpi}`);

  const inputPath = req.file.path;
  const outputPath = `${inputPath}-compressed.pdf`;

  // Ghostscript command args with granular DPI control
  const gsArgs = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    '-dNOPAUSE',
    '-dQUIET',
    '-dBATCH',
    '-dDownsampleColorImages=true',
    '-dDownsampleGrayImages=true',
    '-dDownsampleMonoImages=true',
    `-dColorImageResolution=${dpi}`,
    `-dGrayImageResolution=${dpi}`,
    `-dMonoImageResolution=${dpi}`,
    '-dColorImageDownsampleThreshold=1.0',
    '-dGrayImageDownsampleThreshold=1.0',
    '-dMonoImageDownsampleThreshold=1.0',
    `-sOutputFile=${outputPath}`,
    inputPath
  ];

  // Run Ghostscript
  console.log(`[EXEC] Running gs with DPI=${dpi}`);
  const gsProcess = spawn('gs', gsArgs);

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

app.listen(port, () => {
  console.log(`PDF Compression API listening on port ${port}`);
});
