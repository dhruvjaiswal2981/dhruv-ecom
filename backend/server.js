const app = require('./app');
const http = require('http');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  sequelize.close()
    .then(() => {
      console.log('Database connection closed.');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    })
    .catch(err => {
      console.error('Error closing database connection:', err);
      process.exit(1);
    });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});