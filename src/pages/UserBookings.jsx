import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiCreditCard,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiSettings,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./UserBookings.css";

const UserBookings = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  /* =========================================================
     USER
  ========================================================= */

  const user = useMemo(() => {
    try {
      const savedUser = localStorage.getItem("tripperUser");

      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("User load error:", error);
    }

    return {
      name: "Traveller",
      email: "traveller@example.com",
    };
  }, []);

  const firstName =
    user?.name?.split(" ")[0] || "Traveller";

  /* =========================================================
     BOOKINGS DATA
  ========================================================= */

  const bookings = [
    {
      id: "BKG-1054",
      tripId: "TRP-1054",

      destination: "Goa",
      location: "Goa, India",

      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",

      hotel: "Grand Heritage Hotel",

      date: "12 Oct 2026",
      duration: "3 Days / 2 Nights",
      travellers: "2 Travellers",

      amount: "₹28,500",

      payment: "Paid",
      status: "confirmed",
    },

    {
      id: "BKG-1042",
      tripId: "TRP-1042",

      destination: "Manali",
      location: "Himachal Pradesh, India",

      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=90",

      hotel: "Mountain View Resort",

      date: "18 Aug 2026",
      duration: "4 Days / 3 Nights",
      travellers: "2 Travellers",

      amount: "₹24,800",

      payment: "Paid",
      status: "completed",
    },

   
    
  ];

  /* =========================================================
     COUNTS
  ========================================================= */

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "all") {
      return true;
    }

    return booking.status === activeFilter;
  });

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("tripperUserLoggedIn");

    navigate("/login", {
      replace: true,
    });
  };

  /* =========================================================
     VIEW BOOKING
  ========================================================= */

  const handleViewBooking = (booking) => {
    navigate(`/user/bookings/${booking.id}`, {
      state: {
        booking,
      },
    });
  };

  return (
    <div className="ub-page">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="ub-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`ub-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="ub-logo">

          <div className="ub-logo-icon">
            <FiMapPin />
          </div>

          <div className="ub-logo-text">
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>

          <button
            type="button"
            className="ub-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>

        {/* USER */}

        <div className="ub-user">

          <div className="ub-user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="ub-user-info">

            <strong>
              {user?.name || "Traveller"}
            </strong>

            <span>
              {user?.email || "traveller@example.com"}
            </span>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="ub-nav">

          <span className="ub-nav-title">
            MY ACCOUNT
          </span>

          <Link
            to="/user/dashboard"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/user/trips"
            onClick={() => setSidebarOpen(false)}
          >
            <FiCompass />
            <span>My Trips</span>
          </Link>

          <Link
            to="/user/bookings"
            className="active"
            onClick={() => setSidebarOpen(false)}
          >
            <FiCalendar />
            <span>My Bookings</span>
            <small>{bookings.length}</small>
          </Link>

          <Link
            to="/user/wishlist"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHeart />
            <span>Wishlist</span>
            <small>4</small>
          </Link>

          <span className="ub-nav-title second">
            ACCOUNT
          </span>

          <Link
            to="/user/profile"
            onClick={() => setSidebarOpen(false)}
          >
            <FiUser />
            <span>Profile</span>
          </Link>

          <Link
            to="/user/settings"
            onClick={() => setSidebarOpen(false)}
          >
            <FiSettings />
            <span>Settings</span>
          </Link>

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="ub-sidebar-bottom">

          <Link to="/">
            <FiArrowLeft />
            <span>Back to website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="ub-main">

        {/* TOPBAR */}

        <header className="ub-topbar">

          <div className="ub-topbar-left">

            <button
              type="button"
              className="ub-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div>
              <span>MY ACCOUNT</span>
              <strong>My Bookings</strong>
            </div>

          </div>

          <Link
            to="/trip-plan"
            className="ub-plan-btn"
          >
            Plan New Trip
            <FiArrowRight />
          </Link>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="ub-content">

          {/* HERO */}

          <section className="ub-hero">

            <div>

              <span className="ub-eyebrow">
                YOUR RESERVATIONS
              </span>

              <h1>
                My <em>Bookings</em>
              </h1>

              <p>
                View and manage all your travel bookings
                from one place.
              </p>

            </div>

            <div className="ub-total">

              <strong>
                {String(bookings.length).padStart(2, "0")}
              </strong>

              <span>TOTAL BOOKINGS</span>

            </div>

          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <section className="ub-stats">

            <div className="ub-stat-card">

              <div className="ub-stat-icon">
                <FiCalendar />
              </div>

              <div>
                <span>ALL BOOKINGS</span>
                <strong>{bookings.length}</strong>
              </div>

            </div>

            <div className="ub-stat-card">

              <div className="ub-stat-icon">
                <FiCheckCircle />
              </div>

              <div>
                <span>CONFIRMED</span>
                <strong>{confirmedCount}</strong>
              </div>

            </div>

            <div className="ub-stat-card">

              <div className="ub-stat-icon">
                <FiClock />
              </div>

              <div>
                <span>COMPLETED</span>
                <strong>{completedCount}</strong>
              </div>

            </div>

          </section>

          {/* =================================================
              FILTER
          ================================================= */}

          <section className="ub-filter">

            <button
              type="button"
              className={
                activeFilter === "all"
                  ? "active"
                  : ""
              }
              onClick={() => setActiveFilter("all")}
            >
              All Bookings
              <span>{bookings.length}</span>
            </button>

            <button
              type="button"
              className={
                activeFilter === "confirmed"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("confirmed")
              }
            >
              Confirmed
              <span>{confirmedCount}</span>
            </button>

            <button
              type="button"
              className={
                activeFilter === "completed"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("completed")
              }
            >
              Completed
              <span>{completedCount}</span>
            </button>

          </section>

          {/* =================================================
              BOOKING CARDS
          ================================================= */}

          <section className="ub-bookings">

            {filteredBookings.map((booking) => (

              <article
                className="ub-booking-card"
                key={booking.id}
              >

                {/* IMAGE */}

                <div className="ub-booking-image">

                  <img
                    src={booking.image}
                    alt={booking.destination}
                  />

                  <span
                    className={`ub-status ${booking.status}`}
                  >
                    <FiCheckCircle />

                    {booking.status === "confirmed"
                      ? "Confirmed"
                      : "Completed"}
                  </span>

                </div>

                {/* DETAILS */}

                <div className="ub-booking-content">

                  {/* TOP */}

                  <div className="ub-booking-top">

                    <div>

                      <span className="ub-location">
                        <FiMapPin />
                        {booking.location}
                      </span>

                      <h2>
                        {booking.destination}
                      </h2>

                      <p className="ub-hotel">
                        {booking.hotel}
                      </p>

                    </div>

                    <span className="ub-booking-id">
                      #{booking.id}
                    </span>

                  </div>

                  {/* META */}

                  <div className="ub-meta">

                    <div className="ub-meta-item">

                      <div className="ub-meta-icon">
                        <FiCalendar />
                      </div>

                      <div>
                        <span>TRAVEL DATE</span>
                        <strong>{booking.date}</strong>
                      </div>

                    </div>

                    <div className="ub-meta-item">

                      <div className="ub-meta-icon">
                        <FiClock />
                      </div>

                      <div>
                        <span>DURATION</span>
                        <strong>{booking.duration}</strong>
                      </div>

                    </div>

                    <div className="ub-meta-item">

                      <div className="ub-meta-icon">
                        <FiUsers />
                      </div>

                      <div>
                        <span>TRAVELLERS</span>
                        <strong>{booking.travellers}</strong>
                      </div>

                    </div>

                  </div>

                  {/* PAYMENT */}

                  <div className="ub-payment-row">

                    <div className="ub-payment-info">

                      <div className="ub-payment-icon">
                        <FiCreditCard />
                      </div>

                      <div>
                        <span>PAYMENT STATUS</span>

                        <strong>
                          <FiCheckCircle />
                          {booking.payment}
                        </strong>
                      </div>

                    </div>

                    <div className="ub-amount">

                      <span>TOTAL AMOUNT</span>

                      <strong>
                        {booking.amount}
                      </strong>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="ub-booking-footer">

                    <div>
                      <span>BOOKING ID</span>
                      <strong>{booking.id}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleViewBooking(booking)
                      }
                    >
                      View Details
                      <FiArrowRight />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>

          {/* EMPTY */}

          {filteredBookings.length === 0 && (

            <section className="ub-empty">

              <FiCalendar />

              <h2>No bookings found</h2>

              <p>
                You don't have any bookings in this
                category yet.
              </p>

              <Link to="/trip-plan">
                Plan a Trip
                <FiArrowRight />
              </Link>

            </section>

          )}

        </div>

      </main>

    </div>
  );
};

export default UserBookings;