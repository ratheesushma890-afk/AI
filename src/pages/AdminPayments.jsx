import React, { useMemo, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheckCircle,
  FiCreditCard,
  FiEye,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiXCircle,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import "./AdminPayments.css";

const initialPayments = [
  {
    id: "PAY-1001",
    bookingId: "BK-1001",
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    method: "UPI",
    amount: 28500,
    status: "Completed",
    date: "24 Sep 2026",
    transactionId: "TXN982341",
  },
  {
    id: "PAY-1002",
    bookingId: "BK-1002",
    customer: "Priya Verma",
    email: "priya@gmail.com",
    method: "Credit Card",
    amount: 42500,
    status: "Completed",
    date: "23 Sep 2026",
    transactionId: "TXN982342",
  },
  {
    id: "PAY-1003",
    bookingId: "BK-1003",
    customer: "Arjun Mehta",
    email: "arjun@gmail.com",
    method: "Debit Card",
    amount: 31800,
    status: "Pending",
    date: "22 Sep 2026",
    transactionId: "TXN982343",
  },
  {
    id: "PAY-1004",
    bookingId: "BK-1004",
    customer: "Sneha Kapoor",
    email: "sneha@gmail.com",
    method: "UPI",
    amount: 19800,
    status: "Refunded",
    date: "21 Sep 2026",
    transactionId: "TXN982344",
  },
  {
    id: "PAY-1005",
    bookingId: "BK-1005",
    customer: "Vikram Singh",
    email: "vikram@gmail.com",
    method: "Net Banking",
    amount: 56200,
    status: "Completed",
    date: "20 Sep 2026",
    transactionId: "TXN982345",
  },
  {
    id: "PAY-1006",
    bookingId: "BK-1006",
    customer: "Ananya Gupta",
    email: "ananya@gmail.com",
    method: "Credit Card",
    amount: 24700,
    status: "Failed",
    date: "19 Sep 2026",
    transactionId: "TXN982346",
  },
  {
    id: "PAY-1007",
    bookingId: "BK-1007",
    customer: "Karan Malhotra",
    email: "karan@gmail.com",
    method: "UPI",
    amount: 36500,
    status: "Completed",
    date: "18 Sep 2026",
    transactionId: "TXN982347",
  },
  {
    id: "PAY-1008",
    bookingId: "BK-1008",
    customer: "Meera Joshi",
    email: "meera@gmail.com",
    method: "Credit Card",
    amount: 45200,
    status: "Completed",
    date: "17 Sep 2026",
    transactionId: "TXN982348",
  },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const stats = useMemo(() => {
    const completed = payments.filter(
      (item) => item.status === "Completed"
    );

    const pending = payments.filter(
      (item) => item.status === "Pending"
    );

    const refunded = payments.filter(
      (item) => item.status === "Refunded"
    );

    const revenue = completed.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return {
      revenue,
      completed: completed.length,
      pending: pending.length,
      refunded: refunded.length,
    };
  }, [payments]);

  const filteredPayments = payments.filter((payment) => {
    const text = search.toLowerCase();

    const matchesSearch =
      payment.id.toLowerCase().includes(text) ||
      payment.bookingId.toLowerCase().includes(text) ||
      payment.customer.toLowerCase().includes(text) ||
      payment.email.toLowerCase().includes(text) ||
      payment.transactionId.toLowerCase().includes(text);

    const matchesStatus =
      status === "All" || payment.status === status;

    return matchesSearch && matchesStatus;
  });

  const markRefunded = (id) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Refunded" }
          : payment
      )
    );

    setSelectedPayment(null);
  };

  const markCompleted = (id) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Completed" }
          : payment
      )
    );
  };

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="admin-payments-page">

      <div className="admin-payments-header">
        <div>
          <span className="admin-payments-label">
            PAYMENT MANAGEMENT
          </span>

          <h1>Payments</h1>

          <p>
            Manage transactions, payment status and refunds.
          </p>
        </div>

        <button className="payment-refresh-btn">
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      <div className="payment-stats">

        <div className="payment-stat-card">
          <div className="payment-stat-icon revenue">
            <FaRupeeSign />
          </div>

          <div>
            <span>Total Revenue</span>
            <strong>{formatAmount(stats.revenue)}</strong>
            <small>
              <FiArrowUp /> 12.8% this month
            </small>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon completed">
            <FiCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
            <small>Successful payments</small>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon pending">
            <FiCreditCard />
          </div>

          <div>
            <span>Pending</span>
            <strong>{stats.pending}</strong>
            <small>Awaiting confirmation</small>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon refunded">
            <FiArrowDown />
          </div>

          <div>
            <span>Refunded</span>
            <strong>{stats.refunded}</strong>
            <small>Refund transactions</small>
          </div>
        </div>

      </div>

      <div className="payment-toolbar">

        <div className="payment-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search payment, customer or transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="payment-filter">
          <FiFilter />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

      </div>

      <div className="payments-table-card">

        <div className="payments-table-header">
          <div>
            <h2>Transaction History</h2>
            <p>
              {filteredPayments.length} payments found
            </p>
          </div>
        </div>

        <div className="payments-table-wrapper">

          <table className="payments-table">

            <thead>
              <tr>
                <th>Payment</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredPayments.map((payment) => (
                <tr key={payment.id}>

                  <td>
                    <div className="payment-id">
                      <strong>{payment.id}</strong>
                      <span>{payment.bookingId}</span>
                    </div>
                  </td>

                  <td>
                    <div className="payment-customer">
                      <div>
                        {payment.customer.charAt(0)}
                      </div>

                      <span>
                        <strong>{payment.customer}</strong>
                        <small>{payment.email}</small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="payment-method">
                      <FiCreditCard />
                      {payment.method}
                    </span>
                  </td>

                  <td>
                    <strong className="payment-amount">
                      {formatAmount(payment.amount)}
                    </strong>
                  </td>

                  <td>{payment.date}</td>

                  <td>
                    <span
                      className={`payment-status ${payment.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="payment-view-btn"
                      onClick={() =>
                        setSelectedPayment(payment)
                      }
                    >
                      <FiEye />
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {filteredPayments.length === 0 && (
            <div className="payment-empty">
              No payments found.
            </div>
          )}

        </div>

      </div>

      {selectedPayment && (
        <div className="payment-modal-overlay">

          <div className="payment-modal">

            <div className="payment-modal-header">
              <div>
                <span>TRANSACTION DETAILS</span>
                <h2>{selectedPayment.id}</h2>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
              >
                <FiX />
              </button>
            </div>

            <div className="payment-detail-status">
              <div className="detail-payment-icon">
                <FiCreditCard />
              </div>

              <div>
                <span>Payment Amount</span>
                <strong>
                  {formatAmount(selectedPayment.amount)}
                </strong>
              </div>

              <span
                className={`payment-status ${selectedPayment.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedPayment.status}
              </span>
            </div>

            <div className="payment-details-grid">

              <div>
                <label>Customer</label>
                <strong>{selectedPayment.customer}</strong>
              </div>

              <div>
                <label>Email</label>
                <strong>{selectedPayment.email}</strong>
              </div>

              <div>
                <label>Booking ID</label>
                <strong>{selectedPayment.bookingId}</strong>
              </div>

              <div>
                <label>Payment Method</label>
                <strong>{selectedPayment.method}</strong>
              </div>

              <div>
                <label>Transaction ID</label>
                <strong>{selectedPayment.transactionId}</strong>
              </div>

              <div>
                <label>Date</label>
                <strong>{selectedPayment.date}</strong>
              </div>

            </div>

            <div className="payment-modal-footer">

              {selectedPayment.status === "Pending" && (
                <button
                  className="payment-complete-btn"
                  onClick={() =>
                    markCompleted(selectedPayment.id)
                  }
                >
                  <FiCheckCircle />
                  Mark Completed
                </button>
              )}

              {selectedPayment.status === "Completed" && (
                <button
                  className="payment-refund-btn"
                  onClick={() =>
                    markRefunded(selectedPayment.id)
                  }
                >
                  <FiArrowDown />
                  Refund Payment
                </button>
              )}

              <button
                className="payment-close-btn"
                onClick={() => setSelectedPayment(null)}
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

export default AdminPayments;