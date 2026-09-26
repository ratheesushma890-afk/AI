import React, {
  useEffect,
  useRef,
  useState,
} from "react";

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
    id: "goa",
    number: "01",
    name: "Goa",
    state: "Goa, India",
    category: "BEACH ESCAPE",
    rating: "4.9",
    price: "₹8,999",

    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",

    text:
      "A place for golden sunsets, quiet mornings and endless coastal roads.",

    highlights: [
      "Beaches",
      "Sunsets",
      "Nightlife",
    ],

    places: [
      "Baga Beach",
      "Calangute Beach",
      "Anjuna",
      "Fort Aguada",
    ],
  },

  {
    id: "mumbai",
    number: "02",
    name: "Mumbai",
    state: "Maharashtra, India",
    category: "CITY ESCAPE",
    rating: "4.8",
    price: "₹7,999",

    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=90",

    text:
      "A city of sea views, iconic landmarks, vibrant streets and unforgettable experiences.",

    highlights: [
      "Marine Drive",
      "Beaches",
      "City Life",
    ],

    places: [
      "Gateway of India",
      "Marine Drive",
      "Colaba",
      "Elephanta Caves",
    ],
  },

  {
    id: "udaipur",
    number: "03",
    name: "Udaipur",
    state: "Rajasthan, India",
    category: "ROMANTIC INDIA",
    rating: "4.8",
    price: "₹8,499",

    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1600&q=90",

    text:
      "Lakeside palaces, soft evenings and one of India's most beautiful skylines.",

    highlights: [
      "Lakes",
      "Palaces",
      "Sunsets",
    ],

    places: [
      "Lake Pichola",
      "City Palace",
      "Jag Mandir",
      "Sajjangarh Palace",
    ],
  },

  {
    id: "agra",
    number: "04",
    name: "Agra",
    state: "Uttar Pradesh, India",
    category: "HERITAGE ESCAPE",
    rating: "4.9",
    price: "₹6,999",

    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=90",

    text:
      "A timeless city of grand Mughal architecture, romantic sunsets and the unforgettable beauty of the Taj Mahal.",

    highlights: [
      "Taj Mahal",
      "Forts",
      "Mughal Culture",
    ],

    places: [
      "Taj Mahal",
      "Agra Fort",
      "Mehtab Bagh",
      "Itmad-ud-Daulah",
      "Akbar's Tomb",
      "Kinari Bazaar",
    ],
  },

  {
    id: "manali",
    number: "05",
    name: "Manali",
    state: "Himachal Pradesh, India",
    category: "MOUNTAIN ESCAPE",
    rating: "4.8",
    price: "₹7,499",

    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=90",

    text:
      "Snowy peaks, pine forests and peaceful valleys make every day feel slower.",

    highlights: [
      "Mountains",
      "Snow",
      "Valleys",
    ],

    places: [
      "Solang Valley",
      "Rohtang Pass",
      "Hadimba Temple",
      "Old Manali",
    ],
  },

  {
    id: "jaipur",
    number: "06",
    name: "Jaipur",
    state: "Rajasthan, India",
    category: "ROYAL INDIA",
    rating: "4.8",
    price: "₹6,999",

    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",

    text:
      "Walk through royal courtyards, ancient forts and streets filled with colour.",

    highlights: [
      "Forts",
      "Culture",
      "Food",
    ],

    places: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Jantar Mantar",
    ],
  },

  {
    id: "kerala",
    number: "07",
    name: "Kerala",
    state: "Kerala, India",
    category: "SLOW TRAVEL",
    rating: "4.9",
    price: "₹10,499",

    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",

    text:
      "Green backwaters, tropical landscapes and days designed for doing nothing.",

    highlights: [
      "Backwaters",
      "Nature",
      "Wellness",
    ],

    places: [
      "Alleppey",
      "Munnar",
      "Kochi",
      "Varkala",
    ],
  },

  {
    id: "rishikesh",
    number: "08",
    name: "Rishikesh",
    state: "Uttarakhand, India",
    category: "ADVENTURE",
    rating: "4.7",
    price: "₹5,999",

    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=90",

    text:
      "Where the river meets the mountains and every turn brings a new adventure.",

    highlights: [
      "Rafting",
      "River",
      "Hiking",
    ],

    places: [
      "Laxman Jhula",
      "Ram Jhula",
      "River Rafting",
      "Neer Garh Waterfall",
    ],
  },
];


