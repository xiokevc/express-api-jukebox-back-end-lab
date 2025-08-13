const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);

