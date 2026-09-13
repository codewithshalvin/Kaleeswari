/**
 * addEngineeringDayTheme.js
 * Run with: node server/seed/addEngineeringDayTheme.js
 * This script ONLY adds the Engineering Day theme — it does NOT delete existing data.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Theme = require('../models/Theme');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const existing = await Theme.findOne({ slug: 'engineering-day' });
    if (existing) {
      console.log('Engineering Day theme already exists. Skipping insert.');
      process.exit(0);
    }

    await Theme.create({
      name: 'Engineering Day',
      slug: 'engineering-day',
      isActive: false,
      colorPalette: {
        primary: '#F59E0B',
        secondary: '#60A5FA',
        background: '#0f172a',
        accent: '#34D399',
      },
      layoutType: 'fullscreen-slideshow',
      transitionStyle: 'fade',
      fontFamily: 'sans-serif',
    });

    console.log('✅  Engineering Day theme added successfully!');
    console.log('   Activate it from the Admin Dashboard → Themes.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

run();
