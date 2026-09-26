import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiMapPin,
  FiUsers,
  FiClock,
  FiMail,
  FiPhone,
  FiUser,
  FiPackage,
  FiDownload,
} from "react-icons/fi";

import "./AdminBookingDetails.css";

const AdminBookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="booking-details-empty">
        <div>
          <h2>Booking not found</h2>
          <p>
            This booking information is not available.
          </p>

          <button onClick={() => navigate("/admin/bookings")}>
            <FiArrowLeft />
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="admin-booking-details">

      {/* TOP */}
      <div className="details-topbar">

        <button
          className="back-bookings-btn"
          onClick={() => navigate("/admin/bookings")}
        >
          <FiArrowLeft />
          Back to Bookings
        </button>

        <button className="download-booking-btn">
          <FiDownload />
          Download
        </button>

      </div>

      {/* HEADER */}
      <div className="details-heading">

        <div>
          <span>BOOKING DETAILS</span>

          <h1>{booking.id}</h1>

          <p>
            Created booking for{" "}
            <strong>{booking.customer}</strong>
          </p>
        </div>

        <div className="details-status-area">

          <span
            className={`detail-status ${booking.status.toLowerCase()}`}
          >
            <span></span>
            {booking.status}
          </span>

          <span
            className={`detail-payment ${booking.payment
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <FiCreditCard />
            {booking.payment}
          </span>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="booking-details-grid">

        {/* LEFT */}
        <div className="booking-details-main">

          {/* TRIP CARD */}
          <div className="details-card">

            <div className="details-card-header">
              <div>
                <span className="details-label">
                  TRIP INFORMATION
                </span>

                <h2>{booking.package}</h2>
              </div>

              <div className="trip-icon">
                <FiMapPin />
              </div>
            </div>

            <div className="trip-destination">

              <div className="destination-point">
                <div className="point-icon">
                  <FiMapPin />
                </div>

                <div>
                  <span>Destination</span>
                  <strong>{booking.destination}</strong>
                </div>
              </div>

              <div className="trip-line"></div>

              <div className="destination-point">
                <div className="point-icon calendar">
                  <FiCalendar />
                </div>

                <div>
                  <span>Travel Dates</span>

                  <strong>
                    {formatDate(booking.startDate)}
                  </strong>

                  <small>
                    to {formatDate(booking.endDate)}
                  </small>
                </div>
              </div>

            </div>

          </div>

          {/* CUSTOMER */}
          <div className="details-card">

            <div className="details-card-header">
              <div>
                <span className="details-label">
                  CUSTOMER INFORMATION
                </span>

                <h2>Guest Details</h2>
              </div>

              <div className="trip-icon">
                <FiUser />
              </div>
            </div>

            <div className="customer-detail-grid">

              <div className="customer-detail-item">

                <div className="customer-detail-icon">
                  <FiUser />
                </div>

                <div>
                  <span>Full Name</span>
                  <strong>{booking.customer}</strong>
                </div>

              </div>

              <div className="customer-detail-item">

                <div className="customer-detail-icon">
                  <FiMail />
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>{booking.email}</strong>
                </div>

              </div>

              <div className="customer-detail-item">

                <div className="customer-detail-icon">
                  <FiPhone />
                </div>

                <div>
                  <span>Phone Number</span>
                  <strong>+91 98765 43210</strong>
                </div>

              </div>

              <div className="customer-detail-item">

                <div className="customer-detail-icon">
                  <FiUsers />
                </div>

                <div>
                  <span>Total Travelers</span>
                  <strong>
                    {booking.travelers} Guests
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* PAYMENT */}
          <div className="details-card">

            <div className="details-card-header">

              <div>
                <span className="details-label">
                  PAYMENT
                </span>

                <h2>Payment Information</h2>
              </div>

              <div className="trip-icon payment-icon">
                <FiCreditCard />
              </div>

            </div>

            <div className="payment-summary">

              <div>
                <span>Booking Amount</span>

                <strong>
                  ₹{booking.amount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Payment Status</span>

                <strong className="payment-success">
                  <FiCheck />
                  {booking.payment}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <aside className="booking-details-sidebar">

          {/* PRICE */}
          <div className="price-card">

            <span>Total Booking Value</span>

            <h2>
              ₹{booking.amount.toLocaleString("en-IN")}
            </h2>

            <div className="price-divider"></div>

            <div className="price-row">
              <span>Package</span>
              <strong>{booking.package}</strong>
            </div>

            <div className="price-row">
              <span>Travelers</span>
              <strong>{booking.travelers}</strong>
            </div>

            <div className="price-row">
              <span>Payment</span>
              <strong>{booking.payment}</strong>
            </div>

          </div>

          {/* BOOKING TIMELINE */}
          <div className="timeline-card">

            <span className="details-label">
              BOOKING TIMELINE
            </span>

            <h3>Booking Activity</h3>

            <div className="timeline">

              <div className="timeline-item">

                <div className="timeline-icon completed">
                  <FiCheck />
                </div>

                <div>
                  <strong>Booking Created</strong>
                  <span>
                    Booking request received
                  </span>
                </div>

              </div>

              <div className="timeline-item">

                <div className="timeline-icon completed">
                  <FiCreditCard />
                </div>

                <div>
                  <strong>Payment Processed</strong>
                  <span>
                    Payment status: {booking.payment}
                  </span>
                </div>

              </div>

              <div className="timeline-item">

                <div
                  className={`timeline-icon ${
                    booking.status === "Confirmed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  <FiCheck />
                </div>

                <div>
                  <strong>Booking Status</strong>
                  <span>{booking.status}</span>
                </div>

              </div>

              <div className="timeline-item">

                <div className="timeline-icon pending">
                  <FiClock />
                </div>

                <div>
                  <strong>Trip Start</strong>
                  <span>
                    {formatDate(booking.startDate)}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};

export default AdminBookingDetails;