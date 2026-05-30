const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Database Connection
// Support both local .env and Heroku DATABASE_URL
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });

pool.on('connect', () => {
  console.log('✅ Database connected successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());          
app.use(express.json());  

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