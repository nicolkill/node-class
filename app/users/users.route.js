const controller = require('./users.controller');

function config(app) {
  app.get('/users', controller.get);
}

export default config;
