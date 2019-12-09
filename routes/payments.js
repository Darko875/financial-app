const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/payments', (req, res) => {
    res.render('../views/payments')
})



module.exports = router