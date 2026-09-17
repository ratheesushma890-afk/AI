
import { useState } from "react";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      trip: "Dubai Escape",
      date: "20 Oct 2026",
      amount: "₹45,000",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Priya Singh",
      trip: "Paris Tour",
      date: "25 Oct 2026",
      amount: "₹85,000",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Aman Verma",
      trip: "Bali Adventure",
      date: "02 Nov 2026",
      amount: "₹62,000",
      status: "Confirmed",
    },
    {
      id: 4,
      customer: "Neha Kapoor",
      trip: "Maldives Escape",
      date: "12 Nov 2026",
      amount: "₹55,000",
      status: "Cancelled",
    },
  ]);

  const [search, setSearch] = useState("");

  const updateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const deleteBooking = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (confirmDelete) {
      setBookings(
        bookings.filter((booking) => booking.id !== id)
      );
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.trip
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="admin-bookings-page">

      {/* HEADER */}
      <div className="admin-bookings-header">
        <div>
          <h1>Bookings</h1>
          <p>Manage all customer bookings</p>
        </div>

        <div className="booking-total">
          {filteredBookings.length} Bookings
        </div>
      </div>

      {/* SEARCH */}
      <div className="bookings-toolbar">
        <input
          type="text"
          placeholder="Search customer or trip..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select>
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bookings-table">

        <div className="booking-row booking-head">
          <span>Customer</span>
          <span>Trip</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              className="booking-row"
              key={booking.id}
            >

              <strong>
                👤 {booking.customer}
              </strong>

              <span>
                ✈️ {booking.trip}
              </span>

              <span>
                {booking.date}
              </span>

              <span className="booking-amount">
                {booking.amount}
              </span>

              <select
                className={`booking-status ${booking.status.toLowerCase()}`}
                value={booking.status}
                onChange={(e) =>
                  updateStatus(
                    booking.id,
                    e.target.value
                  )
                }
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>

              <button
                className="booking-delete"
                onClick={() =>
                  deleteBooking(booking.id)
                }
              >
                Delete
              </button>

            </div>
          ))
        ) : (
          <div className="no-bookings">
            No bookings found
          </div>
        )}

      </div>

    </div>
  );
}

