import User from "../Models/User.Model.js";
import jwt from "jsonwebtoken"

// Helper: Generate jwt
const generateToken = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register new user
// @route POST /api/auth/register
// @access Public
const registerUser=async (req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body);
    try{
        if(!name||!email||!password){
            return res.status(400).json({message:"Plaese enter all the fields"});
        }
        const userExist=await  User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }

        const user=await User.create({name,email,password});
        if(user){
            return res.status(201).json({
                token:generateToken({id:user._id}),
                email:user.email,
                name:user.name,
            });
        }
        else{
            return res.status(400).json({message:"Invlaid user data"});

        }
    }
    catch(error){
        console.log(error)
         res.status(500).json({ message: "Server error" });
  }
}

// @desc Login existing user
// @route POST /api/auth/login
// @access Public


const loginUser= async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email}).select("+password");
        if(user&&(await user.matchPassword(password))){
            res.json({
              token:generateToken({id:user._id}),
              email:user.email,
              name:user.name,
            });
        }
        else{
            res.status(401).json({message:"server error"});
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error" });

    }
}


const getUserProfile=async(req,res)=>{
    try{
        const {email}=req.query;
        console.log(email);
        const user =await User.findOne({email});
        if(user){
          return   res.status(200).json({
                name:user.name,
                email:user.email,
            });
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

const updateUserProfile=async(req,res)=>{
    const{email,newName,newEmail}=req.body;
    try{

        const user=await User.findOneAndUpdate({email},{$set:{name:newName,email:newEmail}},{new:true});
        if(user){
            return res.status(200).json({
                message:"user sucessfully updated",
            })
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
        
    }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
}

export {registerUser,loginUser,getUserProfile,updateUserProfile}