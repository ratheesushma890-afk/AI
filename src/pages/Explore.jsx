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

/* =========================================================
   DESTINATION DATA
========================================================= */

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


/* =========================================================
   FILTER DATA
========================================================= */

const filters = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Nature",
  "Adventure",
  "Romantic",
];


/* =========================================================
   EXPLORE COMPONENT
========================================================= */

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const discoverRef = useRef(null);

  /* =======================================================
     WISHLIST
  ======================================================= */

  const { toggleWishlist, isWishlisted } = useWishlist();


  /* =======================================================
     FILTER DESTINATIONS
  ======================================================= */

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((item) => {
      const filterMatch =
        activeFilter === "All" ||
        item.category.toLowerCase() ===
          activeFilter.toLowerCase();

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);


  /* =======================================================
     EXPLORE BUTTON
  ======================================================= */

  const handleExplore = () => {
    discoverRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  /* =======================================================
     JSX
  ======================================================= */

  return (
    <main className="tripExplore-page">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="tripExplore-hero">

        {/* HERO IMAGE */}

        <img
          className="tripExplore-heroImage"
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=95"
          alt="Beautiful mountain travel destination"
        />


        {/* HERO OVERLAY */}

        <div className="tripExplore-heroOverlay" />


        {/* HERO CONTENT */}

        <div className="tripExplore-heroContent">

          <span className="tripExplore-eyebrow">

            <FiCompass />

            DISCOVER YOUR NEXT ESCAPE

          </span>


          <h1 className="tripExplore-heroTitle">
            Go somewhere
            <br />
            <em>worth remembering.</em>
          </h1>


          <p className="tripExplore-heroDescription">
            Beautiful places, unforgettable experiences and journeys
            designed around the way you want to travel.
          </p>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="tripExplore-searchBox">

            <FiSearch className="tripExplore-searchIcon" />


            <input
              className="tripExplore-searchInput"
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


            <button
              type="button"
              className="tripExplore-searchButton"
              onClick={handleExplore}
            >
              Explore

              <FiArrowUpRight />
            </button>

          </div>


          {/* =================================================
              HERO MINI INFO
          ================================================= */}

          <div className="tripExplore-miniInfo">

            <span>
              ✦ Curated destinations
            </span>

            <span>
              ✦ Local experiences
            </span>

            <span>
              ✦ Smart trip planning
            </span>

          </div>

        </div>

      </section>


      {/* ===================================================
          TRENDING SECTION
      =================================================== */}

      <section className="tripExplore-trendingSection">

        {/* SECTION HEADING */}

        <div className="tripExplore-sectionHeading">

          <div className="tripExplore-headingLeft">

            <span className="tripExplore-smallLabel">
              TRENDING NOW
            </span>


            <h2 className="tripExplore-sectionTitle">
              Places people are
              <br />
              dreaming about.
            </h2>

          </div>


          <Link
            to="/explore"
            className="tripExplore-headingLink"
          >
            View all destinations

            <span className="tripExplore-headingCircle">
              <FiArrowUpRight />
            </span>

          </Link>

        </div>


        {/* =================================================
            TRENDING CARDS
        ================================================= */}

        <div className="tripExplore-trendingSlider">

          {destinations.slice(0, 5).map((item) => (

            <Link
              key={item.id}
              to={`/destination/${item.id}`}
              className="tripExplore-trendingCard"
            >

              {/* IMAGE */}

              <img
                className="tripExplore-trendingImage"
                src={item.image}
                alt={item.name}
              />


              {/* GRADIENT */}

              <div className="tripExplore-trendingGradient" />


              {/* CONTENT */}

              <div className="tripExplore-trendingContent">

                <div className="tripExplore-trendingInfo">

                  <h3>
                    {item.name}
                  </h3>


                  <span className="tripExplore-trendingLocation">

                    <FiMapPin />

                    {item.state}

                  </span>

                </div>


                <div className="tripExplore-trendingBottom">

                  <span className="tripExplore-trendingRating">

                    <FiStar />

                    {item.rating}

                  </span>


                  <span className="tripExplore-trendingArrow">

                    <FiChevronRight />

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* ===================================================
          DISCOVER SECTION
      =================================================== */}

      <section
        className="tripExplore-discoverSection"
        ref={discoverRef}
      >

        {/* =================================================
            DISCOVER HEADING
        ================================================= */}

        <div className="tripExplore-sectionHeading">

          <div className="tripExplore-headingLeft">

            <span className="tripExplore-smallLabel">
              CURATED FOR YOU
            </span>


            <h2 className="tripExplore-sectionTitle">
              Find your next
              <br />
              favourite place.
            </h2>

          </div>

        </div>


        {/* =================================================
            FILTER BUTTONS
        ================================================= */}

        <div className="tripExplore-filterRow">

          {filters.map((filter) => (

            <button
              type="button"
              key={filter}
              className={`tripExplore-filterButton ${
                activeFilter === filter
                  ? "tripExplore-filterButtonActive"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {/* =================================================
            DESTINATION RESULTS
        ================================================= */}

        {filteredDestinations.length > 0 ? (

          /* =================================================
             DESTINATION GRID
          ================================================= */

          <div className="tripExplore-destinationGrid">

            {filteredDestinations.map((item) => (

              <article
                className="tripExplore-destinationCard"
                key={item.id}
              >

                {/* =========================================
                    DESTINATION IMAGE
                ========================================= */}

                <Link
                  to={`/destination/${item.id}`}
                  className="tripExplore-imageLink"
                >

                  <div className="tripExplore-cardImageBox">

                    <img
                      className="tripExplore-cardImage"
                      src={item.image}
                      alt={item.name}
                    />


                    {/* IMAGE TOP */}

                    <div className="tripExplore-imageTop">

                      <span className="tripExplore-destinationTag">
                        {item.tag}
                      </span>


                      <span className="tripExplore-cardLocation">

                        <FiMapPin />

                        {item.state}

                      </span>

                    </div>

                  </div>

                </Link>


                {/* =================================================
                    WISHLIST BUTTON
                ================================================= */}

                <button
                  type="button"
                  className={`tripExplore-wishlistButton ${
                    isWishlisted(item.id)
                      ? "tripExplore-wishlistButtonActive"
                      : ""
                  }`}
                  onClick={() =>
                    toggleWishlist(item)
                  }
                  aria-label={
                    isWishlisted(item.id)
                      ? `Remove ${item.name} from wishlist`
                      : `Add ${item.name} to wishlist`
                  }
                >
                  <FiHeart />
                </button>


                {/* =================================================
                    DESTINATION CONTENT
                ================================================= */}

                <div className="tripExplore-cardContent">

                  {/* TITLE ROW */}

                  <div className="tripExplore-cardTitleRow">

                    <Link
                      to={`/destination/${item.id}`}
                      className="tripExplore-cardTitleLink"
                    >
                      <h3>
                        {item.name}
                      </h3>
                    </Link>


                    <span className="tripExplore-cardRating">

                      <FiStar />

                      {item.rating}

                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="tripExplore-cardDescription">
                    {item.description}
                  </p>


                  {/* =================================================
                      CARD FOOTER
                  ================================================= */}

                  <div className="tripExplore-cardFooter">

                    {/* PRICE */}

                    <div className="tripExplore-priceBox">

                      <small>
                        STARTING FROM
                      </small>

                      <strong>
                        {item.price}
                      </strong>

                    </div>


                    {/* VIEW DETAILS */}

                    <Link
                      to={`/destination/${item.id}`}
                      className="tripExplore-viewButton"
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

          <div className="tripExplore-emptyState">

            <div className="tripExplore-emptyIcon">
              <FiSearch />
            </div>


            <h3 className="tripExplore-emptyTitle">
              No destinations found
            </h3>


            <p className="tripExplore-emptyText">
              Try another destination or category.
            </p>


            <button
              type="button"
              className="tripExplore-resetButton"
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