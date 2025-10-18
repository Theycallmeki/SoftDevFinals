const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const bookmarkApi = require('../api/bookmarkApi');

const router = express.Router();

router.get('/', verifyToken, bookmarkApi.getBookmarks);
router.post('/', verifyToken, bookmarkApi.addBookmark);
router.delete('/:recipeId', verifyToken, bookmarkApi.removeBookmark);

module.exports = router;
