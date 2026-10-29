const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async function (request, response) {
    try {
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;

        if (!name || !email || !password) {
            return response.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return response.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        response.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.post("/login", async function (request, response) {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = router;