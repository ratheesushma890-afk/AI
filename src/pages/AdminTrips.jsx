import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiEye,
  FiFilter,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./AdminTrips.css";

const AdminTrips = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([
    {
      id: "TRP-1001",
      title: "Goa Beach Escape",
      destination: "Goa",
      country: "India",
      category: "Beach",
      duration: "4 Days / 3 Nights",
      price: 28500,
      guests: 4,
      bookings: 128,
      status: "Published",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      date: "12 Oct 2026",
    },
    {
      id: "TRP-1002",
      title: "Manali Mountain Adventure",
      destination: "Manali",
      country: "India",
      category: "Adventure",
      duration: "5 Days / 4 Nights",
      price: 32900,
      guests: 6,
      bookings: 96,
      status: "Published",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      date: "18 Oct 2026",
    },
    {
      id: "TRP-1003",
      title: "Dubai Luxury Escape",
      destination: "Dubai",
      country: "UAE",
      category: "Luxury",
      duration: "6 Days / 5 Nights",
      price: 89500,
      guests: 4,
      bookings: 74,
      status: "Published",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      date: "25 Oct 2026",
    },
    {
      id: "TRP-1004",
      title: "Kerala Backwater Retreat",
      destination: "Kerala",
      country: "India",
      category: "Nature",
      duration: "5 Days / 4 Nights",
      price: 36900,
      guests: 5,
      bookings: 61,
      status: "Draft",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      date: "02 Nov 2026",
    },
    {
      id: "TRP-1005",
      title: "Bali Tropical Journey",
      destination: "Bali",
      country: "Indonesia",
      category: "International",
      duration: "7 Days / 6 Nights",
      price: 74900,
      guests: 4,
      bookings: 89,
      status: "Published",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      date: "10 Nov 2026",
    },
    {
      id: "TRP-1006",
      title: "Rajasthan Royal Heritage",
      destination: "Jaipur",
      country: "India",
      category: "Heritage",
      duration: "4 Days / 3 Nights",
      price: 31500,
      guests: 5,
      bookings: 48,
      status: "Draft",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      date: "16 Nov 2026",
    },
    {
      id: "TRP-1007",
      title: "Kashmir Paradise Tour",
      destination: "Kashmir",
      country: "India",
      category: "Nature",
      duration: "6 Days / 5 Nights",
      price: 45900,
      guests: 5,
      bookings: 112,
      status: "Published",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566837497312-7be4f1f5d1b4?auto=format&fit=crop&w=800&q=80",
      date: "22 Nov 2026",
    },
    {
      id: "TRP-1008",
      title: "Singapore City Explorer",
      destination: "Singapore",
      country: "Singapore",
      category: "International",
      duration: "5 Days / 4 Nights",
      price: 68900,
      guests: 4,
      bookings: 53,
      status: "Inactive",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      date: "29 Nov 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [deleteTrip, setDeleteTrip] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        trip.title.toLowerCase().includes(searchValue) ||
        trip.destination.toLowerCase().includes(searchValue) ||
        trip.id.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        trip.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        trip.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    trips,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTrips.length / itemsPerPage)
  );

  const visibleTrips = filteredTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalTrips = trips.length;

  const publishedTrips = trips.filter(
    (trip) => trip.status === "Published"
  ).length;

  const draftTrips = trips.filter(
    (trip) => trip.status === "Draft"
  ).length;

  const totalBookings = trips.reduce(
    (sum, trip) => sum + trip.bookings,
    0
  );

  const handleDelete = () => {
    if (!deleteTrip) return;

    setTrips((prev) =>
      prev.filter(
        (trip) => trip.id !== deleteTrip.id
      )
    );

    setDeleteTrip(null);

    if (
      visibleTrips.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((page) =>
        Math.max(1, page - 1)
      );
    }
  };

  const handleStatusChange = (
    tripId,
    newStatus
  ) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              status: newStatus,
            }
          : trip
      )
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="admin-trips-page">
      {/* HEADER */}
      <div className="admin-trips-header">
        <div>
          <span className="admin-section-label">
            TRIP MANAGEMENT
          </span>

          <h1>Trips</h1>

          <p>
            Create, manage and monitor all travel
            packages from one place.
          </p>
        </div>

        <button
          className="admin-add-trip-btn"
          onClick={() =>
            navigate(
              "/admin-secret/dashboard/trips/new"
            )
          }
        >
          <FiPlus />
          Add New Trip
        </button>
      </div>

      {/* STATS */}
      <div className="admin-trip-stats">
        <div className="admin-trip-stat-card">
          <div className="trip-stat-icon gold">
            <FiMapPin />
          </div>

          <div>
            <span>Total Trips</span>

            <strong>{totalTrips}</strong>

            <small>
              <FiArrowUpRight />
              12.5% this month
            </small>
          </div>
        </div>

        <div className="admin-trip-stat-card">
          <div className="trip-stat-icon green">
            <FiEye />
          </div>

          <div>
            <span>Published</span>

            <strong>{publishedTrips}</strong>

            <small>
              Active packages
            </small>
          </div>
        </div>

        <div className="admin-trip-stat-card">
          <div className="trip-stat-icon orange">
            <FiEdit3 />
          </div>

          <div>
            <span>Draft Trips</span>

            <strong>{draftTrips}</strong>

            <small>
              Need attention
            </small>
          </div>
        </div>

        <div className="admin-trip-stat-card">
          <div className="trip-stat-icon blue">
            <FiUsers />
          </div>

          <div>
            <span>Total Bookings</span>

            <strong>
              {totalBookings.toLocaleString(
                "en-IN"
              )}
            </strong>

            <small>
              Across all trips
            </small>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="admin-trip-toolbar">
        <div className="trip-search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search trips, destinations or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="trip-filter-group">
          <div className="trip-filter-select">
            <FiFilter />

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            >
              <option value="All">
                All Categories
              </option>

              <option value="Beach">
                Beach
              </option>

              <option value="Adventure">
                Adventure
              </option>

              <option value="Luxury">
                Luxury
              </option>

              <option value="Nature">
                Nature
              </option>

              <option value="International">
                International
              </option>

              <option value="Heritage">
                Heritage
              </option>
            </select>
          </div>

          <div className="trip-filter-select">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            >
              <option value="All">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="admin-trips-card">
        <div className="admin-trips-card-head">
          <div>
            <h2>All Trips</h2>

            <p>
              {filteredTrips.length} trips found
            </p>
          </div>

          <div className="trip-result-count">
            Showing{" "}
            {filteredTrips.length === 0
              ? 0
              : (currentPage - 1) *
                  itemsPerPage +
                1}
            -
            {Math.min(
              currentPage * itemsPerPage,
              filteredTrips.length
            )}{" "}
            of {filteredTrips.length}
          </div>
        </div>

        <div className="admin-trips-table-wrapper">
          <table className="admin-trips-table">
            <thead>
              <tr>
                <th>TRIP</th>
                <th>DESTINATION</th>
                <th>PRICE</th>
                <th>BOOKINGS</th>
                <th>RATING</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {visibleTrips.length > 0 ? (
                visibleTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <div className="trip-table-info">
                        <img
                          src={trip.image}
                          alt={trip.title}
                        />

                        <div>
                          <strong>
                            {trip.title}
                          </strong>

                          <span>
                            {trip.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="trip-destination">
                        <FiMapPin />

                        <div>
                          <strong>
                            {trip.destination}
                          </strong>

                          <span>
                            {trip.country}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="trip-price">
                        {formatPrice(
                          trip.price
                        )}
                      </strong>

                      <span className="trip-duration">
                        {trip.duration}
                      </span>
                    </td>

                    <td>
                      <div className="trip-bookings">
                        <strong>
                          {trip.bookings}
                        </strong>

                        <span>
                          bookings
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="trip-rating">
                        <span>★</span>

                        {trip.rating}
                      </div>
                    </td>

                    <td>
                      <select
                        className={`trip-status-select ${trip.status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                        value={trip.status}
                        onChange={(e) =>
                          handleStatusChange(
                            trip.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Published">
                          Published
                        </option>

                        <option value="Draft">
                          Draft
                        </option>

                        <option value="Inactive">
                          Inactive
                        </option>
                      </select>
                    </td>

                    <td>
                      <div className="trip-actions">
                        <button
                          type="button"
                          className="trip-action view"
                          title="View"
                          onClick={() =>
                            setSelectedTrip(
                              trip
                            )
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          className="trip-action edit"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/admin-secret/dashboard/trips/edit/${trip.id}`
                            )
                          }
                        >
                          <FiEdit3 />
                        </button>

                        <button
                          type="button"
                          className="trip-action delete"
                          title="Delete"
                          onClick={() =>
                            setDeleteTrip(
                              trip
                            )
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
                    className="trip-empty"
                  >
                    <FiMapPin />

                    <strong>
                      No trips found
                    </strong>

                    <span>
                      Try changing your search
                      or filters.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredTrips.length > itemsPerPage && (
          <div className="admin-trip-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <FiChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {selectedTrip && (
        <div
          className="admin-trip-modal-overlay"
          onClick={() =>
            setSelectedTrip(null)
          }
        >
          <div
            className="admin-trip-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="trip-modal-close"
              onClick={() =>
                setSelectedTrip(null)
              }
            >
              <FiX />
            </button>

            <img
              className="trip-modal-image"
              src={selectedTrip.image}
              alt={selectedTrip.title}
            />

            <div className="trip-modal-content">
              <span className="trip-modal-id">
                {selectedTrip.id}
              </span>

              <h2>
                {selectedTrip.title}
              </h2>

              <div className="trip-modal-location">
                <FiMapPin />

                {selectedTrip.destination},{" "}
                {selectedTrip.country}
              </div>

              <div className="trip-modal-grid">
                <div>
                  <span>Category</span>

                  <strong>
                    {selectedTrip.category}
                  </strong>
                </div>

                <div>
                  <span>Duration</span>

                  <strong>
                    {selectedTrip.duration}
                  </strong>
                </div>

                <div>
                  <span>Price</span>

                  <strong>
                    {formatPrice(
                      selectedTrip.price
                    )}
                  </strong>
                </div>

                <div>
                  <span>Guests</span>

                  <strong>
                    Up to{" "}
                    {selectedTrip.guests}
                  </strong>
                </div>

                <div>
                  <span>Bookings</span>

                  <strong>
                    {selectedTrip.bookings}
                  </strong>
                </div>

                <div>
                  <span>Rating</span>

                  <strong>
                    ★ {selectedTrip.rating}
                  </strong>
                </div>
              </div>

              <div className="trip-modal-footer">
                <span
                  className={`trip-modal-status ${selectedTrip.status
                    .toLowerCase()
                    .replace(
                      " ",
                      "-"
                    )}`}
                >
                  {selectedTrip.status}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const id =
                      selectedTrip.id;

                    setSelectedTrip(null);

                    navigate(
                      `/admin-secret/dashboard/trips/edit/${id}`
                    );
                  }}
                >
                  <FiEdit3 />

                  Edit Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTrip && (
        <div className="admin-trip-modal-overlay">
          <div className="admin-delete-modal">
            <div className="delete-icon">
              <FiTrash2 />
            </div>

            <h2>
              Delete this trip?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteTrip.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="delete-actions">
              <button
                type="button"
                className="delete-cancel"
                onClick={() =>
                  setDeleteTrip(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm"
                onClick={handleDelete}
              >
                <FiTrash2 />

                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrips;