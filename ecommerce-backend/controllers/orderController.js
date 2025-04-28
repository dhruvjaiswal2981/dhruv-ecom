const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create a new order
exports.createOrder = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cartItems = await Cart.findAll({ where: { userId } });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({ userId });
    // Here, you would calculate totals and store products in order details
    cartItems.forEach(item => {
      // Assuming Order has a productId and quantity field
      order.addProduct(item.productId, { through: { quantity: item.quantity } });
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err });
  }
};
