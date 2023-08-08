const jwt = require('jsonwebtoken')
const createError = require('../utils/error')

const verifyTOken=(req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"u are not authenticated"))
    }
    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err){
            return next(createError(403,"token is not valid"))
        }
        req.user = user
        next()

    })
}


const verifyUser = (req,res,next)=>{
    verifyTOken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not authorized"))

        }
    })
}

const verifyAdmin = (req,res,next)=>{
    verifyTOken(req,res, next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not authorized"))

        }
    })
}

module.exports = {verifyTOken, verifyUser, verifyAdmin}