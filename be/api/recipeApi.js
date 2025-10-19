const fs = require('fs');
const path = require('path');
const Recipe = require('../models/recipe');
const User = require('../models/user');

// Helper to delete old image file
async function removeFileIfExists(filepath) {
  if (!filepath) return;
  const fullPath = path.join(__dirname, '..', filepath);
  try {
    await fs.promises.access(fullPath);
    await fs.promises.unlink(fullPath);
  } catch {}
}

// List all recipes (public)
exports.listAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all recipes', error: err.message });
  }
};

// List recipes for logged-in user (CRUD view)
exports.listUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: err.message });
  }
};

// Get a single recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
     include: [{ model: User, attributes: ['id', 'username'] }],
    });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // This part restricts current logged in user to view others
    // if (recipe.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' }); 

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recipe', error: err.message });
  }
};

// Create recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions)
      return res.status(400).json({ message: 'Missing required fields' });

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      image,
      userId: req.user.id,
    });

    const created = await Recipe.findByPk(recipe.id, {
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create recipe', error: err.message });
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, ingredients, instructions } = req.body;
    if (req.file) {
      await removeFileIfExists(recipe.image);
      recipe.image = `/uploads/${req.file.filename}`;
    }
    if (title !== undefined) recipe.title = title;
    if (ingredients !== undefined) recipe.ingredients = ingredients;
    if (instructions !== undefined) recipe.instructions = instructions;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update recipe', error: err.message });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await removeFileIfExists(recipe.image);
    await recipe.destroy();

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete recipe', error: err.message });
  }
};
