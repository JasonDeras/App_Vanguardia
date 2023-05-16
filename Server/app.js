const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const mongooseURL="mongodb+srv://travel_adviser:yZ3iXNCqxUeRLV6w@cluster0.jj2s29p.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongooseURL,{
    useNewUrlParser:true
}).then(()=>{console.log("connectado");}).catch(e=>console.log(e))





app.listen(5000,()=>{
    console.log("Server started")
})

app.post("/post",async (req,res)=>{
    console.log(req.body)
    try {
        if (false) {
            
        } else {
            res.send({status:"Eror al momento de hacer login verifique sus credenciales"})
        }
    } catch (error) {
        res.send({status:"error"})
    }
})