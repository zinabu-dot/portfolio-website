import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let blogPosts = [];
let postIdCounter = 1;

// Load existing posts on startup
try {
  const data = await fs.readFile('./data/posts.json', 'utf8');
  blogPosts = JSON.parse(data);
  postIdCounter = Math.max(...blogPosts.map(p => p.id), 0) + 1;
} catch (error) {
  console.log('No existing posts found, starting fresh');
}

// Save posts to file
const savePosts = async () => {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/posts.json', JSON.stringify(blogPosts, null, 2));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get all blog posts
app.get('/api/posts', (req, res) => {
  const publicPosts = blogPosts.map(post => ({
    ...post,
    content: post.content.substring(0, 200) + '...' // Preview only
  }));
  res.json(publicPosts);
});

// Get single blog post
app.get('/api/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// Create blog post (protected)
app.post('/api/posts', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  
  const newPost = {
    id: postIdCounter++,
    title,
    content,
    tags: tags || [],
    date: new Date().toISOString(),
    readingTime: Math.ceil(content.split(' ').length / 200) // Rough estimate
  };
  
  blogPosts.unshift(newPost);
  await savePosts();
  
  res.status(201).json(newPost);
});

// Update blog post (protected)
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  const { title, content, tags } = req.body;
  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title,
    content,
    tags: tags || [],
    readingTime: Math.ceil(content.split(' ').length / 200)
  };
  
  await savePosts();
  res.json(blogPosts[postIndex]);
});

// Delete blog post (protected)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  blogPosts.splice(postIndex, 1);
  await savePosts();
  res.json({ message: 'Post deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});