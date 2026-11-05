require("dotenv").config();

const mongoose = require("mongoose");
const Item = require("./models/Item");

const sampleItems = [
    {
        title: "iPhone 13 (Black)",
        status: "found",
        category: "electronics",
        location: "Library, 2nd Floor",
        contact: "9876543210",
        description: "Black iPhone with a cracked screen guard.",
        postedBy: "Admin",
    },
    {
        title: "Blue Backpack",
        status: "found",
        category: "bags",
        location: "Cafeteria",
        contact: "9876543211",
        description: "Blue backpack with notebooks inside.",
        postedBy: "Admin",
    },
    {
        title: "Bunch of Keys",
        status: "found",
        category: "keys",
        location: "Parking Lot A",
        contact: "9876543212",
        description: "Three keys with a red keychain.",
        postedBy: "Admin",
    },
    {
        title: "College ID Card",
        status: "found",
        category: "documents",
        location: "Auditorium",
        contact: "admin@college.edu",
        description: "ID card found near the stage.",
        postedBy: "Admin",
    },
    {
        title: "Brown Wallet",
        status: "lost",
        category: "other",
        location: "Main Gate",
        contact: "9876543213",
        description: "Brown leather wallet with some cash and cards.",
        postedBy: "Admin",
    },
    {
        title: "Grey Hoodie",
        status: "lost",
        category: "clothing",
        location: "Sports Ground",
        contact: "9876543214",
        description: "Grey hoodie, size M.",
        postedBy: "Admin",
    },
];

async function addSampleItems() {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.insertMany(sampleItems);
    console.log(sampleItems.length + " items added");
    await mongoose.disconnect();
}

addSampleItems();