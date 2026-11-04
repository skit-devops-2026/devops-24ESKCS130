const BASE_URL = "http://localhost:5000/api";

async function sendRequest(path, options) {
    const response = await fetch(BASE_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
}

export async function getItems() {
    return sendRequest("/items", { method: "GET" });
}

export async function getItem(id) {
    return sendRequest("/items/" + id, { method: "GET" });
}

export async function addItem(itemData) {
    return sendRequest("/items", {
        method: "POST",
        body: JSON.stringify(itemData),
    });
}

export async function updateItem(id, newData) {
    return sendRequest("/items/" + id, {
        method: "PUT",
        body: JSON.stringify(newData),
    });
}

export async function deleteItem(id) {
    return sendRequest("/items/" + id, { method: "DELETE" });
}

export async function registerUser(userData) {
    return sendRequest("/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export async function loginUser(loginData) {
    return sendRequest("/users/login", {
        method: "POST",
        body: JSON.stringify(loginData),
    });
}