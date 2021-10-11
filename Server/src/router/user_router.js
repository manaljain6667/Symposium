const User = require('../models/user')
const express = require('express')
const jwt=require("jsonwebtoken")
// const bcrpyt = require("bcryptjs")
const router = new express.Router()
router.get('/',async(req,res)=>{
    try{
        const user=await User.find()
        res.json(user)
    }
    catch(e){
        res.send(e)
    }
})

router.post("/",async (req,res)=>{
    console.log(req.body)
    const {name,email,password}=req.body
    try{
        const existing_user= await User.findOne({email})
        if(existing_user){
            return res.status(400).json({
                errorMessage: "An account with this email already exists.",
              });
            }
        else{
        const new_user= new User({name,email,password})
        const saved_user=await new_user.save()
            //   res.send(new_user)
        // const token=await jwt.sign({user:saved_user._id},"secret_key")
        // console.log(token)
              //send the cookie in http_cookie only
        res.status(201).send();
          }


}
catch(e){
    res.send(e)
}
})
//login


// router.post('/login',async(req,res)=>{
//     const {email,password}=req.body
//     try{
//         const existing_user= await User.findOne({email})
//         if(!existing_user){
//             res.status(400).json({
//                 errorMessage: "Wrong password or email.",
//               });

//         }
//         const token = await jwt.sign(
//             {
//               user: existing_user._id,
//             },
//             "secret_key"
//           );
//          // console.log(token)

//           res.cookie("token", token, {
//               httpOnly: true,
//               secure: true,
//               sameSite: "none",
//             }).send();
//     }
//     catch(e){
//         res.status(404).send(e)
//     }
// })
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  

  
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        
        return res.status(401).json({ errorMessage: "EMAIL NOT FOUND" });
      console.log(password,existingUser.password)
      if(password!=existingUser.password){
        return res.status(401).json({ errorMessage: "Wrong email or password." });
      }
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        "secret_key"
      );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
//logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      }).send()
    })
  
router.get('/author',async (req,res)=>{
        const token =req.cookies.token
        const verified = await jwt.verify(token, "secret_key");
        const user= await User.findById(verified.user)
        console.log(user)
        res.send(user.name)
      })
router.get("/loggedIn", async(req, res) => {
        try {
          const token = req.cookies.token;
          if (!token) return res.json(false);
      
          await jwt.verify(token, "secret_key");
          const user=await User.findByToken(token)
          const id=user._id
          res.json({loggedIn:true,id:id});
        } catch (err) {
          res.json(false);
        } 
      });
module.exports=router