const express = require("express");

const {
    getStudents
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================================
// GET STUDENTS
// ==========================================================

router.get(
    "/",
    authMiddleware,
    getStudents
);


module.exports = router;