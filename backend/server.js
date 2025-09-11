const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Static File Serving =================
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📂 Created uploads folder");
}
app.use("/uploads", express.static(uploadPath));

// ================= MongoDB Connection =================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Stop server if DB fails
  });

// ================= Routes =================
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ================= Health Check =================
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running..." });
});

// ================= 404 Handler =================
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// ================= Start Server =================
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
