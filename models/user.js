const mongoose = require('mongoose');
const payments = require('../models/payments')

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true},
    email: { 
        type: String,
        required: true
    },
    password:{ 
        type: String,
        required: true
    },
    payments: ['Payment'],
    hash:{ 
        type: String,
        required: false
    },
    salt:{ 
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);