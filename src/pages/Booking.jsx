import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiUsers,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";

import "./Booking.css";

const FALLBACK_HOTEL_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90";


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (value) => {
  if (!value) {
    return "Date not selected";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


/* =========================================================
   FORMAT CURRENCY
========================================================= */

const formatCurrency = (number) => {
  return `₹${Number(number || 0).toLocaleString("en-IN")}`;
};


/* =========================================================
   BOOKING PAGE
========================================================= */

const Booking = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);


  /* =========================================================
     LOAD BOOKINGS
  ========================================================= */

  const loadBookings = () => {
    try {
      const storedBookings = JSON.parse(
        localStorage.getItem("tripBookings") || "[]"
      );

      if (Array.isArray(storedBookings)) {
        setBookings(storedBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Invalid booking data:", error);
      setBookings([]);
    }
  };


  /* =========================================================
     LOAD ON PAGE OPEN
  ========================================================= */

  useEffect(() => {
    loadBookings();

    const handleBookingUpdate = () => {
      loadBookings();
    };

    window.addEventListener(
      "tripBookingsUpdated",
      handleBookingUpdate
    );

    window.addEventListener(
      "storage",
      handleBookingUpdate
    );

    return () => {
      window.removeEventListener(
        "tripBookingsUpdated",
        handleBookingUpdate
      );

      window.removeEventListener(
        "storage",
        handleBookingUpdate
      );
    };
  }, []);


  /* =========================================================
     DELETE BOOKING
  ========================================================= */

  const deleteBooking = (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );

      localStorage.setItem(
        "tripBookings",
        JSON.stringify(updatedBookings)
      );

      setBookings(updatedBookings);

      window.dispatchEvent(
        new Event("tripBookingsUpdated")
      );
    } catch (error) {
      console.error(
        "Booking delete error:",
        error
      );

      alert("Booking delete nahi ho saki.");
    }
  };


  /* =========================================================
     VIEW TRIP
  ========================================================= */

  const viewTrip = (booking) => {
    /*
      Current CreateTrip page localStorage se
      tripperTrip read karti hai.

      Isliye selected booking ko tripperTrip mein
      save karke CreateTrip par bhej rahe hain.
    */

    try {
      const tripToView = {
        destination: booking.destination || "",
        country: booking.country || "",
        date: booking.date || "",
        days: booking.days || 1,
        travellers: booking.travellers || 1,
        budget:
          booking.budget ||
          "₹25,000 – ₹50,000",
        travelType:
          booking.travelType || "Solo",
        style:
          booking.style || "Relaxed",
        stay:
          booking.stay || "Any",
        transport:
          booking.transport || "Any",
        interests:
          Array.isArray(booking.interests)
            ? booking.interests
            : [],
      };

      localStorage.setItem(
        "tripperTrip",
        JSON.stringify(tripToView)
      );

      navigate("/create-trip");
    } catch (error) {
      console.error(
        "Could not open trip:",
        error
      );

      navigate("/create-trip");
    }
  };


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="booking-page">

      {/* =====================================================
          HEADER / HERO
      ===================================================== */}

      <section className="booking-hero">

        <button
          type="button"
          className="booking-back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>


        <div className="booking-hero-content">

          <span>
            TRAVELER ACCOUNT
          </span>

          <h1>
            My Bookings
          </h1>

          <p>
            All your confirmed trips are
            safely saved here.
          </p>

        </div>


        {/* TOTAL BOOKINGS */}

        <div className="booking-total-box">

          <strong>
            {bookings.length}
          </strong>

          <span>
            {bookings.length === 1
              ? "Confirmed Trip"
              : "Confirmed Trips"}
          </span>

        </div>

      </section>


      {/* =====================================================
          BOOKINGS CONTENT
      ===================================================== */}

      <section className="booking-content">

        {/* ===================================================
            EMPTY
        =================================================== */}

        {bookings.length === 0 ? (

          <div className="booking-empty">

            <div className="booking-empty-icon">
              <FiCalendar />
            </div>

            <span>
              NO BOOKINGS
            </span>

            <h2>
              No trips booked yet
            </h2>

            <p>
              Create a trip and confirm your
              booking. Your trip will appear here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/trip-plan")
              }
            >
              Plan a Trip
              <FiNavigation />
            </button>

          </div>

        ) : (

          /* =================================================
             BOOKING LIST
          ================================================= */

          <div className="booking-list-page">

            {bookings.map(
              (booking, index) => (

                <article
                  className="booking-page-card"
                  key={
                    booking.id ||
                    `${booking.destination}-${index}`
                  }
                >

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="booking-page-image">

                    <img
                      src={
                        booking.hotel?.image ||
                        booking.image ||
                        FALLBACK_HOTEL_IMAGE
                      }
                      alt={
                        booking.destination ||
                        "Travel destination"
                      }
                      onError={(e) => {
                        e.currentTarget.src =
                          FALLBACK_HOTEL_IMAGE;
                      }}
                    />


                    <div className="booking-image-overlay" />


                    {/* STATUS */}

                    <span className="booking-status">

                      <FiCheckCircle />

                      CONFIRMED

                    </span>


                    {/* DESTINATION */}

                    <div className="booking-destination">

                      <span>
                        {booking.country ||
                          "Travel"}
                      </span>

                      <h2>
                        {booking.destination ||
                          "Your Trip"}
                      </h2>

                    </div>

                  </div>


                  {/* =========================================
                      DETAILS
                  ========================================= */}

                  <div className="booking-page-details">


                    {/* BOOKING NUMBER */}

                    <div className="booking-number">

                      BOOKING #
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}

                    </div>


                    {/* =======================================
                        INFO GRID
                    ======================================= */}

                    <div className="booking-info-grid">


                      {/* DATE */}

                      <div className="booking-info-item">

                        <div className="booking-info-icon">
                          <FiCalendar />
                        </div>

                        <div>

                          <small>
                            TRAVEL DATE
                          </small>

                          <strong>
                            {formatDate(
                              booking.date
                            )}
                          </strong>

                        </div>

                      </div>


                      {/* DURATION */}

                      <div className="booking-info-item">

                        <div className="booking-info-icon">
                          <FiClock />
                        </div>

                        <div>

                          <small>
                            DURATION
                          </small>

                          <strong>
                            {booking.days || 1}{" "}
                            {Number(
                              booking.days || 1
                            ) === 1
                              ? "Day"
                              : "Days"}
                          </strong>

                        </div>

                      </div>


                      {/* TRAVELLERS */}

                      <div className="booking-info-item">

                        <div className="booking-info-icon">
                          <FiUsers />
                        </div>

                        <div>

                          <small>
                            TRAVELLERS
                          </small>

                          <strong>
                            {booking.travellers ||
                              1}
                          </strong>

                        </div>

                      </div>


                      {/* BUDGET */}

                      <div className="booking-info-item">

                        <div className="booking-info-icon">
                          <FiNavigation />
                        </div>

                        <div>

                          <small>
                            TOTAL BUDGET
                          </small>

                          <strong>
                            {formatCurrency(
                              booking.totalBudget
                            )}
                          </strong>

                        </div>

                      </div>

                    </div>


                    {/* =======================================
                        HOTEL
                    ======================================= */}

                    {booking.hotel && (

                      <div className="booking-hotel">

                        <img
                          src={
                            booking.hotel.image ||
                            FALLBACK_HOTEL_IMAGE
                          }
                          alt={
                            booking.hotel.name ||
                            "Hotel"
                          }
                          onError={(e) => {
                            e.currentTarget.src =
                              FALLBACK_HOTEL_IMAGE;
                          }}
                        />


                        <div className="booking-hotel-info">

                          <small>
                            YOUR STAY
                          </small>

                          <h3>
                            {booking.hotel.name ||
                              "Recommended Stay"}
                          </h3>

                          <p>
                            {booking.hotel.type ||
                              "Hotel"}
                          </p>

                        </div>


                        <div className="booking-hotel-price">

                          <small>
                            FROM
                          </small>

                          <strong>
                            {booking.hotel.price ||
                              "₹0"}
                          </strong>

                          <span>
                            / night
                          </span>

                        </div>

                      </div>

                    )}


                    {/* =======================================
                        BOTTOM
                    ======================================= */}

                    <div className="booking-page-bottom">


                      {/* CONFIRMED */}

                      <div className="booking-confirmed-text">

                        <FiCheckCircle />

                        <div>

                          <strong>
                            Booking Confirmed
                          </strong>

                          <span>
                            Your trip is ready to go.
                          </span>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="booking-actions">


                        {/* VIEW */}

                        <button
                          type="button"
                          className="booking-view-btn"
                          onClick={() =>
                            viewTrip(booking)
                          }
                        >
                          View Trip
                          <FiMapPin />
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          className="booking-delete-btn"
                          onClick={() =>
                            deleteBooking(
                              booking.id
                            )
                          }
                        >
                          Delete
                          <FiTrash2 />
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
};

export default Booking;