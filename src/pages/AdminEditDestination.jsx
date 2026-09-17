import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminDestinationForm.css";

export default function AdminEditDestination() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "Dubai",
    country: "UAE",
    trips: "8",
    price: "₹45,000",
    status: "Popular",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Destination ${id} updated successfully!`);

    navigate("/admin-secret/destinations");
  };

  return (
    <div className="destination-form-page">

      <div className="destination-form-header">
        <div>
          <h1>Edit Destination</h1>
          <p>Update travel destination details</p>
        </div>

        <button
          className="destination-back-btn"
          onClick={() =>
            navigate("/admin-secret/destinations")
          }
        >
          ← Back
        </button>
      </div>

      <form
        className="destination-form-card"
        onSubmit={handleSubmit}
      >

        <div className="destination-form-grid">

          <div className="destination-field">
            <label>Destination Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="destination-field">
            <label>Country</label>

            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="destination-field">
            <label>Total Trips</label>

            <input
              type="number"
              name="trips"
              value={form.trips}
              onChange={handleChange}
              required
            />
          </div>

          <div className="destination-field">
            <label>Starting Price</label>

            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="destination-field">
            <label>Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Popular">Popular</option>
            </select>
          </div>

        </div>

        <div className="destination-form-actions">

          <button
            type="button"
            className="destination-cancel-btn"
            onClick={() =>
              navigate("/admin-secret/destinations")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="destination-save-btn"
          >
            Update Destination
          </button>

        </div>

      </form>
    </div>
  );
}