const chatRouter = require('./messages');

function route(app) {
  app.use('/home', chatRouter);
}

module.exports = route;
