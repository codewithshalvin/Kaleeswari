const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Theme = require('../models/Theme');

dotenv.config();

const themes = [
  {
    name: 'Classic Corporate',
    slug: 'classic-corporate',
    isActive: true, // Default active theme
    colorPalette: { primary: '#1e3a8a', secondary: '#ffffff', background: '#f3f4f6', accent: '#3b82f6' },
    layoutType: 'grid',
    transitionStyle: 'fade',
    fontFamily: 'serif'
  },
  {
    name: 'Industrial / Refinery',
    slug: 'industrial-refinery',
    isActive: false,
    colorPalette: { primary: '#ea580c', secondary: '#000000', background: '#1c1917', accent: '#f97316' },
    layoutType: 'fullscreen-slideshow',
    transitionStyle: 'zoom',
    fontFamily: 'sans-serif'
  },
  {
    name: 'Festive Celebration',
    slug: 'festive-celebration',
    isActive: false,
    colorPalette: { primary: '#e11d48', secondary: '#fef08a', background: '#fff1f2', accent: '#fbbf24' },
    layoutType: 'carousel',
    transitionStyle: 'slide',
    fontFamily: 'sans-serif'
  },
  {
    name: 'Modern Minimal',
    slug: 'modern-minimal',
    isActive: false,
    colorPalette: { primary: '#171717', secondary: '#ffffff', background: '#ffffff', accent: '#a3a3a3' },
    layoutType: 'collage',
    transitionStyle: 'smooth',
    fontFamily: 'sans-serif'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing
    await Admin.deleteMany();
    await Theme.deleteMany();

    // Seed Admin
    const passwordHash = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10);
    const admin = new Admin({
      username: 'admin',
      passwordHash: passwordHash
    });
    await admin.save();
    console.log('Admin user seeded');

    // Seed Themes
    await Theme.insertMany(themes);
    console.log('Themes seeded');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
