import React, { useMemo, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiCreditCard,
  FiDownload,
  FiMapPin,
  FiTrendingUp,
  FiUsers,
  FiActivity,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

import "./AdminReports.css";

const monthlyData = [
  {
    month: "Apr",
    revenue: 520000,
    bookings: 286,
    customers: 410,
  },
  {
    month: "May",
    revenue: 610000,
    bookings: 324,
    customers: 468,
  },
  {
    month: "Jun",
    revenue: 575000,
    bookings: 309,
    customers: 445,
  },
  {
    month: "Jul",
    revenue: 720000,
    bookings: 378,
    customers: 512,
  },
  {
    month: "Aug",
    revenue: 815000,
    bookings: 421,
    customers: 586,
  },
  {
    month: "Sep",
    revenue: 890000,
    bookings: 462,
    customers: 634,
  },
];

const destinationData = [
  {
    name: "Goa",
    bookings: 486,
    revenue: 1248000,
    percentage: 82,
  },
  {
    name: "Manali",
    bookings: 392,
    revenue: 986000,
    percentage: 68,
  },
  {
    name: "Dubai",
    bookings: 318,
    revenue: 1745000,
    percentage: 57,
  },
  {
    name: "Bali",
    bookings: 286,
    revenue: 1589000,
    percentage: 49,
  },
  {
    name: "Kashmir",
    bookings: 251,
    revenue: 812000,
    percentage: 43,
  },
];

const paymentData = [
  {
    name: "UPI",
    amount: 1865000,
    percentage: 42,
  },
  {
    name: "Credit Card",
    amount: 1248000,
    percentage: 28,
  },
  {
    name: "Debit Card",
    amount: 798000,
    percentage: 18,
  },
  {
    name: "Net Banking",
    amount: 532000,
    percentage: 12,
  },
];

const recentReports = [
  {
    id: "REP-1001",
    name: "September Revenue Report",
    type: "Revenue",
    date: "25 Sep 2026",
  },
  {
    id: "REP-1002",
    name: "Monthly Booking Report",
    type: "Bookings",
    date: "24 Sep 2026",
  },
  {
    id: "REP-1003",
    name: "Customer Growth Report",
    type: "Customers",
    date: "23 Sep 2026",
  },
  {
    id: "REP-1004",
    name: "Payment Summary Report",
    type: "Payments",
    date: "22 Sep 2026",
  },
];

const AdminReports = () => {
  const [period, setPeriod] =
    useState("Last 6 Months");

  const [reportType, setReportType] =
    useState("Overview");

  const totalRevenue = useMemo(() => {
    return monthlyData.reduce(
      (sum, item) => sum + item.revenue,
      0
    );
  }, []);

  const totalBookings = useMemo(() => {
    return monthlyData.reduce(
      (sum, item) => sum + item.bookings,
      0
    );
  }, []);

  const totalCustomers = useMemo(() => {
    return monthlyData.reduce(
      (sum, item) => sum + item.customers,
      0
    );
  }, []);

  const averageBookingValue =
    totalBookings > 0
      ? Math.round(
          totalRevenue / totalBookings
        )
      : 0;

  const maxRevenue = Math.max(
    ...monthlyData.map(
      (item) => item.revenue
    )
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleExport = () => {
    alert(
      "Report export frontend demo hai. Backend connect hone ke baad actual report download hogi."
    );
  };

  return (
    <div className="admin-reports-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="admin-reports-header">

        <div className="admin-reports-heading">

          <div className="admin-reports-label">
            <FiBarChart2 />
            ANALYTICS & REPORTS
          </div>

          <h1>
            Reports & Analytics
          </h1>

          <p>
            Monitor your travel business
            performance, revenue, bookings and
            customer growth.
          </p>

        </div>

        <div className="admin-report-actions">

          <div className="report-select-box">

            <FiCalendar />

            <select
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value)
              }
            >
              <option>
                Last 6 Months
              </option>

              <option>
                Last 12 Months
              </option>

              <option>
                This Year
              </option>

              <option>
                This Month
              </option>
            </select>

            <FiChevronDown />

          </div>

          <button
            className="report-export-btn"
            onClick={handleExport}
          >
            <FiDownload />
            Export Report
          </button>

        </div>

      </div>

      {/* =========================================
          TABS
      ========================================= */}

      <div className="admin-report-tabs">

        {[
          "Overview",
          "Revenue",
          "Bookings",
          "Customers",
          "Payments",
        ].map((tab) => (
          <button
            key={tab}
            className={
              reportType === tab
                ? "active"
                : ""
            }
            onClick={() =>
              setReportType(tab)
            }
          >
            {tab}
          </button>
        ))}

      </div>

      {/* =========================================
          STAT CARDS
      ========================================= */}

      <div className="admin-report-stats">

        {/* Revenue */}

        <div className="admin-report-stat-card">

          <div className="report-stat-top">

            <div className="report-stat-icon gold">
              <FaRupeeSign />
            </div>

            <span className="report-growth positive">
              <FiArrowUp />
              18.4%
            </span>

          </div>

          <span className="report-stat-label">
            Total Revenue
          </span>

          <strong>
            {formatCurrency(
              totalRevenue
            )}
          </strong>

          <small>
            Compared with previous period
          </small>

        </div>

        {/* Bookings */}

        <div className="admin-report-stat-card">

          <div className="report-stat-top">

            <div className="report-stat-icon blue">
              <FiCreditCard />
            </div>

            <span className="report-growth positive">
              <FiArrowUp />
              12.8%
            </span>

          </div>

          <span className="report-stat-label">
            Total Bookings
          </span>

          <strong>
            {totalBookings.toLocaleString(
              "en-IN"
            )}
          </strong>

          <small>
            Successful bookings
          </small>

        </div>

        {/* Customers */}

        <div className="admin-report-stat-card">

          <div className="report-stat-top">

            <div className="report-stat-icon green">
              <FiUsers />
            </div>

            <span className="report-growth positive">
              <FiArrowUp />
              15.2%
            </span>

          </div>

          <span className="report-stat-label">
            Total Customers
          </span>

          <strong>
            {totalCustomers.toLocaleString(
              "en-IN"
            )}
          </strong>

          <small>
            Customers acquired
          </small>

        </div>

        {/* Average */}

        <div className="admin-report-stat-card">

          <div className="report-stat-top">

            <div className="report-stat-icon purple">
              <FiTrendingUp />
            </div>

            <span className="report-growth positive">
              <FiArrowUp />
              6.7%
            </span>

          </div>

          <span className="report-stat-label">
            Avg. Booking Value
          </span>

          <strong>
            {formatCurrency(
              averageBookingValue
            )}
          </strong>

          <small>
            Average value per booking
          </small>

        </div>

      </div>

      {/* =========================================
          MAIN REPORT GRID
      ========================================= */}

      <div className="admin-report-main-grid">

        {/* =====================================
            REVENUE CHART
        ===================================== */}

        <div className="admin-report-chart-card">

          <div className="report-card-header">

            <div>
              <h2>
                Revenue Performance
              </h2>

              <p>
                Monthly revenue overview
              </p>
            </div>

            <div className="report-chart-total">

              <span>
                Total Revenue
              </span>

              <strong>
                {formatCurrency(
                  totalRevenue
                )}
              </strong>

            </div>

          </div>

          <div className="report-chart">

            <div className="report-y-axis">
              <span>₹10L</span>
              <span>₹8L</span>
              <span>₹6L</span>
              <span>₹4L</span>
              <span>₹2L</span>
              <span>₹0</span>
            </div>

            <div className="report-bars">

              {monthlyData.map(
                (item) => {

                  const height =
                    (item.revenue /
                      maxRevenue) *
                    100;

                  return (
                    <div
                      className="report-bar-wrapper"
                      key={item.month}
                    >

                      <div className="report-bar-value">
                        ₹
                        {(
                          item.revenue /
                          100000
                        ).toFixed(1)}
                        L
                      </div>

                      <div className="report-bar-track">

                        <div
                          className="report-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <span>
                        {item.month}
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

        {/* =====================================
            QUICK INSIGHTS
        ===================================== */}

        <div className="admin-report-performance-card">

          <div className="report-card-header">

            <div>
              <h2>
                Quick Insights
              </h2>

              <p>
                Important performance metrics
              </p>
            </div>

          </div>

          <div className="performance-list">

            <div className="performance-item">

              <div className="performance-icon green">
                <FiTrendingUp />
              </div>

              <div>
                <strong>
                  Revenue Growth
                </strong>

                <span>
                  Revenue increased by 18.4%
                  this period.
                </span>
              </div>

              <b className="positive">
                +18.4%
              </b>

            </div>

            <div className="performance-item">

              <div className="performance-icon blue">
                <FiCheckCircle />
              </div>

              <div>
                <strong>
                  Booking Performance
                </strong>

                <span>
                  462 bookings recorded this
                  month.
                </span>
              </div>

              <b>
                462
              </b>

            </div>

            <div className="performance-item">

              <div className="performance-icon gold">
                <FiUsers />
              </div>

              <div>
                <strong>
                  Customer Growth
                </strong>

                <span>
                  634 customers active this
                  month.
                </span>
              </div>

              <b>
                634
              </b>

            </div>

            <div className="performance-item">

              <div className="performance-icon purple">
                <FiMapPin />
              </div>

              <div>
                <strong>
                  Top Destination
                </strong>

                <span>
                  Goa generated the most
                  bookings.
                </span>
              </div>

              <b>
                Goa
              </b>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          TOP DESTINATIONS
      ========================================= */}

      <div className="admin-report-section-card">

        <div className="report-card-header">

          <div>
            <h2>
              Top Destinations
            </h2>

            <p>
              Destination performance by
              bookings and revenue.
            </p>
          </div>

          <button className="report-link-btn">
            View Details
          </button>

        </div>

        <div className="destination-report-list">

          {destinationData.map(
            (destination) => (
              <div
                className="destination-report-row"
                key={destination.name}
              >

                <div className="destination-report-info">

                  <div className="destination-report-icon">
                    <FiMapPin />
                  </div>

                  <div>

                    <strong>
                      {destination.name}
                    </strong>

                    <span>
                      {destination.bookings} bookings
                    </span>

                  </div>

                </div>

                <div className="destination-report-middle">

                  <div className="destination-progress">

                    <div
                      style={{
                        width: `${destination.percentage}%`,
                      }}
                    />

                  </div>

                  <span>
                    {destination.percentage}%
                  </span>

                </div>

                <strong className="destination-revenue">
                  {formatCurrency(
                    destination.revenue
                  )}
                </strong>

              </div>
            )
          )}

        </div>

      </div>

      {/* =========================================
          BOTTOM GRID
      ========================================= */}

      <div className="admin-report-bottom-grid">

        {/* PAYMENT METHODS */}

        <div className="admin-report-section-card">

          <div className="report-card-header">

            <div>
              <h2>
                Payment Methods
              </h2>

              <p>
                Revenue by payment method
              </p>
            </div>

          </div>

          <div className="payment-report-list">

            {paymentData.map(
              (payment) => (
                <div
                  className="payment-report-item"
                  key={payment.name}
                >

                  <div className="payment-report-left">

                    <div className="payment-report-icon">
                      <FiCreditCard />
                    </div>

                    <div>

                      <strong>
                        {payment.name}
                      </strong>

                      <span>
                        {payment.percentage}%
                      </span>

                    </div>

                  </div>

                  <strong>
                    {formatCurrency(
                      payment.amount
                    )}
                  </strong>

                </div>
              )
            )}

          </div>

        </div>

        {/* BOOKING SUMMARY */}

        <div className="admin-report-section-card">

          <div className="report-card-header">

            <div>
              <h2>
                Booking Summary
              </h2>

              <p>
                Current booking status
              </p>
            </div>

          </div>

          <div className="booking-summary-chart">

            <div className="booking-circle">

              <div>
                <strong>
                  2,180
                </strong>

                <span>
                  Completed
                </span>
              </div>

            </div>

            <div className="booking-summary-list">

              <div>
                <span>
                  <i className="summary-dot completed" />
                  Completed
                </span>

                <strong>
                  74%
                </strong>
              </div>

              <div>
                <span>
                  <i className="summary-dot pending" />
                  Pending
                </span>

                <strong>
                  16%
                </strong>
              </div>

              <div>
                <span>
                  <i className="summary-dot cancelled" />
                  Cancelled
                </span>

                <strong>
                  10%
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          GENERATED REPORTS
      ========================================= */}

      <div className="admin-report-section-card">

        <div className="report-card-header">

          <div>
            <h2>
              Generated Reports
            </h2>

            <p>
              Recently generated reports
            </p>
          </div>

          <button
            className="report-export-btn small"
            onClick={handleExport}
          >
            <FiDownload />
            Generate Report
          </button>

        </div>

        <div className="reports-history-table">

          <table>

            <thead>
              <tr>
                <th>
                  Report ID
                </th>

                <th>
                  Report Name
                </th>

                <th>
                  Type
                </th>

                <th>
                  Date
                </th>

                <th>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {recentReports.map(
                (report) => (
                  <tr key={report.id}>

                    <td>
                      <strong>
                        {report.id}
                      </strong>
                    </td>

                    <td>
                      {report.name}
                    </td>

                    <td>
                      <span className="report-type-badge">
                        {report.type}
                      </span>
                    </td>

                    <td>
                      {report.date}
                    </td>

                    <td>

                      <button
                        className="table-download-btn"
                        onClick={handleExport}
                      >
                        <FiDownload />
                        Download
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================================
          FOOTER NOTE
      ========================================= */}

      <div className="reports-footer-note">

        <FiActivity />

        <span>
          Analytics currently use demo data.
          Backend and database integration can
          be connected later.
        </span>

      </div>

    </div>
  );
};

export default AdminReports;