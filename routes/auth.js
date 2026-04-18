const express = require("express");
const router = express.Router();

const {
  register,
  login,
  checkAccess
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/check-access", checkAccess);

module.exports = router;