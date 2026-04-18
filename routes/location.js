const express = require("express");
const router = express.Router();

const trackerAuth = require("../middleware/trackerAuth");
const { updateLocation } = require("../controllers/locationController");

router.post("/update", trackerAuth, updateLocation);

module.exports = router;