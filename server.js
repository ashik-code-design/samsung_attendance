require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDatabase = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();


// ==========================================================
// CONNECT MONGODB
// ==========================================================

connectDatabase();


// ==========================================================
// MIDDLEWARE
// ==========================================================

app.use(cors());

app.use(express.json());


// ==========================================================
// HOME / TEST ROUTE
// ==========================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Samsung Backend is running",
        version: "1.0.0"
    });
});


// ==========================================================
// AUTHENTICATION ROUTES
// ==========================================================

app.use("/api/auth", authRoutes);


// ==========================================================
// STUDENT ROUTES
// ==========================================================

app.use("/api/students", studentRoutes);


// ==========================================================
// ATTENDANCE ROUTES
// ==========================================================

app.use("/api/attendance", attendanceRoutes);


// ==========================================================
// START SERVER
// ==========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});