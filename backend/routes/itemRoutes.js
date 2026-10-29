const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

router.post("/", async function (request, response) {
    try {
        const newItem = await Item.create(request.body);
        response.status(201).json(newItem);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.get("/", async function (request, response) {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        response.json(items);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.get("/:id", async function (request, response) {
    try {
        const item = await Item.findById(request.params.id);

        if (!item) {
            return response.status(404).json({ message: "Item not found" });
        }

        response.json(item);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.put("/:id", async function (request, response) {
    try {
        const updatedItem = await Item.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedItem) {
            return response.status(404).json({ message: "Item not found" });
        }

        response.json(updatedItem);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async function (request, response) {
    try {
        await Item.findByIdAndDelete(request.params.id);
        response.json({ message: "Item deleted" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = router;