const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favourite_city: {
        type: String,
        
    },
    
    avatar: {
        type: String
    },
    fahrenheit_on: {
        type: Boolean
    }
})

module.exports = User = mongoose.model('user', UserSchema)