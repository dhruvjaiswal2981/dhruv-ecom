const express = require('express');
const multer = require('multer');
const { getProducts, getProductById, addProduct } = require('../controllers/productController');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set filename
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Use multer middleware to handle file uploads (image field in form)
router.post('/', upload.single('image'), addProduct); // 'image' is the name of the file field

module.exports = router;
