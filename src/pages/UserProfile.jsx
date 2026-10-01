import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCompass,
  FiEdit3,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiSave,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================================================
     USER DATA
  ========================================================= */

  const savedUser = useMemo(() => {
    try {
      const user = localStorage.getItem("tripperUser");

      if (user) {
        return JSON.parse(user);
      }
    } catch (error) {
      console.error("User load error:", error);
    }

    return {};
  }, []);

  const [formData, setFormData] = useState({
    name: savedUser?.name || "Traveller",
    email: savedUser?.email || "traveller@example.com",
    phone: savedUser?.phone || "+91 98765 43210",
    city: savedUser?.city || "India",
    dob: savedUser?.dob || "",
  });

  const firstName =
    formData?.name?.split(" ")[0] || "Traveller";

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    const updatedUser = {
      ...savedUser,
      ...formData,
      loggedIn: true,
    };

    localStorage.setItem(
      "tripperUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "tripperUserLoggedIn",
      "true"
    );

    setIsEditing(false);

    setMessage("Profile updated successfully.");

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = () => {
    setFormData({
      name: savedUser?.name || "Traveller",
      email:
        savedUser?.email ||
        "traveller@example.com",
      phone:
        savedUser?.phone ||
        "+91 98765 43210",
      city: savedUser?.city || "India",
      dob: savedUser?.dob || "",
    });

    setIsEditing(false);
    setMessage("");
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "tripperUserLoggedIn"
    );

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="up-page">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="up-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`up-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="up-logo">

          <div className="up-logo-icon">
            <FiMapPin />
          </div>

          <div className="up-logo-text">
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>

          <button
            type="button"
            className="up-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiX />
          </button>

        </div>

        {/* USER */}

        <div className="up-sidebar-user">

          <div className="up-sidebar-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="up-sidebar-user-info">

            <strong>{formData.name}</strong>

            <span>{formData.email}</span>

          </div>

        </div>

        {/* NAV */}

        <nav className="up-nav">

          <span className="up-nav-title">
            MY ACCOUNT
          </span>

          <Link
            to="/user/dashboard"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/user/trips"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiCompass />
            <span>My Trips</span>
          </Link>

          <Link
            to="/user/bookings"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiCalendar />
            <span>My Bookings</span>
            <small>3</small>
          </Link>

          <Link
            to="/user/wishlist"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiHeart />
            <span>Wishlist</span>
            <small>4</small>
          </Link>

          <span className="up-nav-title second">
            ACCOUNT
          </span>

          <Link
            to="/user/profile"
            className="active"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiUser />
            <span>Profile</span>
          </Link>

          <Link
            to="/user/settings"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiSettings />
            <span>Settings</span>
          </Link>

        </nav>

        {/* BOTTOM */}

        <div className="up-sidebar-bottom">

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

      <main className="up-main">

        {/* TOPBAR */}

        <header className="up-topbar">

          <div className="up-topbar-left">

            <button
              type="button"
              className="up-menu"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FiMenu />
            </button>

            <div>
              <span>MY ACCOUNT</span>
              <strong>Profile</strong>
            </div>

          </div>

          <Link
            to="/explore"
            className="up-explore-btn"
          >
            Explore Trips
            <FiArrowRight />
          </Link>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="up-content">

          {/* HERO */}

          <section className="up-hero">

            <div>

              <span className="up-eyebrow">
                PERSONAL DETAILS
              </span>

              <h1>
                My <em>Profile</em>
              </h1>

              <p>
                Manage your personal information and
                keep your travel profile up to date.
              </p>

            </div>

            {!isEditing && (
              <button
                type="button"
                className="up-edit-top-btn"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                <FiEdit3 />
                Edit Profile
              </button>
            )}

          </section>

          {/* MESSAGE */}

          {message && (
            <div className="up-message">
              {message}
            </div>
          )}

          {/* =================================================
              PROFILE LAYOUT
          ================================================= */}

          <section className="up-profile-grid">

            {/* ===============================================
                LEFT PROFILE CARD
            =============================================== */}

            <div className="up-profile-card">

              <span className="up-card-label">
                YOUR PROFILE
              </span>

              <div className="up-big-avatar">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <h2>{formData.name}</h2>

              <p>{formData.email}</p>

              <div className="up-profile-divider" />

              <div className="up-profile-small-info">

                <div>

                  <div className="up-small-icon">
                    <FiPhone />
                  </div>

                  <div>
                    <span>PHONE NUMBER</span>
                    <strong>
                      {formData.phone ||
                        "Not added"}
                    </strong>
                  </div>

                </div>

                <div>

                  <div className="up-small-icon">
                    <FiMapPin />
                  </div>

                  <div>
                    <span>LOCATION</span>
                    <strong>
                      {formData.city ||
                        "Not added"}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="up-member-box">

                <span>TRIPPER MEMBER</span>

                <strong>
                  Ready for your next journey
                </strong>

                <p>
                  Your profile helps us personalize
                  your travel experience.
                </p>

              </div>

            </div>

            {/* ===============================================
                RIGHT FORM
            =============================================== */}

            <div className="up-details-card">

              <div className="up-details-heading">

                <div>
                  <span>ACCOUNT INFORMATION</span>
                  <h2>Personal Details</h2>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      setIsEditing(true)
                    }
                  >
                    <FiEdit3 />
                    Edit
                  </button>
                )}

              </div>

              <form onSubmit={handleSave}>

                {/* NAME */}

                <div className="up-form-group">

                  <label htmlFor="profile-name">
                    Full Name
                  </label>

                  <div
                    className={`up-input-box ${
                      isEditing
                        ? "editable"
                        : ""
                    }`}
                  >
                    <FiUser />

                    <input
                      id="profile-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter full name"
                    />
                  </div>

                </div>

                {/* EMAIL */}

                <div className="up-form-group">

                  <label htmlFor="profile-email">
                    Email Address
                  </label>

                  <div
                    className={`up-input-box ${
                      isEditing
                        ? "editable"
                        : ""
                    }`}
                  >
                    <FiMail />

                    <input
                      id="profile-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter email"
                    />
                  </div>

                </div>

                {/* TWO COLUMNS */}

                <div className="up-form-row">

                  {/* PHONE */}

                  <div className="up-form-group">

                    <label htmlFor="profile-phone">
                      Phone Number
                    </label>

                    <div
                      className={`up-input-box ${
                        isEditing
                          ? "editable"
                          : ""
                      }`}
                    >
                      <FiPhone />

                      <input
                        id="profile-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                      />
                    </div>

                  </div>

                  {/* CITY */}

                  <div className="up-form-group">

                    <label htmlFor="profile-city">
                      City
                    </label>

                    <div
                      className={`up-input-box ${
                        isEditing
                          ? "editable"
                          : ""
                      }`}
                    >
                      <FiMapPin />

                      <input
                        id="profile-city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter city"
                      />
                    </div>

                  </div>

                </div>

                {/* DOB */}

                <div className="up-form-group">

                  <label htmlFor="profile-dob">
                    Date of Birth
                  </label>

                  <div
                    className={`up-input-box ${
                      isEditing
                        ? "editable"
                        : ""
                    }`}
                  >
                    <FiCalendar />

                    <input
                      id="profile-dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                </div>

                {/* ACTIONS */}

                {isEditing && (
                  <div className="up-form-actions">

                    <button
                      type="button"
                      className="up-cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="up-save-btn"
                    >
                      <FiSave />
                      Save Changes
                    </button>

                  </div>
                )}

              </form>

            </div>

          </section>

          {/* =================================================
              BOTTOM
          ================================================= */}

          <section className="up-bottom-card">

            <div>
              <span>YOUR NEXT JOURNEY</span>

              <h2>
                Ready to explore somewhere new?
              </h2>

              <p>
                Start planning your next personalised
                trip with Tripper.
              </p>
            </div>

            <Link to="/trip-plan">
              Plan a New Trip
              <FiArrowRight />
            </Link>

          </section>

        </div>

      </main>

    </div>
  );
};

export default UserProfile;