
import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCompass,
  FiHeart,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

import "./AboutUs.css";

const AboutUs = () => {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            <FiCompass />
            ABOUT US
          </span>

          <h1>
            We don't just plan
            <br />
            <em>trips.</em>
            <br />
            We create memories.
          </h1>

          <p>
            Your journey deserves more than a checklist.
            We help you discover beautiful places, meaningful
            experiences and unforgettable moments — all in one place.
          </p>

          <div className="about-hero-actions">
            <Link to="/create-trip" className="about-primary-btn">
              Plan Your Journey
              <FiArrowUpRight />
            </Link>

            <Link to="/explore" className="about-secondary-btn">
              Explore Destinations
            </Link>
          </div>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=90"
            alt="Travel landscape"
          />

          <div className="about-image-card">
            <span>01</span>
            <div>
              <strong>Travel with purpose</strong>
              <small>Explore • Experience • Remember</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="about-story">
        <div className="about-section-label">
          <span>OUR STORY</span>
          <div />
        </div>

        <div className="about-story-grid">
          <div className="about-story-title">
            <h2>
              Every journey
              <br />
              starts with a
              <br />
              <em>feeling.</em>
            </h2>
          </div>

          <div className="about-story-text">
            <p>
              We believe travel is not about how many places
              you visit. It's about how deeply you experience them.
            </p>

            <p>
              Our platform was created to make travel planning
              simple, inspiring and personal. From choosing the
              perfect destination to creating your itinerary,
              we bring everything together so you can focus on
              what really matters — enjoying the journey.
            </p>

            <p>
              Whether you're looking for peaceful beaches,
              mountain adventures, royal cities or hidden gems,
              we're here to help you turn your travel ideas
              into real experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="about-stats">
        <div className="about-stat">
          <strong>50+</strong>
          <span>Destinations</span>
        </div>

        <div className="about-stat">
          <strong>10K+</strong>
          <span>Happy Travellers</span>
        </div>

        <div className="about-stat">
          <strong>100+</strong>
          <span>Unique Experiences</span>
        </div>

        <div className="about-stat">
          <strong>4.9</strong>
          <span>Average Rating</span>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="about-values">
        <div className="about-values-heading">
          <span>WHAT WE BELIEVE</span>

          <h2>
            Travel should feel
            <br />
            <em>personal.</em>
          </h2>

          <p>
            Everything we create is designed around one simple idea:
            your journey should feel like yours.
          </p>
        </div>

        <div className="about-values-grid">

          <div className="about-value-card">
            <div className="value-icon">
              <FiHeart />
            </div>

            <span>01</span>

            <h3>Travel with Heart</h3>

            <p>
              We focus on experiences that create stories
              you'll want to remember long after your trip.
            </p>
          </div>

          <div className="about-value-card">
            <div className="value-icon">
              <FiCompass />
            </div>

            <span>02</span>

            <h3>Discover More</h3>

            <p>
              From famous landmarks to hidden gems,
              we help you see destinations differently.
            </p>
          </div>

          <div className="about-value-card">
            <div className="value-icon">
              <FiUsers />
            </div>

            <span>03</span>

            <h3>Made for You</h3>

            <p>
              Your travel style, your pace, your budget.
              Every journey can be completely your own.
            </p>
          </div>

        </div>
      </section>

      {/* ================= IMAGE BREAK ================= */}
      <section className="about-banner">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=90"
          alt="Beautiful travel destination"
        />

        <div className="about-banner-overlay">
          <span>
            <FiMapPin />
            THE WORLD IS WAITING
          </span>

          <h2>
            Go somewhere
            <br />
            <em>you've never been.</em>
          </h2>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="about-team">
        <div className="about-team-heading">
          <div>
            <span>THE PEOPLE BEHIND THE JOURNEY</span>

            <h2>
              Built by travellers,
              <br />
              <em>for travellers.</em>
            </h2>
          </div>

          <p>
            We're a small team with a big love for discovering
            new places, meeting new people and creating better
            ways to experience the world.
          </p>
        </div>

        <div className="about-team-image">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=90"
            alt="Travel team"
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="about-cta-content">
          <span>YOUR NEXT CHAPTER</span>

          <h2>
            Where will you
            <br />
            <em>go next?</em>
          </h2>

          <p>
            Your next unforgettable journey could be closer
            than you think.
          </p>

          <Link to="/create-trip" className="about-cta-btn">
            Start Planning
            <FiArrowUpRight />
          </Link>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;

