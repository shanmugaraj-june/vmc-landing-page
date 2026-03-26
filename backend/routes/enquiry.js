const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const authMiddleware = require('../middleware/auth');

// Validation rules for POST
const enquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name too short'),
  body('phone').trim().notEmpty().withMessage('Phone is required').matches(/^[+]?[\d\s\-()]{8,15}$/).withMessage('Invalid phone number'),
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message too short (min 10 chars)'),
  body('machineInterest').optional().trim(),
];

// POST /api/enquiry — public
router.post('/', enquiryValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  try {
    const { name, phone, email, company, machineInterest, message } = req.body;
    const enquiry = await Enquiry.create({ name, phone, email, company, machineInterest, message });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (err) {
    console.error('Enquiry POST error:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// GET /api/enquiry — admin only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enquiries.' });
  }
});

// PATCH /api/enquiry/:id — toggle contacted (admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { contacted: req.body.contacted },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update enquiry.' });
  }
});

// DELETE /api/enquiry/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json({ message: 'Enquiry deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete enquiry.' });
  }
});

module.exports = router;
