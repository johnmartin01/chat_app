const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = new Schema({
  username: {
    type: String,
    default: 'John',
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model('Message', Message);
