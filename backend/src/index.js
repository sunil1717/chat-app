
import express from "express"
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieparser from "cookie-parser"
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import { app,server} from "./lib/socket.js";




dotenv.config()


const port =process.env.PORT
app.use(cors({
    
    origin:["https://chat-app-f-three.vercel.app"],
    credentials: true,
}))


app.use(express.json({
    limit: "20mb",
}))
app.use(express.urlencoded({ 
    limit: "20mb",
    extended: true,
}))
app.use(cookieparser())



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.get("/",(req,res)=>{
    res.send("API is running")
})



server.listen(port, () => {
    console.log("server is running on port  "+port);
    connectDB()
})
