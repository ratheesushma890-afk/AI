import { useState } from "react";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Travel Explorer",
    email: "tannu@gmail.com",
    phone: "+91 9817339938",
    currency: "INR",
    notifications: true,
    bookingAlerts: true,
    reviewAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });

    setSaved(false);
  };

  const saveSettings = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="admin-settings-page">

      {/* HEADER */}
      <div className="admin-settings-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your admin and website settings</p>
        </div>
      </div>

      <form onSubmit={saveSettings}>

        {/* GENERAL SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              ⚙️
            </div>

            <div>
              <h2>General Settings</h2>
              <p>Basic website information</p>
            </div>
          </div>

          <div className="settings-grid">

            <div className="settings-field">
              <label>Website Name</label>

              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label>Admin Email</label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label>Contact Phone</label>

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label>Currency</label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              🔔
            </div>

            <div>
              <h2>Notifications</h2>
              <p>Control admin notifications</p>
            </div>
          </div>

          <div className="settings-options">

            <label className="setting-option">
              <div>
                <strong>Enable Notifications</strong>
                <span>
                  Receive important admin notifications
                </span>
              </div>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
            </label>

            <label className="setting-option">
              <div>
                <strong>Booking Alerts</strong>
                <span>
                  Get notified when a new booking arrives
                </span>
              </div>

              <input
                type="checkbox"
                name="bookingAlerts"
                checked={settings.bookingAlerts}
                onChange={handleChange}
              />
            </label>

            <label className="setting-option">
              <div>
                <strong>Review Alerts</strong>
                <span>
                  Get notified about new customer reviews
                </span>
              </div>

              <input
                type="checkbox"
                name="reviewAlerts"
                checked={settings.reviewAlerts}
                onChange={handleChange}
              />
            </label>

          </div>
        </div>

        {/* ADMIN ACCOUNT */}
        <div className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              👤
            </div>

            <div>
              <h2>Admin Account</h2>
              <p>Current administrator information</p>
            </div>
          </div>

          <div className="admin-account-box">

            <div className="admin-account-avatar">
              👨‍💼
            </div>

            <div>
              <strong>Administrator</strong>
              <span>{settings.email}</span>
            </div>

          </div>
        </div>

        {/* SAVE */}
        <div className="settings-save-area">

          {saved && (
            <span className="settings-saved">
              ✓ Settings saved successfully
            </span>
          )}

          <button
            type="submit"
            className="settings-save-btn"
          >
            Save Settings
          </button>

        </div>

      </form>
    </div>
  );
}