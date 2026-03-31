import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// To handle paths accurately regardless of where it is run
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '..', 'mantiq.db');

const db = new Database(dbPath);

console.log('Connected to SQLite Database at:', dbPath);

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    readTime TEXT NOT NULL
  );
`);

// Insert default Admin if doesn't exist
const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@mantiq.ai');
if (!adminExists) {
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run('admin@mantiq.ai', 'admin123', 'المدير العام', 'admin');
  console.log('Default Admin user created.');
}

export default db;
