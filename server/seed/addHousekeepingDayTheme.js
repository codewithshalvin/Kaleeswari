/**
 * addHousekeepingDayTheme.js
 * Run with: node server/seed/addHousekeepingDayTheme.js
 * Adds the Housekeeping Day theme to MongoDB without overwriting other themes or media.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Theme = require('../models/Theme');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const existing = await Theme.findOne({ slug: 'housekeeping-day' });
    if (existing) {
      console.log('Housekeeping Day theme already exists. Updating properties.');
      await Theme.updateOne(
        { slug: 'housekeeping-day' },
        {
          name: 'Housekeeping Day',
          colorPalette: {
            primary: '#0284C7',
            secondary: '#38BDF8',
            background: '#07192F',
            accent: '#7DD3FC',
          },
          layoutType: 'fullscreen-slideshow',
          transitionStyle: 'fade',
          fontFamily: 'sans-serif',
        }
      );
    } else {
      await Theme.create({
        name: 'Housekeeping Day',
        slug: 'housekeeping-day',
        isActive: false,
        colorPalette: {
          primary: '#0284C7',
          secondary: '#38BDF8',
          background: '#07192F',
          accent: '#7DD3FC',
        },
        layoutType: 'fullscreen-slideshow',
        transitionStyle: 'fade',
        fontFamily: 'sans-serif',
        quote: 'Cleanliness and order are not matters of instinct; they are matters of education, care, and dedication.',
      });
      console.log('✅ Housekeeping Day theme created!');
    }

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

run();
