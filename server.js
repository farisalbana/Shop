const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'videos'),
  filename: (req, file, cb) => cb(null, `${Date.now()}.webm`)
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.post('/upload-video', upload.single('video'), (req, res) => {
  console.log('Video uploaded:', req.file.filename);
  res.send('OK');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));