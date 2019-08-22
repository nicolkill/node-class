const mongoose = require('mongoose');

mongoose.connect('mongodb://mkdownme:mkdownme@localhost:27017/mkdownme?authSource=admin', { useNewUrlParser: true });

require('../models/user');
