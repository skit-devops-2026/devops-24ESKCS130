import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItems, deleteItem, updateItem } from "./api";
import { useAuth } from "./AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [myItems, setMyItems] = useState([]);

    useEffect(function () {
        if (!user) {
            navigate("/auth");
            return;
        }

        getItems().then(function (allItems) {
            const itemsPostedByUser = allItems.filter(function (item) {
                return item.postedBy === user.name;
            });
            setMyItems(itemsPostedByUser);
        });
    }, [user]);

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this item?");
        if (!confirmed) {
            return;
        }

        await deleteItem(id);

        const remainingItems = myItems.filter(function (item) {
            return item._id !== id;
        });
        setMyItems(remainingItems);
    }

    async function handleReturnedChange(item) {
        const updatedItem = await updateItem(item._id, { resolved: !item.resolved });

        const newList = myItems.map(function (oldItem) {
            if (oldItem._id === item._id) {
                return updatedItem;
            }
            return oldItem;
        });
        setMyItems(newList);
    }

    const totalCount = myItems.length;
    const lostCount = myItems.filter((item) => item.status === "lost").length;
    const foundCount = myItems.filter((item) => item.status === "found").length;
    const returnedCount = myItems.filter((item) => item.resolved).length;

    const userName = user ? user.name : "";

    return (
        <main>
            <section className="page-head">
                <p className="eyebrow">Your account</p>
                <h1>My activity</h1>
                <p className="page-sub">All items reported by {userName}.</p>
            </section>

            <section className="stats">
                <div className="stat-box">
                    <h3>{totalCount}</h3>
                    <p>Total reports</p>
                </div>
                <div className="stat-box">
                    <h3>{lostCount}</h3>
                    <p>Lost</p>
                </div>
                <div className="stat-box">
                    <h3>{foundCount}</h3>
                    <p>Found</p>
                </div>
                <div className="stat-box">
                    <h3>{returnedCount}</h3>
                    <p>Returned</p>
                </div>
            </section>

            {myItems.length === 0 && (
                <div className="empty-state">
                    <div className="empty-tag">
                        <span className="hole"></span>
                        <h3>No reports yet</h3>
                        <p>You haven't reported any item.</p>
                        <Link to="/post" className="btn btn-gold">
                            Report an item
                        </Link>
                    </div>
                </div>
            )}

            {myItems.length > 0 && (
                <div className="table-wrap">
                    <table className="activity-table">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Returned?</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {myItems.map(function (item) {
                            return (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <span className={"stamp-sm " + item.status}>{item.status}</span>
                                    </td>
                                    <td>{item.location}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.resolved}
                                            onChange={() => handleReturnedChange(item)}
                                        />
                                    </td>
                                    <td>
                                        <Link className="card-link" to={"/edit/" + item._id}>
                                            Edit
                                        </Link>
                                        {" · "}
                                        <button className="link-btn" onClick={() => handleDelete(item._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}