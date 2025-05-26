const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures uniqueness in DB level
    match: [/\S+@\S+\.\S+/, 'Email format is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  places: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Place'
    }
  ]
});

// Adds better error messages for unique fields
userSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('User', userSchema);
