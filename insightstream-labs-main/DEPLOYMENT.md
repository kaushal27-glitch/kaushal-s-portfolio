# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Prerequisites

1. A GitHub account
2. The repository pushed to GitHub

### Setup Instructions

1. **Create a GitHub Repository**
   - Go to https://github.com/new
   - Create a repository (e.g., `insightstream-labs` or `portfolio`)
   - Copy the repository URL

2. **Add Remote and Push**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under "Source", select **Deploy from a branch**
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`
   - Click **Save**

4. **Automatic Deployment**
   - Every push to `main` branch triggers the GitHub Actions workflow
   - The workflow builds the project and deploys to GitHub Pages
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Manual Build & Deploy

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Environment Setup

Add to `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO",
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

### Troubleshooting

- **Blank page on deployment**: Check that the repository name in the homepage URL matches your actual repo name
- **Build failing**: Check GitHub Actions logs in the Actions tab
- **Changes not reflecting**: GitHub Pages may take 1-2 minutes to update

### Custom Domain

To use a custom domain:
1. Update your domain's DNS settings to point to GitHub Pages
2. Add a `CNAME` file in the `public/` folder with your domain name
3. Update the `homepage` in `package.json` to your custom domain

## Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Info

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Hosting**: GitHub Pages

