const mongoose = require('mongoose');

require('./config/database');

const User = mongoose.model('User');

const instance = new User({
  name: 'Nelson',
  surname: 'Pastelson',
});
instance.save(function (err) {
  if (err) {
    console.log('error faltal', err);
  }
});

require('./config/express');

console.log('listening on http://localhost:3000/');
