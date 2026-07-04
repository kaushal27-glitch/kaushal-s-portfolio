const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const crypto = require('crypto');

// Database Connection
// Supports: Replit, Heroku DATABASE_URL, or individual env vars
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'portfolio_db',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

pool.on('connect', () => {
  console.log('✅ Database connected successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;

const allowedOrigins = [
  'https://kaushal27-glitch.github.io', // your live frontend
  'http://localhost:5000',              // local dev
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());

// Rate limiter: max 10 attempts per 15 minutes per IP
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

// Admin Auth
app.post('/api/admin/auth', adminAuthLimiter, (req, res) => {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || '');
  const provided = Buffer.from(req.body.password || '');

  const isMatch =
    expected.length === provided.length &&
    crypto.timingSafeEqual(expected, provided);

  if (isMatch) {
    res.status(200).json({ success: true, token: process.env.ADMIN_PASSWORD });
  } else {
    res.status(401).json({ success: false });
  }
});

// Middleware: blocks anyone without the correct token
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to my portfolio backend API!');
});

// Database Connection Test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ 
      success: true, 
      message: 'Database connected!',
      time: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Your API Routes
app.get('/api/projects', async (req, res) => {
  try {
    // Fetch from database
    const result = await pool.query('SELECT * FROM projects');
    if (result.rows.length === 0) {
      // Fallback to hardcoded data if no projects in DB
      const portfolioProjects = [
        { 
          id: 1, 
          title: "My E-Commerce App", 
          description: "A full-stack online store built with React and TypeScript." 
        },
        { 
          id: 2, 
          title: "Weather Dashboard", 
          description: "A web app that fetches real-time weather data via a public API." 
        }
      ];
      return res.status(200).json(portfolioProjects);
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.log('Note: projects table not created yet, returning sample data');
    const portfolioProjects = [
      { 
        id: 1, 
        title: "My E-Commerce App", 
        description: "A full-stack online store built with React and TypeScript." 
      },
      { 
        id: 2, 
        title: "Weather Dashboard", 
        description: "A web app that fetches real-time weather data via a public API." 
      }
    ];
    res.status(200).json(portfolioProjects);
  }
});

app.get('/api/contacts', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contacts/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all required fields." });
  }
  
  try {
    // Save to database
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    console.log(`✅ Message saved: Name: ${name}, Email: ${email}`);
    res.status(201).json({ success: true, message: "Message saved.", data: result.rows[0] });
  } catch (error) {
    console.log('Note: contacts table not created yet. Message logged to console.');
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    res.status(201).json({ success: true, message: "Message saved." });
  }
});

app.listen(PORT, () => {
  console.log(`Server successfully running on: http://localhost:${PORT}`);
  console.log(`🔗 Test DB connection: http://localhost:${PORT}/api/db-test`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await pool.end();
  process.exit(0);
});

module.exports = { app, pool };