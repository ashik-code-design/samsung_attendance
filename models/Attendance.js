const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        studentName: {
            type: String,
            required: true,
            trim: true,
        },

        sicId: {
            type: String,
            required: true,
            trim: true,
        },

        course: {
            type: String,
            required: true,
            trim: true,
        },

        batch: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        present: {
            type: Boolean,
            default: true,
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        staffId: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


// ==========================================================
// PREVENT DUPLICATE ATTENDANCE FOR SAME STUDENT + DATE
// ==========================================================

attendanceSchema.index(
    {
        student: 1,
        date: 1,
    },
    {
        unique: true,
    }
);


module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);