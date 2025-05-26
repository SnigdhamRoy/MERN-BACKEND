const app = require('../app'); // Import the Express app

module.exports = (req, res) => {
  app(req, res); // Use it as a serverless function
};
