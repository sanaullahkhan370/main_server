const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadPayment } = require("../controllers/paymentController");

// 📁 multer config (route میں ہی رکھ سکتے ہو)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".png");
  },
});

const upload = multer({ storage });

// route
router.post("/upload", upload.single("image"), uploadPayment);

module.exports = router;