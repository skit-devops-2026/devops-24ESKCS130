import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "./api";
import { useAuth } from "./AuthContext";

export default function Auth() {
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const isSignup = mode === "signup";

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");

        try {
            if (isSignup) {
                await registerUser({ name: name, email: email, password: password });
            }
            const loggedInUser = await loginUser({ email: email, password: password });
            login(loggedInUser);
            navigate("/browse");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    function switchMode() {
        if (isSignup) {
            setMode("login");
        } else {
            setMode("signup");
        }
    }

    return (
        <main className="auth-main">
            <form className="auth-card item-form" onSubmit={handleSubmit}>
                <h1>{isSignup ? "Create account" : "Welcome back"}</h1>

                {isSignup && (
                    <label>
                        Full name
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </label>
                )}

                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength="4"
                        required
                    />
                </label>

                {errorMessage && <p className="form-error">{errorMessage}</p>}

                <button className="btn btn-gold btn-full" type="submit">
                    {isSignup ? "Sign up" : "Log in"}
                </button>

                <p className="auth-switch">
                    {isSignup ? "Already have an account? " : "New here? "}
                    <button type="button" className="link-btn" onClick={switchMode}>
                        {isSignup ? "Log in" : "Sign up"}
                    </button>
                </p>
            </form>
        </main>
    );
}