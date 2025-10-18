// models/comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Recipe = require('./recipe');

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  recipeId: { type: DataTypes.INTEGER, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true } // null = top-level comment
}, {
  tableName: 'comments',
  timestamps: true
});

User.hasMany(Comment, { foreignKey: 'userId' });
Recipe.hasMany(Comment, { foreignKey: 'recipeId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Recipe, { foreignKey: 'recipeId' });
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });

module.exports = Comment;
