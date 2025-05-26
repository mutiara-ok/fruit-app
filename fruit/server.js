const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'image.jpg'); // overwrite
  }
});
const upload = multer({ storage });

// Endpoint menerima upload gambar
app.post('/upload', upload.single('photo'), (req, res) => {
  // Di sini kamu bisa panggil model ML
  console.log('Gambar diterima:', req.file.path);
  res.json({ prediction: 'pisang' }); // Dummy hasil
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
