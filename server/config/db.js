const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Theme = require('../models/Theme');
const Admin = require('../models/Admin');

const defaultThemes = [
  {
    name: 'Classic Corporate',
    slug: 'classic-corporate',
    isActive: true,
    colorPalette: { primary: '#1e3a8a', secondary: '#ffffff', background: '#f3f4f6', accent: '#3b82f6' },
    layoutType: 'grid',
    transitionStyle: 'fade',
    fontFamily: 'serif'
  },
  {
    name: 'Engineering Day',
    slug: 'engineering-day',
    isActive: false,
    colorPalette: { primary: '#F59E0B', secondary: '#60A5FA', background: '#0f172a', accent: '#34D399' },
    layoutType: 'fullscreen-slideshow',
    transitionStyle: 'fade',
    fontFamily: 'sans-serif'
  },
  {
    name: 'Housekeeping Day',
    slug: 'housekeeping-day',
    isActive: false,
    colorPalette: { primary: '#10B981', secondary: '#F59E0B', background: '#064e3b', accent: '#34D399' },
    layoutType: 'fullscreen-slideshow',
    transitionStyle: 'fade',
    fontFamily: 'sans-serif'
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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed admin user if no admin exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const password = process.env.ADMIN_DEFAULT_PASSWORD || 'adminpassword';
      const passwordHash = await bcrypt.hash(password, 10);
      await Admin.create({ username: 'admin', passwordHash });
      console.log('Auto-seeded default admin account (username: admin)');
    }

    // Auto-seed themes if no themes exist
    const themeCount = await Theme.countDocuments();
    if (themeCount === 0) {
      await Theme.insertMany(defaultThemes);
      console.log('Auto-seeded default themes');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
