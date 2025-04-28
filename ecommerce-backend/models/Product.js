const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Make sure ../database is correct

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Products' // Important: set tableName explicitly
});

module.exports = Product;
