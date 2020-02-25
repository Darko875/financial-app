const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payments = require('../models/payments')

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    app.get('/dashboard', async (req, res) => {
        let user_id1 = req.session.passport.user
        let user_id = user_id1.toString()
        console.log(user_id)
        const payments = await Payments.find({user: mongoose.Types.ObjectId(user_id)}).populate('user').exec()  
        res.render('payments', {payments: payments})  
        

    })

    app.post('/process-payment', urlencodedParser, async (req, res) => {
        const { type, value, month, year, status } = req.body;
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
            res.redirect(`dashboard/${newPayments.id}`)
            
          } catch {
            res.redirect('/dashboard')
          }
    })

    // Edit Payment Route
    app.get('/dashboard/:id', async (req, res) => {
    try {
      const payments = await Payments.find({_id: mongoose.Types.ObjectId(req.params.id)})
      res.render('editPayments', {payments: payments})
      console.log(req.params.id)
    } catch {
      res.redirect('/')
    }
  })
  
  // Update Payment Route
    app.post('/dashboard/:id', async (req, res) => {
    let payments
    const { type, value, month, status } = req.body;
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

  app.get('/dashboard/:id/delete', async (req, res) => {
    try {
      res.render('deletePayments')
    } catch {
      res.redirect('/')
    }
  })
  
  // Delete Payment Page
    app.post('/dashboard/:id/delete', async (req, res) => {
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

}





