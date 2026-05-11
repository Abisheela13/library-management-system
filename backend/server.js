const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ---------------- LOGGING MIDDLEWARE ---------------- */
console.log("SERVER STARTED");

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "*", // you can restrict later (Vercel URL)
}));

app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Library API Running Successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/admin", adminRoutes);

/* ---------------- ERROR HANDLER (IMPORTANT) ---------------- */
app.use((err, req, res, next) => {
  console.error(" ERROR:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});