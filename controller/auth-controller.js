// get environment variables
require('dotenv').config()

// set global variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// load dependencies
const mongoose = require('mongoose')
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')


const authenticateUser = async (req, res) => {

    const validation = validationResult(req);

    if (!validation.errors.length <= 0) {
        return res.status(422).send(validation.errors)
    }

    // authenticate User
    const user = await User.findOne({email: req.body.email}).exec()
    // check if user with that email exists
    if (user == null) {
        return res.status(400).send('No user with that email')
    }
    try {
        // check if user typed the right password
        if (await bcrypt.compare(req.body.password, user.password)) {
            // if so, create jwt access token and send it to the user
            const userPayload = { id: user._id }
            let accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken});
        } else {
            res.status(403).send('wrong password')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const authenticateToken = async (req, res, next) => {
    // get token form auth header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] // bc. its Baerer <token>
    if (token == null) return res.sendStatus(401);

    // verify token 
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // save payload data in request
        req.user = user;
        next();
    })
}

// method for validation
// TODO: maybe custom checks for express-validator
const validate = (method) => {
    switch (method) {
        case 'authenticateUser': {
            return [ 
                body('email', 'invalid email').exists().isEmail(),
                body('password', 'password is missing').exists()
            ]   
        }
    }
}

module.exports = {
    authenticateUser: authenticateUser,
    authenticateToken: authenticateToken,
    validate: validate
}