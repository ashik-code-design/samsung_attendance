require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDatabase =
    require("../config/database");

const User =
    require("../models/User");


const seedUsers = async () => {

    try {

        // Connect to MongoDB
        await connectDatabase();


        // Create encrypted password
        const password =
            await bcrypt.hash(
                "123456",
                10
            );


        // Check if STAFF001 already exists
        const existingUser =
            await User.findOne({
                staffId: "STAFF001",
            });


        if (existingUser) {

            console.log(
                "STAFF001 already exists"
            );

            process.exit(0);
        }


        // Create staff account
        await User.create({

            staffId: "STAFF001",

            name: "Test Staff",

            password: password,

            role: "staff",

            active: true,

        });


        console.log(
            "Staff account created successfully"
        );

        console.log(
            "Staff ID: STAFF001"
        );

        console.log(
            "Password: 123456"
        );


        process.exit(0);

    } catch (error) {

        console.error(
            "Seed user error:",
            error
        );

        process.exit(1);
    }
};


seedUsers();