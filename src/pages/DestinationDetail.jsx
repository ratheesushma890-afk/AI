
import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiHeart,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";

import "./DestinationDetail.css";


/* =========================================================
   DESTINATION DATA
========================================================= */

const destinations = [

  /* =======================================================
     GOA
  ======================================================= */

  {
    id: "goa",
    name: "Goa",
    state: "Goa, India",

    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=90",

    category: "Beach",
    rating: "4.9",
    reviews: "2,480",
    price: "₹8,999",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "Golden beaches, colourful streets, beautiful sunsets and slow mornings. Goa is the perfect escape when you want a little adventure mixed with relaxation.",

    experiences: [
      "Sunset at Vagator Beach",
      "Explore Old Goa",
      "Beach hopping",
      "Local Goan food",
      "River cruise",
      "Night markets",
    ],

    places: [
      {
        name: "Baga Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Old Goa",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Vagator",
        image:
          "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },


  /* =======================================================
     MANALI
  ======================================================= */

  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh, India",

    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=90",

    category: "Mountains",
    rating: "4.8",
    reviews: "1,920",
    price: "₹7,499",
    days: "4 Days / 3 Nights",
    bestTime: "October – June",

    description:
      "Surrounded by pine forests and dramatic Himalayan peaks, Manali is made for mountain lovers, peaceful mornings and unforgettable road trips.",

    experiences: [
      "Solang Valley",
      "Rohtang Pass",
      "Old Manali cafés",
      "Mountain trekking",
      "River rafting",
      "Himalayan sunset",
    ],

    places: [
      {
        name: "Solang Valley",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Old Manali",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Himalayas",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },


  /* =======================================================
     JAIPUR
  ======================================================= */

  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan, India",

    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=90",

    category: "Heritage",
    rating: "4.8",
    reviews: "1,760",
    price: "₹6,999",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "The Pink City brings together grand palaces, colourful markets, royal architecture and some of the most beautiful heritage experiences in India.",

    experiences: [
      "Amber Fort",
      "City Palace",
      "Hawa Mahal",
      "Local bazaar walk",
      "Rajasthani cuisine",
      "Sunset at Nahargarh",
    ],

    places: [
      {
        name: "Amber Fort",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Hawa Mahal",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },


  /* =======================================================
     KERALA
  ======================================================= */

  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala, India",

    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=90",

    category: "Nature",
    rating: "4.9",
    reviews: "2,110",
    price: "₹10,499",
    days: "5 Days / 4 Nights",
    bestTime: "September – March",

    description:
      "Discover peaceful backwaters, lush greenery, tropical beaches and slow moments that make Kerala one of India's most beautiful escapes.",

    experiences: [
      "Alleppey houseboat",
      "Munnar tea gardens",
      "Kathakali show",
      "Backwater cruise",
      "Ayurvedic experience",
      "Kerala cuisine",
    ],

    places: [
      {
        name: "Alleppey",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Munnar",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Kovalam",
        image:
          "https://images.unsplash.com/photo-1602303644390-8f2a6f5c9f9e?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },


  /* =======================================================
     RISHIKESH
  ======================================================= */

  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand, India",

    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=90",

    category: "Adventure",
    rating: "4.7",
    reviews: "1,540",
    price: "₹5,999",
    days: "3 Days / 2 Nights",
    bestTime: "September – June",

    description:
      "From thrilling river adventures to peaceful riverside evenings, Rishikesh is where nature, adventure and soulful travel come together.",

    experiences: [
      "River rafting",
      "Ganga Aarti",
      "Bungee jumping",
      "Yoga sessions",
      "Mountain trekking",
      "Café hopping",
    ],

    places: [
      {
        name: "Laxman Jhula",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Ganga River",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Himalayan Trails",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },


  /* =======================================================
     UDAIPUR
  ======================================================= */

  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan, India",

    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1800&q=90",

    category: "Romantic",
    rating: "4.8",
    reviews: "1,330",
    price: "₹8,499",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "Beautiful lakes, grand palaces and golden sunsets make Udaipur one of India's most romantic destinations.",

    experiences: [
      "Lake Pichola boat ride",
      "City Palace",
      "Sunset dinner",
      "Heritage walk",
      "Local shopping",
      "Rooftop cafés",
    ],

    places: [
      {
        name: "Lake Pichola",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=90",
      },

      {
        name: "Udaipur Sunset",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=90",
      },
    ],
  },
];


/* =========================================================
   DESTINATION DETAIL PAGE
========================================================= */

const DestinationDetail = () => {

  const { id } = useParams();

  /* =======================================================
     WISHLIST CONTEXT
  ======================================================= */

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();


  /* =======================================================
     FIND DESTINATION
  ======================================================= */

  const destination = destinations.find(
    (item) => item.id === id
  );


  /* =======================================================
     DESTINATION NOT FOUND
  ======================================================= */

  if (!destination) {

    return (
      <main className="destination-not-found">

        <div className="not-found-content">

          <span className="not-found-number">
            404
          </span>

          <h1>
            Destination not found
          </h1>

          <p>
            We couldn't find the destination
            you're looking for.
          </p>

          <Link
            to="/explore"
            className="not-found-btn"
          >
            <span>
              Back to Explore
            </span>

            <FiArrowUpRight />

          </Link>

        </div>

      </main>
    );
  }


  /* =======================================================
     WISHLIST STATE
  ======================================================= */

  const liked = isWishlisted(destination.id);


  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <main className="destination-detail">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="detail-hero">

        <img
          src={destination.image}
          alt={destination.name}
          className="detail-hero-image"
        />

        <div className="detail-hero-overlay" />


        {/* TOP */}

        <div className="detail-hero-top">

          <Link
            to="/explore"
            className="back-explore"
          >
            <FiArrowLeft />

            <span>
              Back to Explore
            </span>
          </Link>


          {/* ================= WISHLIST BUTTON ================= */}

          <button
            type="button"
            className={`detail-heart ${
              liked ? "liked" : ""
            }`}
            onClick={() =>
              toggleWishlist(destination)
            }
            aria-label={
              liked
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >

            <FiHeart />

          </button>

        </div>


        {/* HERO CONTENT */}

        <div className="detail-hero-content">

          <span className="detail-category">
            {destination.category}
          </span>

          <h1>
            {destination.name}
          </h1>

          <div className="detail-location">

            <FiMapPin />

            <span>
              {destination.state}
            </span>

          </div>

          <p>
            {destination.description}
          </p>

        </div>


        {/* RATING */}

        <div className="hero-rating">

          <FiStar />

          <strong>
            {destination.rating}
          </strong>

          <span>
            {destination.reviews} travellers
          </span>

        </div>

      </section>


      {/* =====================================================
          QUICK INFORMATION
      ===================================================== */}

      <section className="quick-info">


        <div className="quick-item">

          <div className="quick-icon">
            <FiClock />
          </div>

          <div>

            <small>
              DURATION
            </small>

            <strong>
              {destination.days}
            </strong>

          </div>

        </div>


        <div className="quick-item">

          <div className="quick-icon">
            <FiCalendar />
          </div>

          <div>

            <small>
              BEST TIME
            </small>

            <strong>
              {destination.bestTime}
            </strong>

          </div>

        </div>


        <div className="quick-item">

          <div className="quick-icon">
            <FiUsers />
          </div>

          <div>

            <small>
              TRAVEL STYLE
            </small>

            <strong>
              Couples · Friends · Family
            </strong>

          </div>

        </div>


        <div className="quick-item">

          <div className="quick-icon">
            <FiStar />
          </div>

          <div>

            <small>
              RATING
            </small>

            <strong>
              {destination.rating} / 5
            </strong>

          </div>

        </div>


      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="detail-main">


        {/* LEFT */}

        <div className="detail-left">


          {/* =================================================
              ABOUT
          ================================================= */}

          <section className="detail-section">

            <span className="detail-label">
              ABOUT THE DESTINATION
            </span>

            <h2>
              A place you'll
              
              remember.
            </h2>

            <p className="detail-description">
              {destination.description}
            </p>

            <p className="detail-description">

              Whether you're looking for peaceful
              mornings, exciting adventures,
              beautiful food or simply some time
              away from your routine,{" "}

              <strong>
                {destination.name}
              </strong>{" "}

              gives you plenty of reasons to slow
              down and enjoy the journey.

            </p>

          </section>


          {/* =================================================
              EXPERIENCES
          ================================================= */}

          <section className="detail-section">

            <span className="detail-label">
              DON'T MISS
            </span>

            <h2>
              Experiences worth
              
              having.
            </h2>

            <div className="experience-grid">

              {destination.experiences.map(
                (experience) => (

                  <div
                    className="experience-item"
                    key={experience}
                  >

                    <span className="experience-check">
                      <FiCheck />
                    </span>

                    <span>
                      {experience}
                    </span>

                  </div>

                )
              )}

            </div>

          </section>


          {/* =================================================
              PLACES
          ================================================= */}
{/* ================================================= 
    PLACES
================================================= */}

<section className="detail-section places-section">

  <span className="detail-label">
    PLACES TO EXPLORE
  </span>

  <h2>
    See more of{" "}
    {destination.name}.
  </h2>

  <div className="places-grid">

    {destination.places.map((place) => {

      const placeId = place.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      return (

        <Link
          key={place.name}
          to={`/place/${destination.id}/${placeId}`}
          className="place-card"
        >

          <img
            src={place.image}
            alt={place.name}
          />

          <div className="place-overlay" />

          <div className="place-content">

            <span>
              EXPLORE <FiArrowUpRight />
            </span>

            <h3>
              {place.name}
            </h3>

          </div>

        </Link>

      );

    })}

  </div>

</section>

        </div>


        {/* =================================================
            BOOKING CARD
        ================================================= */}

<aside className="booking-card">

  <div className="booking-card-top">
    <span>PLAN YOUR JOURNEY</span>

    <strong>
      Explore {destination.name}
    </strong>

    <small>
      Create your perfect travel experience
    </small>
  </div>

  <div className="booking-divider" />

  {/* TRAVEL STYLE */}

  <div className="booking-row">

    <div>
      <small>TRAVEL STYLE</small>

      <strong>
        Couples · Friends · Family
      </strong>
    </div>

    <FiUsers />

  </div>


  {/* DESTINATION */}

  <div className="booking-row">

    <div>
      <small>DESTINATION</small>

      <strong>
        {destination.name}
      </strong>
    </div>

    <FiMapPin />

  </div>


  {/* BUTTON */}
<Link
  to="/trip-plan"
  state={{
    destination: destination.name,
  }}
  className="plan-trip-btn"
>
  <span>Plan this trip</span>
  <FiArrowUpRight />
</Link>
  {/* SECOND BUTTON */}

  <Link
    to="/explore"
    className="extra-trip-btn"
  >
    <span>
      Explore More Destinations
    </span>

    <FiArrowUpRight />
  </Link>


  <p className="booking-note">
    ✦ Build a personalised trip based on your interests and travel style.
  </p>

</aside>

      </section>



    </main>
  );
};


export default DestinationDetail;

