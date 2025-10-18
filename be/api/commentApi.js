// api/commentApi.js
const Comment = require('../models/comment');
const User = require('../models/user');

exports.getCommentsByRecipe = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { recipeId: req.params.recipeId, parentId: null },
      include: [
        { model: User, attributes: ['id', 'username'] },
        {
          model: Comment,
          as: 'replies',
          include: [{ model: User, attributes: ['id', 'username'] }],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text, parentId } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text required' });

    const newComment = await Comment.create({
      text,
      userId: req.user.id,
      recipeId: req.params.recipeId,
      parentId: parentId || null,
    });

    const created = await Comment.findByPk(newComment.id, {
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};
