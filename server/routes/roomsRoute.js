const express = require('express')
const router = express.Router()
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms , updateRoomAvailability} = require('../controllers/roomController')
const { verifyAdmin } = require('../utils/verifyToken')


router.post("/:hotelid",verifyAdmin, createRoom )

// UPDATE
router.put("/:id",verifyAdmin, updateRoom )
router.put("/availability/:id", updateRoomAvailability )


// DELETE
router.delete("/:id",verifyAdmin,deleteRoom )

// GET
router.get("/:id",getRoom )

// GET ALL
router.get("/", getAllRooms)



module.exports = router