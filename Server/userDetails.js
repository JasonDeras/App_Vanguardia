const mongoose = require("mongoose")
const userdetailsSchema= new mongoose.Schema(
    {
        ID: {type:String, unique:true},
        name: {type: String, unique:true},
        username: {type: String, unique:true},
        password: String,
    },
    {
        collection:"UserInfo",
    }
);

mongoose.model("UserInfo",userdetailsSchema)