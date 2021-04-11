const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = new Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    room: {
      type: String,
      default: 'Buôn bán',
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', Message);
