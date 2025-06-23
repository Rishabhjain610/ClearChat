const express = require('express');
const UserRouter = express.Router();
const { getCurrentUser, editProfile } = require('../controller/user.controller');
const { authCheck } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');
UserRouter.get('/getUser', authCheck, getCurrentUser);
UserRouter.put('/profile',authCheck,upload.single('image') ,editProfile)
module.exports = UserRouter;
