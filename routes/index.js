const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
    res.render('./views/home', { user: new User() });
})

router.post('/process-register', async (req, res) => {
    const {email} = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        if (await User.findOne({email})){
          return res.status(400).send({error: 'User already exists'})
        }
        const newUser = await user.save();
        
        user.password = undefined;
        const token = jwt.sign({id: user.id}, process.env.SECRET, {
          expiresIn: 86400,
        })
    
        res.render('./views/payments')
    } catch {
        res.render('./views/home', {
            user: user,
            errorMessage: 'Error Creating User: '
        })
    }
});

router.post('/process-login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password')
    if (!user){
      return res.status(400).send({error: 'User not found'})
    }
    if(await bcrypt.compare(password, user.password)){
      return res.status(400).send({error: 'Invalid password'})
    }

    user.password = undefined;

    const token = jwt.sign({id: user.id}, process.env.SECRET, {
      expiresIn: 86400,
    })

    res.render('./views/payments')
})

module.exports = router

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9