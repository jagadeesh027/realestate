import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'database.sqlite'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    image TEXT,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

export default db;
