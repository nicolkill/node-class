const mongoose = require('mongoose');

const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/
  ${process.env.MONGODB_DATABASE}?${process.env.MONGODB_OPTIONS}`;

mongoose.connect(uri, {
  auth: {
    authdb: 'admin',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
  useNewUrlParser: true,
  useFindAndModify: false,
});

require('../models/user');
