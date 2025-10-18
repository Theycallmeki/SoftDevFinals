const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const commentApi = require('../api/commentApi');

const router = express.Router();

// Public: get all comments for a recipe
router.get('/:recipeId', commentApi.getCommentsByRecipe);

// Protected: add new comment or reply
router.post('/:recipeId', verifyToken, commentApi.addComment);

module.exports = router;
