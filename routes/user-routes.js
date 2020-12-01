const express = require('express')
const router = express.Router()
const {createUser, readUser, validate} = require('./../controller/user-controller')
const {authenticateToken} = require('./../controller/auth-controller')

// create a new user
router.post('/user', validate('createUser'), createUser)

// read existing user
router.get('/user', authenticateToken, readUser)

module.exports = router