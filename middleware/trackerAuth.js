module.exports = function (req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];

    // ❌ اگر key نہ ہو
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key missing"
      });
    }

    // ❌ اگر key غلط ہو
    if (apiKey !== process.env.TRACKER_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid API key"
      });
    }

    // ✅ optional: device tracking info attach کرو
    req.tracker = {
      authorized: true
    };

    next();

  } catch (err) {
    console.error("Tracker Auth Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error in tracker auth"
    });
  }
};