import { useEffect, useState } from "react";
import { getItems } from "./api.js";
import ItemCards, { ItemModal } from "./ItemCards.jsx";

const CATEGORIES = [
    "all",
    "electronics",
    "accessories",
    "bags",
    "documents",
    "keys",
    "clothing",
    "other",
];

const ITEMS_PER_PAGE = 6;

export default function Browse() {
    const [allItems, setAllItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(function () {
        getItems().then(function (items) {
            setAllItems(items);
        });
    }, []);

    function matchesFilters(item) {
        const statusMatches = statusFilter === "all" || item.status === statusFilter;
        const categoryMatches = categoryFilter === "all" || item.category === categoryFilter;

        const searchableText = (item.title + " " + item.location + " " + item.description).toLowerCase();
        const searchMatches = searchableText.includes(searchText.toLowerCase());

        return statusMatches && categoryMatches && searchMatches;
    }

    function compareItems(itemA, itemB) {
        if (sortOrder === "oldest") {
            return new Date(itemA.createdAt) - new Date(itemB.createdAt);
        }
        if (sortOrder === "az") {
            return itemA.title.localeCompare(itemB.title);
        }
        return new Date(itemB.createdAt) - new Date(itemA.createdAt);
    }

    const filteredItems = allItems.filter(matchesFilters).sort(compareItems);
    const itemsToShow = filteredItems.slice(0, visibleCount);

    function clearFilters() {
        setSearchText("");
        setStatusFilter("all");
        setCategoryFilter("all");
    }

    function showMoreItems() {
        setVisibleCount(visibleCount + ITEMS_PER_PAGE);
    }

    return (
        <main>
            <section className="page-head">
                <h1>Browse Lost &amp; Found Items</h1>
                <p className="page-sub">Search everything reported as lost or found on campus.</p>
            </section>

            <section className="control-bar">
                <div className="search-row">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by item name, brand or location"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </div>

                    <div className="toggle-group">
                        {["all", "lost", "found"].map(function (status) {
                            const buttonClass = statusFilter === status ? "toggle-btn active" : "toggle-btn";
                            return (
                                <button key={status} className={buttonClass} onClick={() => setStatusFilter(status)}>
                                    {status}
                                </button>
                            );
                        })}
                    </div>

                    <select
                        className="sort-select"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value)}
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="az">Name A-Z</option>
                    </select>
                </div>

                <div className="pill-row">
                    {CATEGORIES.map(function (category) {
                        const pillClass = categoryFilter === category ? "pill active" : "pill";
                        return (
                            <button key={category} className={pillClass} onClick={() => setCategoryFilter(category)}>
                                {category}
                            </button>
                        );
                    })}
                </div>
            </section>

            <div className="results-meta">
                <p>
                    <strong>{filteredItems.length}</strong> items found
                </p>
            </div>

            <ItemCards items={itemsToShow} onSelect={setSelectedItem} />

            {filteredItems.length === 0 && (
                <div className="empty-state">
                    <div className="empty-tag">
                        <span className="hole"></span>
                        <h3>No items match your search.</h3>
                        <p>Try different keywords or clear your filters.</p>
                        <button className="btn btn-gold" onClick={clearFilters}>
                            Clear filters
                        </button>
                    </div>
                </div>
            )}

            {visibleCount < filteredItems.length && (
                <div className="load-more-wrap">
                    <button className="btn btn-outline" onClick={showMoreItems}>
                        Load more items
                    </button>
                </div>
            )}

            <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </main>
    );
}