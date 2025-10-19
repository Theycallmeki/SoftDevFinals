const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const recipeApi = require('../api/recipeApi');  // ✅ updated import
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ multer setup for recipe images
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),                            
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ✅ Public route: view all recipes
router.get('/all', recipeApi.listAllRecipes);
              
// ✅ Protected CRUD routes for user’s own recipes
router.get('/', verifyToken, recipeApi.listUserRecipes);
router.get('/:id', verifyToken, recipeApi.getRecipe);
router.post('/', verifyToken, upload.single('image'), recipeApi.createRecipe);
router.put('/:id', verifyToken, upload.single('image'), recipeApi.updateRecipe);
router.delete('/:id', verifyToken, recipeApi.deleteRecipe);

module.exports = router;
