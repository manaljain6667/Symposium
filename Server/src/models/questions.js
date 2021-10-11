const mongoose = require('mongoose')
const User = require('./user')
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
const questionSchema = new mongoose.Schema({
    author: {
      type: String,
    },
    author_id:{
      type:String,

    },
    views:[{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    }],
    viewsCount:{
      type:Number,
      default:0
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },
    upVotes: [{
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }}

  ],
  upVoteCount : {type:Number,
  default:0
  },

  });
  questionSchema.pre('save', function (next) {
    this.upVoteCount = this.upVotes.length
    this.viewsCount=this.views.length
    next();
  });
const Questions = mongoose.model('Questions', questionSchema)
module.exports = Questions