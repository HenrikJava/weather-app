const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: true
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
    image: {
        type: String,
    },
    avatar: {
        type: String
    }
})

module.exports = User = mongoose.model('user', UserSchema)