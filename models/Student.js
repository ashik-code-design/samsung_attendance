const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        sicId: {
            type: String,
            required: true,
            unique: true,
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

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);