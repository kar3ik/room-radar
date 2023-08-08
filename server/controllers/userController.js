const User = require('../models/user')


// UPDATE
const updateUser = async(req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)

    }
}


// DELETE
const deleteUser = async(req,res,next)=>{
    try{
        await User.findById(req.params.id)
        res.status(200).json("user has been deleted")
    }catch(err){
        next(err)
    }
}


// GET
const getUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}


// GETALL
const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)

    }catch(err){
        next(err)
    }
}



module.exports = { updateUser, deleteUser, getUser , getAllUsers}