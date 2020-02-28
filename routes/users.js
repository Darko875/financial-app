const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
const Payments = require('../models/payments')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const passport = require('passport')


module.exports = (app) => {

app.post('/process-register', async (req, res) => {
    const { name, email, password} = req.body;
    let errors = [];
  
    if (!name || !email || !password) {
      redirect('/')
    }
    
    else {
    User.findOne({ email: email }).then(user => {
          const newUser = new User({
            name,
            email,
            password})
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.redirect('/');
                })
                .catch(err => console.log(err));
            })
          })
        })
      }
    })
  
  app.post('/process-login', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })(req, res, next)   
})
  
  // Logout
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

}