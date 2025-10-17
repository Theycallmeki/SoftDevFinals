const fs = require('fs');
const path = require('path');
const Item = require('../models/item');

// Helper to delete old file
async function removeFileIfExists(filepath) {
  if (!filepath) return;
  const fullPath = path.join(__dirname, '..', filepath);
  try {
    await fs.promises.access(fullPath);
    await fs.promises.unlink(fullPath);
  } catch {}
}

// List all items (for marketplace, public)
exports.listAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [['createdAt', 'DESC']],
      // optional: include user info if your Item model has a relation
      // include: [{ model: User, attributes: ['username'] }]
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all items', error: err.message });
  }
};

// List items for logged-in user (CRUD)
exports.listItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
};

// Get a single item (owned)
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get item', error: err.message });
  }
};

// Create item
exports.createItem = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    const picture = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await Item.create({
      name,
      price,
      stock: stock ?? 0,
      description,
      picture,
      userId: req.user.id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { name, price, stock, description } = req.body;
    if (req.file) {
      await removeFileIfExists(item.picture);
      item.picture = `/uploads/${req.file.filename}`;
    }
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    if (stock !== undefined) item.stock = stock;
    if (description !== undefined) item.description = description;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await removeFileIfExists(item.picture);
    await item.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};
