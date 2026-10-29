const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["lost", "found"],
            required: true,
        },
        category: {
            type: String,
            default: "other",
        },
        location: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "",
        },
        postedBy: {
            type: String,
            default: "Anonymous",
        },
        resolved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);