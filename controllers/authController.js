const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { staffId, password } = req.body;

        if (!staffId || !password) {
            return res.status(400).json({
                success: false,
                message: "Staff ID and password are required",
            });
        }

        const user = await User.findOne({
            staffId: staffId.trim(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Staff ID or password",
            });
        }

        if (!user.active) {
            return res.status(403).json({
                success: false,
                message: "This staff account is inactive",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Staff ID or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                staffId: user.staffId,
                name: user.name,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                staffId: user.staffId,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    login,
};