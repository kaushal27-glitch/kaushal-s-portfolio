# 🚀 Replit Backend Deployment Guide

## Overview
This guide will help you deploy your Node.js backend on Replit with PostgreSQL.

---

## 📋 Prerequisites
- GitHub account (already have it! ✓)
- Replit account (create at replit.com)
- This repository cloned

---

## Step-by-Step Setup

### **1️⃣ Create Replit Account**
1. Go to [replit.com](https://replit.com)
2. Click **Sign up**
3. Choose **Sign up with GitHub**
4. Authorize Replit

### **2️⃣ Import Your Repository**
1. Click **+ Create** 
2. Select **Import from GitHub**
3. Paste: `https://github.com/kaushal27-glitch/kaushal-s-portfolio.git`
4. Wait for import (~1 minute)

### **3️⃣ Configure Main Directory**
1. In the file browser, navigate to `backend/`
2. Right-click on the `backend` folder
3. Select **Set as main directory**

### **4️⃣ Setup PostgreSQL Database**

#### Option A: Replit's Built-in Database (Recommended)
1. Click **Tools** (⚙️ at bottom left)
2. Select **Database**
3. Choose **PostgreSQL**
4. Replit creates database automatically
5. Copy the connection details

#### Option B: External Database (ElephantSQL - Free Tier)
1. Go to [elephantsql.com](https://www.elephantsql.com)
2. Sign up with GitHub
3. Create a **free instance** (20 MB)
4. Copy the **External Database URL**
5. In Replit Secrets, add:
```
DATABASE_URL=postgres://user:password@host:port/database
```

### **5️⃣ Set Environment Variables**

In Replit, click **Secrets** 🔒 and add:

```
DB_HOST=<database_host>
DB_PORT=5432
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
NODE_ENV=production
PORT=3000
```

Or if using external PostgreSQL URL:
```
DATABASE_URL=postgres://user:password@host:port/database
NODE_ENV=production
PORT=3000
```

### **6️⃣ Install Dependencies**

In Replit terminal:
```bash
npm install
```

Or with Replit's package manager:
1. Click **Packages** (left sidebar)
2. Search and install:
   - `express`
   - `cors`
   - `pg`
   - `dotenv`

### **7️⃣ Run the Server**

1. Click the **Run** button at the top
2. Or in terminal: `npm start`
3. You should see:
```
✅ Database connected successfully!
Server successfully running on: http://localhost:3000
```

### **8️⃣ Get Your Public URL**

1. Click the **Open in new tab** icon (top right)
2. Your Replit URL will be something like:
```
https://project-name-username.replit.dev
```

3. Test it:
```
https://project-name-username.replit.dev/api/projects
```

You should see your projects data! 🎉

---

## 🔄 Database Setup (First Time)

If tables don't exist, run setup:

```bash
node backend/setup-db.js
```

Or manually create tables. Here's the SQL:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  proficiency VARCHAR(50)
);
```

---

## 🔗 Connect Frontend to Backend

Update your React frontend to use the Replit backend:

**In `insightstream-labs-main/.env`:**
```
VITE_API_URL=https://your-replit-url.replit.dev
```

**In your React code:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Example: Fetch projects
const response = await fetch(`${API_URL}/api/projects`);
const data = await response.json();
```

---

## 🔐 Security Checklist

- ✅ No hardcoded credentials in code
- ✅ All secrets in Replit Secrets (not in .env)
- ✅ CORS enabled for your frontend domain
- ✅ Database credentials not exposed

---

## ✅ API Endpoints

Once deployed, these endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/db-test` | Test database connection |
| GET | `/api/projects` | Get all projects |
| POST | `/api/contact` | Submit contact form |

### Example Requests:

**Get Projects:**
```bash
curl https://your-replit-url.replit.dev/api/projects
```

**Test DB Connection:**
```bash
curl https://your-replit-url.replit.dev/api/db-test
```

**Submit Contact Form:**
```bash
curl -X POST https://your-replit-url.replit.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

---

## 🐛 Troubleshooting

### Server not starting?
- Check **Secrets** are set correctly
- Check `package.json` exists in backend/
- View **Logs** at bottom for errors

### Database connection error?
- Verify credentials in Secrets
- Check PostgreSQL is running
- Test connection string locally first

### CORS errors in frontend?
- Make sure CORS is enabled in server.js
- Check frontend is using correct API URL
- Verify domain is whitelisted

### Port already in use?
- Change PORT in Secrets to different value (3001, 3002, etc)

---

## 🚀 Auto-Deployment

Any time you push to GitHub, Replit can auto-deploy!

1. In Replit: Click **...** (top right) → **Settings**
2. Enable **GitHub integration**
3. Select **auto-deploy from main branch**

---

## 📞 Support

- Replit Docs: https://docs.replit.com
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Express Docs: https://expressjs.com/

---

## ✨ Next Steps

1. ✅ Deploy on Replit
2. ✅ Get Replit URL
3. ✅ Update frontend API URL
4. ✅ Test endpoints
5. ✅ Enable auto-deploy

You're all set! 🎉
