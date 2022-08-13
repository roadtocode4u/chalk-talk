const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title cannot be empty'] },
  description: { type: String, required: [true, 'Description cannot be empty'] },
  courseName: { type: String, required: [true, 'Course Name cannot be empty'] },
  status: { type: String, enum: ["pending", "attended", "resolved"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Doubt', doubtSchema)