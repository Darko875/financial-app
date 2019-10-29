const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('./views/home', { user: new User() });
})

router.post('/process-register', async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const newUser = await user.save();
            res.redirect('/')
        } catch {
            res.render('./views/home', {
                user: user,
                errorMessage: 'Error Creating User: '
            })
        }
    });

router.post('/process-login', (req,res) => {
    //login
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);
    res.redirect(303, '/thank-you');
})

module.exports = router