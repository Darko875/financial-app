const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payments = require('../models/payments')


router.get('/', (req, res) => {
    res.render('home');
})


router.get('/dashboard', async (req, res) => {
  let user_id1 = req.session.passport.user
  let user_id = user_id1.toString()
  console.log(user_id)
  const payments = await Payments.find({user: mongoose.Types.ObjectId(user_id)}).populate('user').exec()  
  res.render('payments', {payments: payments})  
})

router.get('/user', (req, res) => {
  res.render('home');
})

module.exports = router


