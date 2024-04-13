const authMiddleware = require('../middlewares/auth.middleware');
const Incident = require('../controllers/incident.controller');
const Calculator = require('../controllers/calculator.controller');

module.exports = app => {
    var router = require('express').Router();

    router.get('/home', authMiddleware.loggedin, (req, res) => {
        res.render('home');
    });

    router.post('/home', authMiddleware.loggedin, Incident.createIncident);

    router.get('/result', authMiddleware.loggedin, Calculator.calculate);

    app.use(router);
}