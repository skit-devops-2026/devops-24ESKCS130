import { useState } from "react";

const API = "http://localhost:5000/api/users";

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const path = isSignup ? "/register" : "/login";
        const response = await fetch(API + path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        if (isSignup) {
            setIsSignup(false);
            setMessage("Account created. Please login.");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/browse";
    }

    return (
        <div className="page">
            <h1>{isSignup ? "Sign up" : "Login"}</h1>

            <form className="form" onSubmit={handleSubmit}>
                {isSignup && (
                    <>
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </>
                )}

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {message && <p className="message">{message}</p>}

                <button className="btn btn-gold" type="submit">
                    {isSignup ? "Sign up" : "Login"}
                </button>

                <p>
                    {isSignup ? "Already have an account? " : "New here? "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(!isSignup); setMessage(""); }}>
                        {isSignup ? "Login" : "Sign up"}
                    </a>
                </p>
            </form>
        </div>
    );
}