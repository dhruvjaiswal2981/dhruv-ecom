const { Cart, Product } = require('../models/associations');

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Product,
        as: 'Product', // Make sure this matches your association alias
        required: true, // This ensures INNER JOIN
        attributes: ['id', 'name', 'price', 'imageUrl', 'customizable']
      }]
    });

    // Transform the data to ensure consistent structure
    const formattedCart = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      customization: item.customization,
      Product: {
        id: item.Product.id,
        name: item.Product.name,
        price: item.Product.price,
        imageUrl: item.Product.imageUrl,
        customizable: item.Product.customizable
      }
    }));

    res.json(formattedCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error loading cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, customization } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is already in cart
    let cartItem = await Cart.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });

    if (cartItem) {
      // Update quantity if already in cart
      cartItem.quantity += quantity || 1;
      if (customization) {
        cartItem.customization = customization;
      }
      await cartItem.save();
    } else {
      // Add new item to cart
      cartItem = await Cart.create({
        userId: req.user.id,
        productId,
        quantity: quantity || 1,
        customization
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, customization } = req.body;

    const cartItem = await Cart.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity !== undefined) {
      cartItem.quantity = quantity;
    }
    if (customization !== undefined) {
      cartItem.customization = customization;
    }

    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: { userId: req.user.id }
    });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};