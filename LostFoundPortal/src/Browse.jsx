import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api/items";

export default function Browse() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [selected, setSelected] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    const shownItems = items.filter((item) => {
        const statusMatches = status === "all" || item.status === status;
        const text = (item.title + " " + item.location).toLowerCase();
        return statusMatches && text.includes(search.toLowerCase());
    });

    function deleteItem(id) {
        fetch(API + "/" + id, { method: "DELETE" }).then(() => {
            setItems(items.filter((item) => item._id !== id));
            setSelected(null);
        });
    }

    function markReturned(id) {
        fetch(API + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resolved: true }),
        })
            .then((res) => res.json())
            .then((updatedItem) => {
                setItems(items.map((item) => (item._id === id ? updatedItem : item)));
                setSelected(updatedItem);
            });
    }

    return (
        <div className="page">
            <h1>Browse items</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by item name or location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {["all", "lost", "found"].map((name) => (
                    <button
                        key={name}
                        className={status === name ? "btn btn-gold" : "btn"}
                        onClick={() => setStatus(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <p className="count">{shownItems.length} items found</p>

            <div className="grid">
                {shownItems.map((item) => (
                    <div className="card" key={item._id} onClick={() => setSelected(item)}>
                        <span className={"badge " + item.status}>{item.status}</span>
                        {item.resolved && <span className="badge returned">returned</span>}
                        <h3>{item.title}</h3>
                        <p>{item.location}</p>
                        <small>{new Date(item.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>

            {shownItems.length === 0 && <p>No items found.</p>}

            {selected && (
                <div className="modal-background" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <span className={"badge " + selected.status}>{selected.status}</span>
                        {selected.resolved && <span className="badge returned">returned</span>}
                        <h2>{selected.title}</h2>
                        <p>Location: {selected.location}</p>
                        <p>Category: {selected.category}</p>
                        <p>{selected.description}</p>
                        <p>Posted by: {selected.postedBy}</p>

                        {user ? (
                            <p className="contact">Contact: {selected.contact}</p>
                        ) : (
                            <p>
                                <Link to="/login">Login</Link> to see contact details.
                            </p>
                        )}

                        <div className="modal-buttons">
                            {user && user.name === selected.postedBy && !selected.resolved && (
                                <button className="btn btn-gold" onClick={() => markReturned(selected._id)}>
                                    Mark as returned
                                </button>
                            )}
                            {user && user.name === selected.postedBy && (
                                <button className="btn" onClick={() => deleteItem(selected._id)}>
                                    Delete
                                </button>
                            )}
                            <button className="btn" onClick={() => setSelected(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}