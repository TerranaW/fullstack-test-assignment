const express = require("express");
const { getTrips } = require("./controller/trip");

const router = express.Router();

router.get("/trips", getTrips);
// lanjutkan untuk detail, add, dan delete

module.exports = router;
