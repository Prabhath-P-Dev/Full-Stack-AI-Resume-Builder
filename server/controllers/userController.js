import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";
import crypto from "crypto";
import resend from "../configs/resend.js"

const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'})
    return token;
}
//controller for user registration
//post:/api/users/register

export const registerUser = async (req, res) =>{
    try{
      const {name, email, password} = req.body;
      
      //check if required fields are present
      if(!name || !email || !password){
        return res.status(400).json({message:"Missing required fields"})
      }
      
      const user = await User.findOne({email})
      if(user){
        return res.status(400).json({message:"User already exist"})
      }

      //create new user
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name, email, password:hashedPassword
      })
      //return success message
      const token =  generateToken(newUser._id)
      newUser.password = undefined;

      return res.status(201).json({message:"User created successfully", token, user:newUser})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

//controller for user login
//POST:/api/users/login
export const loginUser = async (req, res) =>{
    try{
      const {email, password} = req.body;
      
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"Invalid email or password"})
      }
      //check if password is correct
      if(!user.comparePassword(password)){
        return res.status(400).json({message:"Invalid email or password"})
      }

      //return success message
      const token =  generateToken(user._id)
      user.password = undefined;

      return res.status(200).json({message:"Login succesfull", token, user})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}


//controller for forgot password
//POST: /api/users/forgot-password

export const forgotPassword = async (req, res) => {
  try{
     const {email} = req.body;
     const user = await User.findOne({email});
     
     if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
     }
     const resetToken = crypto.randomBytes(32).toString("hex")
     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
     user.resetPasswordToken = hashedToken;
     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
     await user.save();

     const resetUrl = `https://resumeforge-ai-resume-builder-six.vercel.app/reset-password/${resetToken}`;

     await resend.emails.send({
      from:"onboarding@resend.dev",
      to:user.email,
      subject:"Reset your password",
      html:`
        <h2> Password reset Request</h2>
        
        <p>Hello ${user.name},</p>
        <p>we received a request to reset your password</p>
        <p>
          <a href="${resetUrl}>">
          Click here to reset your password
          </a>
        </p>
        <p>This link will expires in 15 minutes</p>
        <p>If you didn't request this you can safely ignore this email</p>`
     })
     
     return res.status(200).json({
      success:true,
      message:"Password reset link sent successfully"
     })

}catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
  

}

//controller for reset password
//POST : /api/users/reset-password/:token

export const resetPassword = async (req, res) => {
  try{
     const {token} = req.params;
     const {password} = req.body;

     const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
     console.log("hashed token:", hashedToken)
     const user = await User.findOne({
     resetPasswordToken:hashedToken,
     resetPasswordExpires:{ $gt:Date.now()}
   });
     
   if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid or expired reset token"
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    });
  
  }catch(error){
    console.error(error);
    console.error(error.message);
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

//controller for getting user by id
//GET:/api/users/data

export const getUserById = async (req,res)=>{
    try{
    const userId = req.userId;

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    //return user
    user.password = undefined;
    return res.status(200).json({user})

}catch(error){
  res.status(400).json({message:error.message})
}
}

//controller for getting user resumes
//GET: /api/users/resume

export const getUserResumes = async (req, res) => {
  try{
    const userId = req.userId
    //return user resumes
    const resume = await Resume.find({userId})
    return res.status(200).json({resume})
  }catch(error){
    res.status(400).json({message:error.message})
  }
}