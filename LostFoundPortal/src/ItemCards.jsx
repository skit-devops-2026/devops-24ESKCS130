export function ItemModal({ item, onClose }) {
    if (!item) {
        return null;
    }

    const imageStyle = {};
    if (item.imageUrl) {
        imageStyle.backgroundImage = "url(" + item.imageUrl + ")";
    }

    return (
        <div className="modal-overlay open" onClick={onClose}>
            <div className="modal-tag" onClick={(event) => event.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>

                <div className="modal-body">
                    <div className="modal-image" style={imageStyle}></div>

                    <div className="modal-info">
                        <span className={"stamp " + item.status}>{item.status}</span>
                        <h2>{item.title}</h2>
                        <p className="modal-meta">
                            {item.location} • {item.category}
                        </p>
                        <p className="modal-desc">
                            {item.description ? item.description : "No description provided."}
                        </p>
                        <div className="modal-divider"></div>
                        <p className="modal-poster">Posted by {item.postedBy}</p>
                        <button className="btn btn-gold">Claim this item</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ItemCards({ items, onSelect }) {
    return (
        <section className="item-grid">
            {items.map(function (item) {
                const photoStyle = {};
                if (item.imageUrl) {
                    photoStyle.backgroundImage = "url(" + item.imageUrl + ")";
                }

                return (
                    <div className="item-card" key={item._id} onClick={() => onSelect(item)}>
                        <div className="tag-hole"></div>
                        <span className={"stamp " + item.status}>{item.status}</span>
                        <div className="card-photo" style={photoStyle}></div>
                        <div className="tear-line"></div>

                        <div className="card-body">
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-meta">{item.location}</p>
                            <span className="card-cat">{item.category}</span>

                            <div className="card-footer">
                <span className="card-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                                <span className="card-link">View →</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}