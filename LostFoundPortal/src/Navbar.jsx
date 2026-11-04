import { Link } from "react-router-dom";

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Starlight
            </Link>

            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/post">Report an item</Link>

                {user ? (
                    <>
                        <span>Hi, {user.name}</span>
                        <button className="btn" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}