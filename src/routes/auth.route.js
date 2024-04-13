const login = require('../controllers/login.controller');
const register = require('../controllers/register.controller');
const logout = require('../controllers/logout.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    var router = require('express').Router();

    router.get('/login', authMiddleware.isAuth, login.showLoginForm);
    router.post('/login', login.login);

    router.get('/register', authMiddleware.isAuth, register.create);
    router.post('/register', register.register);

    router.get('/logout', authMiddleware.loggedin, logout.logout);

    app.use(router);
}