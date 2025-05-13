const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');

// User has many Cart items
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Product has many Cart items
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Cart
};