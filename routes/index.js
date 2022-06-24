const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const index = require('./modules/index')
const users = require('./modules/users')
const auth = require('./modules/auth')
const records = require('./modules/records')

router.use('/users', users)
router.use('/auth', auth)
router.use('/records', records)
router.use('/', authenticator, index)

module.exports = router
