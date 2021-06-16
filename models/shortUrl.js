const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

//input full URL, generate shortURL and clicks, save into MongoDB database
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(Math.floor(Math.random() * (7 - 5 + 1)) + 5)
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)