"use client";
import { useState } from 'react';

export default function EmailSearch() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
    const [method, setMethod] = useState('GET');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setData(null);

      try {
          const options = {
              method,
              ...(method === 'POST' && {
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
              }),
          };

          const response = await fetch(
              `http://localhost:8080/api/list/${email}`,
              method === 'GET' ? undefined : options
          );

          if (!response.ok) {
              console.log(response);
              throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
      } catch (err) {
          setError(err.message);
      }
  };


  return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Email Search</h1>
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '10px',
                width: 'calc(100% - 20px)',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
          />
          <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
          >
            Search
          </button>
        </form>

        {error && (
            <p style={{ color: 'red' }}>
              Error: {error}
            </p>
        )}

        {data && (
            <div>
              <h2>Results:</h2>
              <ul>
                {data.map((item) => (
                    <li key={item.id}>
                      <strong>{item.name}</strong> - {item.id} <br/>
                        Description - {item.description} <br/>
                        BaseUrl - {item.baseUrl}
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
}
