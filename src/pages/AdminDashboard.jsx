import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowUpRight,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiChevronRight,
  FiCreditCard,
  FiGlobe,
  FiMapPin,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser")) || {};
    } catch {
      return {};
    }
  }, []);

  const adminName = adminUser?.name || "Super Admin";

  /* =========================
     STATS
  ========================= */

  const stats = [
    {
      title: "Total Users",
      value: "12,548",
      change: "+12.8%",
      icon: <FiUsers />,
      type: "users",
    },
    {
      title: "Total Trips",
      value: "3,846",
      change: "+8.4%",
      icon: <FiGlobe />,
      type: "trips",
    },
    {
      title: "Total Bookings",
      value: "2,934",
      change: "+15.6%",
      icon: <FiCalendar />,
      type: "bookings",
    },
    {
      title: "Total Revenue",
      value: "₹48.6L",
      change: "+18.2%",
      icon: <FiCreditCard />,
      type: "revenue",
    },
  ];

  /* =========================
     RECENT BOOKINGS
  ========================= */

  const recentBookings = [
    {
      id: "#TRP-1048",
      user: "Aarav Sharma",
      destination: "Goa",
      date: "25 Sep 2026",
      amount: "₹28,500",
      status: "Confirmed",
    },
    {
      id: "#TRP-1047",
      user: "Priya Singh",
      destination: "Manali",
      date: "24 Sep 2026",
      amount: "₹42,800",
      status: "Confirmed",
    },
    {
      id: "#TRP-1046",
      user: "Rahul Verma",
      destination: "Dubai",
      date: "23 Sep 2026",
      amount: "₹86,400",
      status: "Pending",
    },
    {
      id: "#TRP-1045",
      user: "Ananya Gupta",
      destination: "Kerala",
      date: "22 Sep 2026",
      amount: "₹35,600",
      status: "Confirmed",
    },
    {
      id: "#TRP-1044",
      user: "Vikram Mehta",
      destination: "Paris",
      date: "21 Sep 2026",
      amount: "₹1,24,500",
      status: "Completed",
    },
  ];

  /* =========================
     POPULAR DESTINATIONS
  ========================= */

  const popularDestinations = [
    {
      name: "Goa",
      country: "India",
      bookings: "842",
      revenue: "₹12.4L",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Manali",
      country: "India",
      bookings: "628",
      revenue: "₹9.8L",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dubai",
      country: "UAE",
      bookings: "514",
      revenue: "₹14.2L",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Kerala",
      country: "India",
      bookings: "476",
      revenue: "₹7.5L",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=500&q=80",
    },
  ];

  /* =========================
     ACTIVITIES
  ========================= */

  const activities = [
    {
      icon: <FiUserCheck />,
      title: "New user registered",
      text: "Kavya Malhotra joined Tripper",
      time: "8 min ago",
    },
    {
      icon: <FiCalendar />,
      title: "New booking received",
      text: "Booking #TRP-1048 was created",
      time: "21 min ago",
    },
    {
      icon: <FiCreditCard />,
      title: "Payment received",
      text: "₹28,500 payment confirmed",
      time: "36 min ago",
    },
    {
      icon: <FiMapPin />,
      title: "Destination updated",
      text: "Goa destination details updated",
      time: "1 hr ago",
    },
  ];

  /* =========================
     NAVIGATION
  ========================= */

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard-page">

      {/* =====================================
          DASHBOARD HEADER
      ===================================== */}

      <header className="admin-header">

        <div className="admin-header-left">

          <div className="admin-header-text">

            <span className="admin-header-label">
              OVERVIEW
            </span>

            <h1>Dashboard</h1>

            <p>
              Welcome back, {adminName}. Here's what's happening today.
            </p>

          </div>

        </div>

        <div className="admin-header-actions">

          <button
            className="admin-icon-button"
            type="button"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="notification-dot"></span>
          </button>

          <div className="admin-header-user">

            <div className="admin-header-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>

            <div className="admin-header-user-info">
              <strong>{adminName}</strong>
              <span>Super Admin</span>
            </div>

          </div>

        </div>

      </header>


      {/* =====================================
          STATS
      ===================================== */}

      <section className="admin-stats-grid">

        {stats.map((stat) => (
          <div
            className={`admin-stat-card ${stat.type}`}
            key={stat.title}
          >

            <div className="admin-stat-top">

              <div className="admin-stat-icon">
                {stat.icon}
              </div>

              <span className="admin-stat-change">
                <FiArrowUpRight />
                {stat.change}
              </span>

            </div>

            <div className="admin-stat-content">

              <span>{stat.title}</span>

              <strong>{stat.value}</strong>

            </div>

            <div className="admin-stat-line">
              <span></span>
            </div>

          </div>
        ))}

      </section>


      {/* =====================================
          MIDDLE GRID
      ===================================== */}

      <section className="admin-middle-grid">


        {/* =================================
            REVENUE PANEL
        ================================= */}

        <div className="admin-panel revenue-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-label">
                FINANCIAL OVERVIEW
              </span>

              <h2>Revenue Overview</h2>

            </div>

            <select
              className="admin-select"
              defaultValue="Last 7 Months"
            >
              <option>Last 7 Months</option>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>

          </div>


          <div className="revenue-summary">

            <div>

              <strong>₹48.6L</strong>

              <span>Total Revenue</span>

            </div>


            <div className="revenue-growth">

              <FiTrendingUp />

              <strong>18.2%</strong>

              <span>vs last month</span>

            </div>

          </div>


          <div className="revenue-chart">

            <div className="chart-y-labels">

              <span>10L</span>
              <span>8L</span>
              <span>6L</span>
              <span>4L</span>
              <span>2L</span>
              <span>0</span>

            </div>


            <div className="chart-area">

              <div className="chart-grid-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <svg
                className="revenue-svg"
                viewBox="0 0 700 240"
                preserveAspectRatio="none"
              >

                <defs>

                  <linearGradient
                    id="revenueFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#d4af37"
                      stopOpacity="0.30"
                    />

                    <stop
                      offset="100%"
                      stopColor="#d4af37"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>


                <path
                  d="M0,190 C55,175 65,145 110,155 C160,165 170,110 220,125 C270,140 285,80 330,100 C375,120 390,60 440,82 C490,105 510,45 550,65 C600,85 625,35 700,48 L700,240 L0,240 Z"
                  fill="url(#revenueFill)"
                />


                <path
                  d="M0,190 C55,175 65,145 110,155 C160,165 170,110 220,125 C270,140 285,80 330,100 C375,120 390,60 440,82 C490,105 510,45 550,65 C600,85 625,35 700,48"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                />


                <circle
                  cx="550"
                  cy="65"
                  r="6"
                  fill="#d4af37"
                />

              </svg>


              <div className="chart-x-labels">

                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>

              </div>

            </div>

          </div>

        </div>


        {/* =================================
            QUICK STATS
        ================================= */}

        <div className="admin-panel quick-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-label">
                PLATFORM
              </span>

              <h2>Quick Stats</h2>

            </div>

            <FiBarChart2 className="panel-heading-icon" />

          </div>


          <div className="quick-stat-list">


            <div className="quick-stat-item">

              <div className="quick-icon users-icon">
                <FiUsers />
              </div>

              <div>
                <strong>1,284</strong>
                <span>New Users</span>
              </div>

              <small>+14%</small>

            </div>


            <div className="quick-stat-item">

              <div className="quick-icon booking-icon">
                <FiCalendar />
              </div>

              <div>
                <strong>486</strong>
                <span>New Bookings</span>
              </div>

              <small>+9%</small>

            </div>


            <div className="quick-stat-item">

              <div className="quick-icon payment-icon">
                <FiCreditCard />
              </div>

              <div>
                <strong>₹8.4L</strong>
                <span>Today's Revenue</span>
              </div>

              <small>+18%</small>

            </div>


            <div className="quick-stat-item">

              <div className="quick-icon destination-icon">
                <FiMapPin />
              </div>

              <div>
                <strong>126</strong>
                <span>Destinations</span>
              </div>

              <small>+4%</small>

            </div>

          </div>


          <button
            className="quick-view-button"
            type="button"
            onClick={() =>
              goTo("/admin-secret/dashboard/bookings")
            }
          >
            View Full Analytics
            <FiChevronRight />
          </button>

        </div>

      </section>


      {/* =====================================
          BOTTOM GRID
      ===================================== */}

      <section className="admin-bottom-grid">


        {/* =================================
            RECENT BOOKINGS
        ================================= */}

        <div className="admin-panel bookings-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-label">
                RECENT ACTIVITY
              </span>

              <h2>Recent Bookings</h2>

            </div>


            <button
              className="view-all-button"
              type="button"
              onClick={() =>
                goTo("/admin-secret/dashboard/bookings")
              }
            >
              View All
              <FiArrowUpRight />
            </button>

          </div>


          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>

                </tr>

              </thead>


              <tbody>

                {recentBookings.map((booking) => (

                  <tr key={booking.id}>

                    <td>
                      <strong className="booking-id">
                        {booking.id}
                      </strong>
                    </td>


                    <td>

                      <div className="customer-cell">

                        <div className="customer-avatar">
                          {booking.user.charAt(0)}
                        </div>

                        <span>{booking.user}</span>

                      </div>

                    </td>


                    <td>

                      <div className="destination-cell">

                        <FiMapPin />

                        {booking.destination}

                      </div>

                    </td>


                    <td>
                      {booking.date}
                    </td>


                    <td>
                      <strong>
                        {booking.amount}
                      </strong>
                    </td>


                    <td>

                      <span
                        className={`booking-status ${booking.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {booking.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* =================================
            POPULAR DESTINATIONS
        ================================= */}

        <div className="admin-panel destinations-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-label">
                TOP PERFORMERS
              </span>

              <h2>Popular Destinations</h2>

            </div>


            <button
              className="view-all-button"
              type="button"
              onClick={() =>
                goTo(
                  "/admin-secret/dashboard/destinations"
                )
              }
            >
              View All
              <FiArrowUpRight />
            </button>

          </div>


          <div className="popular-destination-list">

            {popularDestinations.map((destination) => (

              <div
                className="popular-destination"
                key={destination.name}
              >

                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                />


                <div className="popular-destination-info">

                  <strong>
                    {destination.name}
                  </strong>

                  <span>
                    {destination.country}
                  </span>


                  <div className="destination-meta">

                    <small>
                      {destination.bookings} bookings
                    </small>

                    <small>
                      {destination.revenue}
                    </small>

                  </div>

                </div>


                <FiChevronRight className="destination-arrow" />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================
          RECENT ACTIVITY
      ===================================== */}

      <section className="admin-panel activity-panel">

        <div className="admin-panel-header">

          <div>

            <span className="admin-panel-label">
              LIVE UPDATES
            </span>

            <h2>Recent Activity</h2>

          </div>


          <span className="live-badge">

            <span></span>

            LIVE

          </span>

        </div>


        <div className="activity-list">

          {activities.map((activity, index) => (

            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-icon">
                {activity.icon}
              </div>


              <div className="activity-info">

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.text}
                </span>

              </div>


              <time>
                {activity.time}
              </time>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="admin-footer">

        <span>
          © 2026 Tripper Admin Panel
        </span>

        <span>
          Super Admin Dashboard
        </span>

      </footer>

    </div>
  );
};

export default AdminDashboard;