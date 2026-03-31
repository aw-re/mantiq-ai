import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// User Authentication Routes
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT id, name, email, role FROM users WHERE email = ? AND password = ?').get(email, password);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
  }
});

// ==========================================
// Articles Routes
// ==========================================

// GET all articles
app.get('/api/articles', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM articles ORDER BY id DESC').all() as any[];
    const articles = rows.map(r => ({
      ...r,
      tags: JSON.parse(r.tags || '[]')
    }));
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET single article
app.get('/api/articles/:id', (req, res) => {
  try {
    const r = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id) as any;
    if (r) {
      res.json({ ...r, tags: JSON.parse(r.tags || '[]') });
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// CREATE article
app.post('/api/articles', (req, res) => {
  try {
    const { title, excerpt, content, author, date, category, tags, imageUrl, readTime } = req.body;
    const stmt = db.prepare(`
      INSERT INTO articles (title, excerpt, content, author, date, category, tags, imageUrl, readTime) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      title, 
      excerpt, 
      content, 
      author || 'مدير النظام', 
      date || new Date().toISOString().split('T')[0], 
      category, 
      JSON.stringify(tags || []), 
      imageUrl, 
      readTime || '5 دقائق'
    );
    
    res.status(201).json({ 
      id: info.lastInsertRowid, 
      ...req.body 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// UPDATE article
app.put('/api/articles/:id', (req, res) => {
  try {
    const { title, excerpt, content, author, date, category, tags, imageUrl, readTime } = req.body;
    const stmt = db.prepare(`
      UPDATE articles 
      SET title=?, excerpt=?, content=?, author=?, date=?, category=?, tags=?, imageUrl=?, readTime=? 
      WHERE id=?
    `);
    stmt.run(
      title, excerpt, content, author, date, category, JSON.stringify(tags || []), imageUrl, readTime, 
      req.params.id
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE article
app.delete('/api/articles/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM articles WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
