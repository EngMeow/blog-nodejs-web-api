const PostModel = require("../models/postModel")

async function getAllPosts (req, res) {
    try {
        const targetPosts = await PostModel.find().populate('author');
        res.status(200).json(targetPosts);
    } catch (error) {
        res.status(500).json({"errorMsg":"Error getting all Post"});
    }
}
    

async function getPost(req,res){
    try {
        const wantedPost = await PostModel.findOne({_id:req.params.id}).populate('author');
        if(wantedPost){
            res.status(200).json(wantedPost);
        }else{
            res.status(400).json({"errorMsg":"Post not existing"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Error find your Post"})
    }
}

async function addPost (req, res) {
    try {
        const newPost = await PostModel.create(req.body);
        
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({errorMsg:"Unexpected error", error})
        console.log(error);
    }
}


async function editPost (req, res) {
    try {
        var ChoosenPost = await PostModel.findOneAndUpdate({_id:req.params.id},
            {...req.body},
            {new : true}).populate('author');
        if(ChoosenPost){
            res.status(200).json(ChoosenPost);
        } else {
            res.status(400).json({"errorMsg":"Can't find the Post"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Unexpected error"});
    }
}

async function deletePost (req, res) {
    try {
        const DeletedPost = await PostModel.findOneAndDelete({_id:req.params.id});
        if(DeletedPost){
            res.status(200).json(DeletedPost);
        }else{
            res.status(400).json({"errorMsg":"Post not existing"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Error find your Post"})
    }
}

module.exports = {getAllPosts , getPost , addPost , editPost , deletePost} ;