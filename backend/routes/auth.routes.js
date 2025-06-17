const express = require('express');
const AuthRouter = express.Router();
const { Signup, login,Logout } = require('../controller/auth.controller');
AuthRouter.post('/login', login);
AuthRouter.post('/signup', Signup);
AuthRouter.post('/logout', Logout);
module.exports = AuthRouter;