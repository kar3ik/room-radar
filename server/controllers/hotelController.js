const Hotel = require('../models/hotel')
const Room = require('../models/room')

// CREATE
const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
        const saveddHotel = await newHotel.save()
        res.status(200).json(saveddHotel)
    }catch(err){
        next(err)
    }
}

// UPDATE
const updateHotel = async(req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set : req.body },{new:true})
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)

    }
}


// DELETE
const deleteHotel = async(req,res,next)=>{
    try{
        await Hotel.findById(req.params.id)
        res.status(200).json("hotel has been deleted")
    }catch(err){
        next(err)
    }
}


// GET
const getHotel = async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}


// GETALL
const getAllHotels = async(req,res,next)=>{
    const {min,max,...others} = req.query
    try{
        const hotels = await Hotel.find({...others,cheapestPrice : {$gt:min || 1, $lt:max || 9999} }).limit(req.query.limit)
        res.status(200).json(hotels)

    }catch(err){
        next(err)
    }
}

const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)

    }catch(err){
        next(err)
    }
}


const countByType = async(req,res,next)=>{
    try{
        const hotelCount =await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel" ,count:hotelCount},
            {type:"apartments" ,count:apartmentCount},
            {type:"resorts" ,count:resortCount},
            {type:"villas" ,count:villaCount},
            {type:"cabins" ,count:cabinCount},
        ])

    }catch(err){
        next(err)
    }
}


const getHotelRooms = async(req,res,next)=>{
    try{
        const hotel =await Hotel.findById(req.params.id)
        const list =await Promise.all(hotel.rooms.map(room =>{
            return Room.findById(room)
        })) 

        res.status(200).json(list)

    }catch(err){
        next(err)
    }
}
module.exports = {createHotel, updateHotel, deleteHotel, getHotel , getAllHotels, countByCity, countByType, getHotelRooms}