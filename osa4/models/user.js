const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    name: String,
    password: String,
    isAdult: Boolean
})

module.exports = User