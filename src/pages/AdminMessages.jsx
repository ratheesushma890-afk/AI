import React, { useMemo, useState } from "react";
import {
  FiArchive,
  FiArrowLeft,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMail,
  FiMessageCircle,
  FiMoreVertical,
  FiPhone,
  FiSearch,
  FiSend,
  FiStar,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./AdminMessages.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: "MSG-1001",
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 98765 43210",
      subject: "Goa trip enquiry",
      message:
        "Hello, I am planning a Goa trip for 4 people. I would like to know if you have any package available for October and what activities are included.",
      date: "25 Sep 2026",
      time: "10:42 AM",
      status: "Unread",
      priority: "High",
      avatar: "RS",
    },
    {
      id: "MSG-1002",
      name: "Priya Verma",
      email: "priya.verma@gmail.com",
      phone: "+91 98111 22334",
      subject: "Booking confirmation",
      message:
        "Hi team, I recently booked the Manali Mountain Adventure package. Could you please confirm whether my booking has been successfully processed?",
      date: "25 Sep 2026",
      time: "09:18 AM",
      status: "Read",
      priority: "Normal",
      avatar: "PV",
    },
    {
      id: "MSG-1003",
      name: "Arjun Mehta",
      email: "arjun.mehta@gmail.com",
      phone: "+91 99887 66554",
      subject: "Dubai package details",
      message:
        "I am interested in your Dubai Luxury Escape package. Please share the hotel details and information about airport transfers.",
      date: "24 Sep 2026",
      time: "05:36 PM",
      status: "Unread",
      priority: "High",
      avatar: "AM",
    },
    {
      id: "MSG-1004",
      name: "Sneha Kapoor",
      email: "sneha.kapoor@gmail.com",
      phone: "+91 97654 32109",
      subject: "Cancellation request",
      message:
        "Unfortunately, I need to cancel my upcoming Rajasthan trip due to a change in my schedule. Please let me know the cancellation process.",
      date: "24 Sep 2026",
      time: "02:15 PM",
      status: "Replied",
      priority: "High",
      avatar: "SK",
    },
    {
      id: "MSG-1005",
      name: "Vikram Singh",
      email: "vikram.singh@gmail.com",
      phone: "+91 98989 12345",
      subject: "Bali honeymoon package",
      message:
        "We are planning our honeymoon in Bali. Can you suggest a package with a private pool villa and romantic experiences?",
      date: "23 Sep 2026",
      time: "11:30 AM",
      status: "Unread",
      priority: "Normal",
      avatar: "VS",
    },
    {
      id: "MSG-1006",
      name: "Ananya Gupta",
      email: "ananya.gupta@gmail.com",
      phone: "+91 98700 45678",
      subject: "Payment issue",
      message:
        "I tried making the payment for my trip but the payment page showed an error. Please help me complete the booking.",
      date: "22 Sep 2026",
      time: "04:48 PM",
      status: "Read",
      priority: "High",
      avatar: "AG",
    },
    {
      id: "MSG-1007",
      name: "Karan Malhotra",
      email: "karan.malhotra@gmail.com",
      phone: "+91 99111 77889",
      subject: "Custom trip request",
      message:
        "Can you create a customised 7-day Kashmir itinerary for a family of 5? We would prefer comfortable hotels and private transportation.",
      date: "21 Sep 2026",
      time: "01:05 PM",
      status: "Replied",
      priority: "Normal",
      avatar: "KM",
    },
    {
      id: "MSG-1008",
      name: "Meera Joshi",
      email: "meera.joshi@gmail.com",
      phone: "+91 98222 33445",
      subject: "Travel insurance query",
      message:
        "I would like to know whether travel insurance is included in your international packages or if I need to purchase it separately.",
      date: "20 Sep 2026",
      time: "10:20 AM",
      status: "Unread",
      priority: "Normal",
      avatar: "MJ",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [selectedMessage, setSelectedMessage] =
    useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const messagesPerPage = 6;

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        message.name
          .toLowerCase()
          .includes(searchValue) ||
        message.email
          .toLowerCase()
          .includes(searchValue) ||
        message.subject
          .toLowerCase()
          .includes(searchValue) ||
        message.id
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        message.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    messages,
    search,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMessages.length /
        messagesPerPage
    )
  );

  const visibleMessages =
    filteredMessages.slice(
      (currentPage - 1) *
        messagesPerPage,
      currentPage *
        messagesPerPage
    );

  const unreadCount = messages.filter(
    (message) =>
      message.status === "Unread"
  ).length;

  const repliedCount = messages.filter(
    (message) =>
      message.status === "Replied"
  ).length;

  const readCount = messages.filter(
    (message) =>
      message.status === "Read"
  ).length;

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
    setShowReplyBox(false);
    setReplyText("");

    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id &&
        item.status === "Unread"
          ? {
              ...item,
              status: "Read",
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setMessages((prev) =>
      prev.filter(
        (message) => message.id !== id
      )
    );

    if (
      selectedMessage &&
      selectedMessage.id === id
    ) {
      setSelectedMessage(null);
    }
  };

  const handleArchive = (id) => {
    setMessages((prev) =>
      prev.filter(
        (message) => message.id !== id
      )
    );

    setSelectedMessage(null);
  };

  const handleReply = () => {
    if (!replyText.trim()) return;

    setMessages((prev) =>
      prev.map((message) =>
        message.id ===
        selectedMessage.id
          ? {
              ...message,
              status: "Replied",
            }
          : message
      )
    );

    setSelectedMessage((prev) => ({
      ...prev,
      status: "Replied",
    }));

    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="admin-messages-page">
      {/* HEADER */}
      <div className="admin-messages-header">
        <div>
          <span className="admin-messages-label">
            COMMUNICATION
          </span>

          <h1>Messages</h1>

          <p>
            Manage customer enquiries,
            conversations and support
            requests.
          </p>
        </div>

        <div className="admin-message-header-count">
          <FiMail />

          <div>
            <strong>
              {unreadCount}
            </strong>

            <span>
              Unread messages
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="admin-message-stats">
        <div className="admin-message-stat-card">
          <div className="message-stat-icon gold">
            <FiMail />
          </div>

          <div>
            <span>
              Total Messages
            </span>

            <strong>
              {messages.length}
            </strong>

            <small>
              All conversations
            </small>
          </div>
        </div>

        <div className="admin-message-stat-card">
          <div className="message-stat-icon orange">
            <FiMessageCircle />
          </div>

          <div>
            <span>
              Unread
            </span>

            <strong>
              {unreadCount}
            </strong>

            <small>
              Need attention
            </small>
          </div>
        </div>

        <div className="admin-message-stat-card">
          <div className="message-stat-icon green">
            <FiCheck />
          </div>

          <div>
            <span>
              Replied
            </span>

            <strong>
              {repliedCount}
            </strong>

            <small>
              Conversations handled
            </small>
          </div>
        </div>

        <div className="admin-message-stat-card">
          <div className="message-stat-icon blue">
            <FiClock />
          </div>

          <div>
            <span>
              Read
            </span>

            <strong>
              {readCount}
            </strong>

            <small>
              Already reviewed
            </small>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="admin-message-toolbar">
        <div className="message-search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search messages, customers or subject..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="message-filter">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option value="All">
              All Messages
            </option>

            <option value="Unread">
              Unread
            </option>

            <option value="Read">
              Read
            </option>

            <option value="Replied">
              Replied
            </option>
          </select>
        </div>
      </div>

      {/* MESSAGE CARD */}
      <div className="admin-messages-card">
        <div className="admin-messages-card-head">
          <div>
            <h2>
              Customer Messages
            </h2>

            <p>
              {filteredMessages.length}{" "}
              conversations found
            </p>
          </div>

          <span>
            Showing{" "}
            {filteredMessages.length === 0
              ? 0
              : (currentPage - 1) *
                  messagesPerPage +
                1}
            -
            {Math.min(
              currentPage *
                messagesPerPage,
              filteredMessages.length
            )}{" "}
            of{" "}
            {filteredMessages.length}
          </span>
        </div>

        <div className="admin-message-list">
          {visibleMessages.length > 0 ? (
            visibleMessages.map(
              (message) => (
                <div
                  key={message.id}
                  className={`admin-message-row ${
                    message.status ===
                    "Unread"
                      ? "unread"
                      : ""
                  }`}
                >
                  <div className="message-avatar">
                    {message.avatar}
                  </div>

                  <div className="message-main">
                    <div className="message-top">
                      <div>
                        <h3>
                          {message.name}
                        </h3>

                        <span>
                          {message.email}
                        </span>
                      </div>

                      <div className="message-time">
                        <span>
                          {message.date}
                        </span>

                        <small>
                          {message.time}
                        </small>
                      </div>
                    </div>

                    <div className="message-subject-row">
                      <h4>
                        {message.subject}
                      </h4>

                      <span
                        className={`message-priority ${message.priority.toLowerCase()}`}
                      >
                        {message.priority}
                      </span>
                    </div>

                    <p>
                      {message.message}
                    </p>

                    <div className="message-bottom">
                      <span
                        className={`message-status ${message.status.toLowerCase()}`}
                      >
                        {message.status}
                      </span>

                      <span className="message-id">
                        {message.id}
                      </span>
                    </div>
                  </div>

                  <div className="message-actions">
                    <button
                      type="button"
                      className="message-view-btn"
                      onClick={() =>
                        handleOpenMessage(
                          message
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      type="button"
                      className="message-delete-btn"
                      title="Delete"
                      onClick={() =>
                        handleDelete(
                          message.id
                        )
                      }
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="message-empty">
              <FiMail />

              <h3>
                No messages found
              </h3>

              <p>
                Try changing your search
                or filter.
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredMessages.length >
          messagesPerPage && (
          <div className="admin-message-pagination">
            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
            >
              <FiChevronLeft />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
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
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* MESSAGE DETAIL MODAL */}
      {selectedMessage && (
        <div
          className="admin-message-modal-overlay"
          onClick={() =>
            setSelectedMessage(null)
          }
        >
          <div
            className="admin-message-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="message-modal-header">
              <div>
                <span>
                  MESSAGE
                </span>

                <h2>
                  {selectedMessage.subject}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(
                    null
                  )
                }
              >
                <FiX />
              </button>
            </div>

            <div className="message-modal-user">
              <div className="modal-message-avatar">
                {selectedMessage.avatar}
              </div>

              <div>
                <strong>
                  {selectedMessage.name}
                </strong>

                <span>
                  {selectedMessage.email}
                </span>
              </div>

              <div className="modal-user-contact">
                <a
                  href={`mailto:${selectedMessage.email}`}
                >
                  <FiMail />
                </a>

                <a
                  href={`tel:${selectedMessage.phone}`}
                >
                  <FiPhone />
                </a>
              </div>
            </div>

            <div className="message-modal-meta">
              <div>
                <FiClock />

                <span>
                  {selectedMessage.date}{" "}
                  at{" "}
                  {selectedMessage.time}
                </span>
              </div>

              <span
                className={`message-status ${selectedMessage.status.toLowerCase()}`}
              >
                {selectedMessage.status}
              </span>
            </div>

            <div className="message-modal-content">
              <span>
                CUSTOMER MESSAGE
              </span>

              <p>
                {selectedMessage.message}
              </p>
            </div>

            {showReplyBox && (
              <div className="message-reply-box">
                <label>
                  Reply to{" "}
                  {selectedMessage.name}
                </label>

                <textarea
                  value={replyText}
                  onChange={(e) =>
                    setReplyText(
                      e.target.value
                    )
                  }
                  placeholder="Write your reply..."
                  rows="5"
                />

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowReplyBox(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleReply
                    }
                  >
                    <FiSend />
                    Send Reply
                  </button>
                </div>
              </div>
            )}

            <div className="message-modal-actions">
              {!showReplyBox && (
                <button
                  type="button"
                  className="modal-reply-btn"
                  onClick={() =>
                    setShowReplyBox(
                      true
                    )
                  }
                >
                  <FiSend />
                  Reply
                </button>
              )}

              <button
                type="button"
                className="modal-archive-btn"
                onClick={() =>
                  handleArchive(
                    selectedMessage.id
                  )
                }
              >
                <FiArchive />
                Archive
              </button>

              <button
                type="button"
                className="modal-delete-btn"
                onClick={() =>
                  handleDelete(
                    selectedMessage.id
                  )
                }
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;