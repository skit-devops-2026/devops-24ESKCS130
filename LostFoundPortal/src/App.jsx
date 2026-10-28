import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Browse from "./Browse.jsx";
import PostItem from "./PostItem.jsx";
import Dashboard from "./Dashboard.jsx";
import Auth from "./Auth.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/post" element={<PostItem />} />
                    <Route path="/edit/:id" element={<PostItem />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}