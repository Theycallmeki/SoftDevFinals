const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const itemApi = require('../api/itemApi');

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

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

// Routes
router.get('/', itemApi.listItems);
router.get('/:id', itemApi.getItem);
router.post('/', upload.single('picture'), itemApi.createItem);
router.put('/:id', upload.single('picture'), itemApi.updateItem);
router.delete('/:id', itemApi.deleteItem);

module.exports = router;
