const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Media = require('../models/Media');

const getGfsBucket = () => {
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });
  }
  return null;
};

// @route   GET /api/media
// @desc    Get all media for a theme
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { theme } = req.query;
    let query = {};
    if (theme) {
      query.themeSlug = theme;
    }
    const media = await Media.find(query).sort({ uploadedAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/media/stream/:fileId
// @desc    Stream media file from GridFS (supports gridFsFileId or Media document _id)
// @access  Public
router.get('/stream/:fileId', async (req, res) => {
  try {
    const gfsBucket = getGfsBucket();
    if (!gfsBucket) {
      return res.status(500).json({ message: 'Database connection not ready' });
    }

    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(req.params.fileId);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Try finding by fileId directly in GridFS
    let files = await gfsBucket.find({ _id: fileId }).toArray();
    
    // If not found directly in GridFS, check if fileId is a Media document _id
    if (!files || files.length === 0) {
      const mediaDoc = await Media.findById(fileId);
      if (mediaDoc && mediaDoc.gridFsFileId) {
        files = await gfsBucket.find({ _id: mediaDoc.gridFsFileId }).toArray();
        if (files && files.length > 0) {
          fileId = mediaDoc.gridFsFileId;
        }
      }
    }

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = files[0];
    
    res.set('Content-Type', file.contentType || 'image/jpeg');
    res.set('Content-Disposition', `inline; filename="${file.filename}"`);
    
    // Check for range request (for video streaming)
    if (req.headers.range) {
      const parts = req.headers.range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
      const chunksize = (end - start) + 1;

      res.status(206).set({
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
      });
      
      const downloadStream = gfsBucket.openDownloadStream(fileId, { start, end: end + 1 });
      downloadStream.pipe(res);
      downloadStream.on('error', (err) => {
         res.end();
      });
    } else {
      res.set('Content-Length', file.length);
      const downloadStream = gfsBucket.openDownloadStream(fileId);
      downloadStream.pipe(res);
      downloadStream.on('error', (err) => {
         res.end();
      });
    }
  } catch (error) {
    console.error('Error streaming file:', error);
    res.status(500).json({ message: 'Error streaming file', error: error.message });
  }
});

module.exports = router;
