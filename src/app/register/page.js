"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [profession, setProfession] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password,name,surname,profession,phoneNum }),
            });

            if (!response.ok) throw new Error("Registration failed");
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="surname"
                    placeholder="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    type="profession"
                    placeholder="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                />
                <input
                    type="phoneNum"
                    placeholder="phoneNum"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
            {success && <p>Registration successful! You can now log in.</p>}
        </div>
    );
}
