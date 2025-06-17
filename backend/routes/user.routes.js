const express = require('express');
const UserRouter = express.Router();
const { getCurrentUser } = require('../controller/user.controller');
const { authCheck } = require('../middleware/auth.middleware');
UserRouter.post('/getUser', authCheck, getCurrentUser);
module.exports = UserRouter;
