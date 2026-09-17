
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
} from "react-icons/fi";

import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup Data:", formData);

    navigate("/my-trips");
  };

  return (
    <main className="signup-page">
      <div className="signup-wrapper">

        {/* LEFT SIDE */}
        <section className="signup-visual">
          <div className="signup-overlay"></div>

          <div className="signup-visual-content">
            <span className="signup-kicker">
              AI TRIP PLANNER
            </span>

            <h1>
              Your next
              <br />
              <em>story</em> starts here.
            </h1>

            <p>
              Create your account and start planning
              journeys that feel truly yours.
            </p>

            <div className="signup-quote">
              <span>“</span>
              <p>
                Don't just visit places.
                <br />
                Create memories.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="signup-form-section">

          <div className="signup-form-box">

            <div className="signup-heading">
              <span>WELCOME</span>

              <h2>
                Create your
                <br />
                <em>account.</em>
              </h2>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="signup-field">
                <label>FULL NAME</label>

                <div className="signup-input">
                  <FiUser />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="signup-field">
                <label>EMAIL ADDRESS</label>

                <div className="signup-input">
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
              <div className="signup-field">
                <label>PASSWORD</label>

                <div className="signup-input">
                  <FiLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="signup-field">
                <label>CONFIRM PASSWORD</label>

                <div className="signup-input">
                  <FiLock />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* TERMS */}
              <label className="signup-terms">
                <input type="checkbox" required />

                <span>
                  I agree to the{" "}
                  <a href="#terms">Terms & Conditions</a>
                  {" "}and{" "}
                  <a href="#privacy">Privacy Policy</a>.
                </span>
              </label>

              {/* BUTTON */}
              <button
                type="submit"
                className="signup-submit"
              >
                <span>Create My Account</span>
                <FiArrowRight />
              </button>

            </form>

            {/* LOGIN */}
            <div className="signup-login">
              <span>Already have an account?</span>

              <Link to="/login">
                Log in
                <FiArrowRight />
              </Link>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Signup;

