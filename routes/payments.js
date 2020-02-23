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
        const { type, value, month, status } = req.body;
        const user_id = req.session.passport.user;
        console.log(user_id)
        const newPayments = new Payments({
            type: type, 
            value: value, 
            month: month, 
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

    // Edit Book Route
    app.get('/dashboard/:id', async (req, res) => {
    try {
      const payments = await Payments.findById(req.params.id)
      renderEditPage(res, payments)
    } catch {
      res.redirect('/')
    }
  })
  
  // Update Book Route
    app.put('/dashboard/:id', async (req, res) => {
    let payments
    const { type, value, month, status } = req.body;
    try {
      payments = await Payments.findById(req.params.id)
      payments.type = type
      payments.value = value
      payments.month = month
      payments.status = status
      await payments.save()
      res.redirect(`/dashboard/${payments.id}`)
    } catch {
      if (payments != null) {
        renderEditPage(res, payments, true)
      } else {
        res.redirect('/dashboard')
      }
    }
  })
  
  // Delete Book Page
    app.delete('/dashboard/:id', async (req, res) => {
    let payments
    try {
      payments = await Payments.findById(req.params.id)
      await payments.remove()
      res.redirect('/dashboard')
    } catch {
      if (book != null) {
        res.render('payments', 
            { payments: payments })
      } else {
        res.redirect('/dashboard')
      }
    }
  })
  
  
  
  async function renderEditPage(res, payments, hasError = false) {
    renderFormPage(res, payments, hasError)
  }
  
  async function renderFormPage(res, payments, form, hasError = false) {
    try {
      const payments = await Payments.find({})
      const params = {
        payments: payments,
      }
      
      res.render('editPayments', params)
    } catch {
      res.redirect('/dashboard')
    }
  }
}





