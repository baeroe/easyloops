const express = require('express')
const router = express.Router()
const {createUser, readUser, validate, deleteUser} = require('./../controller/user-controller')
const {authenticateToken} = require('./../controller/auth-controller')

// create a new user
router.post('/user', validate('createUser'), createUser)

// read existing user
router.get('/user', authenticateToken, readUser)

// delete user
router.delete('/user', authenticateToken, deleteUser)

module.exports = router