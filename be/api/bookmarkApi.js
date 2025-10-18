const Bookmark = require('../models/bookmark');
const User = require('../models/user');
const Recipe = require('../models/recipe');

// Get all bookmarks of current user
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: Recipe,
        as: 'savedRecipes',  // use the association name from your models
        through: { attributes: [] }, // exclude Bookmark table data
      }],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.savedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookmarks', error: err.message });
  }
};

// Add a bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) return res.status(400).json({ message: 'Recipe ID required' });

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Prevent bookmarking your own recipe
    if (recipe.userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot bookmark your own recipe' });
    }

    const existing = await Bookmark.findOne({
      where: { userId: req.user.id, recipeId },
    });
    if (existing) return res.status(400).json({ message: 'Already bookmarked' });

    const bookmark = await Bookmark.create({ userId: req.user.id, recipeId });
    res.status(201).json({ message: 'Recipe bookmarked', bookmark });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add bookmark', error: err.message });
  }
};

// Remove a bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const bookmark = await Bookmark.findOne({
      where: { userId: req.user.id, recipeId },
    });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });

    await bookmark.destroy();
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove bookmark', error: err.message });
  }
};
