
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

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    navigate("/my-trips");
  };

  return (
    <main className="login-page">

      <div className="login-wrapper">

        {/* LEFT VISUAL */}
        <section className="login-visual">
          <div className="login-overlay"></div>

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


        {/* RIGHT FORM */}
        <section className="login-form-section">

          <div className="login-form-box">

            {/* HEADING */}
            <div className="login-heading">

              <span>WELCOME BACK</span>

              <h2>
                Let's continue
                <br />
                your <em>journey.</em>
              </h2>

              <p>
                Log in to access your trips and travel plans.
              </p>

            </div>


            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="login-field">

                <label>EMAIL ADDRESS</label>

                <div className="login-input">

                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="login-field">

                <div className="login-label-row">

                  <label>PASSWORD</label>

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
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
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


              {/* REMEMBER */}
              <label className="login-remember">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-submit"
              >
                <span>Log In</span>
                <FiArrowRight />
              </button>

            </form>


            {/* DIVIDER */}
            <div className="login-divider">
              <span>OR</span>
            </div>




            {/* SIGNUP */}
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

