const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Plesae add a name']
    },
    email: {
        type: String,
        required:[true, 'Plesae add a email'],
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Plesae add a password']
    },
    
}, { timestamps: true})

module.exports = mongoose.model('User', userSchema)