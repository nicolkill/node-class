const express = require('express');

const app = express();

require('../app/users/users.route')(app);

app.listen(3000);