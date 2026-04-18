const express = require("express");
const router = express.Router();

const {
  updateLocation,
  getBuses,
} = require("../controllers/busController");

// update location
router.post("/update", updateLocation);

// get buses
router.get("/", getBuses);

module.exports = router;