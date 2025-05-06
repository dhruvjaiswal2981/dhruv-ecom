const Product = require('../models/product');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;
    const where = {};
    const order = [];

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    // Search by name or description
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price_asc':
          order.push(['price', 'ASC']);
          break;
        case 'price_desc':
          order.push(['price', 'DESC']);
          break;
        case 'name_asc':
          order.push(['name', 'ASC']);
          break;
        case 'name_desc':
          order.push(['name', 'DESC']);
          break;
      }
    }

    const products = await Product.findAll({ where, order });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, stock, category, customizable } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      const product = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        customizable: customizable === 'true',
        imageUrl
      });
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const { name, description, price, stock, category, customizable } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : product.imageUrl;
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.category = category || product.category;
      product.customizable = customizable !== undefined ? customizable === 'true' : product.customizable;
      product.imageUrl = imageUrl;
  
      await product.save();
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: ['category'],
      group: ['category']
    });
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};