import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiTrash2,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiUsers,
  FiShield,
} from "react-icons/fi";

import "./Booking.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85";

const Booking = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  /* =========================================================
     LOAD BOOKINGS
  ========================================================= */

  useEffect(() => {
    const loadBookings = () => {
      try {
        const data = JSON.parse(
          localStorage.getItem("tripBookings") || "[]"
        );

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Booking loading error:", error);
        setBookings([]);
      }
    };

    loadBookings();

    window.addEventListener(
      "tripBookingsUpdated",
      loadBookings
    );

    window.addEventListener(
      "storage",
      loadBookings
    );

    return () => {
      window.removeEventListener(
        "tripBookingsUpdated",
        loadBookings
      );

      window.removeEventListener(
        "storage",
        loadBookings
      );
    };
  }, []);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (value) => {
    if (!value) {
      return "Not selected";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (value) => {
    const amount = Number(value);

    if (Number.isNaN(amount)) {
      return value || "₹0";
    }

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     HOTEL IMAGE
  ========================================================= */

  const getImage = (booking) => {
    return (
      booking?.hotel?.image ||
      booking?.image ||
      booking?.hotelImage ||
      FALLBACK_IMAGE
    );
  };

  /* =========================================================
     HOTEL NAME
  ========================================================= */

  const getHotelName = (booking) => {
    return (
      booking?.hotel?.name ||
      booking?.hotelName ||
      "Selected Hotel"
    );
  };

  /* =========================================================
     HOTEL LOCATION
  ========================================================= */

  const getLocation = (booking) => {
    return (
      booking?.hotel?.location ||
      booking?.destination ||
      "Your Destination"
    );
  };

  /* =========================================================
     PRINT BOOKING
  ========================================================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================================================
     DELETE BOOKING
  ========================================================= */

  const handleDeleteBooking = (bookingToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    const updatedBookings = bookings.filter((item) => {
      /*
        If booking has an ID,
        use ID for deletion.
      */
      if (bookingToDelete?.id) {
        return item.id !== bookingToDelete.id;
      }

      /*
        Fallback if there is no ID.
      */
      return item !== bookingToDelete;
    });

    /*
      Update localStorage
    */
    localStorage.setItem(
      "tripBookings",
      JSON.stringify(updatedBookings)
    );

    /*
      Update React state immediately
    */
    setBookings(updatedBookings);

    /*
      Tell other components that bookings changed
    */
    window.dispatchEvent(
      new Event("tripBookingsUpdated")
    );
  };

  /* =========================================================
     EMPTY BOOKING
  ========================================================= */

  if (bookings.length === 0) {
    return (
      <div className="booking-page">

        <div className="booking-empty">

          <div className="empty-icon">
            <FiNavigation />
          </div>

          <span>TRIPPER</span>

          <h1>No Bookings Yet</h1>

          <p>
            Your confirmed trips will appear here after
            you complete your payment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/create-trip")}
          >
            Plan Your Trip
            <FiNavigation />
          </button>

        </div>

      </div>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <div className="booking-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="booking-page-header">

        <button
          type="button"
          className="booking-back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="booking-header-content">

          <span className="booking-brand">
            TRIPPER
          </span>

          <h1>My Booking</h1>

          <p>
            Your trip is confirmed. Here are all your
            journey and payment details.
          </p>

        </div>

        <button
          type="button"
          className="booking-print-btn"
          onClick={handlePrint}
        >
          <FiDownload />
          Print
        </button>

      </header>

      {/* =====================================================
          ALL BOOKINGS
      ===================================================== */}

      <div className="booking-container">

        {bookings.map((booking, index) => {

          const hotelImage = getImage(booking);

          const hotelName = getHotelName(booking);

          const location = getLocation(booking);

          const total =
            booking.total ||
            booking.totalBudget ||
            booking.budget ||
            0;

          const days =
            Number(booking.days) || 1;

          const travellers =
            Number(booking.travellers) ||
            Number(booking.adults) ||
            1;

          return (
            <section
              className="booking-wrapper"
              key={
                booking.id ||
                booking.transactionId ||
                index
              }
            >

              {/* =================================================
                  CONFIRMED HEADER
              ================================================= */}

              <div className="booking-confirmed-header">

                <div className="confirmed-left">

                  <div className="confirmed-icon">
                    <FiCheck />
                  </div>

                  <div>

                    <span>
                      BOOKING CONFIRMED
                    </span>

                    <h2>
                      Your trip is successfully booked
                    </h2>

                  </div>

                </div>

                {/* BOOKING ID */}

                <div className="booking-id-box">

                  <span>
                    BOOKING ID
                  </span>

                  <strong>
                    {booking.id || "TRP-BOOKING"}
                  </strong>

                </div>

                {/* DELETE BUTTON */}

                <button
                  type="button"
                  className="booking-delete-btn"
                  onClick={() =>
                    handleDeleteBooking(booking)
                  }
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

              {/* =================================================
                  MAIN CARD
              ================================================= */}

              <div className="booking-main-card">

                {/* IMAGE */}

                <div className="booking-image">

                  <img
                    src={hotelImage}
                    alt={hotelName}
                    onError={(e) => {
                      e.currentTarget.src =
                        FALLBACK_IMAGE;
                    }}
                  />

                  <div className="image-gradient" />

                  <div className="image-top-badge">
                    <FiCheckCircle />
                    Confirmed
                  </div>

                  <div className="image-location">

                    <FiMapPin />

                    <span>
                      {booking.destination ||
                        "Your Destination"}
                    </span>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="booking-main-details">

                  {/* HOTEL HEADING */}

                  <div className="hotel-heading-row">

                    <div>

                      <span className="small-label">
                        YOUR STAY
                      </span>

                      <h2>
                        {hotelName}
                      </h2>

                      <p className="hotel-location">
                        <FiMapPin />
                        {location}
                      </p>

                    </div>

                    {booking.hotel?.rating && (
                      <div className="rating-box">

                        <FiStar />

                        <strong>
                          {booking.hotel.rating}
                        </strong>

                        {booking.hotel.reviews && (
                          <span>
                            ({booking.hotel.reviews})
                          </span>
                        )}

                      </div>
                    )}

                  </div>

                  {/* =================================================
                      BASIC TRIP DETAILS
                  ================================================= */}

                  <div className="main-info-grid">

                    <div className="main-info-item">

                      <div className="main-info-icon">
                        <FiCalendar />
                      </div>

                      <div>

                        <span>
                          TRAVEL DATE
                        </span>

                        <strong>
                          {formatDate(
                            booking.date
                          )}
                        </strong>

                      </div>

                    </div>

                    <div className="main-info-item">

                      <div className="main-info-icon">
                        <FiClock />
                      </div>

                      <div>

                        <span>
                          DURATION
                        </span>

                        <strong>
                          {days}{" "}
                          {days === 1
                            ? "Day"
                            : "Days"}
                        </strong>

                      </div>

                    </div>

                    <div className="main-info-item">

                      <div className="main-info-icon">
                        <FiUsers />
                      </div>

                      <div>

                        <span>
                          TRAVELLERS
                        </span>

                        <strong>
                          {travellers}{" "}
                          {travellers === 1
                            ? "Traveller"
                            : "Travellers"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      TRIP SUMMARY
                  ================================================= */}

                  <div className="trip-summary">

                    <div className="trip-summary-heading">

                      <div>

                        <span>
                          YOUR JOURNEY
                        </span>

                        <h3>
                          Trip Details
                        </h3>

                      </div>

                      <FiNavigation />

                    </div>

                    <div className="trip-detail-grid">

                      <div>

                        <span>
                          Travel Type
                        </span>

                        <strong>
                          {booking.travelType ||
                            "Solo"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Travel Style
                        </span>

                        <strong>
                          {booking.style ||
                            "Relaxed"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Stay
                        </span>

                        <strong>
                          {booking.stay ||
                            "Any"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Transport
                        </span>

                        <strong>
                          {booking.transport ||
                            "Any"}
                        </strong>

                      </div>

                    </div>

                    {/* INTERESTS */}

                    {Array.isArray(
                      booking.interests
                    ) &&
                      booking.interests.length > 0 && (
                        <div className="interest-section">

                          <span>
                            INTERESTS
                          </span>

                          <div className="interest-list">

                            {booking.interests.map(
                              (
                                interest,
                                interestIndex
                              ) => (
                                <span
                                  key={`${interest}-${interestIndex}`}
                                >
                                  {interest}
                                </span>
                              )
                            )}

                          </div>

                        </div>
                      )}

                  </div>

                </div>

              </div>

              {/* =================================================
                  PAYMENT
              ================================================= */}

              <div className="payment-section">

                <div className="payment-heading">

                  <div className="payment-title-icon">
                    <FiCreditCard />
                  </div>

                  <div>

                    <span>
                      PAYMENT INFORMATION
                    </span>

                    <h3>
                      Payment Confirmed
                    </h3>

                  </div>

                </div>

                <div className="payment-content">

                  <div className="payment-item">

                    <span>
                      PAYMENT STATUS
                    </span>

                    <strong className="paid">

                      <FiCheckCircle />

                      {booking.paymentStatus ||
                        "Paid"}

                    </strong>

                  </div>

                  <div className="payment-item">

                    <span>
                      PAYMENT METHOD
                    </span>

                    <strong>
                      {booking.paymentMethod ||
                        "Online Payment"}
                    </strong>

                  </div>

                  <div className="payment-item">

                    <span>
                      TRANSACTION ID
                    </span>

                    <strong>
                      {booking.transactionId ||
                        "N/A"}
                    </strong>

                  </div>

                  <div className="payment-total">

                    <span>
                      TOTAL PAID
                    </span>

                    <strong>
                      {formatPrice(total)}
                    </strong>

                  </div>

                </div>

              </div>

             
              {/* =================================================
                  ITINERARY
              ================================================= */}

              {Array.isArray(
                booking.itinerary
              ) &&
                booking.itinerary.length > 0 && (
                  <div className="itinerary-section">

                    <div className="itinerary-heading">

                      <span>
                        YOUR TRIP PLAN
                      </span>

                      <h3>
                        Itinerary
                      </h3>

                    </div>

                    <div className="itinerary-list">

                      {booking.itinerary.map(
                        (
                          item,
                          itineraryIndex
                        ) => {

                          const title =
                            item?.title ||
                            item?.activity ||
                            item?.name ||
                            `Day ${
                              itineraryIndex + 1
                            }`;

                          const description =
                            item?.description ||
                            item?.details ||
                            item?.plan ||
                            "";

                          return (
                            <div
                              className="itinerary-item"
                              key={
                                item?.id ||
                                itineraryIndex
                              }
                            >

                              <div className="day-number">
                                {String(
                                  itineraryIndex + 1
                                ).padStart(2, "0")}
                              </div>

                              <div>

                                <span>
                                  DAY{" "}
                                  {itineraryIndex + 1}
                                </span>

                                <h4>
                                  {title}
                                </h4>

                                {description && (
                                  <p>
                                    {description}
                                  </p>
                                )}

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>
                )}

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="booking-footer">

                <div>

                  <FiCheckCircle />

                  <span>
                    Your booking is securely
                    stored with TRIPPER.
                  </span>

                </div>

                <span>

                  Booked on{" "}

                  {booking.bookedAt
                    ? formatDate(
                        booking.bookedAt
                      )
                    : "Today"}

                </span>

              </div>

            </section>
          );
        })}

      </div>

    </div>
  );
};

export default Booking;