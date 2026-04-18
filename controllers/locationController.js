const Bus = require("../models/Bus");

// 🔥 distance function
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (x) => x * Math.PI / 180;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// ✅ update location with speed + driver info
const updateLocation = async (req, res) => {
  try {
    const { busId, lat, lng, driverName, phoneNumber } = req.body;

    console.log("📥 Incoming:", req.body);

    // ✅ validation
    if (!busId || lat == null || lng == null) {
      return res.status(400).json({
        success: false,
        message: "Missing data"
      });
    }

    const oldBus = await Bus.findOne({ busId });

    let speed = 0;

    if (
      oldBus &&
      oldBus.latitude != null &&
      oldBus.longitude != null &&
      oldBus.updatedAt
    ) {
      const distance = getDistance(
        oldBus.latitude,
        oldBus.longitude,
        lat,
        lng
      );

      const timeDiff = (new Date() - oldBus.updatedAt) / 1000;

      // 🔥 ignore too fast updates (noise filter)
      if (timeDiff > 2) {
        speed = (distance / timeDiff) * 3.6;
      }

      // 🔥 filters
      if (speed < 1) speed = 0;
      if (speed > 120) speed = 0;
    }

    const currentTime = new Date();

    const bus = await Bus.findOneAndUpdate(
      { busId },
      {
        latitude: lat,
        longitude: lng,
        speed,
        driverName: driverName || oldBus?.driverName || "",   // ✅ add
        phoneNumber: phoneNumber || oldBus?.phoneNumber || "", // ✅ add
        updatedAt: currentTime
      },
      {
        returnDocument: "after",
        upsert: true
      }
    );

    res.json({
      success: true,
      message: "Location updated",
      data: bus
    });

  } catch (err) {
    console.error("❌ Server Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  updateLocation
};