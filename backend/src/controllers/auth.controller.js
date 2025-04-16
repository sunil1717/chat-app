import { generatetoken } from "../lib/utills.js"
import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"



export const signup = async (req, res) => {
   const { fullname, email, password } = req.body
   try {
      if (!fullname || !email || !password) {
         return res.status(400).json({ message: "All the fields are required" })
      }
      if (password.length < 6) {
         return res.status(400).json({ message: "password must be at least 6 character" })
      }
      const user = await User.findOne({ email })
      if (user) {
         return res.status(400).json({ message: "Email alredy exists" })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newuser = new User({
         fullname,
         email,
         password: hashedPassword
      })
      if (newuser) {
         generatetoken(newuser._id, res)
         await newuser.save()
         res.status(201).json({
            _id: newuser._id,
            fullname: newuser.fullname,
            email: newuser.email,
            profilepic: newuser.profilepic
         })
      } else {
         res.status(400).json({ message: "Invalid user data" })
      }


   } catch (error) {
      console.log("error in signupcontroller", error.message);
      res.status(500).json({ message: "internal server error" })
   }
}


export const login = async (req, res) => {
   const { email, password } = req.body

   try {
      const user = await User.findOne({ email })

      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" })
      }
      const ispasscorrect = await bcrypt.compare(password, user.password)
      if (!ispasscorrect) {
         return res.status(400).json({ message: "Invalid credentials" })

      }
      generatetoken(user._id, res)
      res.status(200).json({
         _id: user._id,
         fullname: user.fullname,
         email: user.email,
         profilepic: user.profilepic
      })

   } catch (error) {
      console.log("error in logincontroller", error.message);
      res.status(500).json({ message: "internal server error" })
   }
}

export const logout = async (req, res) => {
    try {
      res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: "Logout successfully" })
    } catch (error) {
      console.log("error in logoutcontroller", error.message);
      res.status(500).json({ message: "internal server error" })
    }

}

export const updateProfile=async(req,res)=>{
       
   try {
      const {profilepic}=req.body;
     const userId= req.user._id
     if(!profilepic){
    return res.status(400).json({ message: "Profile pic is required" })
    
     }
     const uploadres=await cloudinary.uploader.upload(profilepic);
     const updateUser=await User.findByIdAndUpdate(userId,{profilepic:uploadres.secure_url},{new:true})
     res.status(200).json(updateUser)
     

   } catch (error) {
      console.log("error in updatecontroller", error.message);
      res.status(500).json({ message: "internal server error" })
   }
}

export const checkAuth=(req,res)=>{
    try {
       res.status(200).json(req.user);

    } catch (error) {
      console.log("error in checkAuth controller", error.message);
      res.status(500).json({ message: "internal server error" })
    }
   
}