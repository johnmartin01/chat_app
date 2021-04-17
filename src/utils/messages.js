const moment = require('moment');

function formatMessage(sender, text, room) {
  return {
    sender,
    text,
    room,
    // time: moment().format('HH:mm a'),
    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
  };
}

module.exports = formatMessage;
