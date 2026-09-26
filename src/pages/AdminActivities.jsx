import React, { useMemo, useState } from "react";

import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiEdit3,
  FiFilter,
  FiMapPin,
  FiMessageSquare,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUserPlus,
  FiXCircle,
} from "react-icons/fi";

import "./AdminActivities.css";

const AdminActivities = () => {
  const [activities, setActivities] = useState([
    {
      id: "ACT-1001",
      type: "booking",
      title: "New booking received",
      description:
        "Rahul Sharma booked Goa Beach Escape for 2 guests.",
      user: "Rahul Sharma",
      userEmail: "rahul.sharma@gmail.com",
      time: "2 minutes ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "High",
    },
    {
      id: "ACT-1002",
      type: "payment",
      title: "Payment successful",
      description:
        "Payment of ₹24,999 was successfully received.",
      user: "Rahul Sharma",
      userEmail: "rahul.sharma@gmail.com",
      time: "8 minutes ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "High",
    },
    {
      id: "ACT-1003",
      type: "user",
      title: "New customer registered",
      description:
        "Priya Verma created a new customer account.",
      user: "Priya Verma",
      userEmail: "priya.verma@gmail.com",
      time: "22 minutes ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
    {
      id: "ACT-1004",
      type: "review",
      title: "New review submitted",
      description:
        "Arjun Mehta submitted a 5-star review for Dubai Explorer.",
      user: "Arjun Mehta",
      userEmail: "arjun.mehta@gmail.com",
      time: "41 minutes ago",
      date: "25 Sep 2026",
      status: "Pending",
      priority: "Normal",
    },
    {
      id: "ACT-1005",
      type: "trip",
      title: "Trip updated",
      description:
        "Manali Adventure package details were updated by admin.",
      user: "Super Admin",
      userEmail: "admin@tripper.com",
      time: "1 hour ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
    {
      id: "ACT-1006",
      type: "booking",
      title: "Booking cancelled",
      description:
        "Sneha Kapoor cancelled Kashmir Paradise booking.",
      user: "Sneha Kapoor",
      userEmail: "sneha.kapoor@gmail.com",
      time: "2 hours ago",
      date: "25 Sep 2026",
      status: "Cancelled",
      priority: "High",
    },
    {
      id: "ACT-1007",
      type: "message",
      title: "New customer message",
      description:
        "Vikram Singh sent a message about Bali honeymoon package.",
      user: "Vikram Singh",
      userEmail: "vikram.singh@gmail.com",
      time: "3 hours ago",
      date: "25 Sep 2026",
      status: "Pending",
      priority: "Normal",
    },
    {
      id: "ACT-1008",
      type: "payment",
      title: "Payment refunded",
      description:
        "₹45,999 payment was refunded to Karan Malhotra.",
      user: "Karan Malhotra",
      userEmail: "karan.malhotra@gmail.com",
      time: "4 hours ago",
      date: "25 Sep 2026",
      status: "Refunded",
      priority: "High",
    },
    {
      id: "ACT-1009",
      type: "destination",
      title: "New destination added",
      description:
        "Bali was added to the destination collection.",
      user: "Super Admin",
      userEmail: "admin@tripper.com",
      time: "5 hours ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
    {
      id: "ACT-1010",
      type: "user",
      title: "Customer profile updated",
      description:
        "Meera Joshi updated her profile information.",
      user: "Meera Joshi",
      userEmail: "meera.joshi@gmail.com",
      time: "6 hours ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
    {
      id: "ACT-1011",
      type: "review",
      title: "Review approved",
      description:
        "A review for Kerala Backwaters was approved by admin.",
      user: "Super Admin",
      userEmail: "admin@tripper.com",
      time: "7 hours ago",
      date: "25 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
    {
      id: "ACT-1012",
      type: "trip",
      title: "New trip package created",
      description:
        "Rajasthan Royal Tour package was created.",
      user: "Super Admin",
      userEmail: "admin@tripper.com",
      time: "Yesterday",
      date: "24 Sep 2026",
      status: "Completed",
      priority: "Normal",
    },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] =
    useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const activitiesPerPage = 7;

  const getActivityIcon = (type) => {
    switch (type) {
      case "booking":
        return <FiCalendar />;

      case "payment":
        return <FiCreditCard />;

      case "user":
        return <FiUserPlus />;

      case "review":
        return <FiCheckCircle />;

      case "trip":
        return <FiEdit3 />;

      case "message":
        return <FiMessageSquare />;

      case "destination":
        return <FiMapPin />;

      default:
        return <FiActivity />;
    }
  };

  const getActivityClass = (type) => {
    switch (type) {
      case "booking":
        return "booking";

      case "payment":
        return "payment";

      case "user":
        return "user";

      case "review":
        return "review";

      case "trip":
        return "trip";

      case "message":
        return "message";

      case "destination":
        return "destination";

      default:
        return "default";
    }
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        activity.id.toLowerCase().includes(query) ||
        activity.title.toLowerCase().includes(query) ||
        activity.description
          .toLowerCase()
          .includes(query) ||
        activity.user.toLowerCase().includes(query) ||
        activity.userEmail.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" ||
        activity.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        activity.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    activities,
    search,
    typeFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredActivities.length / activitiesPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const currentActivities =
    filteredActivities.slice(
      (safeCurrentPage - 1) * activitiesPerPage,
      safeCurrentPage * activitiesPerPage
    );

  const totalActivities = activities.length;

  const todayActivities = activities.filter(
    (activity) =>
      activity.date === "25 Sep 2026"
  ).length;

  const pendingActivities = activities.filter(
    (activity) =>
      activity.status === "Pending"
  ).length;

  const highPriorityActivities =
    activities.filter(
      (activity) =>
        activity.priority === "High"
    ).length;

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const removeActivity = (id) => {
    setActivities((prev) =>
      prev.filter((activity) => activity.id !== id)
    );

    setSelectedActivity(null);
  };

  return (
    <div className="admin-activities-page">
      {/* HEADER */}
      <div className="admin-activities-header">
        <div>
          <span className="admin-activities-label">
            ACTIVITY CENTER
          </span>

          <h1>Activities</h1>

          <p>
            Monitor everything happening across your
            travel platform.
          </p>
        </div>

        <div className="admin-activity-live">
          <span></span>
          Live Activity Monitor
        </div>
      </div>

      {/* STATS */}
      <div className="admin-activity-stats">
        <div className="admin-activity-stat-card">
          <div className="activity-stat-icon gold">
            <FiActivity />
          </div>

          <div className="activity-stat-content">
            <strong>{totalActivities}</strong>
            <span>Total Activities</span>
            <small>All recorded activities</small>
          </div>
        </div>

        <div className="admin-activity-stat-card">
          <div className="activity-stat-icon blue">
            <FiClock />
          </div>

          <div className="activity-stat-content">
            <strong>{todayActivities}</strong>
            <span>Today</span>
            <small>Activities today</small>
          </div>
        </div>

        <div className="admin-activity-stat-card">
          <div className="activity-stat-icon orange">
            <FiClock />
          </div>

          <div className="activity-stat-content">
            <strong>{pendingActivities}</strong>
            <span>Pending</span>
            <small>Need attention</small>
          </div>
        </div>

        <div className="admin-activity-stat-card">
          <div className="activity-stat-icon red">
            <FiXCircle />
          </div>

          <div className="activity-stat-content">
            <strong>{highPriorityActivities}</strong>
            <span>High Priority</span>
            <small>Important activities</small>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="admin-activities-toolbar">
        <div className="activity-search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="activity-filter-box">
          <FiFilter />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Activities</option>
            <option value="booking">Bookings</option>
            <option value="payment">Payments</option>
            <option value="user">Users</option>
            <option value="review">Reviews</option>
            <option value="trip">Trips</option>
            <option value="message">Messages</option>
            <option value="destination">
              Destinations
            </option>
          </select>
        </div>

        <div className="activity-filter-box">
          <FiCheckCircle />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Completed">
              Completed
            </option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">
              Cancelled
            </option>
            <option value="Refunded">
              Refunded
            </option>
          </select>
        </div>

        {(search ||
          typeFilter !== "All" ||
          statusFilter !== "All") && (
          <button
            className="activity-clear-btn"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}
      </div>

      {/* MAIN ACTIVITY CARD */}
      <div className="admin-activities-card">
        <div className="admin-activities-card-head">
          <div>
            <h2>Recent Activities</h2>

            <p>
              {filteredActivities.length} activities
              found
            </p>
          </div>

          <div className="activity-status-info">
            <span className="activity-online-dot"></span>
            System monitoring active
          </div>
        </div>

        {/* ACTIVITY LIST */}
        <div className="admin-activity-list">
          {currentActivities.length > 0 ? (
            currentActivities.map((activity) => (
              <div
                className="admin-activity-row"
                key={activity.id}
              >
                <div
                  className={`activity-main-icon ${getActivityClass(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                <div className="activity-row-content">
                  <div className="activity-row-top">
                    <div className="activity-title-wrap">
                      <h3>{activity.title}</h3>

                      <span
                        className={`activity-priority ${activity.priority.toLowerCase()}`}
                      >
                        {activity.priority}
                      </span>
                    </div>

                    <span className="activity-time">
                      {activity.time}
                    </span>
                  </div>

                  <p>{activity.description}</p>

                  <div className="activity-row-bottom">
                    <div className="activity-user-info">
                      <div className="activity-user-avatar">
                        {activity.user
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>{activity.user}</span>

                      <i></i>

                      <span>
                        {activity.id}
                      </span>
                    </div>

                    <span
                      className={`activity-status ${activity.status.toLowerCase()}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>

                <button
                  className="activity-view-btn"
                  onClick={() =>
                    setSelectedActivity(activity)
                  }
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <div className="activity-empty">
              <FiActivity />

              <h3>No activities found</h3>

              <p>
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredActivities.length > 0 && (
          <div className="admin-activity-pagination">
            <span>
              Showing{" "}
              <strong>
                {(safeCurrentPage - 1) *
                  activitiesPerPage +
                  1}
              </strong>{" "}
              -{" "}
              <strong>
                {Math.min(
                  safeCurrentPage *
                    activitiesPerPage,
                  filteredActivities.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredActivities.length}
              </strong>
            </span>

            <div className="activity-pagination-buttons">
              <button
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
              >
                <FiChevronLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  className={
                    safeCurrentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  safeCurrentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ACTIVITY TYPE SUMMARY */}
      <div className="activity-summary-card">
        <div className="activity-summary-head">
          <div>
            <span>ACTIVITY BREAKDOWN</span>
            <h2>System Activity Overview</h2>
          </div>
        </div>

        <div className="activity-summary-grid">
          <div className="activity-summary-item">
            <div className="summary-icon booking">
              <FiCalendar />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "booking"
                  ).length
                }
              </strong>

              <span>Bookings</span>
            </div>
          </div>

          <div className="activity-summary-item">
            <div className="summary-icon payment">
              <FiCreditCard />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "payment"
                  ).length
                }
              </strong>

              <span>Payments</span>
            </div>
          </div>

          <div className="activity-summary-item">
            <div className="summary-icon user">
              <FiUser />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "user"
                  ).length
                }
              </strong>

              <span>Users</span>
            </div>
          </div>

          <div className="activity-summary-item">
            <div className="summary-icon review">
              <FiCheckCircle />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "review"
                  ).length
                }
              </strong>

              <span>Reviews</span>
            </div>
          </div>

          <div className="activity-summary-item">
            <div className="summary-icon trip">
              <FiEdit3 />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "trip"
                  ).length
                }
              </strong>

              <span>Trips</span>
            </div>
          </div>

          <div className="activity-summary-item">
            <div className="summary-icon message">
              <FiMessageSquare />
            </div>

            <div>
              <strong>
                {
                  activities.filter(
                    (item) =>
                      item.type === "message"
                  ).length
                }
              </strong>

              <span>Messages</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedActivity && (
        <div
          className="admin-activity-modal-overlay"
          onClick={() =>
            setSelectedActivity(null)
          }
        >
          <div
            className="admin-activity-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="activity-modal-header">
              <div>
                <span>ACTIVITY DETAILS</span>
                <h2>
                  {selectedActivity.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedActivity(null)
                }
              >
                ×
              </button>
            </div>

            <div className="activity-modal-icon-row">
              <div
                className={`activity-modal-icon ${getActivityClass(
                  selectedActivity.type
                )}`}
              >
                {getActivityIcon(
                  selectedActivity.type
                )}
              </div>

              <div>
                <strong>
                  {selectedActivity.id}
                </strong>

                <span>
                  {selectedActivity.time}
                </span>
              </div>
            </div>

            <div className="activity-modal-description">
              <span>Description</span>

              <p>
                {selectedActivity.description}
              </p>
            </div>

            <div className="activity-modal-grid">
              <div>
                <span>User</span>
                <strong>
                  {selectedActivity.user}
                </strong>
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {selectedActivity.userEmail}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {selectedActivity.date}
                </strong>
              </div>

              <div>
                <span>Activity Type</span>
                <strong>
                  {selectedActivity.type}
                </strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>
                  {selectedActivity.priority}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong
                  className={`activity-status ${selectedActivity.status.toLowerCase()}`}
                >
                  {selectedActivity.status}
                </strong>
              </div>
            </div>

            <div className="activity-modal-footer">
              <button
                className="activity-delete-btn"
                onClick={() =>
                  removeActivity(
                    selectedActivity.id
                  )
                }
              >
                <FiTrash2 />
                Remove Activity
              </button>

              <button
                className="activity-close-btn"
                onClick={() =>
                  setSelectedActivity(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivities;