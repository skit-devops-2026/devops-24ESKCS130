import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="page hero">
            <h1>Lost something? Found something?</h1>
            <p>One place to report and find lost items on campus.</p>

            <div className="hero-buttons">
                <Link to="/browse" className="btn btn-gold">
                    Browse items
                </Link>
                <Link to="/post" className="btn">
                    Report an item
                </Link>
            </div>
        </div>
    );
}