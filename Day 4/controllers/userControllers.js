const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
    
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
            const token = jwt.sign({ email:wantedUser.email}, process.env.JWT_SECRET,{
                expiresIn: 86400 // expires in 24 hours
              })
            
            res.status(200).json({user : wantedUser , token});
            
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
        console.log(targetUser);
        if(!targetUser) {
            const saltRounds = 10; // You can adjust the salt rounds as needed
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = await UserModel.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hashedPassword,
            });
            
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
              });

            res.status(201).json({newUser , token});
        } else {
            res.status(400).json({"errorMsg":"User Already exists"});
        }
    } catch (error) {
        res.status(500).json({"errorMsg":"Unexpected error"})
        console.log(error);
    }
  }

async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials email' });
      }
  
      // Check password with hashed password

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
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

module.exports = {getAllUsers ,loginUser, getUser , addUser , editUser , deleteUser} ;