import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMapPin,
  FiSearch,
  FiStar,
} from "react-icons/fi";

import "./Destinations.css";

/* =========================================================
   DESTINATIONS DATA
========================================================= */

const destinations = [
    {
    id: "ladakh",
    number: "07",
    name: "Ladakh",
    state: "Ladakh, India",
    category: "HIGH ALTITUDE",
    rating: "4.9",
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=90",
    text: "A dramatic land of high passes, ancient monasteries and endless mountain skies.",
    highlights: ["Mountains", "Monasteries", "Road Trips"],
  },
  {
    id: "goa",
    number: "01",
    name: "Goa",
    state: "Goa, India",
    category: "BEACH ESCAPE",
    rating: "4.9",
    price: "₹8,999",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
    text: "A place for golden sunsets, quiet mornings and endless coastal roads.",
    highlights: ["Beaches", "Sunsets", "Nightlife"],
  },

  {
    id: "manali",
    number: "02",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "MOUNTAIN ESCAPE",
    rating: "4.8",
    price: "₹7,499",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=90",
    text: "Snowy peaks, pine forests and peaceful valleys make every day feel slower.",
    highlights: ["Mountains", "Snow", "Valleys"],
  },

  {
    id: "jaipur",
    number: "03",
    name: "Jaipur",
    state: "Rajasthan, India",
    category: "ROYAL INDIA",
    rating: "4.8",
    price: "₹6,999",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",
    text: "Walk through royal courtyards, ancient forts and streets filled with colour.",
    highlights: ["Forts", "Culture", "Food"],
  },

  {
    id: "kerala",
    number: "04",
    name: "Kerala",
    state: "Kerala, India",
    category: "SLOW TRAVEL",
    rating: "4.9",
    price: "₹10,499",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",
    text: "Green backwaters, tropical landscapes and days designed for doing nothing.",
    highlights: ["Backwaters", "Nature", "Wellness"],
  },

  {
    id: "rishikesh",
    number: "05",
    name: "Rishikesh",
    state: "Uttarakhand, India",
    category: "ADVENTURE",
    rating: "4.7",
    price: "₹5,999",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=90",
    text: "Where the river meets the mountains and every turn brings a new adventure.",
    highlights: ["Rafting", "River", "Hiking"],
  },

  {
    id: "udaipur",
    number: "06",
    name: "Udaipur",
    state: "Rajasthan, India",
    category: "ROMANTIC INDIA",
    rating: "4.8",
    price: "₹8,499",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1600&q=90",
    text: "Lakeside palaces, soft evenings and one of India's most beautiful skylines.",
    highlights: ["Lakes", "Palaces", "Sunsets"],
  },



  {
    id: "andaman",
    number: "08",
    name: "Andaman",
    state: "Andaman & Nicobar, India",
    category: "ISLAND ESCAPE",
    rating: "4.9",
    price: "₹13,499",
    image:
      "https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=1600&q=90",
    text: "Crystal clear water, tropical islands and quiet beaches far away from the crowd.",
    highlights: ["Islands", "Scuba Diving", "Beaches"],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Destinations = () => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");

  const current = destinations[active];

  /* =======================================================
     SEARCH
  ======================================================= */

  const filtered = destinations.filter((item) =>
    `${item.name} ${item.state} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =======================================================
     SELECT DESTINATION
  ======================================================= */

  const selectDestination = (id) => {
    const index = destinations.findIndex(
      (destination) => destination.id === id
    );

    if (index !== -1) {
      setActive(index);
    }
  };

  /* =======================================================
     PAUSE / RESUME MOVING INDEX
  ======================================================= */

  const pauseMovement = (e) => {
    const moving = e.currentTarget.querySelector(
      ".atlas-selector-moving"
    );

    if (moving) {
      moving.style.animationPlayState = "paused";
    }
  };

  const resumeMovement = (e) => {
    const moving = e.currentTarget.querySelector(
      ".atlas-selector-moving"
    );

    if (moving) {
      moving.style.animationPlayState = "running";
    }
  };

  return (
    <main className="atlas-page">

      {/* =====================================================
          TOP INTRO
      ===================================================== */}

      <section className="atlas-intro">

        <div className="atlas-intro-left">

          <span className="atlas-kicker">
            AI TRIP / DESTINATIONS
          </span>

          <h1>
            The world
            <br />
            is <em>waiting.</em>
          </h1>

        </div>

        <div className="atlas-intro-right">

          <p>
            A collection of places worth leaving home for.
            Discover destinations by feeling, not just by map.
          </p>

          <div className="atlas-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Find a destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          DESTINATION SELECTOR
      ===================================================== */}

      <section className="atlas-selector">

        <div className="atlas-selector-head">

          <span>
            DESTINATION INDEX
          </span>

          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(destinations.length).padStart(2, "0")}
          </span>

        </div>


        {/* MOVING TRACK */}

        <div
          className="atlas-selector-track"
          onMouseEnter={pauseMovement}
          onMouseLeave={resumeMovement}
          onMouseDown={pauseMovement}
          onMouseUp={resumeMovement}
          onTouchStart={pauseMovement}
          onTouchEnd={resumeMovement}
        >

          <div className="atlas-selector-moving">

            {/* FIRST SET */}

            {destinations.map((item) => (

              <button
                key={`first-${item.id}`}
                type="button"
                className={
                  active ===
                  destinations.findIndex(
                    (destination) =>
                      destination.id === item.id
                  )
                    ? "atlas-place active"
                    : "atlas-place"
                }
                onClick={() =>
                  selectDestination(item.id)
                }
              >

                <strong>
                  {item.name}
                </strong>

              </button>

            ))}


            {/* DUPLICATE SET FOR CONTINUOUS LOOP */}

            {destinations.map((item) => (

              <button
                key={`second-${item.id}`}
                type="button"
                className={
                  active ===
                  destinations.findIndex(
                    (destination) =>
                      destination.id === item.id
                  )
                    ? "atlas-place active"
                    : "atlas-place"
                }
                onClick={() =>
                  selectDestination(item.id)
                }
              >

                <strong>
                  {item.name}
                </strong>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED DESTINATION
      ===================================================== */}

      <section className="atlas-feature">

        <div className="atlas-feature-image">

          <img
            src={current.image}
            alt={current.name}
          />

          <span className="atlas-image-number">
            {current.number}
          </span>

        </div>


        <div className="atlas-feature-content">

          <div className="atlas-feature-top">

            <span>
              {current.category}
            </span>

            <div>
              <FiStar />
              {current.rating}
            </div>

          </div>


          <h2>
            {current.name}
          </h2>


          <div className="atlas-location">

            <FiMapPin />

            {current.state}

          </div>


          <p>
            {current.text}
          </p>


          <div className="atlas-highlights">

            {current.highlights.map((item) => (

              <span key={item}>
                {item}
              </span>

            ))}

          </div>


          <div className="atlas-feature-bottom">

            <div>

              <small>
                STARTING FROM
              </small>

              <strong>
                {current.price}
              </strong>

            </div>


            <Link
              to={`/destination/${current.id}`}
              className="atlas-details"
            >

              Discover place

              <span>
                <FiArrowUpRight />
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          ALL DESTINATIONS
      ===================================================== */}

      <section className="atlas-all">

        <div className="atlas-all-heading">

          <div>

            <span>
              THE COLLECTION
            </span>

            <h2>
              More places,
            
              more stories.
            </h2>

          </div>


          <p>
            Eight different moods. Eight different ways to
            experience India.
          </p>

        </div>


        <div className="atlas-list">

          {destinations.map((item, index) => (

            <Link
              to={`/destination/${item.id}`}
              className={`atlas-list-item ${
                index % 2 !== 0
                  ? "reverse"
                  : ""
              }`}
              key={item.id}
            >

              <div className="atlas-list-number">
                {item.number}
              </div>


              <div className="atlas-list-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

              </div>


              <div className="atlas-list-info">

                <span>
                  {item.category}
                </span>


                <h3>
                  {item.name}
                </h3>


                <div className="atlas-list-location">

                  <FiMapPin />

                  {item.state}

                </div>


                <p>
                  {item.text}
                </p>


                <div className="atlas-list-arrow">

                  Explore

                  <FiArrowUpRight />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
};

export default Destinations;