const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session')
const cookieParser = require("cookie-parser")
const cors = require("cors");
const User = require('./models/user')
const Ques = require('./models/questions')
const app = express()
const port = process.env.PORT || 9000

app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
      origin: [
        "http://localhost:3000"
      ],
      credentials: true,
    })
  );
app.use(express.urlencoded({extended:true}))
app.use("/auth", require("./router/user_router"));
app.use("/ques", require("./router/ques_router"));
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})