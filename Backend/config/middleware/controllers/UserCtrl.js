const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register callback
const registerController = async(req,res,next) => {
    try{
        //check if the email exists(user is existing or not)
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({success:false, message:'User already exist'})
        }
        const password = req.body.password
        //hash the password
        const salt = await bcrypt.genSalt(10)//generate a salt
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({success:true, message:'User created successfully'})
    }catch(error){
        console.log(error)
        res.status(500).send({success:false, message: `Register Controller ${error.message}`})
    }
    next();
}
//login callback
const loginController = async (req, res, next) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({success:false, message:'User not found'})
        }
        //bcrypt and compare the password
        const isMatch = bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({success:false, message:'Invalid credentials'})
        }
        //create and assign a token to the user for the session
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).send({success:true, message:'Logged in successfully', token:token})

    }catch(error){
        console.log(error)
        res.status(500).send({success:false, message: `Login Controller ${error.message}`})
}
};

const authController = async(req, res, next) => {
    try{
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({success:false, message:'User not found'})
        }else{
            res.status(200).send({success:true, user:user})
        
        }
    }catch(error){
        console.log(error)
        res.status(500).send({success:false, message: `Auth Controller ${error.message}`})
    }
}
module.exports = { loginController, registerController, authController };
