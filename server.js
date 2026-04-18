const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ DB Error:", err));

// ================= ROUTES =================
app.use("/api", require("./routes/auth"));
app.use("/api/bus", require("./routes/bus"));
app.use("/api/location", require("./routes/location"));
app.use("/api/payment", require("./routes/payment"));

// ================= DEFAULT =================
app.get("/", (req, res) => {
res.send("🚀 API is running...");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
console.log(`🔥 Server running on port ${PORT}`);
});
