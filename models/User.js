const mongoose = require('mongoose');

const User = mongoose.model('users', {
    firstName: {
        type: String,
        require: true,
        minLength: 4,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        minLength: 4,
        trim: true
    },
    isActive: {
        type:Number,
        default: 0
    }
});

module.exports = User;