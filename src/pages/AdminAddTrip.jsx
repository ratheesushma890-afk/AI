import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAddTrip.css";

export default function AdminAddTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    name: "",
    location: "",
    duration: "",
    price: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldTrips = JSON.parse(
      localStorage.getItem("adminTrips") || "[]"
    );

    const newTrip = {
      ...trip,
      id: Date.now(),
    };

    localStorage.setItem(
      "adminTrips",
      JSON.stringify([...oldTrips, newTrip])
    );

    navigate("/admin-secret/trips");
  };

  return (
    <div className="admin-trip-form-page">

      <div className="admin-trip-form-header">
        <div>
          <h1>Add New Trip</h1>
          <p>Create a new travel trip</p>
        </div>

        <button
          className="back-trip-btn"
          onClick={() => navigate("/admin-secret/trips")}
        >
          ← Back to Trips
        </button>
      </div>

      <form
        className="admin-trip-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Trip Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter trip name"
            value={trip.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={trip.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Example: 5 Days / 4 Nights"
            value={trip.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Example: ₹50,000"
            value={trip.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={trip.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="save-trip-btn"
        >
          + Create Trip
        </button>

      </form>

    </div>
  );
}