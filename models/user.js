const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: String,
  surname: String,
});

mongoose.model('User', User);
