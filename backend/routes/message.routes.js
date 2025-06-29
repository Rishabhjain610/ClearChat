const express = require('express');
const messageRouter = express.Router();
const {authCheck} = require('../middleware/auth.middleware');
const { sendMessage ,getMessages} = require('../controller/message.controller');
const upload = require('../middleware/multer.middleware');
messageRouter.post('/send/:receiver', authCheck, upload.single('image'), sendMessage);

messageRouter.get('/messages/:receiver', authCheck, getMessages);
module.exports = messageRouter;