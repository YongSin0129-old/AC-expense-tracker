const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('record', recordSchema)
