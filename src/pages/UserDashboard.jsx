import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiCompass,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiSettings,
  FiStar,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     GET LOGGED IN USER
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

  /* =========================================================
     CHECK LOGIN
  ========================================================= */

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("tripperUserLoggedIn");

    if (loggedIn !== "true") {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);

  /* =========================================================
     FIRST NAME
  ========================================================= */

  const firstName =
    user?.name?.split(" ")[0] || "Traveller";

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
     SAMPLE BOOKING DATA
  ========================================================= */

  const recentBookings = [
    {
      id: "TRP-1054",
      destination: "Goa",
      date: "12 Oct 2026",
      price: "₹28,500",
      status: "Confirmed",
    },
    {
      id: "TRP-1042",
      destination: "Manali",
      date: "18 Aug 2026",
      price: "₹24,800",
      status: "Completed",
    },
  ];

  return (
    <div className="user-dashboard-page">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          className="user-dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`user-dashboard-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="user-dashboard-logo">

          <div className="user-dashboard-logo-icon">
            <FiMapPin />
          </div>

          <div>
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>

          <button
            className="user-dashboard-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>

        {/* PROFILE */}

        <div className="user-sidebar-profile">

          <div className="user-sidebar-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name || "Traveller"}</strong>

            <span>
              {user?.email || "traveller@example.com"}
            </span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="user-dashboard-nav">

          <span className="user-nav-label">
            MY ACCOUNT
          </span>

          <Link
            to="/user/dashboard"
            className="active"
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
            onClick={() => setSidebarOpen(false)}
          >
            <FiCalendar />

            <span>My Bookings</span>

            <small>2</small>
          </Link>

          <Link
            to="/user/wishlist"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHeart />

            <span>Wishlist</span>

            <small>4</small>
          </Link>

          <span className="user-nav-label user-nav-second">
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

        <div className="user-sidebar-bottom">

          <Link
            to="/"
            className="user-view-website"
          >
            <FiArrowRight />

            <span>Back to website</span>
          </Link>

          <button
            className="user-logout-btn"
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

      <main className="user-dashboard-main">

        {/* ===================================================
            TOP BAR
        =================================================== */}

        <header className="user-dashboard-topbar">

          <div className="user-dashboard-topbar-left">

            <button
              className="user-mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div>
              <span>MY ACCOUNT</span>

              <strong>Dashboard</strong>
            </div>

          </div>

          <div className="user-dashboard-topbar-right">

            <Link
              to="/explore"
              className="user-explore-btn"
            >
              Explore Trips

              <FiArrowRight />
            </Link>

            <div className="user-top-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>

          </div>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="user-dashboard-content">

          {/* WELCOME */}

          <section className="user-welcome-section">

            <div>

              <span className="user-welcome-label">
                WELCOME BACK
              </span>

              <h1>
                Hello, {firstName}.
              </h1>

              <p>
                Your next beautiful journey is waiting
                to be planned.
              </p>

            </div>

            <Link
              to="/trip-plan"
              className="user-plan-trip-btn"
            >
              Plan a New Trip

              <FiArrowRight />
            </Link>

          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <section className="user-dashboard-stats">

            <div className="user-stat-card">

              <div className="user-stat-icon">
                <FiCompass />
              </div>

              <div>
                <span>MY TRIPS</span>
                <strong>03</strong>
                <p>Journeys planned</p>
              </div>

            </div>

            <div className="user-stat-card">

              <div className="user-stat-icon">
                <FiCalendar />
              </div>

              <div>
                <span>BOOKINGS</span>
                <strong>02</strong>
                <p>Total bookings</p>
              </div>

            </div>

            <div className="user-stat-card">

              <div className="user-stat-icon">
                <FiHeart />
              </div>

              <div>
                <span>SAVED PLACES</span>
                <strong>04</strong>
                <p>In your wishlist</p>
              </div>

            </div>

          </section>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <section className="user-dashboard-grid">

            {/* ===============================================
                UPCOMING TRIP
            =============================================== */}

            <div className="user-upcoming-section">

              <div className="user-section-heading">

                <div>
                  <span>NEXT JOURNEY</span>

                  <h2>Upcoming Trip</h2>
                </div>

                <Link to="/user/trips">
                  View all
                  <FiArrowRight />
                </Link>

              </div>

              <div className="user-upcoming-card">

                <div className="user-upcoming-image">

                  <img
                    src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=90"
                    alt="Goa"
                  />

                  <div className="user-trip-badge">
                    UPCOMING
                  </div>

                </div>

                <div className="user-upcoming-info">

                  <span className="user-trip-location">
                    <FiMapPin />
                    Goa, India
                  </span>

                  <h3>Goa Escape</h3>

                  <p>
                    Beaches, beautiful sunsets and slow
                    mornings by the sea.
                  </p>

                  <div className="user-trip-meta">

                    <div>
                      <FiCalendar />

                      <span>
                        <small>TRAVEL DATE</small>
                        12 Oct 2026
                      </span>
                    </div>

                    <div>
                      <FiClock />

                      <span>
                        <small>DURATION</small>
                        3 Days / 2 Nights
                      </span>
                    </div>

                  </div>

                  <div className="user-trip-footer">

                    <div>
                      <span>BOOKING</span>
                      <strong>#TRP-1054</strong>
                    </div>

                    <Link to="/user/trips">
                      View Trip
                      <FiArrowRight />
                    </Link>

                  </div>

                </div>

              </div>

            </div>

            {/* ===============================================
                PROFILE CARD
            =============================================== */}

            <aside className="user-profile-card">

              <span className="user-profile-label">
                YOUR PROFILE
              </span>

              <div className="user-profile-avatar">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <h3>
                {user?.name || "Traveller"}
              </h3>

              <p>
                {user?.email || "traveller@example.com"}
              </p>

              <div className="user-profile-line" />

              <div className="user-profile-item">
                <FiMapPin />

                <div>
                  <span>LOCATION</span>
                  <strong>India</strong>
                </div>
              </div>

              <div className="user-profile-item">
                <FiStar />

                <div>
                  <span>MEMBER SINCE</span>
                  <strong>2026</strong>
                </div>
              </div>

              <Link
                to="/user/profile"
                className="user-profile-edit"
              >
                Edit Profile

                <FiChevronRight />
              </Link>

            </aside>

          </section>

          {/* =================================================
              RECENT BOOKINGS
          ================================================= */}

          <section className="user-recent-section">

            <div className="user-section-heading">

              <div>
                <span>YOUR JOURNEYS</span>
                <h2>Recent Bookings</h2>
              </div>

              <Link to="/user/bookings">
                View all
                <FiArrowRight />
              </Link>

            </div>

            <div className="user-booking-table">

              <div className="user-booking-table-head">
                <span>BOOKING ID</span>
                <span>DESTINATION</span>
                <span>TRAVEL DATE</span>
                <span>AMOUNT</span>
                <span>STATUS</span>
                <span />
              </div>

              {recentBookings.map((booking) => (
                <div
                  className="user-booking-row"
                  key={booking.id}
                >

                  <strong>{booking.id}</strong>

                  <div className="user-booking-destination">
                    <FiMapPin />
                    {booking.destination}
                  </div>

                  <span>{booking.date}</span>

                  <strong>{booking.price}</strong>

                  <span
                    className={`user-booking-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>

                  <button>
                    <FiChevronRight />
                  </button>

                </div>
              ))}

            </div>

          </section>

          {/* =================================================
              DISCOVER
          ================================================= */}

          <section className="user-dashboard-discover">

            <div>

              <span>READY FOR ANOTHER ADVENTURE?</span>

              <h2>
                Find somewhere
                <em> beautiful.</em>
              </h2>

              <p>
                Explore destinations and start planning
                your next journey.
              </p>

            </div>

            <Link to="/explore">
              Explore Destinations
              <FiArrowRight />
            </Link>

          </section>

        </div>

      </main>

    </div>
  );
};

export default UserDashboard;