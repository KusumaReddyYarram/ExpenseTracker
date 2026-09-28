const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Robust CORS Middleware for Local & Production Deployments
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://expense-tracker-six-theta-65.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database per request (ensures serverless & Render resilience)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('Database connect middleware warning:', err.message);
  }
  next();
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'SMART EXPENSE TRACKER - AURA PLATFORM',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/insights', require('./routes/insightRoutes'));

// 404 & Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  AURA FINTECH BACKEND RUNNING ON PORT ${PORT} `);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
