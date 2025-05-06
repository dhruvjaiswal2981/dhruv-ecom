const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getProductCategories);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;