const mongoose = require('mongoose')

const PinataSchema = new mongoose.Schema({
  reserved:{ type:Boolean, default:false },
  amount:{ type: Number, required: true},
  limit:{ type: Number, required: true},
  timesHit:{ type: Number, required: true, default: 0},
  createdAt:{ type: Date, default: Date.now,},
  crackedAt:{ type: Date, required: false },
  winner:{type: String, required: false},
})

module.exports = mongoose.model('Pinata', PinataSchema)