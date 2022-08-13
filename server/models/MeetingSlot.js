const mongoose = require('mongoose')

const meetingSlotSchema = new mongoose.Schema({
  slotTime: { type: String, required: [true, 'Slot Time cannot be empty'] },
  teachingAssistant: { type: mongoose.Schema.Types.ObjectId, ref: "TeachingAssistant" },
  doubt: { type: mongoose.Schema.Types.ObjectId, ref: "Doubt" }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('MeetingSlot', meetingSlotSchema)