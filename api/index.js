const app = require('../app');

module.exports = (req, res) => {
  app(req, res); // Handle each request as a serverless function
};
