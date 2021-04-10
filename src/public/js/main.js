const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.message-container');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
// Show message DB

socket.on('output-messages', (data) => {
  if (data.length) {
    data.forEach((message) => {
      outputMessage(message);
    });
  }
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', chatForm.msg.value);
  // console.log('submit from chatForm', chatForm.msg.value);
  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message-box');
  const para = document.createElement('p');
  para.classList.add('message-text');
  para.innerText = message.text;
  console.log(message.text);
  div.appendChild(para);
  const p = document.createElement('p');
  p.classList.add('message-meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  document.querySelector('.message-container').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm(
    'Bạn có chắc chắn muốn rời khỏi phòng chat này không?'
  );
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
