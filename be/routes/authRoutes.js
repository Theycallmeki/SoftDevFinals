const express = require('express');
const authApi = require('../api/authApi');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', authApi.register);
router.post('/login', authApi.login);

// Logout (clears cookie)
router.post('/logout', authApi.logout);

// Get current user (persistent login)
router.get('/me', verifyToken, authApi.me);

module.exports = router;
