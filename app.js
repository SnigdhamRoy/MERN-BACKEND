const serverless = require('serverless-http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const placesRoutes = require('../routes/places-routes');
const usersRoutes = require('../routes/users-routes');
const HttpError = require('../models/http-error');

const app = express();

app.use(bodyParser.json());

// Serve static files (uploads/images)
app.use('/uploads/images', express.static(path.join(__dirname, '..', 'uploads', 'images')));

// CORS settings
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// API Routes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Handle invalid routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handler
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// MongoDB connection (outside the handler)
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.enstlhj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

// Export Express app as serverless function
module.exports = app;
module.exports.handler = serverless(app);
