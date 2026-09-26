import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowUpRight,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiFilter,
  FiMail,
  FiMoreVertical,
  FiPhone,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserCheck,
  FiUserX,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./AdminCustomers.css";

const AdminCustomers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 6;

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      phone: "+91 98765 43210",
      role: "Customer",
      status: "Active",
      trips: 8,
      bookings: 12,
      spent: "₹2,84,500",
      joined: "12 Jan 2026",
      avatar: "A",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@gmail.com",
      phone: "+91 98123 45678",
      role: "Customer",
      status: "Active",
      trips: 6,
      bookings: 9,
      spent: "₹1,96,800",
      joined: "18 Jan 2026",
      avatar: "P",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.verma@gmail.com",
      phone: "+91 97654 32109",
      role: "Customer",
      status: "Pending",
      trips: 3,
      bookings: 5,
      spent: "₹86,400",
      joined: "02 Feb 2026",
      avatar: "R",
    },
    {
      id: 4,
      name: "Ananya Gupta",
      email: "ananya.gupta@gmail.com",
      phone: "+91 98989 12345",
      role: "Customer",
      status: "Active",
      trips: 7,
      bookings: 11,
      spent: "₹2,35,600",
      joined: "14 Feb 2026",
      avatar: "A",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@gmail.com",
      phone: "+91 99887 66554",
      role: "Customer",
      status: "Blocked",
      trips: 2,
      bookings: 3,
      spent: "₹1,24,500",
      joined: "25 Feb 2026",
      avatar: "V",
    },
    {
      id: 6,
      name: "Kavya Malhotra",
      email: "kavya.malhotra@gmail.com",
      phone: "+91 98711 22334",
      role: "Customer",
      status: "Active",
      trips: 5,
      bookings: 8,
      spent: "₹1,78,200",
      joined: "04 Mar 2026",
      avatar: "K",
    },
    {
      id: 7,
      name: "Rohan Kapoor",
      email: "rohan.kapoor@gmail.com",
      phone: "+91 98222 33445",
      role: "Customer",
      status: "Active",
      trips: 9,
      bookings: 14,
      spent: "₹3,12,800",
      joined: "11 Mar 2026",
      avatar: "R",
    },
    {
      id: 8,
      name: "Meera Joshi",
      email: "meera.joshi@gmail.com",
      phone: "+91 97555 66778",
      role: "Customer",
      status: "Pending",
      trips: 1,
      bookings: 2,
      spent: "₹42,500",
      joined: "19 Mar 2026",
      avatar: "M",
    },
    {
      id: 9,
      name: "Aditya Kumar",
      email: "aditya.kumar@gmail.com",
      phone: "+91 98666 77889",
      role: "Customer",
      status: "Active",
      trips: 4,
      bookings: 7,
      spent: "₹1,45,700",
      joined: "28 Mar 2026",
      avatar: "A",
    },
    {
      id: 10,
      name: "Sneha Arora",
      email: "sneha.arora@gmail.com",
      phone: "+91 97979 88990",
      role: "Customer",
      status: "Active",
      trips: 6,
      bookings: 10,
      spent: "₹2,10,300",
      joined: "06 Apr 2026",
      avatar: "S",
    },
  ]);

  /* =====================================
     FILTERED CUSTOMERS
  ===================================== */

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      const matchesRole =
        roleFilter === "All" ||
        customer.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [customers, search, statusFilter, roleFilter]);

  /* =====================================
     PAGINATION
  ===================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / usersPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * usersPerPage;

  const visibleCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  /* =====================================
     STATS
  ===================================== */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const pendingCustomers = customers.filter(
    (customer) => customer.status === "Pending"
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => customer.status === "Blocked"
  ).length;

  /* =====================================
     STATUS CHANGE
  ===================================== */

  const changeStatus = (id, newStatus) => {
    setCustomers((previous) =>
      previous.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: newStatus,
            }
          : customer
      )
    );

    setOpenMenu(null);
  };

  /* =====================================
     DELETE CUSTOMER
  ===================================== */

  const deleteCustomer = (id) => {
    const customer = customers.find(
      (item) => item.id === id
    );

    if (!customer) return;

    const confirmed = window.confirm(
      `Delete ${customer.name}?`
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );

    setOpenMenu(null);
  };

  /* =====================================
     RESET FILTERS
  ===================================== */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setRoleFilter("All");
    setCurrentPage(1);
  };

  /* =====================================
     PAGE CHANGE
  ===================================== */

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="admin-customers-page">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <header className="customers-page-header">

        <div className="customers-heading">

          <span className="customers-eyebrow">
            USER MANAGEMENT
          </span>

          <h1>Customers</h1>

          <p>
            Manage your customers, accounts and travel activity.
          </p>

        </div>

        <button
          className="customers-add-button"
          type="button"
          onClick={() =>
            alert("Add customer form coming soon")
          }
        >
          <FiPlus />
          Add Customer
        </button>

      </header>


      {/* =================================
          STAT CARDS
      ================================= */}

      <section className="customers-stats">

        <div className="customer-stat-card">

          <div className="customer-stat-icon blue">
            <FiUsers />
          </div>

          <div className="customer-stat-info">
            <span>Total Customers</span>
            <strong>{totalCustomers}</strong>
            <small>
              <FiArrowUpRight />
              12.8% this month
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="customer-stat-icon green">
            <FiUserCheck />
          </div>

          <div className="customer-stat-info">
            <span>Active Customers</span>
            <strong>{activeCustomers}</strong>
            <small>
              <FiArrowUpRight />
              8.4% this month
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="customer-stat-icon gold">
            <FiUserCheck />
          </div>

          <div className="customer-stat-info">
            <span>Pending Users</span>
            <strong>{pendingCustomers}</strong>
            <small className="warning">
              Need attention
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="customer-stat-icon red">
            <FiUserX />
          </div>

          <div className="customer-stat-info">
            <span>Blocked Users</span>
            <strong>{blockedCustomers}</strong>
            <small className="danger">
              Currently blocked
            </small>
          </div>

        </div>

      </section>


      {/* =================================
          MAIN PANEL
      ================================= */}

      <section className="customers-panel">

        {/* TOOLBAR */}

        <div className="customers-toolbar">

          <div className="customers-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                <FiX />
              </button>
            )}

          </div>


          <div className="customers-filters">

            <div className="customer-filter">

              <FiFilter />

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">
                  All Status
                </option>
                <option value="Active">
                  Active
                </option>
                <option value="Pending">
                  Pending
                </option>
                <option value="Blocked">
                  Blocked
                </option>
              </select>

              <FiChevronDown />

            </div>


            <div className="customer-filter">

              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">
                  All Roles
                </option>
                <option value="Customer">
                  Customer
                </option>
              </select>

              <FiChevronDown />

            </div>


            {(search ||
              statusFilter !== "All" ||
              roleFilter !== "All") && (
              <button
                className="reset-filter-button"
                type="button"
                onClick={resetFilters}
              >
                Reset
              </button>
            )}

          </div>

        </div>


        {/* TABLE */}

        <div className="customers-table-wrapper">

          <table className="customers-table">

            <thead>

              <tr>

                <th>
                  <span className="customer-check"></span>
                </th>

                <th>Customer</th>

                <th>Contact</th>

                <th>Trips</th>

                <th>Bookings</th>

                <th>Total Spent</th>

                <th>Status</th>

                <th>Joined</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {visibleCustomers.length > 0 ? (
                visibleCustomers.map((customer) => (

                  <tr key={customer.id}>

                    <td>
                      <span className="customer-check"></span>
                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="customer-main-cell">

                        <div className="customer-table-avatar">
                          {customer.avatar}
                        </div>

                        <div className="customer-main-info">

                          <strong>
                            {customer.name}
                          </strong>

                          <span>
                            ID #CUS-
                            {String(customer.id).padStart(
                              4,
                              "0"
                            )}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* CONTACT */}

                    <td>

                      <div className="customer-contact">

                        <span>
                          <FiMail />
                          {customer.email}
                        </span>

                        <span>
                          <FiPhone />
                          {customer.phone}
                        </span>

                      </div>

                    </td>


                    {/* TRIPS */}

                    <td>

                      <strong className="table-number">
                        {customer.trips}
                      </strong>

                    </td>


                    {/* BOOKINGS */}

                    <td>

                      <strong className="table-number">
                        {customer.bookings}
                      </strong>

                    </td>


                    {/* SPENT */}

                    <td>

                      <strong className="spent-amount">
                        {customer.spent}
                      </strong>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`customer-status ${customer.status.toLowerCase()}`}
                      >
                        <span></span>
                        {customer.status}
                      </span>

                    </td>


                    {/* JOINED */}

                    <td>

                      <span className="joined-date">
                        {customer.joined}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="customer-action-wrapper">

                        <button
                          className="customer-more-button"
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === customer.id
                                ? null
                                : customer.id
                            )
                          }
                        >
                          <FiMoreVertical />
                        </button>


                        {openMenu === customer.id && (
                          <div className="customer-action-menu">

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUser(
                                  customer
                                );
                                setOpenMenu(null);
                              }}
                            >
                              <FiUsers />
                              View Profile
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  `Edit ${customer.name}`
                                )
                              }
                            >
                              <FiEdit3 />
                              Edit Customer
                            </button>


                            {customer.status !==
                              "Active" && (
                              <button
                                type="button"
                                onClick={() =>
                                  changeStatus(
                                    customer.id,
                                    "Active"
                                  )
                                }
                              >
                                <FiUserCheck />
                                Activate
                              </button>
                            )}


                            {customer.status ===
                              "Active" && (
                              <button
                                type="button"
                                onClick={() =>
                                  changeStatus(
                                    customer.id,
                                    "Blocked"
                                  )
                                }
                              >
                                <FiUserX />
                                Block User
                              </button>
                            )}


                            <button
                              className="delete-action"
                              type="button"
                              onClick={() =>
                                deleteCustomer(
                                  customer.id
                                )
                              }
                            >
                              <FiTrash2 />
                              Delete
                            </button>

                          </div>
                        )}

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="customers-empty"
                  >

                    <div>

                      <FiUsers />

                      <strong>
                        No customers found
                      </strong>

                      <span>
                        Try changing your search or filters.
                      </span>

                      <button
                        type="button"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </button>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================
            FOOTER / PAGINATION
        ================================= */}

        <div className="customers-table-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredCustomers.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + usersPerPage,
                filteredCustomers.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredCustomers.length}
            </strong>{" "}
            customers
          </span>


          <div className="customers-pagination">

            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                changePage(safePage - 1)
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
                type="button"
                className={
                  safePage === page ? "active" : ""
                }
                onClick={() =>
                  changePage(page)
                }
              >
                {page}
              </button>

            ))}


            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() =>
                changePage(safePage + 1)
              }
            >
              <FiChevronRight />
            </button>

          </div>

        </div>

      </section>


      {/* =================================
          PROFILE MODAL
      ================================= */}

      {selectedUser && (

        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedUser(null)}
        >

          <div
            className="customer-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="customer-modal-close"
              type="button"
              onClick={() => setSelectedUser(null)}
            >
              <FiX />
            </button>


            <div className="customer-modal-top">

              <div className="customer-modal-avatar">
                {selectedUser.avatar}
              </div>

              <div>

                <span className="customer-modal-label">
                  CUSTOMER PROFILE
                </span>

                <h2>
                  {selectedUser.name}
                </h2>

                <span className="customer-modal-id">
                  ID #CUS-
                  {String(selectedUser.id).padStart(
                    4,
                    "0"
                  )}
                </span>

              </div>

            </div>


            <div className="customer-profile-status">

              <span
                className={`customer-status ${selectedUser.status.toLowerCase()}`}
              >
                <span></span>
                {selectedUser.status}
              </span>

            </div>


            <div className="customer-profile-details">

              <div>

                <span>Email</span>

                <strong>
                  {selectedUser.email}
                </strong>

              </div>

              <div>

                <span>Phone</span>

                <strong>
                  {selectedUser.phone}
                </strong>

              </div>

              <div>

                <span>Trips</span>

                <strong>
                  {selectedUser.trips}
                </strong>

              </div>

              <div>

                <span>Bookings</span>

                <strong>
                  {selectedUser.bookings}
                </strong>

              </div>

              <div>

                <span>Total Spent</span>

                <strong>
                  {selectedUser.spent}
                </strong>

              </div>

              <div>

                <span>Joined</span>

                <strong>
                  {selectedUser.joined}
                </strong>

              </div>

            </div>


            <div className="customer-modal-actions">

              <button
                type="button"
                onClick={() =>
                  alert(
                    `Edit ${selectedUser.name}`
                  )
                }
              >
                <FiEdit3 />
                Edit Customer
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
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

export default AdminCustomers;