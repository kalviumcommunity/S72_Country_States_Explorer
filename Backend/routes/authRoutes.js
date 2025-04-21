const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; // Replace this with DB integration
const SECRET_KEY = 'your-secret-key';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // use true in prod
    sameSite: 'strict',
  });

  res.json({ message: 'Login successful' });
});

module.exports = router;
