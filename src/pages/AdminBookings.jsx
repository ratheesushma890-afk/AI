import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiEye,
  FiX,
  FiCheck,
  FiClock,
  FiCreditCard,
} from "react-icons/fi";

import "./AdminBookings.css";

const demoBookings = [
  {
    id: "BK-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    destination: "Manali",
    startDate: "2026-10-04",
    endDate: "2026-10-08",
    travelers: 2,
    package: "Manali Adventure",
    amount: 24999,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    customer: "Priya Verma",
    email: "priya@example.com",
    destination: "Goa",
    startDate: "2026-10-12",
    endDate: "2026-10-16",
    travelers: 3,
    package: "Goa Beach Escape",
    amount: 32999,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "BK-1003",
    customer: "Amit Kumar",
    email: "amit@example.com",
    destination: "Dubai",
    startDate: "2026-11-02",
    endDate: "2026-11-07",
    travelers: 2,
    package: "Dubai Explorer",
    amount: 68999,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "BK-1004",
    customer: "Neha Singh",
    email: "neha@example.com",
    destination: "Kerala",
    startDate: "2026-10-20",
    endDate: "2026-10-24",
    travelers: 4,
    package: "Kerala Nature Trip",
    amount: 45999,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "BK-1005",
    customer: "Vikas Yadav",
    email: "vikas@example.com",
    destination: "Jaipur",
    startDate: "2026-09-28",
    endDate: "2026-10-01",
    travelers: 2,
    package: "Royal Jaipur",
    amount: 18999,
    payment: "Refunded",
    status: "Cancelled",
  },
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(demoBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        booking.id.toLowerCase().includes(searchText) ||
        booking.customer.toLowerCase().includes(searchText) ||
        booking.email.toLowerCase().includes(searchText) ||
        booking.destination.toLowerCase().includes(searchText) ||
        booking.package.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pendingBookings = bookings.filter(
    (item) => item.status === "Pending"
  ).length;

  const cancelledBookings = bookings.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: newStatus,
              payment:
                newStatus === "Cancelled"
                  ? "Refunded"
                  : booking.payment,
            }
          : booking
      )
    );

    setSelectedBooking((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
            payment:
              newStatus === "Cancelled" ? "Refunded" : prev.payment,
          }
        : prev
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-bookings-page">

      {/* Header */}
      <div className="bookings-header">
        <div>
          <span className="bookings-eyebrow">ADMIN PANEL</span>

          <h1>
            Bookings <span>Management</span>
          </h1>

          <p>
            View, manage and track all customer trip bookings.
          </p>
        </div>

        <div className="booking-date-box">
          <FiCalendar />
          <div>
            <small>Today</small>
            <strong>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </strong>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="booking-stats">

        <div className="booking-stat-card">
          <div className="stat-icon blue">
            <FiCalendar />
          </div>

          <div>
            <span>Total Bookings</span>
            <strong>{totalBookings}</strong>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="stat-icon green">
            <FiCheck />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>{confirmedBookings}</strong>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="stat-icon orange">
            <FiClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingBookings}</strong>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="stat-icon red">
            <FiX />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelledBookings}</strong>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="bookings-toolbar">

        <div className="booking-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search booking, customer, destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="booking-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="bookings-table-card">

        <div className="table-heading">
          <div>
            <h2>All Bookings</h2>
            <p>
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          </div>
        </div>

        <div className="bookings-table-wrapper">

          <table className="bookings-table">

            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Travel Date</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (

                  <tr key={booking.id}>

                    <td>
                      <div className="booking-id">
                        <strong>{booking.id}</strong>
                        <span>{booking.package}</span>
                      </div>
                    </td>

                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {booking.customer.charAt(0)}
                        </div>

                        <div>
                          <strong>{booking.customer}</strong>
                          <span>{booking.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="destination-cell">
                        <FiMapPin />
                        {booking.destination}
                      </div>
                    </td>

                    <td>
                      <div className="date-cell">
                        <strong>{formatDate(booking.startDate)}</strong>
                        <span>to {formatDate(booking.endDate)}</span>
                      </div>
                    </td>

                    <td>
                      <div className="guests-cell">
                        <FiUsers />
                        {booking.travelers}
                      </div>
                    </td>

                    <td>
                      <strong className="amount-cell">
                        ₹{booking.amount.toLocaleString("en-IN")}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`payment-badge ${booking.payment
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <FiCreditCard />
                        {booking.payment}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${booking.status.toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-booking-btn"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <FiEye />
                        View
                      </button>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td colSpan="9">
                    <div className="empty-bookings">
                      <FiSearch />
                      <h3>No bookings found</h3>
                      <p>
                        Try changing your search or status filter.
                      </p>
                    </div>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (

        <div
          className="booking-modal-overlay"
          onClick={() => setSelectedBooking(null)}
        >

          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span>BOOKING DETAILS</span>
                <h2>{selectedBooking.id}</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedBooking(null)}
              >
                <FiX />
              </button>

            </div>

            <div className="modal-status-row">

              <span
                className={`status-badge ${selectedBooking.status.toLowerCase()}`}
              >
                <span className="status-dot"></span>
                {selectedBooking.status}
              </span>

              <span
                className={`payment-badge ${selectedBooking.payment
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <FiCreditCard />
                {selectedBooking.payment}
              </span>

            </div>

            <div className="booking-detail-grid">

              <div className="detail-item">
                <span>Customer</span>
                <strong>{selectedBooking.customer}</strong>
                <small>{selectedBooking.email}</small>
              </div>

              <div className="detail-item">
                <span>Destination</span>
                <strong>{selectedBooking.destination}</strong>
              </div>

              <div className="detail-item">
                <span>Package</span>
                <strong>{selectedBooking.package}</strong>
              </div>

              <div className="detail-item">
                <span>Travelers</span>
                <strong>{selectedBooking.travelers} Guests</strong>
              </div>

              <div className="detail-item">
                <span>Start Date</span>
                <strong>{formatDate(selectedBooking.startDate)}</strong>
              </div>

              <div className="detail-item">
                <span>End Date</span>
                <strong>{formatDate(selectedBooking.endDate)}</strong>
              </div>

              <div className="detail-item full">
                <span>Total Amount</span>
                <strong className="modal-amount">
                  ₹{selectedBooking.amount.toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="modal-actions">

              {selectedBooking.status !== "Confirmed" && (
                <button
                  className="confirm-btn"
                  onClick={() =>
                    updateStatus(selectedBooking.id, "Confirmed")
                  }
                >
                  <FiCheck />
                  Confirm Booking
                </button>
              )}

              {selectedBooking.status !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    updateStatus(selectedBooking.id, "Cancelled")
                  }
                >
                  <FiX />
                  Cancel Booking
                </button>
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminBookings;