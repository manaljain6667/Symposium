const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/log-in-signup-api', {
    useNewUrlParser: true
})

const questionSchema = new mongoose.Schema({
    author: {
      type: String,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

  });
const Questions = mongoose.model('Questions', questionSchema)
module.exports = Questions