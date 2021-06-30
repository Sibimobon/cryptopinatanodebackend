const mongoose = require('mongoose')

const PinataSchema = new mongoose.Schema({
  amount:{ type: Number, required: true},
  limit:{ type: Number, required: true},
  createdAt:{ type: Date, default: Date.now,},
  crackedAt:{ type: Date, required: false },
  winner:{type: String, required: false},
})

module.exports = mongoose.model('Pinata', PinataSchema)