import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Browse from "./Browse.jsx";
import PostItem from "./PostItem.jsx";
import Login from "./Login.jsx";

export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/post" element={<PostItem />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}