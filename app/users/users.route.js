const controller = require('./users.controller');

function config(app) {
  app.get('/users', controller.get);
  app.get('/users/:id', controller.getOne);
  app.post('/users', controller.post);
  app.put('/users/:id', controller.put);
  app.delete('/users/:id', controller.delete);
}

export default config;
