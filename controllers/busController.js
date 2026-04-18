const Bus = require("../models/Bus");

// ✅ update location
const updateLocation = async (req, res) => {
  try {
    const { busId, lat, lng } = req.body;

    await Bus.updateOne(
      { busId },
      {
        latitude: lat,
        longitude: lng,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    res.json({ success: true });

  } catch (error) {
    console.log("UPDATE LOCATION ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ get all buses
const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);

  } catch (error) {
    console.log("GET BUSES ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  updateLocation,
  getBuses,
};