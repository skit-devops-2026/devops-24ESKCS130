import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function getSavedUser() {
    const savedUser = localStorage.getItem("user");
    if (savedUser === null) {
        return null;
    }
    return JSON.parse(savedUser);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getSavedUser());

    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user: user, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    );
}