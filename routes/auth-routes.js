const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()
const { authenticateUser, validate } = require('./../controller/auth-controller')

router.post('/auth', validate('authenticateUser'), authenticateUser)

module.exports = router