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
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST", // POST request for registration
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, surname, profession, phoneNum }), // Include all form data
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Registration failed"); // Handle error message from backend
            }

            setSuccess(true); // Set success flag if registration is successful
        } catch (err) {
            setError(err.message); // Display error message
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
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p>Registration successful! You can now log in.</p>}
        </div>
    );
}
