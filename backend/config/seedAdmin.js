const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existing) {
      console.log('ℹ️  Admin already exists — skipping seed.');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    });
    console.log(`✅ Admin seeded — username: "${process.env.ADMIN_USERNAME}"`);
  } catch (err) {
    console.error('❌ Admin seed error:', err.message);
  }
};

module.exports = seedAdmin;
