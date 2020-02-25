const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    month: {
        type: String, 
        required: true
    },   
    year: {
        type: String, 
        required: true
    },
    value: { 
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Payments', PaymentsSchema);