const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, phone, password, rollNo, email } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(now.getDate() + 7);

    const user = new User({
      name,
      phone,
      password: hashedPassword,
      rollNo,
      email,
      trialStartDate: now,
      trialEndDate: trialEnd,
      isSubscribed: false,
    });

    await user.save();

    res.status(200).json({
      msg: "User registered with 7 days trial",
      token: user._id,
      user,
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.status(200).json({
      msg: "Login success",
      token: user._id,
      user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= CHECK ACCESS =================
const checkAccess = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const user = await User.findById(token);

    if (!user) {
      return res.status(401).json({ msg: "No user" });
    }

    const now = new Date();

    if (user.isSubscribed) {
      return res.status(200).json({ msg: "Access granted (Subscribed)" });
    }

    if (user.trialEndDate && now <= user.trialEndDate) {
      return res.status(200).json({ msg: "Access granted (Trial)" });
    }

    return res.status(403).json({ msg: "Trial expired - renew required" });

  } catch (err) {
    console.log("ACCESS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  register,
  login,
  checkAccess,
};