const express = require('express')
const dotenv = require('dotenv')
const mongoose= require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const auth = require('./routes/auth')
const hotels = require('./routes/hotelsRoute')
const users = require('./routes/usersRoute')
const rooms = require('./routes/roomsRoute')

const app = express()
dotenv.config()


const connectBD = async()=>{

    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to DB")
    }catch(error){
        throw error
    }

}

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})


// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.use("/api/auth", auth)
app.use("/api/hotels", hotels)
app.use("/api/rooms", rooms)
app.use("/api/users", users)



app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })


})


app.listen(8800,()=>{
    connectBD()
    console.log("server started")
})