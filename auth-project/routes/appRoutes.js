const express = require('express');
const authRoutes = express.Router();
const User = require("../models/User.js");
const {hashGen} = require('../helpers/hashing.js')
const { hashValidator } = require('../helpers/hashing.js')

authRoutes.post('/signup', async (req, res) => { // Changed to POST method for signup
    try {
        const hashPassword = await hashGen(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
    
        const savedUser = await user.save(); // Changed to user.save() instead of User.create(user)
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err); // Sending error response with status code 400
    }
});

authRoutes.post('/signin', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).send("No user found"); // Sending 404 status code for user not found
        }

        const passwordIsValid = await hashValidator(req.body.password, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send('Password is invalid'); // Sending 401 status code for invalid password
        }

        return res.send("Login Successful"); // Sending success response
    } catch (error) {
        return res.status(400).send(error); // Sending error response with status code 400
    }
});

module.exports = authRoutes;