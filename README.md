Kaushal G — Portfolio

Full-stack personal portfolio site: a React/TypeScript frontend and a Node.js/Express backend backed by PostgreSQL. The backend stores contact form submissions and serves project data, with a protected admin dashboard to view and manage incoming messages.

Live site: https://kaushal27-glitch.github.io/kaushal-s-portfolio/

Tech Stack

Frontend (insightstream-labs-main/)


React + TypeScript
Vite
Tailwind CSS + shadcn-ui
Framer Motion


Backend (backend/)


Node.js + Express
PostgreSQL (pg)
express-rate-limit (brute-force protection on admin login)
dotenv (environment config)


Deployment


Frontend: GitHub Pages
Backend/DB: Replit or Heroku (Procfile included for Heroku)


Project Structure

.
├── backend/                  # Express API + PostgreSQL access layer
│   ├── server.js             # Main server: routes, auth, rate limiting
│   ├── setup-db.js           # One-time script to create DB + user
│   ├── setup.sql             # Table schema (projects, contacts, skills)
│   └── .env.example          # Template for required env vars
├── insightstream-labs-main/  # React frontend (Vite + TS + Tailwind)
│   └── src/
│       ├── components/       # UI sections (Hero, Contact, AdminGate, etc.)
│       └── pages/            # Route-level pages (Index, Admin)
├── Procfile                  # Heroku start command
├── .replit                   # Replit workflow/deployment config
└── package.json              # Root workspace scripts

Getting Started

Prerequisites


Node.js 18+
npm
A PostgreSQL instance (local, Replit, or a hosted provider)


1. Clone and install

bashgit clone https://github.com/kaushal27-glitch/kaushal-s-portfolio.git
cd kaushal-s-portfolio
npm run setup   # installs deps for both backend and frontend

2. Configure environment variables

Copy the example env file and fill in real values:

bashcp backend/.env.example backend/.env

VariableDescriptionDB_ADMIN_HOST / DB_ADMIN_PORT / DB_ADMIN_USER / DB_ADMIN_PASSWORDSuperuser credentials, used once by setup-db.js to create the app database and roleDB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAMEApp-level DB connection (or use a single DATABASE_URL, which takes priority if set)PORT / BACKEND_PORTPort the Express server listens onADMIN_PASSWORDPassword required to access /admin and manage contact submissions

.env is git-ignored — never commit it.

3. Set up the database

bashnode backend/setup-db.js   # creates the database + role
psql -d portfolio_db -f backend/setup.sql   # creates tables + seed data

4. Run locally

bashnpm run backend:dev    # starts the API on http://localhost:3001
npm run frontend:dev   # starts Vite dev server on http://localhost:5000

Available Scripts (root package.json)

ScriptDescriptionnpm run setupInstalls dependencies for both backend and frontendnpm run backend:devRuns the Express servernpm run backend:startRuns the Express server (production mode)npm run frontend:devRuns the Vite dev servernpm run frontend:buildBuilds the frontend for productionnpm run frontend:previewPreviews the production frontend build

API Overview

MethodRouteAuth requiredDescriptionGET/api/projectsNoReturns portfolio projectsPOST/api/contactNoSubmits a new contact form messagePOST/api/admin/authNo (rate-limited)Verifies admin password, returns a tokenGET/api/contactsYesLists all contact submissionsDELETE/api/contacts/:idYesDeletes a contact submissionGET/api/db-testNoHealth check for the DB connection

Admin-only routes require an Authorization: Bearer <token> header, where the token is returned from /api/admin/auth on successful login. The admin login endpoint is rate-limited to 10 attempts per 15 minutes per IP.

Deployment

Backend (Heroku): the included Procfile runs node backend/server.js. Set all required env vars in Heroku config vars before deploying.

Backend + Frontend together (Replit): .replit defines two workflows — the frontend (Vite) on port 5000 and the backend API on port 3001 — and an autoscale deployment target that runs both. See REPLIT_SETUP.md for full setup steps.

Frontend (GitHub Pages): built via npm run frontend:build and deployed from .github/workflows/.

License

Apache-2.0 — see LICENSE.
