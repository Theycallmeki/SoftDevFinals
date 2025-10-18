const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Recipe = require('./recipe');

const Bookmark = sequelize.define('Bookmark', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Recipe, key: 'id' },
  },
}, {
  tableName: 'bookmarks',
  timestamps: true,
});

// Many-to-many associations
User.belongsToMany(Recipe, { through: Bookmark, foreignKey: 'userId', as: 'savedRecipes' });
Recipe.belongsToMany(User, { through: Bookmark, foreignKey: 'recipeId', as: 'savedByUsers' });

module.exports = Bookmark;
