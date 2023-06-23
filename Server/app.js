const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors =require("cors")
app.use(cors())
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
var nodemailer = require('nodemailer');
//Data base URL connection
const mongooseURL="mongodb+srv://travel_adviser:yZ3iXNCqxUeRLV6w@cluster0.jj2s29p.mongodb.net/?retryWrites=true&w=majority"
app.set("view engine","ejs")
app.use(express.urlencoded({extended: false}))

//Verified that is connected to th databases
mongoose.connect(mongooseURL,{
    useNewUrlParser:true
}).then(()=>{console.log("connectado");}).catch(e=>console.log(e))

app.listen(5000,()=>{
    console.log("Server started")
})

//Bring the schema of the database
require("./userDetails")
const User = mongoose.model("UserInfo")

//Bring image schema form the database
require("./imageDetails")
const Images=mongoose.model("ImageDetails")
//User Registration 
app.post("/register",async(req,res)=>{
    const {ID,name,username,password}=req.body
    const incryptedPassword=await bcrypt.hash(password,10)

    try {
        const oldUserID= await User.findOne({ID})
        const oldUserUsername=await User.findOne({username})
        const oldUserName=await User.findOne({name})
        if(oldUserID){
            res.send({status:"ID already exists"})
        }else if(oldUserUsername){
            res.send({status:"Username already exists"})
        }else if(oldUserName){
            res.send({status:"A user with that name already exists"})
        }else{ 
            await User.create({
                ID,
                name,
                username,
                password:incryptedPassword,
            });
            res.send({status:"Sucess"})
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
        return res.json({status:"User does not exists"})
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({username:user.username},JWT_SECRET)
        if (res.status(201)) {
            return res.json({status: "ok", data:token})
        }else {
            return res.json({status:"error"})
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

//User forget password
app.post("/forgot", async(req,res)=>{
    const{username}=req.body
    try {
        const oldUser= await User.findOne({username})
        if (!oldUser) {
            return res.json({status: "That username does not exist"})
        }
        const secret=JWT_SECRET+oldUser.password
        const token =jwt.sign({username:oldUser.username, id:oldUser._id},secret, {expiresIn: "5m",})
        const link=`http://localhost:5000/reset/${oldUser._id}/${token}`
        console.log(link)
    } catch (error) {
        
    }
})

//User Reset password
app.get("/reset/:id/:token", async(req,res)=>{
    const{id,token}=req.params
    console.log(req.params)
    const oldUser=await User.findOne({_id:id})
    if (!oldUser) {
        return res.json({status: "That username does not exist"})
    }
    const secret=JWT_SECRET+oldUser.password
    try {
        const verify=jwt.verify(token,secret)
        res.render("index", {username:verify.username, status: "Univerified"})
    } catch (error) {
        res.send("Univerified")
    }
})

//User Reset password confirm
app.post("/reset/:id/:token", async(req,res)=>{
    const {id,token}=req.params
    const {password}=req.body

    const oldUser=await User.findOne({_id:id})
    if (!oldUser) {
        return res.json({status: "That username does not exist"})
    }
    const secret=JWT_SECRET+oldUser.password
    try {
        const verify=jwt.verify(token,secret)
        const incryptedPassword=await bcrypt.hash(password,10)
        await User.updateOne(
            {
                _id:id
            }, 
            {
                $set:{password:incryptedPassword
                },
            }
        )
        res.render("index", {username:verify.username, status:"Verified"})
    } catch (error) {
        res.send("Something went wrong")
    }
})

//Delete User 
app.post("/delete-user", async(req,res)=>{
    const {userID}=req.body
    try {
        await User.findByIdAndDelete(userID)
        res.send({status:"User deleted", data: "Deleted"})
    } catch (error) {
        console.log(error)
    }
})

//Verified user valid info
app.post("/user-verified", async(req,res)=>{
    const {_id,ID,name,username}=req.body

    try {
        
        const oldUserID= await User.findOne({ID})
        const oldUserUsername=await User.findOne({username})
        const oldUserName=await User.findOne({name})
        if(oldUserID){
            res.send({status:"ID already exists"})
        }else if(oldUserUsername){
            res.send({status:"Username already exists"})
        }else if(oldUserName){
            res.send({status:"A user with that name already exists"})
        }else{
            await User.updateOne(
                {
                    _id:_id
                }, 
                {
                    $set:{
                        ID:ID,
                        name:name,
                        username:username,
                    },
                }
            )
            res.send({status:"Sucess"})
        }
       
    } catch (error) {
        console.log(error)
    }
})

//Image post to database
app.post("/upload-image", async(req,res)=>{
    const {base64}=req.body
    try {
        await Images.create({image:base64})
        res.send({Status:"Image uploaded"})
    } catch (error) {
        res.send({Status:"Error",data:error})
    }
})

//Image get from database
app.get("/get-image", async(req,res)=>{
    try {
        await Images.find({}).then(data=>{res.send({status:"ok",data:data})})
    } catch (error) {
        
    }
})


