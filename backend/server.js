require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        app.listen(process.env.PORT, function () {
            console.log("Server running on port " + process.env.PORT);
        });
    } catch (error) {
        console.log("Could not connect to MongoDB:", error.message);
    }
}

startServer();