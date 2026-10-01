import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCompass,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./UserWishlist.css";

const UserWishlist = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     USER DATA
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

  const firstName = user?.name?.split(" ")[0] || "Traveller";

  /* =========================================================
     DEFAULT WISHLIST
  ========================================================= */

  const defaultWishlist = [
    {
      id: "goa",
      name: "Goa",
      location: "Goa, India",

      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",

      category: "Beach Escape",
      rating: "4.9",
      reviews: "2,480",
      duration: "3 Days / 2 Nights",
      price: "₹8,999",

      description:
        "Golden beaches, colourful streets, beautiful sunsets and peaceful mornings by the sea.",
    },

    {
      id: "manali",
      name: "Manali",
      location: "Himachal Pradesh, India",

      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=90",

      category: "Mountain Retreat",
      rating: "4.8",
      reviews: "1,890",
      duration: "4 Days / 3 Nights",
      price: "₹10,999",

      description:
        "Snow-covered mountains, peaceful valleys and unforgettable views surrounded by nature.",
    },

    {
      id: "jaipur",
      name: "Jaipur",
      location: "Rajasthan, India",

      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=90",

      category: "Culture & Heritage",
      rating: "4.8",
      reviews: "2,120",
      duration: "3 Days / 2 Nights",
      price: "₹9,499",

      description:
        "Royal palaces, colourful markets, heritage architecture and traditional Rajasthan culture.",
    },

    {
      id: "kerala",
      name: "Kerala",
      location: "Kerala, India",

      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",

      category: "Nature Escape",
      rating: "4.9",
      reviews: "2,760",
      duration: "5 Days / 4 Nights",
      price: "₹14,999",

      description:
        "Peaceful backwaters, green landscapes, beautiful beaches and relaxing tropical experiences.",
    },
  ];

  /* =========================================================
     WISHLIST STATE
  ========================================================= */

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        "tripperUserWishlist"
      );

      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          return parsedWishlist;
        }
      }
    } catch (error) {
      console.error("Wishlist load error:", error);
    }

    return defaultWishlist;
  });

  /* =========================================================
     REMOVE WISHLIST
  ========================================================= */

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "tripperUserWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  /* =========================================================
     PLAN TRIP
  ========================================================= */

  const handlePlanTrip = (destination) => {
    navigate("/trip-plan", {
      state: {
        destination: destination.name,
        price: destination.price,
      },
    });
  };

  /* =========================================================
     DESTINATION DETAILS
  ========================================================= */

  const handleViewDestination = (destination) => {
    navigate(`/destination/${destination.id}`);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("tripperUserLoggedIn");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="uw-page">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="uw-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`uw-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="uw-logo">

          <div className="uw-logo-icon">
            <FiMapPin />
          </div>

          <div className="uw-logo-text">
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>

          <button
            type="button"
            className="uw-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>

        {/* USER */}

        <div className="uw-user">

          <div className="uw-user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="uw-user-info">

            <strong>
              {user?.name || "Traveller"}
            </strong>

            <span>
              {user?.email || "traveller@example.com"}
            </span>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="uw-nav">

          <span className="uw-nav-title">
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
            onClick={() => setSidebarOpen(false)}
          >
            <FiCalendar />
            <span>My Bookings</span>
            <small>3</small>
          </Link>

          <Link
            to="/user/wishlist"
            className="active"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHeart />
            <span>Wishlist</span>
            <small>{wishlist.length}</small>
          </Link>

          <span className="uw-nav-title second">
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

        <div className="uw-sidebar-bottom">

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

      <main className="uw-main">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="uw-topbar">

          <div className="uw-topbar-left">

            <button
              type="button"
              className="uw-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div>
              <span>MY ACCOUNT</span>
              <strong>Wishlist</strong>
            </div>

          </div>

          <Link
            to="/explore"
            className="uw-explore-btn"
          >
            Explore Trips
            <FiArrowRight />
          </Link>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="uw-content">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="uw-hero">

            <div>

              <span className="uw-eyebrow">
                SAVED FOR LATER
              </span>

              <h1>
                My <em>Wishlist</em>
              </h1>

              <p>
                Your favourite destinations, saved in one
                place for your next beautiful journey.
              </p>

            </div>

            <div className="uw-total">

              <strong>
                {String(wishlist.length).padStart(2, "0")}
              </strong>

              <span>SAVED PLACES</span>

            </div>

          </section>

          {/* =================================================
              WISHLIST HEADER
          ================================================= */}

          <section className="uw-list-heading">

            <div>
              <span>YOUR FAVOURITES</span>

              <h2>
                Places you want to explore
              </h2>
            </div>

            <p>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "destination"
                : "destinations"}{" "}
              saved
            </p>

          </section>

          {/* =================================================
              WISHLIST GRID
          ================================================= */}

          {wishlist.length > 0 ? (

            <section className="uw-grid">

              {wishlist.map((destination) => (

                <article
                  className="uw-card"
                  key={destination.id}
                >

                  {/* IMAGE */}

                  <div className="uw-card-image">

                    <img
                      src={destination.image}
                      alt={destination.name}
                    />

                    {/* CATEGORY */}

                    <span className="uw-category">
                      {destination.category}
                    </span>

                    {/* HEART */}

                    <button
                      type="button"
                      className="uw-heart"
                      onClick={() =>
                        removeFromWishlist(destination.id)
                      }
                      title="Remove from wishlist"
                    >
                      <FiHeart />
                    </button>

                  </div>

                  {/* CONTENT */}

                  <div className="uw-card-content">

                    {/* LOCATION */}

                    <span className="uw-location">
                      <FiMapPin />
                      {destination.location}
                    </span>

                    {/* TITLE + RATING */}

                    <div className="uw-title-row">

                      <h2>
                        {destination.name}
                      </h2>

                      <div className="uw-rating">
                        <FiStar />
                        <strong>
                          {destination.rating}
                        </strong>
                      </div>

                    </div>

                    {/* REVIEWS */}

                    <span className="uw-reviews">
                      {destination.reviews} travellers
                    </span>

                    {/* DESCRIPTION */}

                    <p className="uw-description">
                      {destination.description}
                    </p>

                    {/* META */}

                    <div className="uw-meta">

                      <div>
                        <FiCalendar />

                        <span>
                          {destination.duration}
                        </span>
                      </div>

                      <div>
                        <span>Starting from</span>

                        <strong>
                          {destination.price}
                        </strong>
                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="uw-actions">

                      <button
                        type="button"
                        className="uw-view-btn"
                        onClick={() =>
                          handleViewDestination(destination)
                        }
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        className="uw-plan-btn"
                        onClick={() =>
                          handlePlanTrip(destination)
                        }
                      >
                        Plan Trip
                        <FiArrowRight />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </section>

          ) : (

            /* =================================================
               EMPTY WISHLIST
            ================================================= */

            <section className="uw-empty">

              <div className="uw-empty-icon">
                <FiHeart />
              </div>

              <span>YOUR WISHLIST IS EMPTY</span>

              <h2>
                Save places you love
              </h2>

              <p>
                Explore destinations and tap the heart icon
                to save your favourite places here.
              </p>

              <Link to="/explore">
                Explore Destinations
                <FiArrowRight />
              </Link>

            </section>

          )}

          {/* =================================================
              BOTTOM DISCOVER
          ================================================= */}

          {wishlist.length > 0 && (

            <section className="uw-discover">

              <div>

                <span>
                  FIND SOMETHING NEW
                </span>

                <h2>
                  More places are waiting for you.
                </h2>

                <p>
                  Discover beaches, mountains, cities and
                  peaceful escapes for your next trip.
                </p>

              </div>

              <Link to="/explore">
                Explore Destinations
                <FiArrowRight />
              </Link>

            </section>

          )}

        </div>

      </main>

    </div>
  );
};

export default UserWishlist;