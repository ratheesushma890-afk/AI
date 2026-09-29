import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiMapPin,
  FiCheck,
} from "react-icons/fi";

import "./ClientAdminLogin.css";

const ClientAdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* =========================================================
     IF ALREADY LOGGED IN
  ========================================================= */

  useEffect(() => {
    try {
      const storedClientAdmin =
        localStorage.getItem("clientAdmin");

      if (!storedClientAdmin) return;

      const clientAdmin =
        JSON.parse(storedClientAdmin);

      if (clientAdmin?.loggedIn) {
        navigate("/client-admin/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      localStorage.removeItem("clientAdmin");
    }
  }, [navigate]);

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (
        cleanEmail === "abcd@gmail.com" &&
        cleanPassword === "abcd123"
      ) {
        const clientAdminData = {
          loggedIn: true,
          name: "Client Admin",
          email: cleanEmail,
          role: "client-admin",
        };

        localStorage.setItem(
          "clientAdmin",
          JSON.stringify(clientAdminData)
        );

        navigate("/client-admin/dashboard", {
          replace: true,
        });

        return;
      }

      setError("Invalid email or password.");
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="client-login-page">

      {/* DECORATION */}

      <div className="client-login-orb orb-one" />
      <div className="client-login-orb orb-two" />
      <div className="client-login-orb orb-three" />

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section className="client-login-visual">

        <div className="client-login-brand">

          <div className="client-login-logo">
            T
          </div>

          <div>
            <h2>Tripper</h2>
            <span>Travel Management</span>
          </div>

        </div>

        <div className="client-login-visual-content">

          <span className="client-login-small-title">
            CLIENT ADMIN PORTAL
          </span>

          <h1>
            Manage travel.
            <br />
            Serve better.
          </h1>

          <p>
            Access your Tripper management panel to handle
            bookings, destinations, customers, reviews and
            traveller messages.
          </p>

          <div className="client-login-features">

            <div>
              <span>
                <FiCheck />
              </span>

              Manage customer bookings
            </div>

            <div>
              <span>
                <FiCheck />
              </span>

              Update destinations
            </div>

            <div>
              <span>
                <FiCheck />
              </span>

              Handle customer support
            </div>

          </div>

        </div>

        <div className="client-login-location">
          <FiMapPin />

          <div>
            <span>Tripper Management</span>
            <strong>Client Administration</strong>
          </div>
        </div>

      </section>

      {/* =====================================================
          LOGIN SIDE
      ===================================================== */}

      <section className="client-login-form-side">

        <div className="client-login-form-card">

          <div className="client-login-security">
            <FiShield />
          </div>

          <span className="client-login-eyebrow">
            SECURE ACCESS
          </span>

          <h2>Welcome back</h2>

          <p className="client-login-subtitle">
            Sign in to continue to your Client Admin panel.
          </p>

          {/* ERROR */}

          {error && (
            <div className="client-login-error">
              {error}
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleLogin}>

            <div className="client-login-field">

              <label>Email Address</label>

              <div className="client-login-input">
                <FiMail />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  autoComplete="email"
                />
              </div>

            </div>

            <div className="client-login-field">

              <div className="client-login-label-row">
                <label>Password</label>

                <span>Protected Access</span>
              </div>

              <div className="client-login-input">

                <FiLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="client-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="client-login-submit"
              disabled={isLoading}
            >
              <span>
                {isLoading
                  ? "Signing in..."
                  : "Sign In to Dashboard"}
              </span>

              {!isLoading && <FiArrowRight />}
            </button>

          </form>

          <div className="client-login-footer-text">
            <FiShield />

            <span>
              Authorized client administrators only
            </span>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ClientAdminLogin;