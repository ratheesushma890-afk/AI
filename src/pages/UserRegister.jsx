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
  FiPhone,
  FiUser,
} from "react-icons/fi";

import "./UserRegister.css";

const UserRegister = () => {
  const navigate = useNavigate();

  /* =========================================================
     STATES
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* =========================================================
     REGISTER
  ========================================================= */

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    /* NAME */

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    /* EMAIL */

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    /* PHONE */

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10 digit phone number.");
      return;
    }

    /* PASSWORD */

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    /* CONFIRM PASSWORD */

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /* =======================================================
       FRONTEND DEMO REGISTRATION

       Backend aane ke baad yahan Register API lagegi.
    ======================================================= */

    const newUser = {
      id: `USR-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      loggedIn: true,
      createdAt: new Date().toISOString(),
    };

    /* SAVE USER */

    localStorage.setItem(
      "tripperUser",
      JSON.stringify(newUser)
    );

    localStorage.setItem(
      "tripperUserLoggedIn",
      "true"
    );

    /* DASHBOARD */

    navigate("/user/dashboard");
  };

  return (
    <div className="user-register-page">

      {/* =====================================================
          LEFT IMAGE
      ===================================================== */}

      <section className="user-register-visual">

        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=90"
          alt="Travel"
        />

        <div className="user-register-overlay" />

        {/* LOGO */}

        <Link
          to="/"
          className="user-register-logo"
        >
          <div className="user-register-logo-icon">
            <FiMapPin />
          </div>

          <div>
            <strong>Tripper</strong>
            <span>Travel beautifully</span>
          </div>
        </Link>

        {/* CONTENT */}

        <div className="user-register-visual-content">

          <span className="user-register-eyebrow">
            START YOUR JOURNEY
          </span>

          <h1>
            Your next story
            <br />
            starts <em>here.</em>
          </h1>

          <p>
            Create your Tripper account and keep your
            journeys, bookings and favourite destinations
            together.
          </p>

          {/* FEATURES */}

          <div className="user-register-features">

            <div>
              <strong>01</strong>

              <span>
                <b>Discover</b>
                Beautiful destinations
              </span>
            </div>

            <div>
              <strong>02</strong>

              <span>
                <b>Plan</b>
                Personalized trips
              </span>
            </div>

            <div>
              <strong>03</strong>

              <span>
                <b>Remember</b>
                Every journey
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RIGHT REGISTER FORM
      ===================================================== */}

      <section className="user-register-form-side">

        {/* BACK */}

        <Link
          to="/"
          className="user-register-back"
        >
          <FiArrowLeft />

          Back to website
        </Link>

        <div className="user-register-form-wrapper">

          {/* MOBILE LOGO */}

          <div className="user-register-mobile-logo">
            <FiMapPin />

            <strong>Tripper</strong>
          </div>

          {/* HEADING */}

          <div className="user-register-heading">

            <span>
              JOIN TRIPPER
            </span>

            <h2>
              Create your
              <br />
              <em>travel account.</em>
            </h2>

            <p>
              One account for your trips, bookings and
              favourite destinations.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="user-register-form"
            onSubmit={handleRegister}
          >

            {/* NAME */}

            <div className="user-register-field">

              <label>
                Full name
              </label>

              <div className="user-register-input">

                <FiUser />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="user-register-field">

              <label>
                Email address
              </label>

              <div className="user-register-input">

                <FiMail />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="user-register-field">

              <label>
                Phone number
              </label>

              <div className="user-register-input">

                <FiPhone />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10 digit number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }));

                    setError("");
                  }}
                />

              </div>

            </div>

            {/* PASSWORD ROW */}

            <div className="user-register-password-grid">

              {/* PASSWORD */}

              <div className="user-register-field">

                <label>
                  Password
                </label>

                <div className="user-register-input">

                  <FiLock />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="user-register-password-toggle"
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

              {/* CONFIRM PASSWORD */}

              <div className="user-register-field">

                <label>
                  Confirm password
                </label>

                <div className="user-register-input">

                  <FiLock />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="user-register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="user-register-error">
                {error}
              </div>
            )}

            {/* TERMS */}

            <label className="user-register-terms">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms & Conditions
                and Privacy Policy.
              </span>

            </label>

            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="user-register-submit"
            >
              <span>
                Create Account
              </span>

              <FiArrowRight />
            </button>

          </form>

          {/* LOGIN */}

          <div className="user-register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign In

              <FiArrowRight />
            </Link>

          </div>

          {/* FOOTER */}

          <div className="user-register-footer">

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

export default UserRegister;