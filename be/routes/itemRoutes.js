const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const itemApi = require('../api/itemApi');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Public route: get all items (marketplace)
router.get('/all', itemApi.listAllItems);

// Protected CRUD routes (user-specific)
router.get('/', verifyToken, itemApi.listItems);
router.get('/:id', verifyToken, itemApi.getItem);
router.post('/', verifyToken, upload.single('picture'), itemApi.createItem);
router.put('/:id', verifyToken, upload.single('picture'), itemApi.updateItem);
router.delete('/:id', verifyToken, itemApi.deleteItem);

module.exports = router;
