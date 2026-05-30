-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Skills Table (optional)
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  proficiency VARCHAR(50)
);

-- Insert Sample Projects
INSERT INTO projects (title, description, github_url, live_url) VALUES
('E-Commerce App', 'A full-stack online store built with React and TypeScript.', 'https://github.com', 'https://example.com'),
('Weather Dashboard', 'A web app that fetches real-time weather data via a public API.', 'https://github.com', 'https://example.com');

-- Insert Sample Skills
INSERT INTO skills (name, category, proficiency) VALUES
('React', 'Frontend', 'Expert'),
('TypeScript', 'Language', 'Advanced'),
('PostgreSQL', 'Database', 'Advanced'),
('Node.js', 'Backend', 'Advanced');

COMMIT;
