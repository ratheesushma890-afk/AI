import { useState } from "react";
import "./AdminMessages.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      subject: "Dubai Trip Inquiry",
      message:
        "I want to know more about the Dubai package and hotel options.",
      date: "10 Sep 2026",
      status: "Unread",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      subject: "Paris Booking",
      message:
        "Can you please tell me if the Paris package is available for October?",
      date: "09 Sep 2026",
      status: "Read",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman@gmail.com",
      subject: "Bali Package",
      message:
        "I would like to know about the activities included in the Bali package.",
      date: "08 Sep 2026",
      status: "Unread",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      email: "neha@gmail.com",
      subject: "Payment Question",
      message:
        "I have completed my booking but need help regarding the payment receipt.",
      date: "07 Sep 2026",
      status: "Read",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const markAsRead = (id) => {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? { ...message, status: "Read" }
          : message
      )
    );
  };

  const deleteMessage = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (confirmDelete) {
      setMessages(
        messages.filter(
          (message) => message.id !== id
        )
      );
    }
  };

  const filteredMessages = messages.filter((message) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      message.name.toLowerCase().includes(searchText) ||
      message.email.toLowerCase().includes(searchText) ||
      message.subject.toLowerCase().includes(searchText) ||
      message.message.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" ||
      message.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-messages-page">

      {/* HEADER */}
      <div className="admin-messages-header">
        <div>
          <h1>Messages</h1>
          <p>Manage customer inquiries and messages</p>
        </div>

        <div className="messages-total">
          {filteredMessages.length} Messages
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="messages-toolbar">

        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="All">All Messages</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
        </select>

      </div>

      {/* MESSAGE LIST */}
      <div className="messages-list">

        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div
              className={`admin-message-card ${
                message.status === "Unread"
                  ? "message-unread"
                  : ""
              }`}
              key={message.id}
            >

              {/* TOP */}
              <div className="message-top">

                <div className="message-user">

                  <div className="message-avatar">
                    👤
                  </div>

                  <div>
                    <h3>{message.name}</h3>
                    <span>{message.email}</span>
                  </div>

                </div>

                <span className="message-date">
                  {message.date}
                </span>

              </div>

              {/* SUBJECT */}
              <h2>{message.subject}</h2>

              {/* MESSAGE */}
              <p className="message-text">
                {message.message}
              </p>

              {/* BOTTOM */}
              <div className="message-bottom">

                <span
                  className={`message-status ${
                    message.status.toLowerCase()
                  }`}
                >
                  {message.status === "Unread"
                    ? "● Unread"
                    : "✓ Read"}
                </span>

                <div className="message-actions">

                  {message.status === "Unread" && (
                    <button
                      className="message-read"
                      onClick={() =>
                        markAsRead(message.id)
                      }
                    >
                      ✓ Mark as Read
                    </button>
                  )}

                  <button
                    className="message-reply"
                    onClick={() =>
                      window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`
                    }
                  >
                    Reply
                  </button>

                  <button
                    className="message-delete"
                    onClick={() =>
                      deleteMessage(message.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="no-messages">
            No messages found
          </div>
        )}

      </div>
    </div>
  );
}