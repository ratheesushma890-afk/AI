import React from "react";
import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiCheck,
  FiCreditCard,
  FiDatabase,
  FiFileText,
  FiLink,
  FiLock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiShare2,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const policies = [
    {
      number: "01",
      icon: <FiUser />,
      title: "Information We Collect",
      text:
        "When you use AI Trip, you may provide information while creating an account, planning a trip, saving destinations or completing a booking.",
      points: [
        "Name and email address",
        "Travel destination and dates",
        "Traveller preferences",
        "Wishlist and selected destinations",
        "Trip and booking information",
      ],
    },

    {
      number: "02",
      icon: <FiShield />,
      title: "How We Use Information",
      text:
        "Information may be used to provide website features and create a more relevant travel planning experience.",
      points: [
        "Create personalized trip plans",
        "Save selected destinations",
        "Maintain booking information",
        "Improve the website experience",
        "Support account features",
      ],
    },

    {
      number: "03",
      icon: <FiDatabase />,
      title: "Cookies & Local Storage",
      text:
        "Some website features may use browser storage to remember information on your device.",
      points: [
        "Login status",
        "Saved trip information",
        "Booking details",
        "Wishlist information",
      ],
    },

    {
      number: "04",
      icon: <FiCreditCard />,
      title: "Payment Information",
      text:
        "Payment features currently used in this project may operate as demonstration features.",
      points: [
        "Do not enter real banking passwords",
        "Do not enter real PINs or OTPs",
        "Demo payment information may be used for testing",
      ],
    },

    {
      number: "05",
      icon: <FiShare2 />,
      title: "How We Share Information",
      text:
        "Information may be shared with service providers when required to provide website or travel-related services.",
      points: [
        "Booking service providers",
        "Payment service providers",
        "Website support services",
      ],
    },

    {
      number: "06",
      icon: <FiLock />,
      title: "Data Security",
      text:
        "We aim to use reasonable safeguards to protect information used by the website.",
      points: [
        "Secure information handling",
        "Limited access to information",
        "Regular improvements to security",
      ],
    },

    {
      number: "07",
      icon: <FiDatabase />,
      title: "Data Retention",
      text:
        "Information may be retained for as long as reasonably needed to provide services, manage trips and maintain booking records.",
      points: [],
    },

    {
      number: "08",
      icon: <FiUser />,
      title: "Your Privacy Choices",
      text:
        "Depending on the available website features, you may review or update information associated with your account and travel plans.",
      points: [],
    },

    {
      number: "09",
      icon: <FiLink />,
      title: "Third-Party Links",
      text:
        "Our website may contain links to third-party websites. Those websites may have their own privacy policies and practices.",
      points: [],
    },

    {
      number: "10",
      icon: <FiUsers />,
      title: "Children's Privacy",
      text:
        "AI Trip is designed as a general travel planning experience. Personal information relating to children should only be provided when appropriate and necessary.",
      points: [],
    },

    {
      number: "11",
      icon: <FiFileText />,
      title: "Changes to This Policy",
      text:
        "We may update this Privacy Policy when our website or privacy practices change. The latest update date will be shown on this page.",
      points: [],
    },
  ];

  return (
    <main className="privacy-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="privacy-hero">

        <div className="privacy-hero-overlay" />

        <div className="privacy-hero-content">

          <span className="privacy-small-title">
            <FiShield />
            YOUR PRIVACY MATTERS
          </span>

          <h1>
            Privacy
            
            <em>Policy.</em>
          </h1>

          <p>
            We keep your information safe and secure
            while you explore and plan your next
            journey with AI Trip.
          </p>

          <div className="privacy-hero-points">

            <span>
              <FiLock />
              Secure Information
            </span>

            <span>
              <FiUser />
              Your Control
            </span>

            <span>
              <FiShield />
              Transparent Experience
            </span>

          </div>

          <small>
            Last updated: October 2026
          </small>

        </div>

      </section>


      {/* =========================================
          INTRO
      ========================================= */}

      <section className="privacy-intro">

        <span className="section-eyebrow">
          ABOUT THIS POLICY
        </span>

        <h2>
          Simple Information.{" "}
          <em>No Confusion.</em>
        </h2>

        <p>
          This Privacy Policy explains how AI Trip may
          collect, use and manage information when you
          use our travel planning website, create trips,
          save destinations or complete demo bookings.
        </p>

      </section>


      {/* =========================================
          POLICY SECTIONS - NO CARDS
      ========================================= */}

      <section className="privacy-policy-list">

        {policies.map((policy) => (
          <article
            className="privacy-policy-row"
            key={policy.number}
          >

            <div className="policy-number">
              {policy.number}
            </div>

            <div className="policy-icon">
              {policy.icon}
            </div>

            <div className="policy-content">

              <h3>
                {policy.title}
              </h3>

              <p>
                {policy.text}
              </p>

              {policy.points.length > 0 && (
                <div className="policy-points">

                  {policy.points.map((point) => (
                    <span key={point}>
                      <FiCheck />
                      {point}
                    </span>
                  ))}

                </div>
              )}

            </div>

          </article>
        ))}

      </section>


      {/* =========================================
          TRUST SECTION
      ========================================= */}

      <section className="privacy-trust">

        <div className="privacy-trust-icon">
          <FiShield />
        </div>

        <div>
          <span>OUR COMMITMENT</span>

          <h2>
            Your Trust Keeps Us
            <br />
            Moving Forward.
          </h2>

          <p>
            We aim to keep your information protected
            so you can focus on what matters most —
            planning your next adventure.
          </p>
        </div>

      </section>


      {/* =========================================
          CONTACT
      ========================================= */}

      <section className="privacy-contact">

        <span className="section-eyebrow">
          HAVE QUESTIONS?
        </span>

        <h2>
          Contact <em>Us</em>
        </h2>

        <p className="privacy-contact-intro">
          If you have questions about this Privacy
          Policy or how the website handles
          information, you can contact us.
        </p>

        <div className="privacy-contact-list">

          <a
            href="mailto:hello@tripper.com"
            className="privacy-contact-item"
          >
            <FiMail />

            <div>
              <span>Email Us</span>
              <strong>
                hello@tripper.com
              </strong>
            </div>

            <FiArrowUpRight />
          </a>


          <div className="privacy-contact-item">

            <FiMapPin />

            <div>
              <span>Our Office</span>
              <strong>
                New Delhi, India
              </strong>
            </div>

          </div>


          <div className="privacy-contact-item">

            <FiMessageCircle />

            <div>
              <span>Support</span>
              <strong>
                Available 9 AM - 6 PM
              </strong>
            </div>

          </div>

        </div>

      </section>


     

    </main>
  );
};

export default PrivacyPolicy;