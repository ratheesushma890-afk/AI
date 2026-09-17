
import { useState } from "react";
import "./AdminCustomers.css";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 98765 43210",
      bookings: 3,
      spent: "₹1,25,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "+91 98765 12345",
      bookings: 2,
      spent: "₹1,45,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman@gmail.com",
      phone: "+91 98765 67890",
      bookings: 4,
      spent: "₹2,10,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      email: "neha@gmail.com",
      phone: "+91 98765 24680",
      bookings: 1,
      spent: "₹55,000",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");

  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {
      setCustomers(
        customers.filter((customer) => customer.id !== id)
      );
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="admin-customers-page">

      {/* HEADER */}
      <div className="admin-customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your registered customers</p>
        </div>

        <div className="customers-total">
          {filteredCustomers.length} Customers
        </div>
      </div>

      {/* SEARCH */}
      <div className="customers-toolbar">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="customers-table">

        <div className="customer-row customer-head">
          <span>Customer</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Bookings</span>
          <span>Total Spent</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              className="customer-row"
              key={customer.id}
            >

              <strong>
                👤 {customer.name}
              </strong>

              <span>
                {customer.email}
              </span>

              <span>
                {customer.phone}
              </span>

              <span className="customer-bookings">
                {customer.bookings}
              </span>

              <span className="customer-spent">
                {customer.spent}
              </span>

              <b
                className={
                  customer.status === "Active"
                    ? "customer-active"
                    : "customer-inactive"
                }
              >
                {customer.status}
              </b>

              <button
                className="customer-delete"
                onClick={() =>
                  deleteCustomer(customer.id)
                }
              >
                Delete
              </button>

            </div>
          ))
        ) : (
          <div className="no-customers">
            No customers found
          </div>
        )}

      </div>

    </div>
  );
}



