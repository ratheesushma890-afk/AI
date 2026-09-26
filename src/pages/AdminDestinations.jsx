import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiPlus,
  FiSearch,
  FiMapPin,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiStar,
  FiX,
  FiCheckCircle,
  FiGlobe,
  FiNavigation,
} from "react-icons/fi";

import "./AdminDestinations.css";

const initialDestinations = [
  {
    id: "DST-1001",
    name: "Manali",
    country: "India",
    state: "Himachal Pradesh",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 324,
    trips: 128,
    status: "Active",
    description:
      "A beautiful mountain destination famous for snow, valleys, adventure activities and peaceful landscapes.",
  },
  {
    id: "DST-1002",
    name: "Goa",
    country: "India",
    state: "Goa",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 518,
    trips: 246,
    status: "Active",
    description:
      "A popular coastal destination known for beaches, nightlife, water sports and relaxing holidays.",
  },
  {
    id: "DST-1003",
    name: "Jaipur",
    country: "India",
    state: "Rajasthan",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 287,
    trips: 184,
    status: "Active",
    description:
      "The Pink City offers royal palaces, forts, traditional markets and rich Rajasthani culture.",
  },
  {
    id: "DST-1004",
    name: "Kerala",
    country: "India",
    state: "Kerala",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 412,
    trips: 215,
    status: "Active",
    description:
      "Known for backwaters, lush greenery, beaches, wildlife and peaceful hill stations.",
  },
  {
    id: "DST-1005",
    name: "Ladakh",
    country: "India",
    state: "Ladakh",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 198,
    trips: 96,
    status: "Active",
    description:
      "A high-altitude adventure destination featuring dramatic mountains, monasteries and scenic roads.",
  },
  {
    id: "DST-1006",
    name: "Udaipur",
    country: "India",
    state: "Rajasthan",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 241,
    trips: 137,
    status: "Active",
    description:
      "A romantic city famous for lakes, palaces, heritage hotels and beautiful sunsets.",
  },
  {
    id: "DST-1007",
    name: "Rishikesh",
    country: "India",
    state: "Uttarakhand",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1587135991058-8816f8d0f7f6?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 176,
    trips: 89,
    status: "Inactive",
    description:
      "A destination for river rafting, trekking, yoga, spirituality and outdoor adventures.",
  },
  {
    id: "DST-1008",
    name: "Andaman",
    country: "India",
    state: "Andaman & Nicobar",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 164,
    trips: 78,
    status: "Active",
    description:
      "A tropical island destination famous for crystal-clear water, beaches, diving and marine life.",
  },
];