/* =========================================================
   NORMALIZE SEARCH TEXT
========================================================= */

const normalizeText = (value = "") => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};


/* =========================================================
   COMPONENT
========================================================= */

const Destinations = () => {
  const [active, setActive] = useState(0);

  const [search, setSearch] = useState("");

  const destinationRefs = useRef({});

  const current = destinations[active];


  /* =======================================================
     SEARCH DESTINATION AND SCROLL TO CARD

     IMPORTANT:
     Search sirf scroll karega.
     Cards filter/hide nahi honge.
  ======================================================= */

  useEffect(() => {
    const query = normalizeText(search);

    if (!query) {
      return;
    }

    const timer = setTimeout(() => {
      const foundDestination =
        destinations.find((item) => {
          const destinationName =
            normalizeText(item.name);

          const destinationId =
            normalizeText(item.id);

          /*
            Example:
            g
            go
            goa

            tino Goa ko match kar sakte hain.
          */

          return (
            destinationName.startsWith(query) ||
            destinationId.startsWith(query)
          );
        });


      /*
        Galat naam hai to kuch nahi hoga.
      */

      if (!foundDestination) {
        return;
      }


      /*
        Matching destination ka card find karo.
      */

      const destinationElement =
        destinationRefs.current[
          foundDestination.id
        ];


      /*
        Smooth scroll to card/image.
      */

      if (destinationElement) {
        destinationElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 500);


    return () => {
      clearTimeout(timer);
    };

  }, [search]);


  /* =======================================================
     SELECT FEATURED DESTINATION
  ======================================================= */

  const selectDestination = (id) => {
    const index =
      destinations.findIndex(
        (item) => item.id === id
      );

    if (index === -1) {
      return;
    }

    setActive(index);

    /*
      Featured selector click par search clear.
    */

    setSearch("");


    /*
      Featured card par smooth scroll.
    */

    setTimeout(() => {
      const feature =
        document.querySelector(
          ".atlas-feature"
        );

      if (feature) {
        feature.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };


  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const clearSearch = () => {
    setSearch("");
  };


  /* =======================================================
     PAUSE MOVING SELECTOR
  ======================================================= */

  const pauseMovement = (e) => {
    const moving =
      e.currentTarget.querySelector(
        ".atlas-selector-moving"
      );

    if (moving) {
      moving.style.animationPlayState =
        "paused";
    }
  };


  /* =======================================================
     RESUME MOVING SELECTOR
  ======================================================= */

  const resumeMovement = (e) => {
    const moving =
      e.currentTarget.querySelector(
        ".atlas-selector-moving"
      );

    if (moving) {
      moving.style.animationPlayState =
        "running";
    }
  };


  /* =======================================================
     JSX
  ======================================================= */

  return (
    <main className="atlas-page">

      {/* ===================================================
          INTRO SECTION
      =================================================== */}

      <section className="atlas-intro">

        {/* LEFT */}

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


        {/* RIGHT */}

        <div className="atlas-intro-right">

          <p>
            A collection of places worth leaving
            home for. Discover destinations by
            feeling, not just by map.
          </p>


          {/* =============================================
              SEARCH
          ============================================= */}

          <div className="atlas-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search Goa, Mumbai, Jaipur..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              autoComplete="off"
              aria-label="Search destination"
            />


            {search && (
              <button
                type="button"
                className="atlas-search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

        </div>

      </section>


      {/* ===================================================
          MOVING DESTINATION SELECTOR
      =================================================== */}

      <section className="atlas-selector">

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

            {/* ===========================================
                FIRST DESTINATION SET
            =========================================== */}

            {destinations.map(
              (item, index) => (

                <button
                  key={`first-${item.id}`}
                  type="button"

                  className={
                    active === index
                      ? "atlas-place active"
                      : "atlas-place"
                  }

                  onClick={() =>
                    selectDestination(
                      item.id
                    )
                  }
                >

                  <span className="atlas-place-dot" />

                  <strong>
                    {item.name}
                  </strong>

                </button>
              )
            )}


            {/* ===========================================
                SECOND DESTINATION SET
            =========================================== */}

            {destinations.map(
              (item, index) => (

                <button
                  key={`second-${item.id}`}
                  type="button"

                  className={
                    active === index
                      ? "atlas-place active"
                      : "atlas-place"
                  }

                  onClick={() =>
                    selectDestination(
                      item.id
                    )
                  }
                >

                  <span className="atlas-place-dot" />

                  <strong>
                    {item.name}
                  </strong>

                </button>
              )
            )}

          </div>

        </div>

      </section>


      {/* ===================================================
          FEATURED DESTINATION
      =================================================== */}

      <section className="atlas-feature">

        {/* =============================================
            FEATURE IMAGE
        ============================================= */}

        <div className="atlas-feature-image">

          <img
            src={current.image}
            alt={current.name}
          />

          <div className="atlas-image-overlay" />


          <span className="atlas-image-number">
            {current.number}
          </span>


          <div className="atlas-image-label">
            FEATURED DESTINATION
          </div>

        </div>


        {/* =============================================
            FEATURE CONTENT
        ============================================= */}

        <div className="atlas-feature-content">

          <div className="atlas-feature-top">

            <span className="atlas-feature-category">
              {current.category}
            </span>


            <div className="atlas-rating">

              <FiStar />

              <span>
                {current.rating}
              </span>

            </div>

          </div>


          <h2>
            {current.name}
          </h2>


          <div className="atlas-location">

            <FiMapPin />

            <span>
              {current.state}
            </span>

          </div>


          <p className="atlas-feature-description">
            {current.text}
          </p>


          {/* =============================================
              HIGHLIGHTS
          ============================================= */}

          <div className="atlas-highlights">

            {current.highlights.map(
              (highlight) => (

                <span key={highlight}>
                  {highlight}
                </span>

              )
            )}

          </div>


          {/* =============================================
              FEATURE BUTTON
          ============================================= */}

          <div className="atlas-feature-bottom">

            <div className="atlas-price" />


            <Link
              to={`/destination/${current.id}`}
              className="atlas-details"
            >

              <span>
                Discover place
              </span>

              <span className="atlas-details-icon">
                <FiArrowUpRight />
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* ===================================================
          ALL DESTINATIONS
      =================================================== */}

      <section className="atlas-all">

        {/* =============================================
            SECTION HEADING
        ============================================= */}

        <div className="atlas-all-heading">

          <div>

            <span className="atlas-kicker">
              EXPLORE MORE
            </span>

            <h2>
              Find your next{" "}
              <em>escape.</em>
            </h2>

          </div>


          <p>
            Explore handpicked destinations and
            discover places that match the way
            you want to travel.
          </p>

        </div>


        {/* =================================================
            IMPORTANT

            YAHAN SEARCH FILTER NAHI HAI.

            Hamesha destinations.map() chalega.
            Isliye saare cards visible rahenge.
        ================================================= */}

        <div className="atlas-list">

          {destinations.map(
            (item, index) => (

              <div
                key={item.id}

                ref={(element) => {
                  destinationRefs.current[
                    item.id
                  ] = element;
                }}
              >

                <Link
                  to={`/destination/${item.id}`}

                  className={`atlas-list-item ${
                    index % 2 !== 0
                      ? "reverse"
                      : ""
                  }`}
                >

                  {/* =====================================
                      NUMBER
                  ===================================== */}

                  <div className="atlas-list-number">
                    {item.number}
                  </div>


                  {/* =====================================
                      IMAGE
                  ===================================== */}

                  <div className="atlas-list-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="atlas-list-image-overlay" />

                  </div>


                  {/* =====================================
                      DESTINATION INFO
                  ===================================== */}

                  <div className="atlas-list-info">

                    <span className="atlas-list-category">
                      {item.category}
                    </span>


                    <h3>
                      {item.name}
                    </h3>


                    <div className="atlas-list-location">

                      <FiMapPin />

                      <span>
                        {item.state}
                      </span>

                    </div>


                    <p>
                      {item.text}
                    </p>


                    {/* =================================
                        HIGHLIGHTS
                    ================================= */}

                    <div className="atlas-list-highlights">

                      {(item.highlights || [])
                        .slice(0, 3)
                        .map(
                          (highlight) => (

                            <span key={highlight}>
                              {highlight}
                            </span>

                          )
                        )}

                    </div>


                    {/* =================================
                        EXPLORE
                    ================================= */}

                    <div className="atlas-list-arrow">

                      <span>
                        Explore destination
                      </span>

                      <div>
                        <FiArrowUpRight />
                      </div>

                    </div>

                  </div>

                </Link>

              </div>

            )
          )}

        </div>

      </section>

    </main>
  );
};

export default Destinations;