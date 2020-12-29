const express = require('express')
const { authenticateToken } = require('./../controller/auth-controller')
const { saveLoop, deleteLoop } = require('./../controller/loop-controller')
const router = express.Router()

router.post('/loop', authenticateToken, saveLoop)
router.delete('/loop', authenticateToken, deleteLoop)


module.exports = router