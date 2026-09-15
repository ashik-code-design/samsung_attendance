const Student = require("../models/Student");

// ==========================================================
// GET STUDENTS
// ==========================================================

const getStudents = async (req, res) => {
    try {

        const { course, batch } = req.query;

        // Check required parameters
        if (!course || !batch) {
            return res.status(400).json({
                success: false,
                message: "Course and batch are required",
            });
        }

        // Find students
        const students = await Student.find({
            course: course.trim(),
            batch: batch.trim(),
            active: true,
        })
        .select("name sicId course batch")
        .sort({ sicId: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            students: students,
        });

    } catch (error) {

        console.error(
            "Get students error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


module.exports = {
    getStudents,
};