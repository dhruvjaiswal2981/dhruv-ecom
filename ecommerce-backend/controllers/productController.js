const { Sequelize, DataTypes } = require('sequelize');
const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get the file path if uploaded

    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      imageUrl,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};
