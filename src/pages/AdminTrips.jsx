
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTrips.css";

const defaultTrips = [
  {
    id: 1,
    name: "Dubai Escape",
    location: "Dubai",
    duration: "5 Days / 4 Nights",
    price: "₹45,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Paris Tour",
    location: "Paris",
    duration: "7 Days / 6 Nights",
    price: "₹85,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Bali Adventure",
    location: "Bali",
    duration: "6 Days / 5 Nights",
    price: "₹62,000",
    status: "Active",
  },
];

export default function AdminTrips() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("adminTrips");

    return savedTrips
      ? JSON.parse(savedTrips)
      : defaultTrips;
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "adminTrips",
      JSON.stringify(trips)
    );
  }, [trips]);

  const deleteTrip = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (confirmDelete) {
      setTrips(
        trips.filter((trip) => trip.id !== id)
      );
    }
  };

  const filteredTrips = trips.filter(
    (trip) =>
      trip.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      trip.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="admin-trips-page">

      {/* PAGE HEADER */}
      <div className="admin-trips-header">
        <div>
          <h1>Trips</h1>
          <p>Manage all your travel trips</p>
        </div>

        <button
          className="add-trip-btn"
          onClick={() =>
            navigate("/admin-secret/trips/new")
          }
        >
          ＋ Add New Trip
        </button>
      </div>

      {/* SEARCH */}
      <div className="trips-toolbar">
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <span>
          {filteredTrips.length} Trips
        </span>
      </div>

      {/* TRIPS TABLE */}
      <div className="trips-table">

        <div className="trip-row trip-head">
          <span>Trip</span>
          <span>Location</span>
          <span>Duration</span>
          <span>Price</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div
              className="trip-row"
              key={trip.id}
            >

              <strong>{trip.name}</strong>

              <span>
                📍 {trip.location}
              </span>

              <span>
                {trip.duration}
              </span>

              <span>
                {trip.price}
              </span>

              <b className="trip-active">
                {trip.status}
              </b>

              <div className="trip-actions">

                {/* EDIT */}
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin-secret/trips/edit/${trip.id}`
                    )
                  }
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTrip(trip.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="no-trips">
            No trips found
          </div>
        )}

      </div>

    </div>
  );
}

