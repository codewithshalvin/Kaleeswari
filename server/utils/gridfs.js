const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // Collection name will be uploads.files and uploads.chunks
        };
        resolve(fileInfo);
      });
    });
  }
});

// Configure multer with limits and file filtering
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max file size
  },
  fileFilter: (req, file, cb) => {
    const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedVideoMimeTypes = ['video/mp4', 'video/webm'];
    
    if (allowedImageMimeTypes.includes(file.mimetype) || allowedVideoMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, WEBP, MP4, and WEBM are allowed.'));
    }
  }
});

module.exports = { upload };
