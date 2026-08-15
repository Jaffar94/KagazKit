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

  const compressionLevel = req.body.compressionLevel || 'medium';
  
  // Map our UI slider levels to Ghostscript PDFSETTINGS
  let pdfSettings = '/ebook'; // default medium
  if (compressionLevel === 'high') {
    pdfSettings = '/screen'; // lowest quality, smallest size (72 dpi)
  } else if (compressionLevel === 'medium') {
    pdfSettings = '/ebook'; // medium quality (150 dpi)
  } else if (compressionLevel === 'low') {
    pdfSettings = '/printer'; // high quality (300 dpi)
  }

  const inputPath = req.file.path;
  const outputPath = `${inputPath}-compressed.pdf`;

  // Ghostscript command args
  const gsArgs = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    `-dPDFSETTINGS=${pdfSettings}`,
    '-dNOPAUSE',
    '-dQUIET',
    '-dBATCH',
    `-sOutputFile=${outputPath}`,
    inputPath
  ];

  // Run Ghostscript
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
