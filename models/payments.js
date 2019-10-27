const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    mounth: {
        type: String, 
        required: true
    },
    year: { 
        type: Number,
        required: true
    },    
    value: { 
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Payments', PaymentSchema);