import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addItem, getItem, updateItem } from "./api.js";
import { useAuth } from "./AuthContext.jsx";

const CATEGORIES = ["electronics", "accessories", "bags", "documents", "keys", "clothing", "other"];

export default function PostItem() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const isEditing = id !== undefined;

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("lost");
    const [category, setCategory] = useState("other");
    const [location, setLocation] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(function () {
        if (!user) {
            navigate("/auth");
        }
    }, [user]);

    useEffect(function () {
        if (!isEditing) {
            return;
        }

        getItem(id)
            .then(function (item) {
                setTitle(item.title);
                setStatus(item.status);
                setCategory(item.category);
                setLocation(item.location);
                setImageUrl(item.imageUrl);
                setDescription(item.description);
            })
            .catch(function () {
                navigate("/browse");
            });
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");

        const itemData = {
            title: title,
            status: status,
            category: category,
            location: location,
            imageUrl: imageUrl,
            description: description,
            postedBy: user.name,
        };

        try {
            if (isEditing) {
                await updateItem(id, itemData);
            } else {
                await addItem(itemData);
            }
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <main>
            <section className="page-head">
                <p className="eyebrow">{isEditing ? "Edit" : "New report"}</p>
                <h1>{isEditing ? "Edit your item" : "Report an item"}</h1>
                <p className="page-sub">Give as many details as you can so the owner can recognise it.</p>
            </section>

            <div className="control-bar form-card">
                <form className="item-form" onSubmit={handleSubmit}>
                    <label>
                        Item name
                        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                    </label>

                    <div className="form-row">
                        <label>
                            Status
                            <select value={status} onChange={(event) => setStatus(event.target.value)}>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </label>

                        <label>
                            Category
                            <select value={category} onChange={(event) => setCategory(event.target.value)}>
                                {CATEGORIES.map(function (categoryName) {
                                    return (
                                        <option key={categoryName} value={categoryName}>
                                            {categoryName}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                    </div>

                    <label>
                        Location
                        <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} required />
                    </label>

                    <label>
                        Image URL (optional)
                        <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                    </label>

                    <label>
                        Description
                        <textarea rows="4" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </label>

                    {errorMessage && <p className="form-error">{errorMessage}</p>}

                    <button className="btn btn-gold btn-full" type="submit">
                        {isEditing ? "Update item" : "Submit report"}
                    </button>
                </form>
            </div>
        </main>
    );
}