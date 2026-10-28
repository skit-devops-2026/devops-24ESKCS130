import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="navbar">
            <Link to="/" className="brand">
                <span className="brand-beacon"></span>
                Starlight
            </Link>

            <nav className="nav-links">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/browse">Browse</NavLink>
                <NavLink to="/post">Report an item</NavLink>
                <NavLink to="/dashboard">My activity</NavLink>
            </nav>

            <div className="nav-actions">
                {user && <span className="nav-user">Hi, {user.name}</span>}

                {user ? (
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        Log out
                    </button>
                ) : (
                    <Link to="/auth" className="btn btn-ghost">
                        Log in
                    </Link>
                )}

                <Link to="/post" className="btn btn-gold">
                    Report item
                </Link>
            </div>
        </header>
    );
}