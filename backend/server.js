require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const enquiryRoutes = require('./routes/enquiry');
const authRoutes = require('./routes/auth');

const app = express();

// ─── Connect DB ──────────────────────────────────────────────
connectDB().then(() => seedAdmin());

// ─── Security Middleware ──────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3000',
      'https://axiomcnc.vercel.app', // update with your Vercel URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Rate Limiting ────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: 'Too many enquiries submitted. Please try again in an hour.' },
});

// ─── Body Parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Logging ─────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AXIOM CNC API',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api', apiLimiter);
app.use('/api/enquiry', enquiryLimiter);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/auth', authRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
  });
});

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AXIOM CNC API running on port ${PORT} [${process.env.NODE_ENV}]`);
});
