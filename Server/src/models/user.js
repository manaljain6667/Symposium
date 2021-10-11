const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Hrishi:qwerty1234@symposium.caypb.mongodb.net/symposium?retryWrites=true&w=majority";

const jwt=require("jsonwebtoken")
// mongoose.connect('mongodb://127.0.0.1:27017/log-in-signup-api', {
//         useNewUrlParser: true
//     })
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
    // try {
    //     mongoose.connect('mongodb://localhost:27017/log-in-signup-api');
    // } catch (error) {
    //     handleError(error);
    // }
    // mongoose.connection.on('error', err => {
    //     logError(err);
    // });
    // const MyModel = mongoose.model('log-in-signup-api')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
            // validate(value) {
            //     if (!validator.isEmail(value)) {
            //         throw new Error("EMail is invalid")
            //     }
    },

    password: {
        // required: true,
        type: String,
        trim: true,
        minlength: 5,
        lowercase: true,

        // validator(value) {
        //     if (value === ('password')) {
        //         throw new Error(" cannot contain password")
        //     }
        // }

    },
})
userSchema.statics.findByToken = async(token) => {
    const verified = await jwt.verify(token, "secret_key");
    const user= await User.findById(verified.user)
    console.log(user)
    return user
}
const User = mongoose.model('User', userSchema)

// const me = User({
//     name: "hrshi",
//     age: "34",
//     email: "ejrohe@cea.io"
// })
// me.save()
module.exports = User