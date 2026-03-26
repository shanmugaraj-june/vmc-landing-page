const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

// POST /api/auth/login
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { username, password } = req.body;

    try {
      const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        message: 'Login successful',
        token,
        admin: { id: admin._id, username: admin.username },
      });
    } catch (err) {
      console.error('Auth login error:', err);
      res.status(500).json({ message: 'Server error.' });
    }
  }
);

module.exports = router;
