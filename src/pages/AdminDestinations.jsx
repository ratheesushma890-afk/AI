import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDestinations.css";

export default function AdminDestinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Dubai",
      country: "UAE",
      trips: 8,
      price: "₹45,000",
      status: "Popular",
    },
    {
      id: 2,
      name: "London",
      country: "UK",
      trips: 6,
      price: "₹85,000",
      status: "Popular",
    },
    {
      id: 3,
      name: "Goa",
      country: "India",
      trips: 7,
      price: "₹62,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Jaipur",
      country: "India",
      trips: 5,
      price: "₹55,000",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const deleteDestination = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (confirmDelete) {
      setDestinations(
        destinations.filter(
          (destination) => destination.id !== id
        )
      );
    }
  };

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      destination.country
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="admin-destinations-page">

      {/* HEADER */}
      <div className="admin-destinations-header">

        <div>
          <h1>Destinations</h1>
          <p>Manage your travel destinations</p>
        </div>

        {/* ADD DESTINATION */}
        <button
          className="add-destination-btn"
          onClick={() =>
            navigate("/admin-secret/destinations/new")
          }
        >
          ＋ Add Destination
        </button>

      </div>

      {/* SEARCH */}
      <div className="destinations-toolbar">

        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>
          {filteredDestinations.length} Destinations
        </span>

      </div>

      {/* TABLE */}
      <div className="destinations-table">

        <div className="destination-row destination-head">
          <span>Destination</span>
          <span>Country</span>
          <span>Total Trips</span>
          <span>Starting Price</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (

            <div
              className="destination-row"
              key={destination.id}
            >

              <strong>
                📍 {destination.name}
              </strong>

              <span>
                {destination.country}
              </span>

              <span>
                {destination.trips}
              </span>

              <span>
                {destination.price}
              </span>

              <b
                className={
                  destination.status === "Popular"
                    ? "destination-popular"
                    : "destination-active"
                }
              >
                {destination.status}
              </b>

              <div className="destination-actions">

                {/* EDIT */}
                <button
                  className="destination-edit"
                  onClick={() =>
                    navigate(
                      `/admin-secret/destinations/edit/${destination.id}`
                    )
                  }
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="destination-delete"
                  onClick={() =>
                    deleteDestination(destination.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        ) : (
          <div className="no-destinations">
            No destinations found
          </div>
        )}

      </div>

    </div>
  );
}