const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  gridFsFileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fileType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  themeSlug: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  caption: {
    type: String,
  },
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
