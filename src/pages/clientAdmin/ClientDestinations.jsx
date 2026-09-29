import React, { useMemo, useState } from "react";

import {
  FiMapPin,
  FiSearch,
  FiFilter,
  FiEdit3,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiMap,
  FiStar,
} from "react-icons/fi";

import "./ClientDestinations.css";

const ClientDestinations = () => {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Goa",
      state: "Goa, India",
      category: "Beach",
      price: "₹8,999",
      rating: "4.9",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Manali",
      state: "Himachal Pradesh, India",
      category: "Mountain",
      price: "₹12,499",
      rating: "4.8",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Jaipur",
      state: "Rajasthan, India",
      category: "Heritage",
      price: "₹9,999",
      rating: "4.7",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Kerala",
      state: "Kerala, India",
      category: "Nature",
      price: "₹14,999",
      rating: "4.9",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      name: "Rishikesh",
      state: "Uttarakhand, India",
      category: "Adventure",
      price: "₹7,999",
      rating: "4.7",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1591018653367-72a72d708e2d?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      name: "Udaipur",
      state: "Rajasthan, India",
      category: "Romantic",
      price: "₹11,999",
      rating: "4.8",
      status: "Inactive",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [editingDestination, setEditingDestination] = useState(null);

  const activeCount = destinations.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = destinations.filter(
    (item) => item.status === "Inactive"
  ).length;

  const filteredDestinations = useMemo(() => {
    const value = search.trim().toLowerCase();

    return destinations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(value) ||
        item.state.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value);

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [destinations, search, filter]);

  const handleStatusChange = (id) => {
    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingDestination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setDestinations((prev) =>
      prev.map((item) =>
        item.id === editingDestination.id
          ? editingDestination
          : item
      )
    );

    setEditingDestination(null);
  };

  return (
    <div className="client-destinations-page">

      {/* HEADER */}

      <section className="client-destination-header">
        <div>
          <span>DESTINATION MANAGEMENT</span>
          <h1>Manage Destinations</h1>

          <p>
            View and update destination information available
            on your Tripper website.
          </p>
        </div>

        <div className="client-destination-header-box">
          <FiMap />

          <div>
            <span>Available</span>
            <strong>{destinations.length} Destinations</strong>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="client-destination-stats">

        <div className="client-destination-stat">
          <div className="client-destination-stat-icon blue">
            <FiMapPin />
          </div>

          <div>
            <span>Total Destinations</span>
            <h3>{destinations.length}</h3>
          </div>
        </div>

        <div className="client-destination-stat">
          <div className="client-destination-stat-icon green">
            <FiCheckCircle />
          </div>

          <div>
            <span>Active</span>
            <h3>{activeCount}</h3>
          </div>
        </div>

        <div className="client-destination-stat">
          <div className="client-destination-stat-icon red">
            <FiXCircle />
          </div>

          <div>
            <span>Inactive</span>
            <h3>{inactiveCount}</h3>
          </div>
        </div>

      </section>

      {/* TOOLBAR */}

      <section className="client-destination-content">

        <div className="client-destination-toolbar">

          <div className="client-destination-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="client-destination-filter">
            <FiFilter />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* CARDS */}

        <div className="client-destination-grid">

          {filteredDestinations.map((item) => (
            <article
              className="client-destination-card"
              key={item.id}
            >

              <div className="client-destination-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <span
                  className={`client-destination-status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>

                <div className="client-destination-rating">
                  <FiStar />
                  {item.rating}
                </div>

              </div>

              <div className="client-destination-card-body">

                <span className="client-destination-category">
                  {item.category}
                </span>

                <h2>{item.name}</h2>

                <div className="client-destination-location">
                  <FiMapPin />
                  <span>{item.state}</span>
                </div>

                <div className="client-destination-price">
                  <span>Starting from</span>
                  <strong>{item.price}</strong>
                </div>

                <div className="client-destination-actions">

                  <button
                    className="client-destination-view"
                    onClick={() =>
                      setSelectedDestination(item)
                    }
                  >
                    <FiEye />
                    View
                  </button>

                  <button
                    className="client-destination-edit"
                    onClick={() =>
                      setEditingDestination({ ...item })
                    }
                  >
                    <FiEdit3 />
                    Edit
                  </button>

                </div>

                <button
                  className={`client-destination-toggle ${
                    item.status === "Active"
                      ? "deactivate"
                      : "activate"
                  }`}
                  onClick={() =>
                    handleStatusChange(item.id)
                  }
                >
                  {item.status === "Active" ? (
                    <>
                      <FiXCircle />
                      Make Inactive
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      Make Active
                    </>
                  )}
                </button>

              </div>

            </article>
          ))}

        </div>

        {filteredDestinations.length === 0 && (
          <div className="client-destination-empty">
            <FiMapPin />
            <h3>No destination found</h3>
            <p>Try another destination name or status.</p>
          </div>
        )}

      </section>

      {/* VIEW MODAL */}

      {selectedDestination && (
        <div
          className="client-destination-modal-backdrop"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="client-destination-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="client-destination-modal-image">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
              />

              <button
                onClick={() =>
                  setSelectedDestination(null)
                }
              >
                ×
              </button>
            </div>

            <div className="client-destination-modal-body">

              <span>
                {selectedDestination.category}
              </span>

              <h2>
                {selectedDestination.name}
              </h2>

              <p>
                <FiMapPin />
                {selectedDestination.state}
              </p>

              <div className="client-destination-modal-info">

                <div>
                  <span>Starting Price</span>
                  <strong>
                    {selectedDestination.price}
                  </strong>
                </div>

                <div>
                  <span>Rating</span>
                  <strong>
                    {selectedDestination.rating}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    {selectedDestination.status}
                  </strong>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {editingDestination && (
        <div
          className="client-destination-modal-backdrop"
          onClick={() => setEditingDestination(null)}
        >

          <div
            className="client-edit-destination-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="client-edit-modal-header">
              <div>
                <span>EDIT DESTINATION</span>
                <h2>{editingDestination.name}</h2>
              </div>

              <button
                onClick={() =>
                  setEditingDestination(null)
                }
              >
                ×
              </button>
            </div>

            <div className="client-edit-form">

              <label>
                Destination Name

                <input
                  type="text"
                  name="name"
                  value={editingDestination.name}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Location

                <input
                  type="text"
                  name="state"
                  value={editingDestination.state}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Category

                <input
                  type="text"
                  name="category"
                  value={editingDestination.category}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Starting Price

                <input
                  type="text"
                  name="price"
                  value={editingDestination.price}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Rating

                <input
                  type="text"
                  name="rating"
                  value={editingDestination.rating}
                  onChange={handleEditChange}
                />
              </label>

            </div>

            <div className="client-edit-modal-actions">

              <button
                className="client-edit-cancel"
                onClick={() =>
                  setEditingDestination(null)
                }
              >
                Cancel
              </button>

              <button
                className="client-edit-save"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ClientDestinations;