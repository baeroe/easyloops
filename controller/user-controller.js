//import dependencies
const mongoose = require('mongoose');
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')


const createUser = async (req, res) => {
    try {

        const validation = validationResult(req);

        if (!validation.errors.length <= 0) {
            return res.status(422).send(validation.errors)
        }

        // get user data from body
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const username = req.body.username;

        // check if email is already taken
        User.findOne({email: email}, (err, doc) => {
            if(err) return res.status(500).send(err)

            // if so, send error code
            if (doc != null) {
                return res.status(422).send({code: "email"})
            }  else {

                // if not, create new one
                const user = new User({username: username, email: email, password: hashedPassword, confirmed: false});
                user.save().then(console.log(`user ${username} created`));
                return res.status(201).send();
            }
        })
    } catch (err) {

        return res.status(500).send(err);
    }
}

const deleteUser = (req, res) => {
    console.log('hallo')
    User.findByIdAndDelete(req.user.id,{useFindAndModify: false}, (err, user) => {
        console.log(user)
        if (err) return res.status(500).send(err)

        if (user === null) return res.status(404).send()

        res.status(200).send(user.username + ' deleted')
    })
}


const readUser = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send(err)

        if (user === null) return res.status(404).send()

        return res.json({username: user.username, email: user.email, loops: user.loops})
    })
}


// method for validation
// TODO: maybe custom checks for express-validator
const validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [ 
                body('username', 'invalid username').exists(),
                body('email', 'invalid email').exists().isEmail(),
                body('password', 'password is missing').exists()
            ]   
        }
    }
}


module.exports = {
    createUser: createUser,
    readUser: readUser,
    validate: validate,
    deleteUser: deleteUser
}