const AdminDestinations = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState(initialDestinations);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const categories = [
    "All",
    "Mountains",
    "Beach",
    "Heritage",
    "Nature",
    "Adventure",
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        destination.name.toLowerCase().includes(searchText) ||
        destination.state.toLowerCase().includes(searchText) ||
        destination.country.toLowerCase().includes(searchText) ||
        destination.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || destination.category === category;

      const matchesStatus =
        status === "All" || destination.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [destinations, search, category, status]);

  const totalDestinations = destinations.length;

  const activeDestinations = destinations.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveDestinations = destinations.filter(
    (item) => item.status === "Inactive"
  ).length;

  const totalTrips = destinations.reduce(
    (total, item) => total + item.trips,
    0
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) return;

    setDestinations((prev) =>
      prev.filter((destination) => destination.id !== id)
    );

    setSelectedDestination(null);
  };

  const handleToggleStatus = (id) => {
    setDestinations((prev) =>
      prev.map((destination) =>
        destination.id === id
          ? {
              ...destination,
              status:
                destination.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : destination
      )
    );
  };

  return (
    <div className="admin-destinations-page">

      {/* HEADER */}
      <div className="destinations-header">
        <div>
          <div className="destinations-breadcrumb">
            Admin <span>/</span> Destinations
          </div>

          <h1>Destinations</h1>

          <p>
            Manage travel destinations, locations and destination
            information.
          </p>
        </div>

        <button
          className="add-destination-btn"
          onClick={() =>
            navigate("/admin-secret/dashboard/destinations/new")
          }
        >
          <FiPlus />
          Add Destination
        </button>
      </div>

      {/* STATS */}
      <div className="destination-stats">

        <div className="destination-stat-card">
          <div className="destination-stat-icon purple">
            <FiGlobe />
          </div>

          <div>
            <span>Total Destinations</span>
            <strong>{totalDestinations}</strong>
          </div>
        </div>

        <div className="destination-stat-card">
          <div className="destination-stat-icon green">
            <FiCheckCircle />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeDestinations}</strong>
          </div>
        </div>

        <div className="destination-stat-card">
          <div className="destination-stat-icon orange">
            <FiNavigation />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveDestinations}</strong>
          </div>
        </div>

        <div className="destination-stat-card">
          <div className="destination-stat-icon blue">
            <FiMapPin />
          </div>

          <div>
            <span>Total Trips</span>
            <strong>{totalTrips}</strong>
          </div>
        </div>

      </div>

      {/* MAIN CARD */}
      <div className="destinations-main-card">

        {/* FILTER BAR */}
        <div className="destination-filter-bar">

          <div className="destination-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search destination, state or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All Categories"
                  : item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        {/* RESULTS INFO */}
        <div className="destination-results-row">
          <div>
            <strong>{filteredDestinations.length}</strong>{" "}
            destinations found
          </div>

          {(search ||
            category !== "All" ||
            status !== "All") && (
            <button
              className="clear-filter-btn"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setStatus("All");
              }}
            >
              <FiX />
              Clear Filters
            </button>
          )}
        </div>

        {/* TABLE */}
        <div className="destinations-table-wrapper">
          <table className="destinations-table">

            <thead>
              <tr>
                <th>Destination</th>
                <th>Location</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Trips</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <tr key={destination.id}>

                    <td>
                      <div className="destination-info">

                        <img
                          src={destination.image}
                          alt={destination.name}
                        />

                        <div>
                          <strong>
                            {destination.name}
                          </strong>

                          <span>
                            {destination.id}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="location-info">
                        <FiMapPin />

                        <div>
                          <strong>
                            {destination.state}
                          </strong>

                          <span>
                            {destination.country}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {destination.category}
                      </span>
                    </td>

                    <td>
                      <div className="rating-info">
                        <FiStar />
                        <strong>
                          {destination.rating}
                        </strong>

                        <span>
                          ({destination.reviews})
                        </span>
                      </div>
                    </td>

                    <td>
                      <strong className="trip-count">
                        {destination.trips}
                      </strong>
                    </td>

                    <td>
                      <button
                        className={`status-badge ${
                          destination.status.toLowerCase()
                        }`}
                        onClick={() =>
                          handleToggleStatus(destination.id)
                        }
                      >
                        {destination.status}
                      </button>
                    </td>

                    <td>
                      <div className="destination-actions">

                        <button
                          className="action-btn view"
                          title="View"
                          onClick={() =>
                            setSelectedDestination(
                              destination
                            )
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          className="action-btn edit"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/admin-secret/dashboard/destinations/edit/${destination.id}`
                            )
                          }
                        >
                          <FiEdit3 />
                        </button>

                        <button
                          className="action-btn delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(destination.id)
                          }
                        >
                          <FiTrash2 />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-destinations"
                  >
                    <FiMapPin />

                    <strong>
                      No destinations found
                    </strong>

                    <span>
                      Try changing your search or filters.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedDestination && (
        <div
          className="destination-modal-overlay"
          onClick={() => setSelectedDestination(null)}
        >

          <div
            className="destination-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close-btn"
              onClick={() =>
                setSelectedDestination(null)
              }
            >
              <FiX />
            </button>

            <img
              className="destination-modal-image"
              src={selectedDestination.image}
              alt={selectedDestination.name}
            />

            <div className="destination-modal-content">

              <div className="modal-title-row">

                <div>
                  <span className="modal-id">
                    {selectedDestination.id}
                  </span>

                  <h2>
                    {selectedDestination.name}
                  </h2>

                  <p>
                    <FiMapPin />
                    {selectedDestination.state},{" "}
                    {selectedDestination.country}
                  </p>
                </div>

                <span
                  className={`modal-status ${
                    selectedDestination.status.toLowerCase()
                  }`}
                >
                  {selectedDestination.status}
                </span>

              </div>

              <div className="modal-details-grid">

                <div>
                  <span>Category</span>
                  <strong>
                    {selectedDestination.category}
                  </strong>
                </div>

                <div>
                  <span>Rating</span>
                  <strong>
                    ⭐ {selectedDestination.rating}
                  </strong>
                </div>

                <div>
                  <span>Reviews</span>
                  <strong>
                    {selectedDestination.reviews}
                  </strong>
                </div>

                <div>
                  <span>Total Trips</span>
                  <strong>
                    {selectedDestination.trips}
                  </strong>
                </div>

              </div>

              <div className="modal-description">
                <h3>About Destination</h3>

                <p>
                  {selectedDestination.description}
                </p>
              </div>

              <div className="modal-actions">

                <button
                  className="modal-edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin-secret/dashboard/destinations/edit/${selectedDestination.id}`
                    )
                  }
                >
                  <FiEdit3 />
                  Edit Destination
                </button>

                <button
                  className="modal-delete-btn"
                  onClick={() =>
                    handleDelete(selectedDestination.id)
                  }
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDestinations;