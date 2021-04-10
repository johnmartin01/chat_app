const express = require('express');
const router = express.Router();
const messageController = require('../app/controllers/MessageController');

router.get('/chat-message', messageController.showMessage);
router.post('/chat-message', messageController.saveMessage);

module.exports = router;
