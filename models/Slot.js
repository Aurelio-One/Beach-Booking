const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 60,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  instructor: {
    type: String,
    default: 'N/A',
  },
})

module.exports = mongoose.model('Slot', slotSchema)
