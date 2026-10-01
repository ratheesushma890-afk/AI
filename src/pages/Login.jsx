import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
} from "react-icons/fi";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  /* =========================================================
     STATES
  ========================================================= */

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
     LOGIN
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const email = formData.email.trim();
    const password = formData.password.trim();

    /* EMAIL CHECK */

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    /* PASSWORD CHECK */

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    /* =======================================================
       FRONTEND DEMO USER LOGIN

       Later backend/API aane par yahi API call hogi.
    ======================================================= */

    const user = {
      name: "Traveller",
      email: email,
      loggedIn: true,
    };

    /* SAVE USER */

    localStorage.setItem(
      "tripperUser",
      JSON.stringify(user)
    );

    /* SAVE LOGIN STATUS */

    localStorage.setItem(
      "tripperUserLoggedIn",
      "true"
    );

    /* REMEMBER ME */

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

    /* =======================================================
       OPEN USER DASHBOARD
    ======================================================= */

    navigate("/user/dashboard", {
      replace: true,
    });
  };

  return (
    <main className="login-page">

      <div className="login-wrapper">

        {/* ===================================================
            LEFT VISUAL
        =================================================== */}

        <section className="login-visual">

          <div className="login-overlay" />

          <div className="login-visual-content">

            <span className="login-kicker">
              AI TRIP PLANNER
            </span>

            <h1>
              Welcome
              <br />
              <em>back.</em>
            </h1>

            <p>
              Your journeys are waiting.
              Pick up where you left off and
              continue planning your next adventure.
            </p>

            <div className="login-quote">

              <span>“</span>

              <p>
                Every journey begins
                <br />
                with a single step.
              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            RIGHT FORM
        =================================================== */}

        <section className="login-form-section">

          <div className="login-form-box">

            {/* ===============================================
                HEADING
            =============================================== */}

            <div className="login-heading">

              <span>
                WELCOME BACK
              </span>

              <h2>
                Let's continue
                <br />
                your <em>journey.</em>
              </h2>

              <p>
                Log in to access your trips and travel plans.
              </p>

            </div>

            {/* ===============================================
                FORM
            =============================================== */}

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="login-field">

                <label>
                  EMAIL ADDRESS
                </label>

                <div className="login-input">

                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="login-field">

                <div className="login-label-row">

                  <label>
                    PASSWORD
                  </label>

                  <Link
                    to="/forgot-password"
                    className="forgot-password"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="login-input">

                  <FiLock />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
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

              {/* =============================================
                  ERROR
              ============================================= */}

              {error && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    background: "#fff1f1",
                    color: "#c64b4b",
                    fontSize: "13px",
                  }}
                >
                  {error}
                </div>
              )}

              {/* =============================================
                  REMEMBER ME
              ============================================= */}

              <label className="login-remember">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

              {/* =============================================
                  LOGIN BUTTON
              ============================================= */}

              <button
                type="submit"
                className="login-submit"
              >
                <span>
                  Log In
                </span>

                <FiArrowRight />
              </button>

            </form>

            {/* ===============================================
                DIVIDER
            =============================================== */}

            <div className="login-divider">
              <span>OR</span>
            </div>

            {/* ===============================================
                SIGNUP
            =============================================== */}

            <div className="login-signup">

              <span>
                Don't have an account?
              </span>

              <Link to="/signup">
                Create account
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Login;