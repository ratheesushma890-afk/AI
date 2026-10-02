import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiClock,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";

import "./Guides.css";

/* =========================================================
   GUIDE DATA
========================================================= */

const guides = [
  {
    id: 1,
    slug: "goa",
    title: "The Ultimate Goa Guide",
    location: "Goa, India",
    category: "Beach",
    time: "8 min read",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=90",
    description:
      "Discover beautiful beaches, hidden cafés, sunset spots and unforgettable experiences in Goa.",
    tag: "Popular",
  },

  {
    id: 2,
    slug: "manali",
    title: "A Slow Weekend in Manali",
    location: "Himachal Pradesh",
    category: "Mountains",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=90",
    description:
      "A peaceful mountain escape filled with scenic views, cosy stays and places worth exploring.",
    tag: "Editor's Pick",
  },

  {
    id: 3,
    slug: "jaipur",
    title: "Jaipur Beyond the Palaces",
    location: "Rajasthan, India",
    category: "Heritage",
    time: "7 min read",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=90",
    description:
      "Explore royal architecture, colourful markets, local food and the hidden charm of Jaipur.",
    tag: "Culture",
  },

  {
    id: 4,
    slug: "kerala",
    title: "Kerala: God's Own Escape",
    location: "Kerala, India",
    category: "Nature",
    time: "9 min read",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=90",
    description:
      "From peaceful backwaters to lush hills, experience the slower and greener side of Kerala.",
    tag: "Nature",
  },

  {
    id: 5,
    slug: "rishikesh",
    title: "Adventure in Rishikesh",
    location: "Uttarakhand, India",
    category: "Adventure",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1400&q=90",
    description:
      "Rafting, riverside cafés, mountain views and thrilling experiences for adventure lovers.",
    tag: "Adventure",
  },

  {
    id: 6,
    slug: "udaipur",
    title: "A Royal Escape to Udaipur",
    location: "Rajasthan, India",
    category: "Romantic",
    time: "7 min read",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1400&q=90",
    description:
      "Spend slow evenings by the lake and discover the romantic beauty of India's royal city.",
    tag: "Romantic",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Nature",
  "Adventure",
  "Romantic",
];

/* =========================================================
   GUIDES COMPONENT
========================================================= */

const Guides = () => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  /* =======================================================
     FILTER GUIDES
  ======================================================= */

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const categoryMatch =
        activeCategory === "All" ||
        guide.category === activeCategory;

      const searchText = search
        .toLowerCase()
        .trim();

      const searchMatch =
        guide.title
          .toLowerCase()
          .includes(searchText) ||
        guide.location
          .toLowerCase()
          .includes(searchText) ||
        guide.category
          .toLowerCase()
          .includes(searchText);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <main className="guides-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="guides-hero">

        <div className="guides-hero-content">

          <span className="guides-eyebrow">
            <FiBookOpen />
            TRAVEL GUIDES
          </span>

          <h1>
            Go beyond
            
            the <em>guidebook.</em>
          </h1>

          <p>
            Stories, local tips and thoughtful
            recommendations to help you experience
            every destination a little differently.
          </p>

          <div className="guides-hero-actions">

            <a
              href="#all-guides"
              className="guides-primary-btn"
            >
              Explore Guides
              <FiArrowUpRight />
            </a>

            <Link
              to="/trip-plan"
              className="guides-secondary-btn"
            >
              Plan a Trip
            </Link>

          </div>

        </div>

        <div className="guides-hero-visual">

          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1500&q=90"
            alt="Travellers exploring a destination"
          />

          <div className="guides-hero-card">

            <span>01</span>

            <div>
              <strong>
                Travel curious?
              </strong>

              <small>
                Start exploring somewhere new.
              </small>
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          INTRO STRIP
      ================================================= */}

      <section className="guides-intro">

        <div className="guides-intro-number">
          06
          <span>GUIDES</span>
        </div>

        <div className="guides-intro-text">

          <h2>
            Inspiration for
            <br />
            your <em>next escape.</em>
          </h2>

        </div>

        <p>
          Whether you're planning a weekend getaway
          or a long adventure, discover ideas that
          make travel feel easier and more meaningful.
        </p>

      </section>

      {/* =================================================
          FEATURED GUIDE
      ================================================= */}

      <section className="guides-featured">

        <div className="guides-section-label">
          <span>FEATURED GUIDE</span>
          <div />
        </div>

        <div className="featured-guide">

          {/* IMAGE */}

          <div className="featured-guide-image">

            <img
              src={guides[0].image}
              alt={guides[0].title}
            />

            <span className="featured-guide-badge">
              {guides[0].tag}
            </span>

          </div>

          {/* CONTENT */}

          <div className="featured-guide-content">

            <span className="featured-small">
              {guides[0].category}
              {" • "}
              {guides[0].time}
            </span>

            <h2>
              {guides[0].title}
            </h2>

            <div className="featured-location">
              <FiMapPin />
              {guides[0].location}
            </div>

            <p>
              {guides[0].description}
            </p>

            {/* ==========================================
                GOA -> DESTINATION DETAIL
            ========================================== */}

            <Link
              to={`/destination/${guides[0].slug}`}
              className="featured-read-btn"
            >
              Read Guide
              <FiArrowUpRight />
            </Link>

          </div>

        </div>

      </section>

      {/* =================================================
          GUIDE LIBRARY
      ================================================= */}

      <section
        className="guides-library"
        id="all-guides"
      >

        <div className="guides-library-heading">

          <div>

            <span>
              THE GUIDE LIBRARY
            </span>

            <h2>
              Find your{" "}
              <em>next story.</em>
            </h2>

          </div>

          {/* SEARCH */}

          <div className="guides-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                Clear
              </button>
            )}

          </div>

        </div>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        <div className="guides-filters">

          {categories.map((category) => (

            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        {/* =================================================
            GUIDE CARDS
        ================================================= */}

        {filteredGuides.length > 0 ? (

          <div className="guides-grid">

            {filteredGuides.map(
              (guide, index) => (

                <article
                  className="guide-card"
                  key={guide.id}
                >

                  {/* IMAGE */}

                  <div className="guide-card-image">

                    <img
                      src={guide.image}
                      alt={guide.title}
                    />

                    <span className="guide-card-number">
                      {String(index + 1)
                        .padStart(2, "0")}
                    </span>

                    <span className="guide-card-tag">
                      {guide.tag}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="guide-card-content">

                    <div className="guide-card-meta">

                      <span>
                        <FiMapPin />
                        {guide.location}
                      </span>

                      <span>
                        <FiClock />
                        {guide.time}
                      </span>

                    </div>

                    <h3>
                      {guide.title}
                    </h3>

                    <p>
                      {guide.description}
                    </p>

                    {/* ======================================
                        IMPORTANT:
                        EACH GUIDE -> ITS DESTINATION DETAIL

                        Goa       -> /destination/goa
                        Manali    -> /destination/manali
                        Jaipur    -> /destination/jaipur
                        Kerala    -> /destination/kerala
                        Rishikesh -> /destination/rishikesh
                        Udaipur   -> /destination/udaipur
                    ====================================== */}

                    <Link
                      to={`/destination/${guide.slug}`}
                      className="guide-read-link"
                    >
                      Read Guide
                      <FiArrowUpRight />
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        ) : (

          /* =================================================
              EMPTY RESULT
          ================================================= */

          <div className="guides-empty">

            <FiSearch />

            <h3>
              No guides found
            </h3>

            <p>
              Try another search or choose
              a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Show All Guides
            </button>

          </div>

        )}

      </section>

     
      

    </main>
  );
};

export default Guides;