const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');

// @route   GET /api/themes/active
// @desc    Get the active theme
// @access  Public
router.get('/active', async (req, res) => {
  try {
    const activeTheme = await Theme.findOne({ isActive: true });
    if (!activeTheme) {
      return res.status(404).json({ message: 'No active theme found' });
    }
    res.json(activeTheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
