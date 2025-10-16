# Forms Setup Guide

This guide explains how to set up the required forms and services for your portfolio website.

## 1. Contact Form Setup (Formspree)

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form

### Step 2: Get Form Endpoint
1. After creating the form, you'll get an endpoint like: `https://formspree.io/f/xpzgkqyw`
2. Copy this endpoint

### Step 3: Update Environment Variables
1. Open `frontend/portfolio/.env`
2. Replace `YOUR-FORM-ID` with your actual form ID:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xpzgkqyw
   ```

### Step 4: Configure Form Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Configure spam protection
- Add custom thank you messages
- Set up redirects after form submission

## 2. Comments System Setup (Giscus)

### Step 1: Enable GitHub Discussions
1. Go to your portfolio repository on GitHub
2. Go to Settings → Features
3. Enable "Discussions"

### Step 2: Install Giscus App
1. Go to [giscus.app](https://giscus.app)
2. Install the Giscus GitHub App on your repository
3. Configure the settings:
   - Repository: `yourusername/portfolio`
   - Page ↔️ Discussions Mapping: `pathname`
   - Discussion Category: `General`

### Step 3: Get Configuration Values
After configuration, Giscus will provide you with:
- `data-repo`
- `data-repo-id`
- `data-category`
- `data-category-id`

### Step 4: Update Environment Variables
Add to `frontend/portfolio/.env`:
```env
VITE_GISCUS_REPO=yourusername/portfolio
VITE_GISCUS_REPO_ID=R_kgDOH...
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=DIC_kwDOH...
```

### Step 5: Enable Giscus Component
1. Install the Giscus package:
   ```bash
   npm install @giscus/react
   ```

2. Update `src/pages/BlogPost.jsx` to use the actual Giscus component:
   ```jsx
   import Giscus from '@giscus/react';
   
   // Replace the placeholder div with:
   <Giscus
     id="comments"
     repo={import.meta.env.VITE_GISCUS_REPO}
     repoId={import.meta.env.VITE_GISCUS_REPO_ID}
     category={import.meta.env.VITE_GISCUS_CATEGORY}
     categoryId={import.meta.env.VITE_GISCUS_CATEGORY_ID}
     mapping="pathname"
     term="Welcome to the comments!"
     reactionsEnabled="1"
     emitMetadata="0"
     inputPosition="top"
     theme="preferred_color_scheme"
     lang="en"
     loading="lazy"
   />
   ```

## 3. Alternative Contact Form Services

### EmailJS (Alternative to Formspree)
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service
3. Create an email template
4. Get your service ID, template ID, and public key
5. Update the contact form to use EmailJS SDK

### Netlify Forms (If deploying to Netlify)
1. Add `netlify` attribute to your form:
   ```jsx
   <form netlify onSubmit={handleSubmit}>
   ```
2. Add a hidden input:
   ```jsx
   <input type="hidden" name="form-name" value="contact" />
   ```
3. Deploy to Netlify - forms will be automatically detected

## 4. Environment Variables Summary

Create `frontend/portfolio/.env` with:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Contact Form
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR-FORM-ID

# Giscus Comments (optional)
VITE_GISCUS_REPO=yourusername/portfolio
VITE_GISCUS_REPO_ID=your-repo-id
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=your-category-id
```

## 5. Production Environment Variables

For deployment, set these environment variables in your hosting platform:

### Vercel
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add each variable

### Netlify
1. Site settings → Environment variables
2. Add each variable

## 6. Testing Forms

### Contact Form Testing
1. Fill out the contact form on your website
2. Check your email for the message
3. Check Formspree dashboard for submissions

### Comments Testing
1. Navigate to a blog post
2. Try posting a comment
3. Check GitHub Discussions in your repository

## Troubleshooting

### Contact Form Issues
- Check browser console for errors
- Verify Formspree endpoint is correct
- Check spam folder for notifications
- Ensure CORS is properly configured

### Comments Issues
- Verify GitHub Discussions is enabled
- Check Giscus app permissions
- Ensure repository is public
- Verify configuration IDs are correct