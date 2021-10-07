const jwt = require("jsonwebtoken");

const User = require('../models/user')
async function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized user" });

    const verified = await jwt.verify(token, "secret_key");
    // const userId=(verified.user)
    // User.findById(userId,(err, docs)=> {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Result : ", docs.name);
    //     }
    // });

    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;