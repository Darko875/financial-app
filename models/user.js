const mongoose = require('mongoose');
const payments = require('../models/payments')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true},
    email: { 
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{ 
        type: String,
        required: true,
        select: false
    },
    payments: ['Payment']
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;

})

module.exports = mongoose.model('User', UserSchema);