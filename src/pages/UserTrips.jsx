import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCompass,
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

import "./UserTrips.css";

const UserTrips = () => {
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
     TRIPS DATA
  ========================================================= */

  const trips = [
    {
      id: "TRP-1054",
      destination: "Goa",
      location: "Goa, India",

      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",

      date: "12 Oct 2026",
      duration: "3 Days / 2 Nights",
      travellers: "2 Travellers",

      tripType: "Couple",
      stay: "Hotel",

      price: "₹28,500",

      status: "upcoming",

      description:
        "Golden beaches, colourful streets, beautiful sunsets and peaceful mornings by the sea.",
    },

    {
      id: "TRP-1042",
      destination: "Manali",
      location: "Himachal Pradesh, India",

      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=90",

      date: "18 Aug 2026",
      duration: "4 Days / 3 Nights",
      travellers: "2 Travellers",

      tripType: "Couple",
      stay: "Resort",

      price: "₹24,800",

      status: "completed",

      description:
        "Snowy mountains, peaceful valleys and beautiful mornings surrounded by nature.",
    },

    
  ];

  /* =========================================================
     FILTER TRIPS
  ========================================================= */

  const filteredTrips = trips.filter((trip) => {
    if (activeFilter === "all") {
      return true;
    }

    return trip.status === activeFilter;
  });

  /* =========================================================
     COUNTS
  ========================================================= */

  const upcomingCount = trips.filter(
    (trip) => trip.status === "upcoming"
  ).length;

  const completedCount = trips.filter(
    (trip) => trip.status === "completed"
  ).length;

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
     VIEW TRIP
  ========================================================= */

  const handleViewTrip = (trip) => {
    navigate(`/user/trips/${trip.id}`, {
      state: {
        trip,
      },
    });
  };

  return (
    <div className="ut-page">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="ut-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`ut-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="ut-logo">

          <div className="ut-logo-icon">
            <FiMapPin />
          </div>

          <div className="ut-logo-text">
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>

          <button
            type="button"
            className="ut-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>

        {/* USER */}

        <div className="ut-user">

          <div className="ut-user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="ut-user-info">

            <strong>
              {user?.name || "Traveller"}
            </strong>

            <span>
              {user?.email || "traveller@example.com"}
            </span>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="ut-nav">

          <span className="ut-nav-title">
            MY ACCOUNT
          </span>

          <Link
            to="/user/dashboard"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome />

            <span>
              Dashboard
            </span>
          </Link>

          <Link
            to="/user/trips"
            className="active"
            onClick={() => setSidebarOpen(false)}
          >
            <FiCompass />

            <span>
              My Trips
            </span>
          </Link>

          <Link
            to="/user/bookings"
            onClick={() => setSidebarOpen(false)}
          >
            <FiCalendar />

            <span>
              My Bookings
            </span>

            <small>2</small>
          </Link>

          <Link
            to="/user/wishlist"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHeart />

            <span>
              Wishlist
            </span>

            <small>4</small>
          </Link>

          <span className="ut-nav-title second">
            ACCOUNT
          </span>

          <Link
            to="/user/profile"
            onClick={() => setSidebarOpen(false)}
          >
            <FiUser />

            <span>
              Profile
            </span>
          </Link>

          <Link
            to="/user/settings"
            onClick={() => setSidebarOpen(false)}
          >
            <FiSettings />

            <span>
              Settings
            </span>
          </Link>

        </nav>

        {/* BOTTOM */}

        <div className="ut-sidebar-bottom">

          <Link to="/">
            <FiArrowLeft />

            <span>
              Back to website
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
          >
            <FiLogOut />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="ut-main">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="ut-topbar">

          <div className="ut-topbar-left">

            <button
              type="button"
              className="ut-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div>
              <span>MY ACCOUNT</span>
              <strong>My Trips</strong>
            </div>

          </div>

          <Link
            to="/trip-plan"
            className="ut-plan-btn"
          >
            Plan New Trip

            <FiArrowRight />
          </Link>

        </header>

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <div className="ut-content">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="ut-hero">

            <div className="ut-hero-content">

              <span className="ut-small-title">
                YOUR JOURNEYS
              </span>

              <h1>
                My <em>Trips</em>
              </h1>

              <p>
                View your upcoming journeys and revisit
                the beautiful places you've explored.
              </p>

            </div>

            <div className="ut-total">

              <strong>
                {String(trips.length).padStart(2, "0")}
              </strong>

              <span>
                TOTAL TRIPS
              </span>

            </div>

          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="ut-summary">

            <div className="ut-summary-card">

              <div className="ut-summary-icon">
                <FiCompass />
              </div>

              <div>
                <span>ALL TRIPS</span>
                <strong>{trips.length}</strong>
              </div>

            </div>

            <div className="ut-summary-card">

              <div className="ut-summary-icon">
                <FiCalendar />
              </div>

              <div>
                <span>UPCOMING</span>
                <strong>{upcomingCount}</strong>
              </div>

            </div>

            <div className="ut-summary-card">

              <div className="ut-summary-icon">
                <FiCheckCircle />
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

          <section className="ut-filter">

            <button
              type="button"
              className={
                activeFilter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("all")
              }
            >
              All Trips

              <span>
                {trips.length}
              </span>
            </button>

            <button
              type="button"
              className={
                activeFilter === "upcoming"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("upcoming")
              }
            >
              Upcoming

              <span>
                {upcomingCount}
              </span>
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

              <span>
                {completedCount}
              </span>
            </button>

          </section>

          {/* =================================================
              TRIPS
          ================================================= */}

          <section className="ut-trips">

            {filteredTrips.map((trip) => (

              <article
                className="ut-trip-card"
                key={trip.id}
              >

                {/* IMAGE */}

                <div className="ut-trip-image">

                  <img
                    src={trip.image}
                    alt={trip.destination}
                  />

                  <div
                    className={`ut-status ${trip.status}`}
                  >
                    {trip.status === "upcoming" ? (
                      <>
                        <FiClock />
                        Upcoming
                      </>
                    ) : (
                      <>
                        <FiCheckCircle />
                        Completed
                      </>
                    )}
                  </div>

                </div>

                {/* DETAILS */}

                <div className="ut-trip-content">

                  {/* TOP */}

                  <div className="ut-trip-top">

                    <div>

                      <span className="ut-location">
                        <FiMapPin />
                        {trip.location}
                      </span>

                      <h2>
                        {trip.destination}
                      </h2>

                    </div>

                    <span className="ut-trip-id">
                      #{trip.id}
                    </span>

                  </div>

                  <p className="ut-description">
                    {trip.description}
                  </p>

                  {/* DETAILS GRID */}

                  <div className="ut-meta">

                    <div className="ut-meta-item">

                      <div className="ut-meta-icon">
                        <FiCalendar />
                      </div>

                      <div>
                        <span>TRAVEL DATE</span>
                        <strong>
                          {trip.date}
                        </strong>
                      </div>

                    </div>

                    <div className="ut-meta-item">

                      <div className="ut-meta-icon">
                        <FiClock />
                      </div>

                      <div>
                        <span>DURATION</span>
                        <strong>
                          {trip.duration}
                        </strong>
                      </div>

                    </div>

                    <div className="ut-meta-item">

                      <div className="ut-meta-icon">
                        <FiUsers />
                      </div>

                      <div>
                        <span>TRAVELLERS</span>
                        <strong>
                          {trip.travellers}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="ut-trip-footer">

                    <div className="ut-price">

                      <span>
                        TRIP TOTAL
                      </span>

                      <strong>
                        {trip.price}
                      </strong>

                    </div>

                    <button
                      type="button"
                      className="ut-view-btn"
                      onClick={() =>
                        handleViewTrip(trip)
                      }
                    >
                      View Trip

                      <FiArrowRight />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>

          {/* EMPTY */}

          {filteredTrips.length === 0 && (

            <section className="ut-empty">

              <div>
                <FiCompass />
              </div>

              <h2>
                No trips found
              </h2>

              <p>
                You don't have any trips in this
                category yet.
              </p>

              <Link to="/trip-plan">
                Plan Your First Trip

                <FiArrowRight />
              </Link>

            </section>

          )}

        </div>

      </main>

    </div>
  );
};

export default UserTrips;