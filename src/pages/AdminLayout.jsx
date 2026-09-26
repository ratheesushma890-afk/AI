import React, { useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiChevronRight,
  FiCreditCard,
  FiGlobe,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiStar,
  FiUserCheck,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================
  // ADMIN USER
  // ============================================

  let adminUser = {};

  try {
    adminUser = JSON.parse(
      localStorage.getItem("adminUser") || "{}"
    );
  } catch (error) {
    console.error("Admin user data error:", error);
    adminUser = {};
  }

  const adminName = adminUser?.name || "Super Admin";

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem("adminUser");

    navigate("/admin-secret", {
      replace: true,
    });
  };

  // ============================================
  // NAVIGATION
  // ============================================

  const goTo = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  // ============================================
  // ACTIVE MENU
  // ============================================

  const isActive = (path) => {
    if (path === "/admin-secret/dashboard") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "admin-sidebar-open" : ""
        }`}
      >

        {/* =================================================
            SIDEBAR HEADER
        ================================================= */}

        <div className="admin-sidebar-header">

          <div className="admin-layout-logo">

            <div className="admin-layout-logo-icon">
              <FiShield />
            </div>

            <div>
              <h2>TRIPPER</h2>

              <span>
                ADMIN PANEL
              </span>
            </div>

          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>

        </div>

        {/* =================================================
            ADMIN PROFILE
        ================================================= */}

        <div className="admin-layout-profile">

          <div className="admin-layout-avatar">
            {adminName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="admin-layout-profile-info">

            <strong>
              {adminName}
            </strong>

            <span>
              Super Administrator
            </span>

          </div>

          <span className="admin-online"></span>

        </div>

        {/* =================================================
            SIDEBAR SCROLL
        ================================================= */}

        <div className="admin-sidebar-scroll">

          {/* =================================================
              MAIN MENU
          ================================================= */}

          <div className="admin-sidebar-section-title">
            MAIN MENU
          </div>

          <nav className="admin-layout-nav">

            {/* DASHBOARD */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard"
                )
              }
            >
              <FiHome />

              <span>
                Dashboard
              </span>
            </button>

            {/* TRIPS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/trips"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/trips"
                )
              }
            >
              <FiGlobe />

              <span>
                Trips
              </span>
            </button>

            {/* DESTINATIONS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/destinations"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/destinations"
                )
              }
            >
              <FiMapPin />

              <span>
                Destinations
              </span>
            </button>

            {/* BOOKINGS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/bookings"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/bookings"
                )
              }
            >
              <FiCalendar />

              <span>
                Bookings
              </span>

              <small>
                24
              </small>
            </button>

            {/* CUSTOMERS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/customers"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/customers"
                )
              }
            >
              <FiUsers />

              <span>
                Customers
              </span>
            </button>

            {/* REVIEWS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/reviews"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/reviews"
                )
              }
            >
              <FiStar />

              <span>
                Reviews
              </span>
            </button>

          </nav>

          {/* =================================================
              MANAGEMENT
          ================================================= */}

          <div className="admin-sidebar-section-title second">
            MANAGEMENT
          </div>

          <nav className="admin-layout-nav">

            {/* MESSAGES */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/messages"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/messages"
                )
              }
            >
              <FiMessageSquare />

              <span>
                Messages
              </span>
            </button>

            {/* PAYMENTS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/payments"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/payments"
                )
              }
            >
              <FiCreditCard />

              <span>
                Payments
              </span>
            </button>

            {/* ACTIVITIES */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/activities"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/activities"
                )
              }
            >
              <FiActivity />

              <span>
                Activities
              </span>
            </button>

            {/* REPORTS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/reports"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/reports"
                )
              }
            >
              <FiBarChart2 />

              <span>
                Reports
              </span>
            </button>

            {/* =================================================
                STAFF MANAGEMENT
            ================================================= */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/staff"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/staff"
                )
              }
            >
              <FiUserCheck />

              <span>
                Staff Management
              </span>
            </button>

            {/* SETTINGS */}

            <button
              type="button"
              className={`admin-layout-nav-item ${
                isActive(
                  "/admin-secret/dashboard/settings"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/settings"
                )
              }
            >
              <FiSettings />

              <span>
                Settings
              </span>
            </button>

          </nav>

        </div>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          type="button"
          className="admin-layout-logout"
          onClick={handleLogout}
        >
          <FiLogOut />

          <span>
            Logout
          </span>

          <FiChevronRight />
        </button>

      </aside>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main className="admin-layout-main">

        {/* =================================================
            MOBILE HEADER
        ================================================= */}

        <header className="admin-mobile-header">

          <button
            type="button"
            className="admin-mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          <div className="admin-mobile-title">

            <strong>
              TRIPPER
            </strong>

            <span>
              ADMIN PANEL
            </span>

          </div>

          <button
            type="button"
            className="admin-mobile-notification"
          >
            <FiBell />

            <span></span>
          </button>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <div className="admin-layout-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;