# Modern Portfolio Website

A responsive personal portfolio website for data scientists and AI specialists with dynamic blog functionality.

## Features

- 🎨 Modern, responsive design with light/dark mode
- 📱 Mobile-first approach
- 📝 Dynamic blog system with admin panel
- 💬 Comments system using Giscus
- 📧 Contact form integration
- 🚀 Fast performance with React + Vite
- 🔒 Secure admin authentication

## Tech Stack

### Frontend
- React 19 + Vite
- React Router for navigation
- Axios for API calls
- React Markdown for blog posts
- Lucide React for icons
- React Hot Toast for notifications

### Backend
- Node.js + Express
- JWT authentication
- File-based storage (easily replaceable with database)
- CORS enabled

## Quick Start

### 1. Setup Environment Variables

Copy the environment template:
```bash
cp frontend/portfolio/.env.example frontend/portfolio/.env
```

Update the values in `.env` with your actual service endpoints (see SETUP_FORMS.md for details).

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend/portfolio
npm install
```

### 2. Configure Environment

Update `backend/.env` with your settings:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### 3. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend/portfolio
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

## Customization

### Personal Information
Update the following files with your information:
- `src/pages/Home.jsx` - Hero section and skills
- `src/pages/About.jsx` - About content and experience
- `src/pages/Projects.jsx` - Your projects
- `src/components/Footer.jsx` - Social links

### Contact Form
Replace the Formspree endpoint in `src/pages/Contact.jsx`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
```

### Comments System
Update Giscus configuration in `src/pages/BlogPost.jsx`:
```javascript
<Giscus
  repo="yourusername/portfolio"
  repoId="your-repo-id"
  // ... other config
/>
```

## Deployment

### Free Hosting Options

**Frontend (Vercel):**
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

**Backend (Railway/Render):**
1. Push backend code to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

### Environment Variables for Production
```env
PORT=5000
JWT_SECRET=your-production-jwt-secret
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
```

## Project Structure

```
Portfolio/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── frontend/portfolio/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/        # Page components
    │   ├── contexts/     # React contexts
    │   └── utils/        # Utility functions
    ├── public/           # Static assets
    └── package.json      # Frontend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!