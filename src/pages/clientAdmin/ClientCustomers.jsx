import React, { useMemo, useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEye,
  FiCalendar,
  FiX,
} from "react-icons/fi";

import "./ClientCustomers.css";

const ClientCustomers = () => {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: "CUS-1001",
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "+91 98765 43210",
      location: "Delhi",
      bookings: 3,
      spent: "₹58,500",
      joined: "12 Jan 2026",
      status: "Active",
    },
    {
      id: "CUS-1002",
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "+91 98123 45678",
      location: "Mumbai",
      bookings: 2,
      spent: "₹42,800",
      joined: "18 Feb 2026",
      status: "Active",
    },
    {
      id: "CUS-1003",
      name: "Rahul Mehta",
      email: "rahul@gmail.com",
      phone: "+91 98987 65432",
      location: "Jaipur",
      bookings: 1,
      spent: "₹31,500",
      joined: "06 Mar 2026",
      status: "Active",
    },
    {
      id: "CUS-1004",
      name: "Ananya Singh",
      email: "ananya@gmail.com",
      phone: "+91 97654 32109",
      location: "Pune",
      bookings: 4,
      spent: "₹86,400",
      joined: "21 Apr 2026",
      status: "Active",
    },
    {
      id: "CUS-1005",
      name: "Vikram Yadav",
      email: "vikram@gmail.com",
      phone: "+91 96543 21098",
      location: "Gurugram",
      bookings: 2,
      spent: "₹37,900",
      joined: "14 May 2026",
      status: "Active",
    },
  ];

  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.location.toLowerCase().includes(value) ||
        customer.id.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <div className="client-customers-page">

      <section className="client-page-hero">
        <div>
          <span>CUSTOMER MANAGEMENT</span>
          <h1>Customers</h1>
          <p>
            View registered travellers and their booking activity.
          </p>
        </div>

        <div className="client-page-hero-card">
          <FiUsers />
          <div>
            <span>Total Customers</span>
            <strong>{customers.length}</strong>
          </div>
        </div>
      </section>

      <section className="client-customer-stats">
        <div>
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div>
          <span>Active Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div>
          <span>Total Bookings</span>
          <strong>
            {customers.reduce(
              (total, customer) => total + customer.bookings,
              0
            )}
          </strong>
        </div>
      </section>

      <section className="client-data-card">

        <div className="client-data-toolbar">
          <div className="client-data-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="client-table-wrapper">
          <table className="client-customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="client-customer-profile">
                      <div className="client-customer-avatar">
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="client-contact-data">
                      <span>
                        <FiMail /> {customer.email}
                      </span>

                      <span>
                        <FiPhone /> {customer.phone}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="client-location">
                      <FiMapPin />
                      {customer.location}
                    </span>
                  </td>

                  <td>{customer.bookings}</td>

                  <td>
                    <strong>{customer.spent}</strong>
                  </td>

                  <td>{customer.joined}</td>

                  <td>
                    <button
                      className="client-small-view"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <FiEye />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {selectedCustomer && (
        <div
          className="client-common-modal-backdrop"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="client-common-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="client-modal-x"
              onClick={() => setSelectedCustomer(null)}
            >
              <FiX />
            </button>

            <div className="client-customer-modal-avatar">
              {selectedCustomer.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <span className="client-modal-label">
              CUSTOMER PROFILE
            </span>

            <h2>{selectedCustomer.name}</h2>

            <div className="client-modal-information">
              <div>
                <FiMail />
                <span>Email</span>
                <strong>{selectedCustomer.email}</strong>
              </div>

              <div>
                <FiPhone />
                <span>Phone</span>
                <strong>{selectedCustomer.phone}</strong>
              </div>

              <div>
                <FiMapPin />
                <span>Location</span>
                <strong>{selectedCustomer.location}</strong>
              </div>

              <div>
                <FiCalendar />
                <span>Bookings</span>
                <strong>{selectedCustomer.bookings}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientCustomers;