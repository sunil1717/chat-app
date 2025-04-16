import User from "../models/usermodel.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserid = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserid } }).select("-password")
        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("error in getusersidebarcontroller", error.message);
        res.status(500).json({ message: "internal server error" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatid } = req.params
        const myId=req.user._id;

        const messages =await Message.find({
            $or:[
                {senderId:myId ,receiverId:userToChatid},
                {senderId:userToChatid,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getmessagecontroller", error.message);
        res.status(500).json({ message: "internal server error" })
    }
}


export const sendMessage=async(req,res)=>{
    try {
        const {text ,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=(await cloudinary.uploader.upload(image));
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        //real time functionality by socket.io
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
           
            io.to(receiverSocketId).emit("receiveMessage",newMessage)
        }



        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendmessagecontroller", error.message);
        res.status(500).json({ message: "internal server error" })
    }
}