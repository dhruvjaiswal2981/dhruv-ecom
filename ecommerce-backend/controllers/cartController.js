const Cart = require('../models/Cart');

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // From authMiddleware

  try {
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    
    if (cartItem) {
      cartItem.quantity += quantity; // Update quantity if product already in cart
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
};

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cartItems = await Cart.findAll({ where: { userId } });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    await Cart.destroy({ where: { userId, productId } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err });
  }
};
