const fs = require('fs');
const path = require('path');
const Item = require('../models/item');

// delete file helper
async function removeFileIfExists(filepath) {
  if (!filepath) return;
  const fullPath = path.join(__dirname, '..', filepath);
  try {
    await fs.promises.access(fullPath);
    await fs.promises.unlink(fullPath);
  } catch {
    // ignore
  }
}

exports.listItems = async (req, res) => {
  try {
    const items = await Item.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get item', error: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const picture = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await Item.create({
      name,
      price,
      stock: stock ?? 0,
      description,
      picture,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

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

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await removeFileIfExists(item.picture);
    await item.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};
