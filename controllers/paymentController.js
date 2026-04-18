const Tesseract = require("tesseract.js");
const Payment = require("../models/Payment");
const User = require("../models/User");

// ================= UPLOAD + OCR =================
const uploadPayment = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const token = req.headers.authorization;
    const user = await User.findById(token);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // 🔥 OCR
    const result = await Tesseract.recognize(imagePath, "eng");
    const text = result.data.text;

    console.log("OCR TEXT:", text);

    // ✅ amount extract
    let amount = "0";
    const amountMatch = text.match(/Rs\.?\s?(\d+)/i);
    if (amountMatch) {
      amount = amountMatch[1];
    }

    // ✅ transaction id extract
    let transactionId = "UNKNOWN";
    const tidMatch = text.match(/TID[:\s]*([0-9]+)/i);
    if (tidMatch) {
      transactionId = tidMatch[1];
    }

    // 💾 save
    const payment = await Payment.create({
      userId: user._id,
      amount,
      txnId: transactionId,
      image: imagePath,
      rawText: text,
    });

    console.log("✅ PAYMENT SAVED:", payment);

    res.json({
      success: true,
      amount,
      transactionId,
    });

  } catch (err) {
    console.log("❌ OCR ERROR:", err);
    res.status(500).json({ msg: "OCR failed" });
  }
};

module.exports = {
  uploadPayment,
};