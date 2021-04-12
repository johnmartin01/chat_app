const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get sender and room from URL
const { sender, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { sender, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Show message DB
socket.on('output-messages', (data) => {
  if (data.length) {
    data.forEach((message) => {
      outputMessage(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }
});

// Message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  // console.log(msg);
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
  if (message.sender == sender) {
    const div = document.createElement('div');
    div.classList.add('message-container', 'justify-end');
    const para = document.createElement('p');
    para.classList.add('sent-text', 'pr-10');
    para.innerText = message.sender;
    div.appendChild(para);
    const divBox = document.createElement('div');
    divBox.classList.add('message-box', 'background-blue');
    div.appendChild(divBox);
    const p = document.createElement('p');
    p.classList.add('message-text', 'color-white');
    p.innerText = message.text;
    divBox.appendChild(p);
    const span = document.createElement('span');
    span.classList.add('color-white');
    span.innerText = message.time;
    divBox.appendChild(span);
    document.querySelector('.chat-messages').appendChild(div);
  } else {
    const div = document.createElement('div');
    div.classList.add('message-container', 'justify-start');
    const divBox = document.createElement('div');
    divBox.classList.add('message-box', 'background-light');
    div.appendChild(divBox);
    const p = document.createElement('p');
    p.classList.add('message-text', 'color-dark');
    p.innerText = message.text;
    divBox.appendChild(p);
    const span = document.createElement('span');
    span.classList.add('color-dark');
    span.innerText = message.time;
    divBox.appendChild(span);
    const para = document.createElement('p');
    para.classList.add('sent-text', 'pl-10');
    para.innerText = message.sender;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }
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
    console.log(user.sender);
    li.innerText = user.sender;
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
