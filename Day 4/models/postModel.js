const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {type:String , requried :true},
    body: {type:String , requried :true},
    author: {type:mongoose.Schema.Types.ObjectId , ref:"User" ,requried:true}
})

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel ;