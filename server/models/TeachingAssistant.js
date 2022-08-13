const mongoose = require('mongoose')

const teachingAssistantSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'fullName cannot be empty'] },
  email: { type: String, required: [true, 'email cannot be empty'] },
  mobile: { type: String, required: [true, 'mobile cannot be empty'] },
  password: { type: String, required: [true, 'password cannot be empty'] }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('TeachingAssistant', teachingAssistantSchema)