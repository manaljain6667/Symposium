const mongoose = require('mongoose')
const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";

// mongoose.connect('mongodb://127.0.0.1:27017/log-in-signup-api', {
//     useNewUrlParser: true
// })
try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

const answerSchema = new mongoose.Schema({
    author: {
      type: String,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

  });
const Answers = mongoose.model('Answers', answerSchema)
module.exports = Answers