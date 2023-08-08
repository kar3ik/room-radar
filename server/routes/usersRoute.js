const express = require('express')
const router = express.Router()

const { updateUser, deleteUser, getUser , getAllUsers} = require('../controllers/userController')
const {verifyTOken, verifyUser, verifyAdmin } = require('../utils/verifyToken')


// router.get("/checkauthenticated",verifyTOken, (req,res,next)=>{
//     res.send("logged in ")
// })
// router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
//     res.send("logged in delete your account")
// })
// router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
//     res.send("logged in and delete all accounts")
// })



router.put("/:id", verifyUser, updateUser )
router.delete("/:id",verifyUser ,deleteUser )
router.get("/:id",verifyUser ,getUser )
router.get("/", verifyAdmin, getAllUsers)



module.exports = router