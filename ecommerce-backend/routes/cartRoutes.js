const express = require('express');
const { addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addItemToCart);
router.get('/', authMiddleware, getCartItems);
router.delete('/:productId', authMiddleware, removeItemFromCart);

module.exports = router;
