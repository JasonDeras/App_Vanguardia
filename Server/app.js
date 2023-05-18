const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors =require("cors")
app.use(cors())
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongooseURL="mongodb+srv://travel_adviser:yZ3iXNCqxUeRLV6w@cluster0.jj2s29p.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongooseURL,{
    useNewUrlParser:true
}).then(()=>{console.log("connectado");}).catch(e=>console.log(e))

app.listen(5000,()=>{
    console.log("Server started")
})

require("./userDetails")
const User = mongoose.model("UserInfo")

//USer Registration 
app.post("/register",async(req,res)=>{
    const {ID,name,username,password}=req.body
    const incryptedPassword=await bcrypt.hash(password,10)

    try {
        const oldUserID= await User.findOne({ID})
        const oldUserUsername=await User.findOne({username})
        const oldUserName=await User.findOne({name})
        if(oldUserID){
            res.json({error:"ID already exists"})
        }else if(oldUserUsername){
            res.json({error:"Username already exists"})
        }else if(oldUserName){
            res.json({error:"A user with that name already exists"})
        }else{ 
            await User.create({
                ID,
                name,
                username,
                password:incryptedPassword,
            });
            res.send({status:"Succesful registration"})
        }
        
    } catch (error) {
        res.send({status:"error while signing up"})
    }
})

//User login
app.post("/login-user", async(req,res)=>{
    const{username,password}=req.body
    const user=await User.findOne({username})
    if (!user) {
        return res.json({error:"Fill in the info"})
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({username:user.username},JWT_SECRET)
        if (res.status(201)) {
            return res.json({status: "ok", data:token})
        }else {
            return res.json({error:"error"})
        }
    }
    res.json({status:"error",error:"Invalid Password"})
})

//User Profile
app.post("/user-data", async(req,res)=>{
    const{token}=req.body
    try {
        const user =jwt.verify(token,JWT_SECRET)
        const username=user.username
        User.findOne({username:username})
        .then((data)=>{
            res.send({status:"Logged in", data:data})
        }).catch((error)=>{
            res.send({status:"Logged in error",data:data})
        })
    } catch (error) {
        
    }
})