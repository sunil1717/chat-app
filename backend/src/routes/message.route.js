import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import {getUserForSidebar,getMessage,sendMessage} from "../controllers/message.controller.js"





const messageRoutes = express.Router()

messageRoutes.get("/users",protectRoute,getUserForSidebar)
messageRoutes.get("/:id",protectRoute,getMessage)
messageRoutes.post("/send/:id",protectRoute,sendMessage)



export default messageRoutes 