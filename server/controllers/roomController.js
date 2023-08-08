const Room = require('../models/room')
const Hotel = require('../models/hotel')
const createError = require('../utils/error')


const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndDelete(hotelId, {$push : {rooms : savedRoom._id}})

        }catch(err){
            next(err)
        }

        res.status(200).json(savedRoom)

    }catch(err){
        next(err)
    }



}


// UPDATE
const updateRoom = async(req,res,next)=>{
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.params.id,{$set : req.body },{new:true})
        res.status(200).json(updateRoom)
    }catch(err){
        next(err)

    }
}


const updateRoomAvailability = async(req,res,next)=>{
    try{
        await Room.updateOne({"roolNumbers._id": req.params.id},{$push:{"roolNumbers.$.unavailableDates" : req.body.dates}})
        res.status(200).json(updateRoom)
    }catch(err){
        next(err)

    }
}

// DELETE
const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull: {rooms : req.params.id}
            })

        }catch(err){
        next(err)
        }
        res.status(200).json("room has been deleted")
    }catch(err){
        next(err)
    }
}


// GET
const getRoom = async(req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}


// GETALL
const getAllRooms = async(req,res,next)=>{
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)

    }catch(err){
        next(err)
    }
}


module.exports = {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability }