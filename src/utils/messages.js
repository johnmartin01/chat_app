const moment = require('moment');

function formatMessage(sender, text, room) {
  return {
    sender,
    text,
    room,
    time: moment().format('HH:mm a'),
  };
}

module.exports = formatMessage;
