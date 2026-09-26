import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // TEMPORARY SUPER ADMIN LOGIN
  // ==========================================
  const ADMIN_EMAIL = "admin@tripper.com";
  const ADMIN_PASSWORD = "Admin@123";

  // ==========================================
  // LOGIN
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Empty validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const enteredEmail = email.trim().toLowerCase();

      // Check login
      if (
        enteredEmail === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
      ) {
        // Admin data
        const adminData = {
          email: ADMIN_EMAIL,
          role: "super_admin",
          name: "Super Admin",
          loggedIn: true,
        };

        // Save admin login
        localStorage.setItem(
          "adminUser",
          JSON.stringify(adminData)
        );

        // ==========================================
        // IMPORTANT
        // Tumhare App.jsx mein dashboard route:
        // /admin-secret/dashboard
        // ==========================================
        navigate("/admin-secret/dashboard", {
          replace: true,
        });

      } else {
        setError("Invalid admin email or password.");
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="admin-login-page">

      {/* ==========================================
          BACKGROUND
      ========================================== */}
      <div className="admin-login-background">

        <div className="admin-glow admin-glow-one"></div>

        <div className="admin-glow admin-glow-two"></div>

      </div>


      {/* ==========================================
          LOGIN WRAPPER
      ========================================== */}
      <div className="admin-login-wrapper">

        {/* ========================================
            LEFT SIDE
        ======================================== */}
        <div className="admin-login-left">

          {/* BRAND */}
          <div className="admin-brand">

            <div className="admin-brand-icon">
              <FiShield />
            </div>

            <div>
              <h2>TRIPPER</h2>

              <span>
                Travel Management
              </span>
            </div>

          </div>


          {/* LEFT CONTENT */}
          <div className="admin-left-content">

            <span className="admin-small-title">
              ADMIN CONTROL CENTER
            </span>

            <h1>
              Manage Your
              <br />

              <span>
                Travel Platform
              </span>
            </h1>

            <p>
              Welcome to the secure administration
              panel. Manage destinations, users,
              bookings, payments and everything
              related to your travel platform.
            </p>


            {/* FEATURES */}
            <div className="admin-feature-list">

              <div className="admin-feature">
                <span>✓</span>

                <p>
                  Manage Users & Bookings
                </p>
              </div>


              <div className="admin-feature">
                <span>✓</span>

                <p>
                  Manage Destinations & Trips
                </p>
              </div>


              <div className="admin-feature">
                <span>✓</span>

                <p>
                  Control Payments & Offers
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ========================================
            RIGHT LOGIN CARD
        ======================================== */}
        <div className="admin-login-card">

          {/* ICON */}
          <div className="admin-card-icon">
            <FiShield />
          </div>


          {/* HEADING */}
          <div className="admin-card-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Admin Login
            </h2>

            <p>
              Sign in to access your admin dashboard.
            </p>

          </div>


          {/* ======================================
              FORM
          ====================================== */}
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="admin-input-group">

              <label>
                Email Address
              </label>

              <div className="admin-input-box">

                <FiMail />

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="username"
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="admin-input-group">

              <label>
                Password
              </label>

              <div className="admin-input-box">

                <FiLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />


                {/* SHOW PASSWORD */}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>


            {/* ERROR */}
            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="admin-spinner"></span>

                  Signing in...
                </>
              ) : (
                <>
                  Login to Dashboard

                  <FiArrowRight />
                </>
              )}

            </button>

          </form>


          {/* SECURITY */}
          <div className="admin-security">

            <FiLock />

            <span>
              Secure Admin Access
            </span>

          </div>


          {/* DEVELOPMENT LOGIN */}
          <div className="admin-demo-info">

            <strong>
              Development Login
            </strong>

            <p>
              Email:
              {" "}
              <b>
                admin@tripper.com
              </b>
            </p>

            <p>
              Password:
              {" "}
              <b>
                Admin@123
              </b>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;