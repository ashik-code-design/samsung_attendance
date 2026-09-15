const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        staffId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["staff", "admin"],
            default: "staff",
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

module.exports = mongoose.model("User", userSchema);