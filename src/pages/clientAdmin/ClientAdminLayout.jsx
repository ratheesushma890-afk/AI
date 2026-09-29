import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiStar,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./ClientAdminLayout.css";

const ClientAdminLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/client-admin/dashboard",
    },
    {
      name: "Bookings",
      icon: <FiCalendar />,
      path: "/client-admin/dashboard/bookings",
    },
    {
      name: "Destinations",
      icon: <FiMapPin />,
      path: "/client-admin/dashboard/destinations",
    },
    {
      name: "Customers",
      icon: <FiUsers />,
      path: "/client-admin/dashboard/customers",
    },
    {
      name: "Reviews",
      icon: <FiStar />,
      path: "/client-admin/dashboard/reviews",
    },
    {
      name: "Messages",
      icon: <FiMessageSquare />,
      path: "/client-admin/dashboard/messages",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("clientAdmin");

    navigate("/");
  };

  return (
    <div className="client-admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`client-sidebar ${
          sidebarOpen ? "client-sidebar-open" : ""
        }`}
      >
        <div className="client-sidebar-logo">
          <div className="client-logo-icon">
            T
          </div>

          <div>
            <h2>Tripper</h2>
            <span>Client Admin</span>
          </div>

          <button
            className="client-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="client-admin-badge">
          CLIENT PANEL
        </div>

        <nav className="client-sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/client-admin/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `client-menu-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="client-menu-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="client-sidebar-bottom">
          <button
            className="client-logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <div className="client-admin-main">

        {/* TOP HEADER */}

        <header className="client-admin-header">

          <button
            className="client-mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <div className="client-header-title">
            <span>TRIPPER MANAGEMENT</span>

            <h3>Client Admin Panel</h3>
          </div>

          <div className="client-header-profile">

            <div className="client-profile-avatar">
              CA
            </div>

            <div>
              <strong>Client Admin</strong>
              <span>Limited Access</span>
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="client-admin-content">
          <Outlet />
        </main>

      </div>

      {/* MOBILE BACKDROP */}

      {sidebarOpen && (
        <div
          className="client-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
};

export default ClientAdminLayout;