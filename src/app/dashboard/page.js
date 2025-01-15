"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import './dashboard.css';


export default function DashboardPage() {
    const [apis, setApis] = useState([]);
    const [endpoints, setEndpoints] = useState([]); // List of Endpoints
    const [newApi, setNewApi] = useState({id: "", name: "", description: "", baseUrl: ""}); // New API details
    const [newEndpoint, setNewEndpoint] = useState({
        id: "", apiId: "", name: "", url: "", method: "GET", userEmail: ""
    }); // New Endpoint details
    const [error, setError] = useState(null);
    const router = useRouter();
    const [response, setResponse] = useState('');

    // Fetch APIs on component load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        fetchApis();
    }, []);

    const fetchApis = async () => {
        const userEmail = localStorage.getItem("token");

        if (!userEmail) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/api/list", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({email: userEmail}),
            });
            if (!response.ok) throw new Error("Failed to fetch APIs");
            const data = await response.json();
            console.log(data);
            setApis(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const addApi = async () => {
        const userEmail = localStorage.getItem("token");


        if (!userEmail) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/api/create", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({...newApi, userEmail}),
            });
            if (!response.ok) throw new Error("Failed to add API");
            fetchApis();
        } catch (err) {
            setError(err.message);
        }
    };

        const testEndpoint = async (endpoint) => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/v1/endpoint/test`,{
                        method: "POST", headers: {
                            "Content-Type": "application/json",
                        },body: JSON.stringify(endpoint),
                    }
                );
                console.log("we are here 1");
                // if (!response.ok) throw new Error("Failed to test endpoint");

                const data = await res.json();
                console.log("we are here 2");
                setResponse(JSON.stringify(data, null, 2));
                alert(`Response: \n${JSON.stringify(data, null, 2)}`);
            } catch (error) {
                alert('Error testing the endpoint.');
            }
        };

    const fetchEndpoints = async (id) => {
        const userEmail = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/api/v1/endpoint/list", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({userEmail: userEmail, ApiId: id}),
            });
            if (!response.ok) throw new Error("Failed to fetch endpoints");
            console.log(userEmail, id)
            const data = await response.json();
            setEndpoints(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const addEndpoint = async () => {
        newEndpoint.userEmail = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/api/v1/endpoint/create", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(newEndpoint),
            });
            if (!response.ok) throw new Error("Failed to add endpoint");
            fetchEndpoints(newEndpoint.apiId);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (<div className="dashboard">
            <div className="container">
                <h1 className="dashboard-title">Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>

                {/* Add API Form */}
                <div className="form-container">
                    <h2>Add API</h2>

                    <input
                        type="text"
                        placeholder="API Name"
                        value={newApi.name}
                        onChange={(e) => setNewApi({...newApi, name: e.target.value})}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="API Description"
                        value={newApi.description}
                        onChange={(e) => setNewApi({...newApi, description: e.target.value})}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Base URL"
                        value={newApi.baseUrl}
                        onChange={(e) => setNewApi({...newApi, baseUrl: e.target.value})}
                        className="input-field"
                    />
                    <button className="submit-button" onClick={addApi}>Add API</button>
                </div>

                {/* List APIs */}
                <div className="api-list">
                    <h2>APIs</h2>
                    <ul>
                        {apis.map((api) => (<li key={api.id} className="api-item">
                                <div>{api.id}</div>
                                <div className="api-name"><strong>{api.name}</strong></div>
                                <div>{api.description}</div>
                                <div>{api.baseUrl}</div>
                                <button className="manage-button" onClick={() => fetchEndpoints(api.id)}>Manage
                                    Endpoints
                                </button>
                            </li>))}
                    </ul>
                </div>

                {/* Add Endpoint Form */}
                <div className="form-container">
                    <h2>Add Endpoint</h2>
                    <select
                        value={newEndpoint.apiId}
                        onChange={(e) => setNewEndpoint({...newEndpoint, apiId: e.target.value})}
                        className="input-field"
                    >
                        <option value="">Select API</option>
                        {apis.map((api) => (<option key={api.id} value={api.id}>{api.name}</option>))}
                    </select>
                    <input
                        type="text"
                        placeholder="Endpoint Name"
                        value={newEndpoint.name}
                        onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Endpoint URL"
                        value={newEndpoint.url}
                        onChange={(e) => setNewEndpoint({...newEndpoint, url: e.target.value})}
                        className="input-field"
                    />
                    <select
                        value={newEndpoint.method}
                        onChange={(e) => setNewEndpoint({...newEndpoint, method: e.target.value})}
                        className="input-field"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <button className="submit-button" onClick={addEndpoint}>Add Endpoint</button>
                </div>

                {/* List Endpoints */}
                <div className="endpoint-list">
                    <h2>Endpoints</h2>
                    <ul>
                        {endpoints.map((endpoint) => (
                            <li key={endpoint.id} className="endpoint-item">
                                <div className="endpoint-name"><strong>{endpoint.name}</strong></div>
                                <div>{endpoint.url}</div>
                                <div>{endpoint.method}</div>
                                <button onClick={() => testEndpoint(endpoint)}>
                                    Test Endpoint
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {error && <p className="error-message">{error}</p>}
            </div>
    </div>);
}