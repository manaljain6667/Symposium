const Ques = require('../models/questions')
const User=require('../models/user')
const express= require('express')
const router = new express.Router()
const auth=require("../middleware/auth")
const jwt=require("jsonwebtoken")

router.post("/postQues",async(req,res)=>{
    const {body}=req.body
    console.log("req",req.cookies.token)
    try{
        const user= await User.findByToken(req.cookies.token)
        console.log("2")
        const author=user.name
        const author_id=user._id
        console.log(author,author_id)
        // res.send(user.name)
        const ques= new Ques({author,author_id,body})
        const newQues=await ques.save()
        res.json(newQues)
        // console.log(newQues)


    }
catch(e){
    res.status(404).send("Something went wrong")
}
})

//send all the question
router.get('/',async(req,res)=>{
    console.log(req.cookies.token)
try
{
const user=await Ques.find()
res.json(user)

}
catch(e){
    res.status(404).send(e)
}

})
router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    // const tagArray = [];
    // var tagArrayName = [];
  

    try {
        
        const ques = await Ques.findById(_id)
        const user=await User.findByToken(req.cookies.token)
        if(user._id!=ques.author_id){
           await Ques.findOneAndUpdate({_id}, {$inc : {'views' : 1}})
        }
        if (!ques) {
            return res.send("No user found")
        }
        
        res.status(201).send(ques)
         console.log(ques)
    } catch (e) {
        res.send("No user found")
    }
})

module.exports=router