const { Client } = require('pg');
require('dotenv').config();

// Connect as postgres superuser to create database and user
const adminClient = new Client({
  host: process.env.DB_ADMIN_HOST || 'localhost',
  port: process.env.DB_ADMIN_PORT || 5432,
  user: process.env.DB_ADMIN_USER || 'postgres',
  password: process.env.DB_ADMIN_PASSWORD,
  database: 'postgres',
});

async function setupDatabase() {
  try {
    console.log('🔄 Connecting to PostgreSQL...');
    await adminClient.connect();
    console.log('✅ Connected as postgres user');

    // Create portfolio_db database
    console.log('📁 Creating portfolio_db database...');
    try {
      await adminClient.query('CREATE DATABASE portfolio_db;');
      console.log('✅ Database portfolio_db created');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('ℹ️  Database portfolio_db already exists');
      } else {
        throw e;
      }
    }

    // Create portfolio_user role
    console.log('👤 Creating portfolio_user...');
    try {
      const dbPassword = process.env.DB_PASSWORD || 'portfolio_secure_pass';
      await adminClient.query(
        `CREATE USER portfolio_user WITH PASSWORD '${dbPassword}';`
      );
      console.log('✅ User portfolio_user created');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('ℹ️  User portfolio_user already exists');
        // Reset password
        const dbPassword = process.env.DB_PASSWORD || 'portfolio_secure_pass';
        await adminClient.query(
          `ALTER USER portfolio_user WITH PASSWORD '${dbPassword}';`
        );
        console.log('✅ Password reset for portfolio_user');
      } else {
        throw e;
      }
    }

    // Grant privileges
    console.log('🔐 Granting privileges...');
    await adminClient.query(
      'GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;'
    );
    
    // Connect to portfolio_db and grant schema privileges
    const schemaClient = new Client({
      host: process.env.DB_ADMIN_HOST || 'localhost',
      port: process.env.DB_ADMIN_PORT || 5432,
      user: process.env.DB_ADMIN_USER || 'postgres',
      password: process.env.DB_ADMIN_PASSWORD,
      database: 'portfolio_db',
    });
    
    await schemaClient.connect();
    await schemaClient.query(
      'GRANT ALL PRIVILEGES ON SCHEMA public TO portfolio_user;'
    );
    await schemaClient.query(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO portfolio_user;'
    );
    await schemaClient.end();
    console.log('✅ Privileges granted');

    await adminClient.end();

    // Now connect to portfolio_db and create tables
    console.log('\n📊 Creating tables...');
    const dbClient = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'portfolio_user',
      password: process.env.DB_PASSWORD || 'portfolio_secure_pass',
      database: process.env.DB_NAME || 'portfolio_db',
    });

    await dbClient.connect();
    console.log('✅ Connected to portfolio_db');

    // Create tables
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Projects table created');

    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Contacts table created');

    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        proficiency VARCHAR(50)
      );
    `);
    console.log('✅ Skills table created');

    // Insert sample data
    await dbClient.query(`
      INSERT INTO projects (title, description, github_url, live_url) 
      VALUES 
        ('E-Commerce App', 'A full-stack online store built with React and TypeScript.', 'https://github.com', 'https://example.com'),
        ('Weather Dashboard', 'A web app that fetches real-time weather data via a public API.', 'https://github.com', 'https://example.com')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Sample projects inserted');

    await dbClient.query(`
      INSERT INTO skills (name, category, proficiency)
      VALUES
        ('React', 'Frontend', 'Expert'),
        ('TypeScript', 'Language', 'Advanced'),
        ('PostgreSQL', 'Database', 'Advanced'),
        ('Node.js', 'Backend', 'Advanced')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Sample skills inserted');

    await dbClient.end();
    console.log('\n🎉 Database setup complete!');
    console.log('\n📝 Update your .env file with:');
    console.log('DB_USER=portfolio_user');
    console.log('DB_PASSWORD=portfolio_secure_pass');
    console.log('DB_HOST=localhost');
    console.log('DB_PORT=5432');
    console.log('DB_NAME=portfolio_db');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

setupDatabase();
