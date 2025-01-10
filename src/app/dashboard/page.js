"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [apis, setApis] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // Redirect if not logged in
            return;
        }
        fetchApis(token);
    }, []);

    const fetchApis = async (token) => {
        try {
            const response = await fetch("http://localhost:8080/api/list", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch APIs");
            const data = await response.json();
            setApis(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const addApi = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error("Failed to add API");
            fetchApis(token); // Refresh list
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteApi = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/delete/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to delete API");
            fetchApis(token); // Refresh list
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                <input
                    type="text"
                    placeholder="API Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={addApi}>Add API</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {apis.map((api) => (
                    <li key={api.id}>
                        {api.name}{" "}
                        <button onClick={() => deleteApi(api.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
