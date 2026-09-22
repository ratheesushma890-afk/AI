
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";

import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSent(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <main className="contact-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span className="contact-eyebrow">
            <FiMessageCircle />
            GET IN TOUCH
          </span>

          <h1>
            Let's talk about
            <br />
            your <em>next journey.</em>
          </h1>

          <p>
            Have a question, need help planning your trip,
            or simply want to say hello? We'd love to hear
            from you.
          </p>

          <div className="contact-hero-info">

            <div>
              <FiMail />
              <span>hello@journey.com</span>
            </div>

            <div>
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>

          </div>

        </div>

        <div className="contact-hero-image">

          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=90"
            alt="Travel destination"
          />

          <div className="contact-image-note">
            <span>TRAVEL • DISCOVER • CONNECT</span>
            <strong>We're here for you.</strong>
          </div>

        </div>

      </section>


      {/* =================================================
          CONTACT AREA
      ================================================= */}

      <section className="contact-main">

        <div className="contact-form-wrapper">

          <div className="contact-section-heading">

            <span>SEND US A MESSAGE</span>

            <h2>
              Tell us what's
              <br />
              <em>on your mind.</em>
            </h2>

            <p>
              Fill in the form and our team will get back
              to you as soon as possible.
            </p>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div className="contact-field">
                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>


              <div className="contact-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

            </div>


            <div className="contact-field">

              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />

            </div>


            <div className="contact-field">

              <label>Your Message</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your question..."
                rows="6"
                required
              />

            </div>


            {sent && (
              <div className="contact-success">
                ✓ Thanks! Your message has been sent successfully.
              </div>
            )}


            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
              <FiSend />
            </button>

          </form>

        </div>


        {/* =================================================
            CONTACT DETAILS
        ================================================= */}

        <aside className="contact-details">

          <div className="contact-detail-card">

            <div className="contact-detail-icon">
              <FiMapPin />
            </div>

            <div>
              <span>OUR OFFICE</span>
              <h3>New Delhi, India</h3>
              <p>
                21 Travel Avenue,
                <br />
                New Delhi, India
              </p>
            </div>

          </div>


          <div className="contact-detail-card">

            <div className="contact-detail-icon">
              <FiMail />
            </div>

            <div>
              <span>EMAIL US</span>
              <h3>hello@journey.com</h3>
              <p>
                For general questions,
                partnerships and support.
              </p>
            </div>

          </div>


          <div className="contact-detail-card">

            <div className="contact-detail-icon">
              <FiPhone />
            </div>

            <div>
              <span>CALL US</span>
              <h3>+91 98765 43210</h3>
              <p>
                Monday – Saturday
                <br />
                9:00 AM – 7:00 PM
              </p>
            </div>

          </div>


          <div className="contact-hours">

            <FiClock />

            <div>
              <strong>We're available</strong>
              <span>Monday – Saturday</span>
              <small>9:00 AM – 7:00 PM IST</small>
            </div>

          </div>

        </aside>

      </section>


      {/* =================================================
          MAP / DISCOVER SECTION
      ================================================= */}

      <section className="contact-map">

        <img
          src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1800&q=90"
          alt="World map travel"
        />

        <div className="contact-map-overlay">

          <span>
            <FiMapPin />
            WHEREVER YOU ARE
          </span>

          <h2>
            The world is
            <br />
            <em>our meeting place.</em>
          </h2>

          <p>
            From planning your first adventure to
            answering your last-minute questions,
            we're always just a message away.
          </p>

        </div>

      </section>


      {/* =================================================
          QUICK HELP
      ================================================= */}

      <section className="contact-help">

        <div className="contact-help-heading">

          <span>NEED QUICK HELP?</span>

          <h2>
            Maybe we've already
            <br />
            <em>answered it.</em>
          </h2>

        </div>


        <div className="contact-help-grid">

          <div className="contact-help-card">
            <span>01</span>
            <h3>Planning a Trip</h3>
            <p>
              Start creating your personalised travel
              plan and build your perfect itinerary.
            </p>

            <Link to="/create-trip">
              Create a Trip
              <FiArrowUpRight />
            </Link>
          </div>


          <div className="contact-help-card">
            <span>02</span>
            <h3>Explore Destinations</h3>
            <p>
              Discover beautiful destinations and find
              inspiration for your next adventure.
            </p>

            <Link to="/explore">
              Explore Now
              <FiArrowUpRight />
            </Link>
          </div>


          <div className="contact-help-card">
            <span>03</span>
            <h3>About Our Story</h3>
            <p>
              Learn more about who we are and why
              we created this travel platform.
            </p>

            <Link to="/about">
              About Us
              <FiArrowUpRight />
            </Link>
          </div>

        </div>

      </section>



    </main>
  );
};

export default Contact;

