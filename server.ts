import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // API Routes
  app.post('/api/auth/signup', (req, res) => {
    const { email, password, name, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const stmt = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)');
      const info = stmt.run(email, hashedPassword, name, role || 'user');
      res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  });

  app.get('/api/properties', (req, res) => {
    const properties = db.prepare('SELECT * FROM properties').all();
    res.json(properties);
  });

  app.post('/api/properties', authenticateToken, (req: any, res) => {
    const { title, price, location, type, beds, baths, sqft, image } = req.body;
    const stmt = db.prepare('INSERT INTO properties (title, price, location, type, beds, baths, sqft, image, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(title, price, location, type, beds, baths, sqft, image, req.user.id);
    res.status(201).json({ id: info.lastInsertRowid });
  });

  // Admin route to see all users
  app.get('/api/admin/users', authenticateToken, (req: any, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const users = db.prepare('SELECT id, email, name, role FROM users').all();
    res.json(users);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
