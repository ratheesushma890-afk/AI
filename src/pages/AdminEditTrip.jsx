import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminEditTrip.css";

export default function AdminEditTrip() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const trips = JSON.parse(
      localStorage.getItem("adminTrips") || "[]"
    );

    const foundTrip = trips.find(
      (item) => String(item.id) === String(id)
    );

    setTrip(foundTrip || null);
  }, [id]);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trips = JSON.parse(
      localStorage.getItem("adminTrips") || "[]"
    );

    const updatedTrips = trips.map((item) =>
      String(item.id) === String(id)
        ? trip
        : item
    );

    localStorage.setItem(
      "adminTrips",
      JSON.stringify(updatedTrips)
    );

    navigate("/admin-secret/trips");
  };

  if (!trip) {
    return (
      <div className="trip-not-found">
        <h2>Trip Not Found</h2>

        <button
          onClick={() => navigate("/admin-secret/trips")}
        >
          ← Back to Trips
        </button>
      </div>
    );
  }

  return (
    <div className="admin-edit-trip-page">

      <div className="admin-edit-header">
        <div>
          <h1>Edit Trip</h1>
          <p>Update trip information</p>
        </div>

        <button
          className="back-trip-btn"
          onClick={() => navigate("/admin-secret/trips")}
        >
          ← Back to Trips
        </button>
      </div>

      <form
        className="admin-edit-form"
        onSubmit={handleSubmit}
      >

        <div className="edit-form-group">
          <label>Trip Name</label>

          <input
            type="text"
            name="name"
            value={trip.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={trip.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label>Duration</label>

          <input
            type="text"
            name="duration"
            value={trip.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label>Price</label>

          <input
            type="text"
            name="price"
            value={trip.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
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
          className="update-trip-btn"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}