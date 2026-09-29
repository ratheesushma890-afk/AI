import React from "react";

import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiStar,
  FiArrowUpRight,
} from "react-icons/fi";

import "./ClientDashboard.css";

const ClientDashboard = () => {

  const stats = [
    {
      title: "Total Bookings",
      value: "248",
      text: "Manage customer bookings",
      icon: <FiCalendar />,
    },
    {
      title: "Destinations",
      value: "10",
      text: "Active destinations",
      icon: <FiMapPin />,
    },
    {
      title: "Customers",
      value: "186",
      text: "Registered customers",
      icon: <FiUsers />,
    },
    {
      title: "Reviews",
      value: "92",
      text: "Customer reviews",
      icon: <FiStar />,
    },
  ];

  return (
    <div className="client-dashboard">

      <section className="client-welcome">

        <div>
          <span>CLIENT DASHBOARD</span>

          <h1>
            Welcome back,
            <br />
            Client Admin
          </h1>

          <p>
            Manage bookings, destinations and customer
            activity from your Tripper client panel.
          </p>
        </div>

        <div className="client-welcome-badge">
          <strong>Limited</strong>
          <span>Admin Access</span>
        </div>

      </section>

      <section className="client-stats-grid">

        {stats.map((item) => (
          <div
            className="client-stat-card"
            key={item.title}
          >

            <div className="client-stat-top">

              <div className="client-stat-icon">
                {item.icon}
              </div>

              <FiArrowUpRight />

            </div>

            <span>{item.title}</span>

            <h2>{item.value}</h2>

            <p>{item.text}</p>

          </div>
        ))}

      </section>

    </div>
  );
};

export default ClientDashboard;