const { Sequelize } = require('sequelize');
const path = require('path'); 

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'ecommerce.db') // Ensure correct path for the database
});

module.exports = sequelize;
