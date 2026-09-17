import React from "react";
import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMapPin,
  FiCompass,
  FiMail,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import "./TravelFooter.css";

const TravelFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="travel-footer">

      {/* background decoration */}
      <div className="footer-circle footer-circle-one"></div>
      <div className="footer-circle footer-circle-two"></div>

      <div className="footer-container">

        {/* =====================================================
            TOP CTA
        ===================================================== */}

        <div className="footer-top">

          <div className="footer-heading">

            <div className="footer-mini-title">
              <FiCompass />
              <span>KEEP EXPLORING</span>
            </div>

            <h2>
              Go somewhere
              <span>beautiful.</span>
            </h2>

          </div>


          <div className="footer-cta">

            <p>
              Your next story is waiting.
              Start planning a journey you'll
              remember.
            </p>

            <Link
              to="/trip-plan"
              className="footer-cta-btn"
            >
              <span>Plan a trip</span>

              <i>
                <FiArrowUpRight />
              </i>
            </Link>

          </div>

        </div>


        {/* =====================================================
            LINKS
        ===================================================== */}

        <div className="footer-links-area">


          {/* EXPLORE */}

          <div className="footer-links">

            <h4>EXPLORE</h4>

            <Link to="/explore">
              Explore
            </Link>

            <Link to="/destinations">
              Destinations
            </Link>

            <Link to="/guides">
              Travel Guides
            </Link>

            <Link to="/my-trips">
              My Trips
            </Link>

          </div>


          {/* COMPANY */}

          <div className="footer-links">

            <h4>TRIPPER</h4>

            <Link to="/about-us">
              About Us
            </Link>

            <Link to="/contact">
              Contact
            </Link>
            <Link to="/guides">
              Guides
            </Link>
            <Link to="/faqs">
              FAQs
            </Link>

          </div>


          {/* CONNECT */}

          <div className="footer-connect">

            <h4>LET'S CONNECT</h4>

            <a
              href="mailto:hello@tripper.com"
              className="footer-email"
            >
              <FiMail />
              hello@tripper.com
            </a>


            <div className="footer-social">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

            </div>

          </div>


          
        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}
        <button
  className="admin-login-footer-btn"
  onClick={() => navigate("/admin-secret")}
>
  Admin Login
</button>
        <div className="footer-bottom">

          <span>
            © 2026 TRIPPER
          </span>

          <div className="footer-bottom-center">

            <span className="footer-live-dot"></span>

            MADE FOR THE CURIOUS

          </div>

          <span>
            TRAVEL · EXPLORE · REPEAT
          </span>

        </div>

      </div>

    </footer>
  );
};

export default TravelFooter;