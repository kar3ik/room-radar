const User = require('../models/user')
const bcrypt = require('bcryptjs')
const createError  = require('../utils/error')
const jwt = require('jsonwebtoken')

const register = async(req,res,next)=>{
    try{

        const salt = bcrypt.genSalt(10)
        const hashpass = bcrypt.hashSync(req.body.password,salt) 

        const newUser = new User({...req.body,
        password:hashpass
    })

    await newUser.save()
    res.status(200).send("user created")

    }catch(err){
        next(err)
    }

}


const logIn = async(req,res,next)=>{
    try{
        const user =await User.findOne({username:req.body.username})

        if(!user){
            return next(createError(404,"user not found"))
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordCorrect) return next(createError(400,"wrong password or username"))

        const token = jwt.sign({id:user._id , isAdmin: user.isAdmin}, process.env.JWT_KEY)

        const {password,iAdmin, ...otherDetails} = user._doc

        res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin})

    }catch(err){
        next(err)
    }

}

module.exports =  { register, logIn }