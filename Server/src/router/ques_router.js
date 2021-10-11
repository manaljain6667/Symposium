const Ques = require('../models/questions')
const User=require('../models/user')
const express= require('express')
const router = new express.Router()
const auth=require("../middleware/auth")
const jwt=require("jsonwebtoken")

router.post("/postQues",async(req,res)=>{
    const {body}=req.body
    //console.log("req",req.cookies.token)
    try{
        const user= await User.findByToken(req.cookies.token)
        // console.log("2")
        const author=user.name
        const author_id=user._id
        // console.log(author,author_id)
        // res.send(user.name)
        const ques= new Ques({author:author,author_id:author_id,body:body})
        // .then((req,res)=>{
        //     console.log(res)
        // }).catch((e)=>{
        //     console.log(e)
        // })
        console.log("success1")
        const newQues= await ques.save()
        // .then((req,res)=>{
        //     console.log(res)
        // }).catch((err)=>{
        //     console.log(err)
        // })
        console.log("success2")
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
//update views
router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    // const tagArray = [];
    // var tagArrayName = [];
  

    try {
        
        const ques = await Ques.findById(_id)
        const user=await User.findByToken(req.cookies.token)
        // if(user._id!=ques.author_id){
        //    await Ques.findOneAndUpdate({_id}, {$inc : {'views' : 1}})
        // }
        if (!ques) {
            return res.send("No user found")
        }
        if (ques.views.filter(view => view.user._id.toString() ===
        user._id.toString()).length < 1) {
            ques.views.unshift({ user: user });
            await ques.save()
        }
        res.status(201).send(ques)
         console.log(ques)
    } catch (e) {
        res.send("No user found")
    }
})

//upvoting a ques
router.get("/upVote/:id", async (req, res) => {
    const _id = req.params.id;
    // console.log(_id)
    // const tagArray = [];
    // var tagArrayName = [];
  

    try {
        
        const ques = await Ques.findById(_id)
        // console.log("ques successfuly found")
        if(!ques){
            res.json("Question Not found!")
        }
        const user=await User.findByToken(req.cookies.token)
        // console.log(user._id.toString())
        // const arr=ques.upVotes.map(item=>item.user._id.toString())
        // .indexOf(user._id.toString())
        // console.log(arr)
        // console.log(upVote[0].user.toString(),user.toString())
        if (ques.upVotes.filter(upVote => upVote.user._id.toString() ===
        user._id.toString()).length > 0) {
        const removeThis = ques.upVotes
            .map(item => item.user._id.toString())
            .indexOf(user._id.toString());
            console.log(removeThis)
            await ques.upVotes.splice(removeThis, 1);
            // console.log(ques)
            await ques.save().then((req,res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            console.log(ques)
            return res.json(ques)

        }
        ques.upVotes.unshift({ user: user });
        await ques.save()
        res.status(201).send(ques)
    }
    catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})


module.exports=router