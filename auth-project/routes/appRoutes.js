const express = require('express');
const authRoutes = express.Router();
const authVerify = require('../helpers/authVerify'); // Import authVerify middleware
const User = require("../models/User.js");
const {hashGen} = require('../helpers/hashing.js')
const { hashValidator } = require('../helpers/hashing.js')
const { tokenGen } = require('../helpers/token.js');

authRoutes.post('/signup', async (req, res) => {
    try {
        const hashPassword = await hashGen(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
    
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

authRoutes.post('/signin', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).send("No user found");
        }

        const passwordIsValid = await hashValidator(req.body.password, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send('Password is invalid');
        } else {
            const token = await tokenGen(existingUser.email)
            res.cookie("jwt", token, { httpOnly: true, secure: true });
            res.send(token);
        }

    } catch (error) {
        return res.status(400).send(error);
    }
});

authRoutes.get("/protected", authVerify , (req, res) => { // Use authVerify middleware to protect route
    res.send("I am protected route")
});

module.exports = authRoutes;