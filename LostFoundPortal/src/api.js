const ITEMS_KEY = "lostfound_items";
const USERS_KEY = "lostfound_users";

function getFromStorage(key, defaultValue) {
    const savedText = localStorage.getItem(key);
    if (savedText === null) {
        return defaultValue;
    }
    return JSON.parse(savedText);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getDateDaysAgo(days) {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const date = new Date(Date.now() - days * oneDayInMs);
    return date.toISOString();
}

const SAMPLE_ITEMS = [
    {
        _id: "1",
        title: "iPhone 13 (Black)",
        status: "found",
        category: "electronics",
        location: "Library, 2nd Floor",
        description: "Black iPhone with a cracked screen guard.",
        imageUrl: "",
        postedBy: "Admin",
        resolved: false,
        createdAt: getDateDaysAgo(1),
    },
    {
        _id: "2",
        title: "Blue Backpack",
        status: "found",
        category: "bags",
        location: "Cafeteria",
        description: "Blue backpack with notebooks inside.",
        imageUrl: "",
        postedBy: "Admin",
        resolved: false,
        createdAt: getDateDaysAgo(2),
    },
    {
        _id: "3",
        title: "Bunch of Keys",
        status: "found",
        category: "keys",
        location: "Parking Lot A",
        description: "Three keys with a red keychain.",
        imageUrl: "",
        postedBy: "Admin",
        resolved: true,
        createdAt: getDateDaysAgo(4),
    },
    {
        _id: "4",
        title: "Brown Wallet",
        status: "lost",
        category: "accessories",
        location: "Main Gate",
        description: "Brown leather wallet with ID card.",
        imageUrl: "",
        postedBy: "Admin",
        resolved: false,
        createdAt: getDateDaysAgo(3),
    },
    {
        _id: "5",
        title: "College ID Card",
        status: "found",
        category: "documents",
        location: "Auditorium",
        description: "ID card found near the stage.",
        imageUrl: "",
        postedBy: "Admin",
        resolved: false,
        createdAt: getDateDaysAgo(5),
    },
];

function loadAllItems() {
    const items = getFromStorage(ITEMS_KEY, null);
    if (items === null) {
        saveToStorage(ITEMS_KEY, SAMPLE_ITEMS);
        return SAMPLE_ITEMS;
    }
    return items;
}

export async function getItems() {
    const items = loadAllItems();
    items.sort(function (itemA, itemB) {
        return new Date(itemB.createdAt) - new Date(itemA.createdAt);
    });
    return items;
}

export async function getItem(id) {
    const items = loadAllItems();
    const foundItem = items.find(function (item) {
        return item._id === id;
    });
    if (!foundItem) {
        throw new Error("Item not found");
    }
    return foundItem;
}

export async function addItem(itemData) {
    const newItem = {
        _id: Date.now().toString(),
        title: itemData.title,
        description: itemData.description,
        status: itemData.status,
        category: itemData.category,
        location: itemData.location,
        imageUrl: itemData.imageUrl,
        postedBy: itemData.postedBy,
        resolved: false,
        createdAt: new Date().toISOString(),
    };

    const items = loadAllItems();
    items.unshift(newItem);
    saveToStorage(ITEMS_KEY, items);
    return newItem;
}

export async function updateItem(id, newData) {
    const items = loadAllItems();
    let updatedItem = null;

    for (let index = 0; index < items.length; index++) {
        if (items[index]._id === id) {
            items[index] = Object.assign({}, items[index], newData);
            updatedItem = items[index];
        }
    }

    saveToStorage(ITEMS_KEY, items);
    return updatedItem;
}

export async function deleteItem(id) {
    const items = loadAllItems();
    const remainingItems = items.filter(function (item) {
        return item._id !== id;
    });
    saveToStorage(ITEMS_KEY, remainingItems);
    return { message: "Item deleted" };
}

export async function registerUser(userData) {
    const users = getFromStorage(USERS_KEY, []);
    const email = userData.email.toLowerCase();

    const alreadyExists = users.find(function (user) {
        return user.email === email;
    });
    if (alreadyExists) {
        throw new Error("Email already registered");
    }

    const newUser = {
        _id: Date.now().toString(),
        name: userData.name,
        email: email,
        password: userData.password,
    };

    users.push(newUser);
    saveToStorage(USERS_KEY, users);
    return { _id: newUser._id, name: newUser.name, email: newUser.email };
}

export async function loginUser(loginData) {
    const users = getFromStorage(USERS_KEY, []);
    const email = loginData.email.toLowerCase();

    const matchedUser = users.find(function (user) {
        return user.email === email && user.password === loginData.password;
    });
    if (!matchedUser) {
        throw new Error("Invalid email or password");
    }

    return { _id: matchedUser._id, name: matchedUser.name, email: matchedUser.email };
}