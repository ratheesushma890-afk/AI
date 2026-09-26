import React, { useState } from "react";

import {
  FiBell,
  FiCheck,
  FiGlobe,
  FiLock,
  FiMail,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./AdminSettings.css";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Sushma Rathee",
    email: "admin@tripper.com",
    phone: "+91 98765 43210",
    role: "Super Administrator",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    newBooking: true,
    newCustomer: true,
    newReview: true,
    payment: true,
    message: false,
    marketing: false,
  });

  const [website, setWebsite] = useState({
    siteName: "TRIPPER",
    supportEmail: "support@tripper.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "English",
    maintenance: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleWebsiteChange = (e) => {
    setWebsite({
      ...website,
      [e.target.name]: e.target.value,
    });
  };

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const saveSettings = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <FiUser />,
    },
    {
      id: "security",
      label: "Security",
      icon: <FiShield />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FiBell />,
    },
    {
      id: "website",
      label: "Website",
      icon: <FiGlobe />,
    },
  ];

  return (
    <div className="admin-settings-page">
      {/* HEADER */}
      <div className="admin-settings-header">
        <div>
          <span className="admin-settings-label">
            SYSTEM SETTINGS
          </span>

          <h1>Admin Settings</h1>

          <p>
            Manage your admin profile, security, notifications and
            website preferences.
          </p>
        </div>

        <button
          className="settings-save-top"
          onClick={saveSettings}
        >
          <FiSave />
          Save Changes
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="settings-success">
          <span className="success-icon">
            <FiCheck />
          </span>

          <div>
            <strong>Settings saved successfully</strong>
            <p>Your changes have been saved.</p>
          </div>

          <button onClick={() => setShowSuccess(false)}>
            <FiX />
          </button>
        </div>
      )}

      {/* SETTINGS WRAPPER */}
      <div className="admin-settings-layout">
        {/* SIDEBAR */}
        <aside className="settings-sidebar">
          <div className="settings-profile-mini">
            <div className="settings-avatar">
              S
            </div>

            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
          </div>

          <div className="settings-tab-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={
                  activeTab === tab.id
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="settings-tab-icon">
                  {tab.icon}
                </span>

                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="settings-security-box">
            <div className="security-box-icon">
              <FiLock />
            </div>

            <div>
              <strong>Account Security</strong>
              <p>
                Your account is protected with admin
                authentication.
              </p>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="settings-content">
          {/* PROFILE */}
          {activeTab === "profile" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Profile Information</h2>
                  <p>
                    Update your personal admin account details.
                  </p>
                </div>

                <div className="settings-card-icon">
                  <FiUser />
                </div>
              </div>

              <div className="large-profile">
                <div className="large-profile-avatar">
                  S
                </div>

                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.email}</p>

                  <button className="change-avatar-btn">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Admin Role</label>

                  <input
                    type="text"
                    value={profile.role}
                    disabled
                  />
                </div>
              </div>

              <div className="settings-card-footer">
                <button
                  className="settings-primary-btn"
                  onClick={saveSettings}
                >
                  <FiSave />
                  Save Profile
                </button>
              </div>
            </section>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Security Settings</h2>
                  <p>
                    Manage your password and account security.
                  </p>
                </div>

                <div className="settings-card-icon">
                  <FiShield />
                </div>
              </div>

              <div className="security-status">
                <div className="security-status-icon">
                  <FiCheck />
                </div>

                <div>
                  <strong>Account Protected</strong>
                  <p>
                    Your admin account is currently secured.
                  </p>
                </div>

                <span>Secure</span>
              </div>

              <div className="settings-section-title">
                Change Password
              </div>

              <div className="settings-form-grid">
                <div className="settings-field full">
                  <label>Current Password</label>

                  <input
                    type="password"
                    name="current"
                    value={password.current}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="settings-field">
                  <label>New Password</label>

                  <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="settings-field">
                  <label>Confirm New Password</label>

                  <input
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="password-rules">
                <strong>Password requirements</strong>

                <ul>
                  <li>At least 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>

              <div className="settings-card-footer">
                <button
                  className="settings-primary-btn"
                  onClick={saveSettings}
                >
                  <FiLock />
                  Update Password
                </button>
              </div>
            </section>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Notification Settings</h2>
                  <p>
                    Choose which notifications you want to
                    receive.
                  </p>
                </div>

                <div className="settings-card-icon">
                  <FiBell />
                </div>
              </div>

              <div className="notification-list">
                <NotificationRow
                  title="New Booking"
                  description="Get notified whenever a new booking is created."
                  value={notifications.newBooking}
                  onChange={() =>
                    toggleNotification("newBooking")
                  }
                />

                <NotificationRow
                  title="New Customer"
                  description="Receive alerts when a new customer registers."
                  value={notifications.newCustomer}
                  onChange={() =>
                    toggleNotification("newCustomer")
                  }
                />

                <NotificationRow
                  title="New Review"
                  description="Get notified when customers submit reviews."
                  value={notifications.newReview}
                  onChange={() =>
                    toggleNotification("newReview")
                  }
                />

                <NotificationRow
                  title="Payment Updates"
                  description="Receive notifications for successful and failed payments."
                  value={notifications.payment}
                  onChange={() =>
                    toggleNotification("payment")
                  }
                />

                <NotificationRow
                  title="New Messages"
                  description="Get alerts when customers send messages."
                  value={notifications.message}
                  onChange={() =>
                    toggleNotification("message")
                  }
                />

                <NotificationRow
                  title="Marketing Emails"
                  description="Receive product and marketing related emails."
                  value={notifications.marketing}
                  onChange={() =>
                    toggleNotification("marketing")
                  }
                />
              </div>

              <div className="settings-card-footer">
                <button
                  className="settings-primary-btn"
                  onClick={saveSettings}
                >
                  <FiSave />
                  Save Notifications
                </button>
              </div>
            </section>
          )}

          {/* WEBSITE */}
          {activeTab === "website" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Website Settings</h2>
                  <p>
                    Manage your website's basic configuration.
                  </p>
                </div>

                <div className="settings-card-icon">
                  <FiGlobe />
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field">
                  <label>Website Name</label>

                  <input
                    type="text"
                    name="siteName"
                    value={website.siteName}
                    onChange={handleWebsiteChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Support Email</label>

                  <input
                    type="email"
                    name="supportEmail"
                    value={website.supportEmail}
                    onChange={handleWebsiteChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Currency</label>

                  <select
                    name="currency"
                    value={website.currency}
                    onChange={handleWebsiteChange}
                  >
                    <option value="INR">
                      INR - Indian Rupee
                    </option>

                    <option value="USD">
                      USD - US Dollar
                    </option>

                    <option value="EUR">
                      EUR - Euro
                    </option>

                    <option value="GBP">
                      GBP - British Pound
                    </option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Timezone</label>

                  <select
                    name="timezone"
                    value={website.timezone}
                    onChange={handleWebsiteChange}
                  >
                    <option value="Asia/Kolkata">
                      Asia/Kolkata
                    </option>

                    <option value="Asia/Dubai">
                      Asia/Dubai
                    </option>

                    <option value="Europe/London">
                      Europe/London
                    </option>

                    <option value="America/New_York">
                      America/New_York
                    </option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Default Language</label>

                  <select
                    name="language"
                    value={website.language}
                    onChange={handleWebsiteChange}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="maintenance-row">
                <div>
                  <strong>Maintenance Mode</strong>

                  <p>
                    Temporarily disable the public website
                    while you perform maintenance.
                  </p>
                </div>

                <button
                  className={
                    website.maintenance
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    setWebsite({
                      ...website,
                      maintenance: !website.maintenance,
                    })
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="settings-card-footer">
                <button
                  className="settings-primary-btn"
                  onClick={saveSettings}
                >
                  <FiSave />
                  Save Website Settings
                </button>
              </div>
            </section>
          )}

          {/* EMAIL INFO */}
          <div className="settings-info-card">
            <div className="settings-info-icon">
              <FiMail />
            </div>

            <div>
              <strong>Need help with your settings?</strong>

              <p>
                Contact the TRIPPER technical support team for
                assistance with your admin account.
              </p>
            </div>

            <button>
              Contact Support
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const NotificationRow = ({
  title,
  description,
  value,
  onChange,
}) => {
  return (
    <div className="notification-row">
      <div className="notification-row-icon">
        <FiBell />
      </div>

      <div className="notification-row-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        className={value ? "toggle active" : "toggle"}
        onClick={onChange}
      >
        <span></span>
      </button>
    </div>
  );
};

export default AdminSettings;