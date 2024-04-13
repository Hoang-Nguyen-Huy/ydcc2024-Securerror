const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    res.render('auth/register');
}

exports.register = async (req, res) => {
    const { email, password, username, country, phone, role } = req.body;

    if (email && password && username && country && phone) {
        try {
            // Check if the email, username, or phone already exists
            const existingUserByEmail = await User.findByEmail(email);
            const existingUserByUsername = await User.findByUserName(username);
            const existingUserByPhone = await User.findByPhone(phone);

            if (existingUserByEmail) {
                const conflictError = 'Email is already in use.';
                return res.render('auth/register', { email, password, username, conflictError });
            }
            if (existingUserByUsername) {
                const conflictError = 'Username is already taken.';
                return res.render('auth/register', { email, password, username, conflictError });
            }
            if (existingUserByPhone) {
                const conflictError = 'Phone number is already registered.';
                return res.render('auth/register', { email, password, username, conflictError });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

            // Create the user
            const createdUser = {
                email,
                username,
                password: hashedPassword,
                role: role === undefined ? 1 : role,
                country,
                phone
            };

            const newUser = await User.create(createdUser); // Now, directly await User.create

            res.redirect('/login');
        } catch(error) {
            console.error("Error registering user: ", error);
            return res.status(400).json({ message: 'Error registering user' });
        }
    } else {
        const conflictError = 'Please provide all required user credentials.';
        res.render('auth/register', { email, password, username, conflictError });
    }
}
