const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SECRET = 'f9D7#kLp2@xZ8!qR4vM1$wT6%eY0&uB3';

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'Username exists' });

    const user = await User.create({ username, password });
    res.status(201).json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '2h' });

    // ✅ HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: 'lax'
    }).json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

// Get current user
exports.me = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ user: req.user });
};
