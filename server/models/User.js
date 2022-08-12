const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, 'fullName cannot be empty'] },
    email: { type: String, required: [true, 'email cannot be empty'] },
    mobile: { type: String, required: [true, 'mobile cannot be empty'] },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', userSchema)