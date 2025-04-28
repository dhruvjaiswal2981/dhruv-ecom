const express = require('express');
const sequelize = require('./database'); // Import Sequelize instance
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); // Import fs module

// Initialize the Express app
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Static file serving (Ensure the correct path to 'public')
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create the 'uploads' directory if it doesn't exist
}

// Sync Sequelize models and start the server
sequelize.sync() // Sync all models with the database
  .then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync the database:', err);
  });
