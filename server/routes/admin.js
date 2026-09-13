const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/gridfs');
const Media = require('../models/Media');
const Theme = require('../models/Theme');
const mongoose = require('mongoose');

// Initialize GridFSBucket
let gfsBucket;
mongoose.connection.once('open', () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

// @route   POST /api/admin/upload
// @desc    Upload media to GridFS
// @access  Private (Admin)
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { themeSlug, caption } = req.body;
    
    if (!themeSlug) {
      return res.status(400).json({ message: 'Theme slug is required' });
    }

    const isImage = req.file.mimetype.startsWith('image/');
    
    const newMedia = new Media({
      filename: req.file.filename,
      gridFsFileId: req.file.id,
      fileType: isImage ? 'image' : 'video',
      mimeType: req.file.mimetype,
      themeSlug: themeSlug,
      caption: caption || ''
    });

    await newMedia.save();

    res.status(201).json(newMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// @route   DELETE /api/admin/media/:id
// @desc    Delete media
// @access  Private (Admin)
router.delete('/media/:id', protect, async (req, res) => {
  try {
    const mediaId = req.params.id;
    const media = await Media.findById(mediaId);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete from GridFS
    await gfsBucket.delete(new mongoose.Types.ObjectId(media.gridFsFileId));
    
    // Delete from DB
    await Media.findByIdAndDelete(mediaId);

    res.json({ message: 'Media deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/media
// @desc    List all media
// @access  Private (Admin)
router.get('/media', protect, async (req, res) => {
  try {
    const media = await Media.find({}).sort({ uploadedAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/themes
// @desc    Get all themes
// @access  Private (Admin)
router.get('/themes', protect, async (req, res) => {
  try {
    const themes = await Theme.find({});
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/admin/themes/:slug/quote
// @desc    Save a custom quote to a theme
// @access  Private (Admin)
router.patch('/themes/:slug/quote', protect, async (req, res) => {
  try {
    const { slug } = req.params;
    const { quote } = req.body;

    const updated = await Theme.findOneAndUpdate(
      { slug },
      { quote: quote ?? '' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/admin/themes/:slug/activate
// @desc    Activate a theme
// @access  Private (Admin)
router.patch('/themes/:slug/activate', protect, async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Deactivate all themes
    await Theme.updateMany({}, { isActive: false });
    
    // Activate the selected theme
    const activeTheme = await Theme.findOneAndUpdate({ slug }, { isActive: true }, { new: true });
    
    if (!activeTheme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    
    res.json(activeTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
