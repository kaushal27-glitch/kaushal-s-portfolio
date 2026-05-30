const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Activate Middlewares
app.use(cors());          // Allows your React frontend to communicate with this API
app.use(express.json());  // Allows your server to read incoming JSON data bodies

// 1. GET Route: Sends data to your React frontend
app.get('/api/projects', (req, res) => {
  const portfolioProjects = [
    { id: 1, title: "Automations App", description: "Python script connected to SQL." },
    { id: 2, title: "Anatom Webpage", description: "A high-end watch store concept layout." }
  ];
  res.status(200).json(portfolioProjects);
});

// 2. POST Route: Receives data from your React contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all required fields." });
  }

  console.log(`\n--- New Form Submission ---`);
  console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

  res.status(201).json({ success: true, message: "Thank you! Message saved." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server successfully running on: http://localhost:${PORT}`);
});