import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PostItem() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        title: "",
        status: "lost",
        category: "other",
        location: "",
        contact: "",
        description: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:5000/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, postedBy: user.name }),
        });

        navigate("/browse");
    }

    if (!user) {
        return (
            <div className="page">
                <h1>Report an item</h1>
                <p>
                    Please <Link to="/login">login</Link> first to report an item.
                </p>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Report an item</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label>Item name</label>
                <input name="title" value={form.title} onChange={handleChange} required />

                <label>Lost or found?</label>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                </select>

                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="electronics">Electronics</option>
                    <option value="bags">Bags</option>
                    <option value="documents">Documents</option>
                    <option value="keys">Keys</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                </select>

                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} required />

                <label>Your phone number or email</label>
                <input name="contact" value={form.contact} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" rows="3" value={form.description} onChange={handleChange} />

                <button className="btn btn-gold" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}