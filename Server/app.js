const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors =require("cors")
app.use(cors())
const bcrypt=require("bcryptjs")

const mongooseURL="mongodb+srv://travel_adviser:yZ3iXNCqxUeRLV6w@cluster0.jj2s29p.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongooseURL,{
    useNewUrlParser:true
}).then(()=>{console.log("connectado");}).catch(e=>console.log(e))

app.listen(5000,()=>{
    console.log("Server started")
})

require("./userDetails")
const User = mongoose.model("UserInfo")

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