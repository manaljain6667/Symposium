const mongoose = require('mongoose')
const User = require('./user')
const answerSchema = require('./answers').schema;
const moment=require('moment')
//connect to cloud mongodb url
const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";


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
/**
 * Question schema, contains replies too
 * @constructor Question Schema
 */
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
  tags:[{
    type:String
  }],
  answers: [answerSchema],
  count_answers:{
    type: Number,
    default:0
  },
  created_at:{
    type:String,
    required: true,
    // default:moment().format('D MMM, YYYY h:mm:ss a')
  }
  });


  /**
 * Count the number of views,votes ,answers of a question before saving
 *
 * @function pre

 * @param {Callback} - Callback argument to the middleware function, called "next" by convention.
 */
  questionSchema.pre('save', function (next) {

    this.upVoteCount = this.upVotes.length

    this.viewsCount=this.views.length

    this.count_answers=this.answers.length

    this.answers.forEach(function (ans) {

      ans["upVoteCount"] = ans.upVotes.length;

  });

    next();

  });
const Questions = mongoose.model('Questions', questionSchema)
module.exports = Questions