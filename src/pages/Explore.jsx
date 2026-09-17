import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiStar,
  FiCompass,
  FiChevronRight,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";

import "./Explore.css";

const destinations = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
    category: "Beach",
    rating: "4.9",
    price: "₹8,999",
    tag: "Most Loved",
    description:
      "Golden beaches, slow mornings and unforgettable sunsets.",
  },

  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=90",
    category: "Mountains",
    rating: "4.8",
    price: "₹7,499",
    tag: "Mountain Escape",
    description:
      "Pine forests, mountain air and peaceful Himalayan views.",
  },

  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=90",
    category: "Heritage",
    rating: "4.8",
    price: "₹6,999",
    tag: "Royal Pick",
    description:
      "Palaces, colourful streets and timeless royal charm.",
  },

  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala, India",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",
    category: "Nature",
    rating: "4.9",
    price: "₹10,499",
    tag: "Slow Travel",
    description:
      "Backwaters, greenery and peaceful tropical escapes.",
  },

  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=90",
    category: "Adventure",
    rating: "4.7",
    price: "₹5,999",
    tag: "Adventure",
    description:
      "River adventures, mountain trails and soulful evenings.",
  },

];


const filters = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Nature",
  "Adventure",
  "Romantic",
];

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const discoverRef = useRef(null);

  // ================= WISHLIST =================
  const { toggleWishlist, isWishlisted } = useWishlist();

  // ================= FILTER =================
  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((item) => {
      const filterMatch =
        activeFilter === "All" ||
        item.category.toLowerCase() === activeFilter.toLowerCase();

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  // ================= EXPLORE BUTTON =================
  const handleExplore = () => {
    discoverRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="explore-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="explore-hero">

        <img
          className="explore-hero-image"
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=95"
          alt="Beautiful mountain travel destination"
        />

        <div className="explore-hero-overlay" />

        <div className="explore-hero-content">

          <span className="explore-eyebrow">
            <FiCompass />
            DISCOVER YOUR NEXT ESCAPE
          </span>

          <h1>
            Go somewhere
            <br />
            <em>worth remembering.</em>
          </h1>

          <p>
            Beautiful places, unforgettable experiences and journeys
            designed around the way you want to travel.
          </p>

          {/* SEARCH */}
          <div className="explore-search">

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search a destination, place or experience..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleExplore();
                }
              }}
            />

            <button type="button" onClick={handleExplore}>
              Explore
              <FiArrowUpRight />
            </button>

          </div>

          <div className="hero-mini-info">
            <span>✦ Curated destinations</span>
            <span>✦ Local experiences</span>
            <span>✦ Smart trip planning</span>
          </div>

        </div>
      </section>


      {/* =====================================================
          TRENDING
      ===================================================== */}
      <section className="trending-section">

        <div className="section-heading">

          <div>
            <span className="small-label">
              TRENDING NOW
            </span>

            <h2>
              Places people are
              
              dreaming about.
            </h2>
          </div>

          <Link
            to="/explore"
            className="heading-link"
          >
            View all destinations

            <span className="heading-circle">
              <FiArrowUpRight />
            </span>
          </Link>

        </div>


        <div className="destination-slider">

          {destinations.slice(0, 5).map((item) => (

            <Link
              to={`/destination/${item.id}`}
              className="trend-card"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="trend-gradient" />

              <div className="trend-content">

                <div>

                  <h3>{item.name}</h3>

                  <span className="trend-location">
                    <FiMapPin />
                    {item.state}
                  </span>

                </div>

                <div className="trend-bottom">

                  <span>
                    <FiStar />
                    {item.rating}
                  </span>

                  <span className="trend-arrow">
                    <FiChevronRight />
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* =====================================================
          DISCOVER
      ===================================================== */}
      <section
        className="discover-section"
        ref={discoverRef}
      >

        <div className="section-heading">

          <div>

            <span className="small-label">
              CURATED FOR YOU
            </span>

            <h2>
              Find your next
              
              favourite place.
            </h2>

          </div>

        </div>


        {/* ================= FILTERS ================= */}
        <div className="filter-row">

          {filters.map((filter) => (

            <button
              type="button"
              key={filter}
              className={
                activeFilter === filter
                  ? "active"
                  : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>

          ))}

        </div>


        {/* =================================================
            DESTINATION GRID
        ================================================= */}
        {filteredDestinations.length > 0 ? (

          <div className="discover-grid">

            {filteredDestinations.map((item) => (

              <article
                className="destination-card"
                key={item.id}
              >

                {/* IMAGE */}
                <Link
                  to={`/destination/${item.id}`}
                  className="destination-image-link"
                >

                  <div className="destination-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="destination-image-top">

                      <span className="destination-tag">
                        {item.tag}
                      </span>

                      <span className="destination-location">
                        <FiMapPin />
                        {item.state}
                      </span>

                    </div>

                  </div>

                </Link>


                {/* =================================================
                    WISHLIST HEART
                ================================================= */}
                <button
                  type="button"
                  className={`like-btn ${
                    isWishlisted(item.id)
                      ? "liked"
                      : ""
                  }`}
                  onClick={() => toggleWishlist(item)}
                  aria-label={
                    isWishlisted(item.id)
                      ? `Remove ${item.name} from wishlist`
                      : `Add ${item.name} to wishlist`
                  }
                >
                  <FiHeart />
                </button>


                {/* INFO */}
                <div className="destination-info">

                  <div className="destination-title-row">

                    <Link
                      to={`/destination/${item.id}`}
                    >
                      <h3>{item.name}</h3>
                    </Link>

                    <span className="rating">
                      <FiStar />
                      {item.rating}
                    </span>

                  </div>


                  <p>
                    {item.description}
                  </p>


                  {/* FOOTER */}
                  <div className="destination-footer">

                    <div className="price-box">

                      <small>
                        STARTING FROM
                      </small>

                      <strong>
                        {item.price}
                      </strong>

                    </div>


                    <Link
                      to={`/destination/${item.id}`}
                      className="view-detail"
                    >
                      View details
                      <FiArrowUpRight />
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================================
              EMPTY STATE
          ================================================= */
          <div className="empty-explore">

            <div className="empty-icon">
              <FiSearch />
            </div>

            <h3>
              No destinations found
            </h3>

            <p>
              Try another destination or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
            >
              Reset search
            </button>

          </div>

        )}

      </section>


    </main>
  );
};

export default Explore;