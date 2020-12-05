const express = require('express')
const { createLoop, deleteLoop, updateLoop, validate } = require('../controller/loop-controller')
const { authenticateToken } = require('./../controller/auth-controller')
const router = express.Router()

router.post( '/loop', authenticateToken, createLoop )

router.delete( '/loop', validate('deleteLoop'), authenticateToken, deleteLoop )

router.put( '/loop', validate('updateLoop'), authenticateToken, updateLoop )

module.exports = router