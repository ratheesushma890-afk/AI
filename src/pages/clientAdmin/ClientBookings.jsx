import React, { useMemo, useState } from "react";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiMapPin,
  FiUsers,
  FiEye,
  FiXCircle,
  FiFilter,
  FiCreditCard,
} from "react-icons/fi";

import "./ClientBookings.css";

const ClientBookings = () => {
  /* =========================================================
     BOOKING DATA
  ========================================================= */

  const [bookings, setBookings] = useState([
    {
      id: "#TRP-1048",
      customer: "Aarav Sharma",
      email: "aarav@gmail.com",
      destination: "Goa",
      date: "12 Oct 2026",
      travellers: 2,
      amount: "₹28,500",
      status: "Confirmed",
    },
    {
      id: "#TRP-1047",
      customer: "Priya Verma",
      email: "priya@gmail.com",
      destination: "Manali",
      date: "18 Oct 2026",
      travellers: 4,
      amount: "₹42,800",
      status: "Confirmed",
    },
    {
      id: "#TRP-1046",
      customer: "Rahul Mehta",
      email: "rahul@gmail.com",
      destination: "Jaipur",
      date: "24 Oct 2026",
      travellers: 2,
      amount: "₹31,500",
      status: "Pending",
    },
    {
      id: "#TRP-1045",
      customer: "Ananya Singh",
      email: "ananya@gmail.com",
      destination: "Kerala",
      date: "02 Nov 2026",
      travellers: 3,
      amount: "₹35,600",
      status: "Confirmed",
    },
    {
      id: "#TRP-1044",
      customer: "Vikram Yadav",
      email: "vikram@gmail.com",
      destination: "Udaipur",
      date: "08 Nov 2026",
      travellers: 2,
      amount: "₹24,900",
      status: "Pending",
    },
    {
      id: "#TRP-1043",
      customer: "Neha Kapoor",
      email: "neha@gmail.com",
      destination: "Rishikesh",
      date: "15 Nov 2026",
      travellers: 5,
      amount: "₹38,400",
      status: "Cancelled",
    },
  ]);

  /* =========================================================
     STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);

  /* =========================================================
     COUNTS
  ========================================================= */

  const confirmedCount = bookings.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pendingCount = bookings.filter(
    (item) => item.status === "Pending"
  ).length;

  const cancelledCount = bookings.filter(
    (item) => item.status === "Cancelled"
  ).length;

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(searchValue) ||
        booking.customer.toLowerCase().includes(searchValue) ||
        booking.destination.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "All" || booking.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  /* =========================================================
     CHANGE STATUS
  ========================================================= */

  const handleStatusChange = (id, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: newStatus,
            }
          : booking
      )
    );

    setSelectedBooking((prev) =>
      prev?.id === id
        ? {
            ...prev,
            status: newStatus,
          }
        : prev
    );
  };

  return (
    <div className="client-bookings-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="client-bookings-heading">

        <div>
          <span>BOOKING MANAGEMENT</span>

          <h1>Customer Bookings</h1>

          <p>
            View customer trips and manage booking status
            from your client admin panel.
          </p>
        </div>

        <div className="client-booking-date">
          <FiCalendar />

          <div>
            <span>Management</span>
            <strong>Bookings</strong>
          </div>
        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="client-booking-stats">

        <div className="client-booking-stat">

          <div className="client-booking-stat-icon total">
            <FiCalendar />
          </div>

          <div>
            <span>Total Bookings</span>
            <h3>{bookings.length}</h3>
          </div>

        </div>

        <div className="client-booking-stat">

          <div className="client-booking-stat-icon confirmed">
            <FiCheckCircle />
          </div>

          <div>
            <span>Confirmed</span>
            <h3>{confirmedCount}</h3>
          </div>

        </div>

        <div className="client-booking-stat">

          <div className="client-booking-stat-icon pending">
            <FiClock />
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingCount}</h3>
          </div>

        </div>

        <div className="client-booking-stat">

          <div className="client-booking-stat-icon cancelled">
            <FiXCircle />
          </div>

          <div>
            <span>Cancelled</span>
            <h3>{cancelledCount}</h3>
          </div>

        </div>

      </section>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <section className="client-bookings-card">

        {/* TOOLBAR */}

        <div className="client-bookings-toolbar">

          <div className="client-booking-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search booking, customer or destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="client-booking-filter">
            <FiFilter />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

        {/* TABLE */}

        <div className="client-booking-table-wrap">

          <table className="client-booking-table">

            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Travel Date</th>
                <th>Travellers</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>

                    <td>
                      <strong className="client-booking-id">
                        {booking.id}
                      </strong>
                    </td>

                    <td>
                      <div className="client-customer-info">

                        <div className="client-customer-avatar">
                          {booking.customer
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <strong>{booking.customer}</strong>
                          <span>{booking.email}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="client-destination-cell">
                        <FiMapPin />
                        {booking.destination}
                      </div>
                    </td>

                    <td>{booking.date}</td>

                    <td>
                      <div className="client-traveller-cell">
                        <FiUsers />
                        {booking.travellers}
                      </div>
                    </td>

                    <td>
                      <strong className="client-booking-amount">
                        {booking.amount}
                      </strong>
                    </td>

                    <td>

                      <select
                        className={`client-status-select ${booking.status.toLowerCase()}`}
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(
                            booking.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>

                    </td>

                    <td>
                      <button
                        className="client-view-booking"
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                      >
                        <FiEye />
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="client-no-bookings"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* =====================================================
          BOOKING DETAILS MODAL
      ===================================================== */}

      {selectedBooking && (
        <div
          className="client-booking-modal-backdrop"
          onClick={() => setSelectedBooking(null)}
        >

          <div
            className="client-booking-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="client-booking-modal-header">

              <div>
                <span>BOOKING DETAILS</span>
                <h2>{selectedBooking.id}</h2>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
              >
                <FiXCircle />
              </button>

            </div>

            <div className="client-booking-modal-destination">

              <div className="client-modal-location-icon">
                <FiMapPin />
              </div>

              <div>
                <span>Destination</span>
                <h3>{selectedBooking.destination}</h3>
              </div>

            </div>

            <div className="client-booking-detail-grid">

              <div>
                <span>Customer</span>
                <strong>
                  {selectedBooking.customer}
                </strong>
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {selectedBooking.email}
                </strong>
              </div>

              <div>
                <span>Travel Date</span>
                <strong>
                  {selectedBooking.date}
                </strong>
              </div>

              <div>
                <span>Travellers</span>
                <strong>
                  {selectedBooking.travellers}
                </strong>
              </div>

              <div>
                <span>Trip Amount</span>
                <strong>
                  {selectedBooking.amount}
                </strong>
              </div>

              <div>
                <span>Current Status</span>

                <strong
                  className={`client-modal-status ${selectedBooking.status.toLowerCase()}`}
                >
                  {selectedBooking.status}
                </strong>
              </div>

            </div>

            <div className="client-booking-modal-payment">

              <FiCreditCard />

              <div>
                <span>Booking Amount</span>
                <strong>
                  {selectedBooking.amount}
                </strong>
              </div>

            </div>

            <div className="client-modal-actions">

              <button
                className="client-modal-close"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>

              {selectedBooking.status !== "Confirmed" && (
                <button
                  className="client-modal-confirm"
                  onClick={() =>
                    handleStatusChange(
                      selectedBooking.id,
                      "Confirmed"
                    )
                  }
                >
                  <FiCheckCircle />
                  Confirm Booking
                </button>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ClientBookings;