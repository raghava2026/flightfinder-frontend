import React, { useEffect, useState } from 'react';
import FlightSearch from './FlightSearch';
import axios from 'axios';
import API_BASE_URL from '../config';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  // Retrieve the logged-in username from localStorage (stored as a string)
  const username = localStorage.getItem('loggedInUser');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings/${username}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    if (username) {
      fetchBookings();
    }
  }, [username]);

  const handleBooking = async (flight) => {
    const newBooking = {
      ...flight,
      username,
      date: new Date().toLocaleString(),
    };
    try {
      await axios.post(`${API_BASE_URL}/api/bookings`, newBooking);
      setBookings((prev) => [...prev, newBooking]);
      alert('✅ Booking Confirmed!');
    } catch (err) {
      console.error('Failed to book flight:', err);
      alert('Failed to book flight');
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/bookings/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      alert('Booking cancelled successfully!');
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Welcome, {username}</h2>

      {/* Flight Search Component */}
      <FlightSearch onBook={handleBooking} />

      <h4 className="mt-5">🛫 My Bookings</h4>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((b, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{b.from}</strong> → <strong>{b.to}</strong> | {b.time} | ₹{b.price}
                <br />
                <small>Booked on: {b.date}</small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelBooking(i)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDashboard;


