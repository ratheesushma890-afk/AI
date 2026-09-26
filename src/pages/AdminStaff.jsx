import React from "react";
import "./AdminStaff.css";

const AdminStaff = () => {
  return (
    <div className="admin-staff-page">
      <div className="admin-staff-header">
        <div>
          <span className="admin-staff-label">TEAM MANAGEMENT</span>
          <h1>Staff Management</h1>
          <p>Manage your travel website staff and their access.</p>
        </div>

        <button className="add-staff-btn">
          + Add Staff
        </button>
      </div>

      <div className="staff-stats">
        <div className="staff-stat-card">
          <span>Total Staff</span>
          <strong>4</strong>
        </div>

        <div className="staff-stat-card">
          <span>Active Staff</span>
          <strong>3</strong>
        </div>

        <div className="staff-stat-card">
          <span>Inactive Staff</span>
          <strong>1</strong>
        </div>
      </div>

      <div className="staff-table-card">
        <div className="staff-table-header">
          <h2>Staff Members</h2>
        </div>

        <div className="staff-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Rahul Sharma</td>
                <td>Manager</td>
                <td>rahul@example.com</td>
                <td>
                  <span className="staff-status active">
                    Active
                  </span>
                </td>
                <td>
                  <button className="staff-edit-btn">
                    Edit
                  </button>
                </td>
              </tr>

              <tr>
                <td>Priya Verma</td>
                <td>Booking Manager</td>
                <td>priya@example.com</td>
                <td>
                  <span className="staff-status active">
                    Active
                  </span>
                </td>
                <td>
                  <button className="staff-edit-btn">
                    Edit
                  </button>
                </td>
              </tr>

              <tr>
                <td>Amit Kumar</td>
                <td>Support Staff</td>
                <td>amit@example.com</td>
                <td>
                  <span className="staff-status inactive">
                    Inactive
                  </span>
                </td>
                <td>
                  <button className="staff-edit-btn">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;