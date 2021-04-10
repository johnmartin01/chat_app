const Message = require('../models/Messages');

class MessageController {
  // [GET] /Message/:slug
  showMessage(req, res, next) {
    Promise.all(Message.find())
      .then((message) => {
        socket.emit('output-messages', message);
      })
      .catch(next);
  }
  saveMessage(req, res, next) {
    // res.json(req.body);
    const message = new Message(req.body);
    message.save().catch((next) => {
      io.emit('message', msg);
    });
  }
}
module.exports = new MessageController();
