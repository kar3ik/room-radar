const express = require('express')
const router = express.Router()

const {verifyTOken, verifyUser, verifyAdmin } = require('../utils/verifyToken')
const {createHotel, updateHotel, deleteHotel, getHotel , getAllHotels,
     countByCity, countByType, getHotelRooms} = require('../controllers/hotelController')



// CREATE
router.post("/",verifyAdmin, createHotel )

// UPDATE
router.put("/:id",verifyAdmin, updateHotel )

// DELETE
router.delete("/find/:id",verifyAdmin,deleteHotel )

// GET
router.get("/:id",getHotel )

// GET ALL
router.get("/", getAllHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

router.get("/room/:id", getHotelRooms )




module.exports = router