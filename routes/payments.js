const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payments = require('../models/payments')

var urlencodedParser = bodyParser.urlencoded({extended: false});


    router.post('/process-payment', urlencodedParser, async (req, res) => {
        const { type, value, month, year, status } = req.body;
        if (!type || !value || !month || !year || !status){
            res.redirect('/dashboard')
        }
        const user_id = req.session.passport.user;
        console.log(user_id)
        const newPayments = new Payments({
            type: type, 
            value: value, 
            month: month,
            year: year, 
            status: status,
            user: user_id
        })
        try {
            const pay = await newPayments.save().catch(err => console.log(err));
            res.redirect(`/dashboard/${newPayments.id}`)
            
          } catch {
            res.redirect('/dashboard')
          }
    })

    // Edit Payment Route
    router.get('/:id', async (req, res) => {
    try {
      const payments = await Payments.find({_id: mongoose.Types.ObjectId(req.params.id)})
      res.render('editPayments', {payments: payments})
      console.log(req.params.id)
    } catch {
      res.redirect('/dashboard')
    }
  })
  
  // Update Payment Route
  router.post('/:id', async (req, res) => {
    let payments
    const { type, value, month, status } = req.body;
    if (!req.body){
        res.redirect('/dashboard')
    }
    try {
         //Payments.find({_id: mongoose.Types.ObjectId(req.params.id)})
        await Payments.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, {new: true})
        res.redirect(`/dashboard/${payments.id}`)
    } catch {
      if (payments != null) {
        res.redirect(`/dashboard/${req.params.id}`)
      } else {
        res.redirect('/dashboard')
      }
    }
  })

  router.get('/:id/delete', async (req, res) => {
    try {
      res.render('deletePayments')
    } catch {
      res.redirect('/')
    }
  })
  
  // Delete Payment Page
  router.post('/:id/delete', async (req, res) => {
    let payments
    try {
      await Payments.findByIdAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
      res.redirect('/dashboard')
    } catch {
      if (payments != null) {
        res.render('payments', 
            { payments: payments })
      } else {
        res.redirect('/dashboard')
      }
    }
  })

module.exports = router





