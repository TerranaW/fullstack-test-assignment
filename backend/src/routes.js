const express = require("express");
const { getAllTrips, getTripById, addTrips, editTripById, deleteTripById } = require("./controller/trip");

const router = express.Router();

router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.post("/", addTrips);
router.put("/:id", editTripById);
router.delete("/:id", deleteTripById)

// lanjutkan untuk detail, add, dan delete

module.exports = router;
