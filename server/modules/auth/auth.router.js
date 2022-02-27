const router = require('express').Router();
const AuthController = require('./auth.controller');
const isAuth = require('../../common/middleware/isAuth')
const getUser = require('../../common/middleware/getUser')

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.get('/me',getUser, AuthController.getUserInfo);

module.exports = router;
