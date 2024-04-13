const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.showLoginForm = (req, res) => {
    res.render('auth/login');
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
        const existingUser = await User.findByEmail(email);

        if (!existingUser) {
            const conflictError = 'Your email is not found';
            res.render('auth/login', { email, password, conflictError });
        } else {
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (result === true) {
                    req.session.loggedin = true;
                    req.session.user = existingUser;
                    res.redirect('/home');
                } else {
                    // A user with that email address does not exists
                    const conflictError = 'Your password is wrong';
                    res.render('auth/login', { email, password, conflictError });
                }
            });
        }
    } else {
        // A user with that email address does not exists
        const conflictError = 'Wrong email and password';
        res.render('auth/login', { email, password, conflictError });
    }
}