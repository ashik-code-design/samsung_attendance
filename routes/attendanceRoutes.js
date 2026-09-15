const express = require("express");

const {
    saveAttendance,
    getAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================================
// SAVE ATTENDANCE
// POST /api/attendance
// ==========================================================

router.post(
    "/",
    authMiddleware,
    saveAttendance
);


// ==========================================================
// GET ATTENDANCE
// GET /api/attendance
// ==========================================================

router.get(
    "/",
    authMiddleware,
    getAttendance
);


// ==========================================================
// EXPORT
// ==========================================================

module.exports = router;