const UserModel = require("../models/userModel")

async function getAllUsers (req, res) {
    try {
        const targetUsers = await UserModel.find();
        res.status(200).json(targetUsers);
    } catch (error) {
        res.status(500).json({"errorMsg":"Error getting all users"});
    }
}
    

async function getUser(req,res){
    try {
        const wantedUser = await UserModel.findOne({email:req.params.email});
        if(wantedUser){
            res.status(200).json(wantedUser);
        }else{
            res.status(400).json({"errorMsg":"User not existing"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Error find your User"})
    }
}

async function addUser (req, res) {
    // express-validator
    try {
        const targetUser = await UserModel.findOne({email:req.body.email})
        if(!targetUser) {
          const newUser = await UserModel.create(req.body);
            res.status(201).json(newUser)
        } else {
            res.status(400).json({"errorMsg":"User Already exists"});
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Unexpected error"})
        console.log(error);
    }
    // to save this object in data base we must SAVE ..
    // User.save((err, User) => {
    //     if(!err) return res.status(200).json(User)
    //     res.status(400).json({"errorMsg":"Error adding new User"})
    // });
    // this method is no longer used for mongoose so let's try and error
}


async function editUser (req, res) {
    try {
        var ChoosenUser = await UserModel.findOneAndUpdate({email:req.params.email},
            {...req.body},
            {_id : id},
            {new : true});

        if(ChoosenUser){
            res.status(200).json(ChoosenUser);
        } else {
            res.status(400).json({"errorMsg":"Can't find the User"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Unexpected error"});
    }
}

async function deleteUser (req, res) {
    try {
        const DeletedUser = await UserModel.findOneAndDelete({email:req.params.email});
        if(DeletedUser){
            res.status(200).json(DeletedUser);
        }else{
            res.status(400).json({"errorMsg":"User not existing"})
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Error find your User"})
    }
}

module.exports = {getAllUsers , getUser , addUser , editUser , deleteUser} ;