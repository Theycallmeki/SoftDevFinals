// models/index.js
const User = require('./user');
const Recipe = require('./recipe');
const Comment = require('./comment');

// Define all associations cleanly

// User ↔ Recipe
User.hasMany(Recipe, { foreignKey: 'userId' });
Recipe.belongsTo(User, { foreignKey: 'userId' });

// User ↔ Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Recipe ↔ Comment
Recipe.hasMany(Comment, { foreignKey: 'recipeId' });
Comment.belongsTo(Recipe, { foreignKey: 'recipeId' });

// Comment ↔ Replies (self-relation)
Comment.hasMany(Comment, {
  as: 'replies',
  foreignKey: 'parentId'
});
Comment.belongsTo(Comment, {
  as: 'parent',
  foreignKey: 'parentId'
});

module.exports = { User, Recipe, Comment };
