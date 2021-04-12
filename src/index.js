const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const moment = require('moment');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Config router
const route = require('./routes');
// Connect to DB
const db = require('././config/db/');
db.connect();
const Message = require('./app/models/Messages');
app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat Bot';

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ sender, room }) => {
    const user = userJoin(socket.id, sender, room);
    socket.join(user.room);
    Message.find({ room: room })
      .limit(100)
      // .sort({ _id: 1 })
      .then((result) => {
        socket.emit('output-messages', result);
      });
    // Welcome current user
    socket.emit(
      'message',
      formatMessage(
        botName,
        `Chào mừng, ${user.sender} đã vào nhóm ${user.room}.`
      )
    );

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.sender} đã vào phòng chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    // console.log(msg);
    io.to(user.room).emit(
      'message',
      formatMessage(user.sender, msg, user.room)
    );
    const message = new Message({
      text: msg,
      sender: user.sender,
      room: user.room,
      time: moment().calendar(),
    });
    message.save();
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.sender} đã rời khỏi`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

// Route init
route(app);

server.listen(PORT, () => console.log(`App running on port ${PORT}`));
