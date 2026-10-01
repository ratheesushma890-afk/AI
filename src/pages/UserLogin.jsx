import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

import "./UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    /* =======================================================
       FRONTEND DEMO USER

       
    ======================================================= */

    const user = {
      name: "Traveller",
      email: email.trim(),
      loggedIn: true,
    };

    localStorage.setItem(
      "tripperUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "tripperUserLoggedIn",
      "true"
    );

    if (remember) {
      localStorage.setItem(
        "tripperRememberUser",
        "true"
      );
    } else {
      localStorage.removeItem(
        "tripperRememberUser"
      );
    }

    /* USER DASHBOARD */

    navigate("/user/dashboard");
  };

  return (
    <div className="user-login-page">

      {/* =====================================================
          LEFT IMAGE SECTION
      ===================================================== */}

      <section className="user-login-visual">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90"
          alt="Travel"
        />

        <div className="user-login-overlay" />

        {/* LOGO */}

        <Link
          to="/"
          className="user-login-logo"
        >
          <div className="user-login-logo-icon">
            <FiMapPin />
          </div>

          <div>
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>
        </Link>

        {/* LEFT CONTENT */}

        <div className="user-login-visual-content">

          <span className="user-login-eyebrow">
            YOUR JOURNEY STARTS HERE
          </span>

          <h1>
            Travel more.
            <br />
            Remember <em>forever.</em>
          </h1>

          <p>
            Sign in to manage your trips, bookings,
            favourite destinations and travel memories
            from one place.
          </p>

          <div className="user-login-features">

            <div>
              <strong>01</strong>

              <span>
                <b>Plan</b>
                Personalized journeys
              </span>
            </div>

            <div>
              <strong>02</strong>

              <span>
                <b>Save</b>
                Favourite destinations
              </span>
            </div>

            <div>
              <strong>03</strong>

              <span>
                <b>Travel</b>
                Manage your bookings
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RIGHT LOGIN SECTION
      ===================================================== */}

      <section className="user-login-form-side">

        {/* BACK TO WEBSITE */}

        <Link
          to="/"
          className="user-login-back"
        >
          <FiArrowLeft />

          Back to website
        </Link>

        <div className="user-login-form-wrapper">

          {/* MOBILE LOGO */}

          <div className="user-login-mobile-logo">
            <FiMapPin />

            <strong>Tripper</strong>
          </div>

          {/* HEADING */}

          <div className="user-login-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Sign in to your
              <br />
              <em>travel account.</em>
            </h2>

            <p>
              Continue planning your next unforgettable
              journey.
            </p>

          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className="user-login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="user-login-field">

              <label>
                Email address
              </label>

              <div className="user-login-input">

                <FiMail />

                <input
                  type="email"
                  placeholder="abcd@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="user-login-field">

              <div className="user-login-label-row">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="user-forgot-password"
                >
                  Forgot password?
                </button>

              </div>

              <div className="user-login-input">

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
                />

                <button
                  type="button"
                  className="user-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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
              <div className="user-login-error">
                {error}
              </div>
            )}

            {/* REMEMBER */}

            <label className="user-remember-me">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(
                    e.target.checked
                  )
                }
              />

              <span>
                Remember me
              </span>

            </label>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="user-login-submit"
            >
              <span>
                Sign In
              </span>

              <FiArrowRight />
            </button>

          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="user-login-register">

            <span>
              New to Tripper?
            </span>

            <Link to="/register">
              Create an account

              <FiArrowRight />
            </Link>

          </div>

          {/* FOOTER */}

          <div className="user-login-footer">

            <span>
              © 2026 Tripper
            </span>

            <span>
              Explore • Plan • Travel
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};

export default UserLogin;