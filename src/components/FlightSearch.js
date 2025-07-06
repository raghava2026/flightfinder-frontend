import React, { useState } from 'react';

import axios from 'axios';
import API_BASE_URL from '../config';

function FlightSearch({ onBook }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/flights`, {
        params: { from, to },
      });
      setResults(res.data);
    } catch (err) {
      console.error('Failed to fetch flights:', err);
      setResults([]);
    }
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h5>🔍 Search Flights</h5>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="list-group">
          {results.map((flight, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                ✈️ {flight.from} → {flight.to} | {flight.time} | ₹{flight.price}
              </div>
              <button className="btn btn-success btn-sm" onClick={() => onBook(flight)}>
                Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FlightSearch;
