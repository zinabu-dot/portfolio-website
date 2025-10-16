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
let comments = {}; // { postId: [comments] }
let users = []; // Simple user storage
let commentIdCounter = 1;

// Load existing data on startup
const loadData = async () => {
  try {
    const data = await fs.readFile('./data/posts.json', 'utf8');
    blogPosts = JSON.parse(data);
    postIdCounter = Math.max(...blogPosts.map(p => p.id), 0) + 1;
  } catch (error) {
    console.log('No existing posts found, starting fresh');
  }

  try {
    const userData = await fs.readFile('./data/users.json', 'utf8');
    users = JSON.parse(userData);
  } catch (error) {
    console.log('No existing users found, starting fresh');
  }

  try {
    const commentData = await fs.readFile('./data/comments.json', 'utf8');
    comments = JSON.parse(commentData);
    if (Object.keys(comments).length > 0) {
      commentIdCounter = Math.max(...Object.values(comments).flat().map(c => c.id), 0) + 1;
    }
  } catch (error) {
    console.log('No existing comments found, starting fresh');
  }
};

loadData();

// Save data to files
const savePosts = async () => {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/posts.json', JSON.stringify(blogPosts, null, 2));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

const saveUsers = async () => {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/users.json', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const saveComments = async () => {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/comments.json', JSON.stringify(comments, null, 2));
  } catch (error) {
    console.error('Error saving comments:', error);
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

// Get all posts for admin (full content)
app.get('/api/admin/posts', authenticateToken, (req, res) => {
  res.json(blogPosts);
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

// User registration
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const user = {
    id: users.length + 1,
    username,
    email,
    password, // In production, hash this!
    createdAt: new Date().toISOString()
  };
  
  users.push(user);
  await saveUsers();
  const token = jwt.sign({ userId: user.id, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
  res.status(201).json({ token, user: { id: user.id, username, email } });
});

// User login
app.post('/api/user-login', async (req, res) => {
  const { username, password } = req.body;
  
  // Check if it's admin login
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ userId: 'admin', username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: 'admin', username: 'admin', email: 'admin@portfolio.com' } });
  }
  
  // Check regular users
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// Get comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments[postId] || [];
  res.json(postComments);
});

// Add comment (requires user auth)
app.post('/api/posts/:id/comments', authenticateToken, async (req, res) => {
  const postId = parseInt(req.params.id);
  const { content } = req.body;
  
  if (!comments[postId]) {
    comments[postId] = [];
  }
  
  const comment = {
    id: commentIdCounter++,
    content,
    author: req.user.username,
    userId: req.user.userId,
    date: new Date().toISOString()
  };
  
  comments[postId].push(comment);
  await saveComments();
  res.status(201).json(comment);
});

// Delete comment
app.delete('/api/comments/:id', authenticateToken, async (req, res) => {
  const commentId = parseInt(req.params.id);
  
  for (const postId in comments) {
    const commentIndex = comments[postId].findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
      const comment = comments[postId][commentIndex];
      
      // Allow deletion if user owns comment or is admin
      if (comment.userId === req.user.userId || req.user.username === process.env.ADMIN_USERNAME) {
        comments[postId].splice(commentIndex, 1);
        await saveComments();
        return res.json({ message: 'Comment deleted' });
      } else {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }
  }
  
  res.status(404).json({ message: 'Comment not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});