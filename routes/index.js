const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')



module.exports = (app) => {

app.get('/', (req, res) => {
    res.render('home');
})

}



