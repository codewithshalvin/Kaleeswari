const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  colorPalette: {
    primary: String,
    secondary: String,
    background: String,
    accent: String,
  },
  layoutType: {
    type: String,
    enum: ['grid', 'carousel', 'collage', 'fullscreen-slideshow'],
    required: true,
  },
  transitionStyle: {
    type: String,
  },
  fontFamily: {
    type: String,
  },
  quote: {
    type: String,
    default: '',
  },
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
