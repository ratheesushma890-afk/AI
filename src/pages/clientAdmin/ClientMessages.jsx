import React, { useMemo, useState } from "react";

import {
  FiMessageSquare,
  FiSearch,
  FiMail,
  FiSend,
  FiUser,
  FiClock,
} from "react-icons/fi";

import "./ClientMessages.css";

const ClientMessages = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [reply, setReply] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      subject: "Goa booking confirmation",
      message:
        "Hello, I want to confirm whether my Goa hotel booking is completed.",
      time: "10:32 AM",
      unread: true,
      replies: [],
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@gmail.com",
      subject: "Change travel date",
      message:
        "Can I change my Manali travel date from 18 October to 20 October?",
      time: "09:15 AM",
      unread: true,
      replies: [],
    },
    {
      id: 3,
      name: "Rahul Mehta",
      email: "rahul@gmail.com",
      subject: "Hotel information",
      message:
        "Please share more information about the hotel included in my Jaipur trip.",
      time: "Yesterday",
      unread: false,
      replies: [],
    },
    {
      id: 4,
      name: "Ananya Singh",
      email: "ananya@gmail.com",
      subject: "Kerala trip",
      message:
        "Thank you. I wanted to know if airport pickup is included in the package.",
      time: "Yesterday",
      unread: false,
      replies: [],
    },
  ]);

  const filteredMessages = useMemo(() => {
    const value = search.toLowerCase();

    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(value) ||
        message.subject.toLowerCase().includes(value)
    );
  }, [messages, search]);

  const selectedMessage =
    messages.find((message) => message.id === selectedId) ||
    filteredMessages[0];

  const openMessage = (id) => {
    setSelectedId(id);

    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? { ...message, unread: false }
          : message
      )
    );
  };

  const sendReply = () => {
    if (!reply.trim() || !selectedMessage) return;

    setMessages((prev) =>
      prev.map((message) =>
        message.id === selectedMessage.id
          ? {
              ...message,
              replies: [
                ...message.replies,
                {
                  text: reply.trim(),
                  time: "Just now",
                },
              ],
            }
          : message
      )
    );

    setReply("");
  };

  return (
    <div className="client-messages-page">

      <section className="client-message-header">
        <div>
          <span>CUSTOMER SUPPORT</span>
          <h1>Messages</h1>
          <p>
            Read customer enquiries and send replies from the
            client admin panel.
          </p>
        </div>

        <div className="client-message-count">
          <FiMessageSquare />

          <div>
            <strong>
              {messages.filter((item) => item.unread).length}
            </strong>
            <span>Unread Messages</span>
          </div>
        </div>
      </section>

      <section className="client-message-panel">

        {/* LEFT SIDE */}

        <aside className="client-message-list">

          <div className="client-message-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="client-message-items">

            {filteredMessages.map((message) => (
              <button
                key={message.id}
                className={`client-message-item ${
                  selectedMessage?.id === message.id
                    ? "active"
                    : ""
                }`}
                onClick={() => openMessage(message.id)}
              >
                <div className="client-message-avatar">
                  {message.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div className="client-message-preview">
                  <div>
                    <strong>{message.name}</strong>
                    <span>{message.time}</span>
                  </div>

                  <h4>{message.subject}</h4>

                  <p>{message.message}</p>
                </div>

                {message.unread && (
                  <span className="client-unread-dot" />
                )}
              </button>
            ))}

          </div>

        </aside>

        {/* RIGHT SIDE */}

        <div className="client-message-conversation">

          {selectedMessage ? (
            <>
              <div className="client-conversation-header">

                <div className="client-conversation-avatar">
                  {selectedMessage.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <h3>{selectedMessage.name}</h3>

                  <span>
                    <FiMail />
                    {selectedMessage.email}
                  </span>
                </div>

              </div>

              <div className="client-conversation-body">

                <div className="client-customer-message">
                  <div className="client-chat-meta">
                    <FiUser />
                    <span>{selectedMessage.name}</span>

                    <small>
                      <FiClock />
                      {selectedMessage.time}
                    </small>
                  </div>

                  <strong>{selectedMessage.subject}</strong>

                  <p>{selectedMessage.message}</p>
                </div>

                {selectedMessage.replies.map(
                  (item, index) => (
                    <div
                      className="client-admin-reply"
                      key={index}
                    >
                      <span>Client Admin</span>

                      <p>{item.text}</p>

                      <small>{item.time}</small>
                    </div>
                  )
                )}

              </div>

              <div className="client-message-reply">

                <textarea
                  placeholder="Write your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />

                <button onClick={sendReply}>
                  <FiSend />
                  Send Reply
                </button>

              </div>
            </>
          ) : (
            <div className="client-no-message">
              <FiMessageSquare />
              <h3>Select a message</h3>
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default ClientMessages;