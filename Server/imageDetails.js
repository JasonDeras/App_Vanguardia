const mongoose = require("mongoose")
const imagedetailsSchema= new mongoose.Schema(
    {
        image:String
    },
    {
        collection:"ImageDetails",
    }
);

mongoose.model("ImageDetails",imagedetailsSchema)