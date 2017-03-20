export default {
  // Secret key for JWT signing and encryption
  secret: 'a4f8071f-c873-4447-8ee2',
  // Database connection information
  database: process.env.NODE_ENV=='production' ? 'mongodb://localhost:27017': 'mongodb://localhost:27017',
  // Setting port for server
  port: process.env.NODE_ENV=='production' ? 5000: 3000,
};
