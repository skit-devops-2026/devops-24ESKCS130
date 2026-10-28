import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems } from "./api.js";
import ItemCards, { ItemModal } from "./ItemCards.jsx";

export default function Home() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(function () {
        getItems().then(function (allItems) {
            setItems(allItems);
        });
    }, []);

    const totalCount = items.length;
    const lostCount = items.filter((item) => item.status === "lost").length;
    const foundCount = items.filter((item) => item.status === "found").length;
    const returnedCount = items.filter((item) => item.resolved).length;

    const recentItems = items.slice(0, 6);

    return (
        <main>
            <section className="hero">
                <p className="eyebrow">Campus Lost &amp; Found</p>
                <h1>
                    Lost something? <br />
                    Found something? <br />
                    Let Starlight guide it home.
                </h1>
                <p className="page-sub">One searchable place for every lost and found item on campus.</p>

                <div className="hero-actions">
                    <Link to="/browse" className="btn btn-gold">
                        Browse items
                    </Link>
                    <Link to="/post" className="btn btn-outline">
                        Report an item
                    </Link>
                </div>
            </section>

            <section className="stats">
                <div className="stat-box">
                    <h3>{totalCount}</h3>
                    <p>Total reports</p>
                </div>
                <div className="stat-box">
                    <h3>{lostCount}</h3>
                    <p>Lost items</p>
                </div>
                <div className="stat-box">
                    <h3>{foundCount}</h3>
                    <p>Found items</p>
                </div>
                <div className="stat-box">
                    <h3>{returnedCount}</h3>
                    <p>Returned to owner</p>
                </div>
            </section>

            <section className="page-head">
                <h2>Recently reported</h2>
            </section>

            <ItemCards items={recentItems} onSelect={setSelectedItem} />

            <div className="load-more-wrap">
                <Link to="/browse" className="btn btn-outline">
                    View all items
                </Link>
            </div>

            <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </main>
    );
}