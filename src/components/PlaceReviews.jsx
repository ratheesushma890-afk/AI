import React, { useMemo, useState } from "react";

import {
  FiArrowUpRight,
  FiMapPin,
  FiPlay,
  FiStar,
} from "react-icons/fi";

import destinations from "../Data/destinations";

import "./PlaceReviews.css";

/* =========================================================
   REVIEWS DATA

   VIDEO YAHAN NAHI HAI.
   Video automatically destinations.js se aayegi.
========================================================= */

const reviewsData = {
  Goa: {
    number: "01",
    label: "Beaches & Sunsets",

    rating: "4.9",
    totalReviews: "2,480",

    title: "Golden days by the sea",

    reviews: [
      {
        id: 1,
        name: "Aarav Sharma",
        initials: "AS",
        rating: 5,
        date: "September 2026",
        text:
          "Goa was absolutely beautiful. The beaches, sunsets and evening atmosphere made our trip unforgettable.",
      },
      {
        id: 2,
        name: "Priya Verma",
        initials: "PV",
        rating: 5,
        date: "August 2026",
        text:
          "We loved the peaceful mornings and lively evenings. It was a perfect family getaway.",
      },
      {
        id: 3,
        name: "Rahul Mehta",
        initials: "RM",
        rating: 4,
        date: "July 2026",
        text:
          "A beautiful destination with plenty of places to explore and amazing coastal views.",
      },
    ],
  },

  Manali: {
    number: "02",
    label: "Snow & Mountains",

    rating: "4.8",
    totalReviews: "3,120",

    title: "Where mountains feel closer",

    reviews: [
      {
        id: 1,
        name: "Ananya Singh",
        initials: "AS",
        rating: 5,
        date: "September 2026",
        text:
          "The mountain views were incredible. Solang Valley was definitely the highlight of our trip.",
      },
      {
        id: 2,
        name: "Mohit Kumar",
        initials: "MK",
        rating: 5,
        date: "August 2026",
        text:
          "Perfect weather, beautiful scenery and lots of adventure activities. We loved Manali.",
      },
      {
        id: 3,
        name: "Sneha Kapoor",
        initials: "SK",
        rating: 4,
        date: "July 2026",
        text:
          "A peaceful destination with beautiful roads, cafes and mountain views everywhere.",
      },
    ],
  },

  Jaipur: {
    number: "03",
    label: "Heritage & Culture",

    rating: "4.9",
    totalReviews: "4,260",

    title: "Stories behind every wall",

    reviews: [
      {
        id: 1,
        name: "Sakshi Jain",
        initials: "SJ",
        rating: 5,
        date: "September 2026",
        text:
          "Amber Fort was stunning. Jaipur has so much history and beautiful architecture to explore.",
      },
      {
        id: 2,
        name: "Aditya Singh",
        initials: "AD",
        rating: 5,
        date: "August 2026",
        text:
          "The forts, local food and colourful markets made Jaipur one of my favourite trips.",
      },
      {
        id: 3,
        name: "Nikita Sharma",
        initials: "NS",
        rating: 5,
        date: "July 2026",
        text:
          "A beautiful cultural experience. Every place had something different to see.",
      },
    ],
  },

  Kerala: {
    number: "04",
    label: "Nature & Backwaters",

    rating: "4.8",
    totalReviews: "2,740",

    title: "Slow days surrounded by nature",

    reviews: [
      {
        id: 1,
        name: "Riya Mehta",
        initials: "RM",
        rating: 5,
        date: "September 2026",
        text:
          "The backwaters were peaceful and beautiful. Kerala was exactly the relaxing trip we wanted.",
      },
      {
        id: 2,
        name: "Karan Arora",
        initials: "KA",
        rating: 5,
        date: "August 2026",
        text:
          "Munnar was stunning and the whole journey felt calm and refreshing.",
      },
      {
        id: 3,
        name: "Neha Verma",
        initials: "NV",
        rating: 4,
        date: "July 2026",
        text:
          "Beautiful scenery, good food and a very peaceful travel experience.",
      },
    ],
  },

  Rishikesh: {
    number: "05",
    label: "River & Adventure",

    rating: "4.8",
    totalReviews: "2,150",

    title: "Adventure beside the Ganges",

    reviews: [
      {
        id: 1,
        name: "Kunal Sharma",
        initials: "KS",
        rating: 5,
        date: "September 2026",
        text:
          "River rafting was an amazing experience and the evening atmosphere near the Ganga was beautiful.",
      },
      {
        id: 2,
        name: "Megha Jain",
        initials: "MJ",
        rating: 5,
        date: "August 2026",
        text:
          "Rishikesh felt peaceful and adventurous at the same time. We really enjoyed our trip.",
      },
      {
        id: 3,
        name: "Rohit Singh",
        initials: "RS",
        rating: 4,
        date: "July 2026",
        text:
          "Beautiful mountain views, cafes and plenty of outdoor activities.",
      },
    ],
  },

  Delhi: {
    number: "06",
    label: "History & City Life",

    rating: "4.7",
    totalReviews: "3,840",

    title: "Old stories, new energy",

    reviews: [
      {
        id: 1,
        name: "Pooja Verma",
        initials: "PV",
        rating: 5,
        date: "September 2026",
        text:
          "Delhi has an amazing mix of monuments, markets and food. India Gate looked beautiful in the evening.",
      },
      {
        id: 2,
        name: "Akash Mehta",
        initials: "AM",
        rating: 4,
        date: "August 2026",
        text:
          "We explored Red Fort and Qutub Minar and enjoyed the local street food.",
      },
      {
        id: 3,
        name: "Simran Kaur",
        initials: "SK",
        rating: 5,
        date: "July 2026",
        text:
          "A busy but exciting city with so much history and culture to explore.",
      },
    ],
  },

  Mumbai: {
    number: "07",
    label: "City & Coast",

    rating: "4.8",
    totalReviews: "3,420",

    title: "City lights beside the sea",

    reviews: [
      {
        id: 1,
        name: "Rohan Kapoor",
        initials: "RK",
        rating: 5,
        date: "September 2026",
        text:
          "Marine Drive at sunset was beautiful. Mumbai has such an energetic atmosphere.",
      },
      {
        id: 2,
        name: "Anjali Sharma",
        initials: "AS",
        rating: 5,
        date: "August 2026",
        text:
          "Gateway of India and the coastline were the highlights of our Mumbai trip.",
      },
      {
        id: 3,
        name: "Vikas Jain",
        initials: "VJ",
        rating: 4,
        date: "July 2026",
        text:
          "Great food, busy streets and beautiful evening views near the sea.",
      },
    ],
  },

  Agra: {
    number: "08",
    label: "Mughal Heritage",

    rating: "4.9",
    totalReviews: "4,820",

    title: "A timeless symbol of love",

    reviews: [
      {
        id: 1,
        name: "Neha Gupta",
        initials: "NG",
        rating: 5,
        date: "September 2026",
        text:
          "Seeing the Taj Mahal in person was unforgettable. The architecture is absolutely beautiful.",
      },
      {
        id: 2,
        name: "Arjun Singh",
        initials: "AS",
        rating: 5,
        date: "August 2026",
        text:
          "Agra Fort and Taj Mahal made the trip special. There is so much history here.",
      },
      {
        id: 3,
        name: "Ritika Jain",
        initials: "RJ",
        rating: 5,
        date: "July 2026",
        text:
          "The early morning Taj Mahal view was one of the best moments of our journey.",
      },
    ],
  },

  Uttarakhand: {
    number: "09",
    label: "Hills & Nature",

    rating: "4.8",
    totalReviews: "2,960",

    title: "Escape into the Himalayas",

    reviews: [
      {
        id: 1,
        name: "Aditi Sharma",
        initials: "AS",
        rating: 5,
        date: "September 2026",
        text:
          "The mountain scenery was incredible. Uttarakhand was peaceful and refreshing.",
      },
      {
        id: 2,
        name: "Karan Singh",
        initials: "KS",
        rating: 5,
        date: "August 2026",
        text:
          "Beautiful weather, green mountains and plenty of peaceful places to explore.",
      },
      {
        id: 3,
        name: "Ishita Verma",
        initials: "IV",
        rating: 4,
        date: "July 2026",
        text:
          "A wonderful destination when you want nature, mountains and a relaxing trip.",
      },
    ],
  },

  Udaipur: {
    number: "10",
    label: "Lakes & Royalty",

    rating: "4.9",
    totalReviews: "3,280",

    title: "Royal evenings by the lake",

    reviews: [
      {
        id: 1,
        name: "Sanya Kapoor",
        initials: "SK",
        rating: 5,
        date: "September 2026",
        text:
          "Lake Pichola at sunset was absolutely beautiful. Udaipur felt peaceful and romantic.",
      },
      {
        id: 2,
        name: "Rahul Jain",
        initials: "RJ",
        rating: 5,
        date: "August 2026",
        text:
          "City Palace was amazing and the lake views made our trip very special.",
      },
      {
        id: 3,
        name: "Mehak Sharma",
        initials: "MS",
        rating: 5,
        date: "July 2026",
        text:
          "Beautiful palaces, lakes and heritage streets. Udaipur is perfect for photography.",
      },
    ],
  },
};

/* =========================================================
   COMPONENT
========================================================= */

const PlaceReviews = () => {
  const reviewDestinations = Object.keys(reviewsData);

  const [selectedDestination, setSelectedDestination] =
    useState("Goa");

  /* =========================================================
     CURRENT REVIEW DATA
  ========================================================= */

  const reviewData = useMemo(() => {
    return reviewsData[selectedDestination];
  }, [selectedDestination]);

  /* =========================================================
     FIND DESTINATION FROM destinations.js

     Isse:
     - video
     - location
     - description

     destinations.js se automatically milenge.
  ========================================================= */

  const destinationData = useMemo(() => {
    return Object.values(destinations).find(
      (item) =>
        item?.name?.toLowerCase() ===
        selectedDestination.toLowerCase()
    );
  }, [selectedDestination]);

  /* =========================================================
     FINAL VALUES
  ========================================================= */

  const currentVideo =
    destinationData?.video || "";

  const currentLocation =
    destinationData?.location ||
    `${selectedDestination}, India`;

  const currentDescription =
    destinationData?.description ||
    "Discover this beautiful destination and its memorable travel experiences.";

  /* =========================================================
     STARS
  ========================================================= */

  const renderStars = (rating) => {
    const starRating = Math.round(
      Number(rating)
    );

    return Array.from({
      length: 5,
    }).map((_, index) => (
      <FiStar
        key={index}
        className={
          index < starRating
            ? "tr-star active"
            : "tr-star"
        }
      />
    ));
  };

  /* =========================================================
     CHANGE DESTINATION
  ========================================================= */

  const handleDestinationChange = (
    destination
  ) => {
    setSelectedDestination(destination);
  };

  return (
    <section className="tr-section">

      <div className="tr-container">

        {/* =================================================
            TOP HEADING
        ================================================= */}

        <div className="tr-top">

          <div>
            <span className="tr-eyebrow">
              TRAVELLER STORIES
            </span>

            <h2>
              See India through{" "}
              <em>their eyes.</em>
            </h2>
          </div>

          <p>
            Select a destination to watch
            its travel story and discover
            what travellers loved about
            their journey.
          </p>

        </div>

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="tr-main">

          {/* ===============================================
              LEFT DESTINATIONS
          =============================================== */}

          <aside className="tr-destinations">

            <div className="tr-side-title">

              <span>
                DESTINATIONS
              </span>

              <strong>
                Choose a story
              </strong>

            </div>

            <div className="tr-destination-list">

              {reviewDestinations.map(
                (destination) => {
                  const item =
                    reviewsData[destination];

                  const active =
                    selectedDestination ===
                    destination;

                  return (
                    <button
                      type="button"
                      key={destination}
                      className={
                        active
                          ? "tr-destination active"
                          : "tr-destination"
                      }
                      onClick={() =>
                        handleDestinationChange(
                          destination
                        )
                      }
                    >

                      {/* NUMBER */}

                      <span className="tr-number">
                        {item.number}
                      </span>

                      {/* NAME */}

                      <span className="tr-destination-text">

                        <strong>
                          {destination}
                        </strong>

                        <small>
                          {item.label}
                        </small>

                      </span>

                      {/* ARROW */}

                      <span className="tr-destination-arrow">
                        <FiArrowUpRight />
                      </span>

                    </button>
                  );
                }
              )}

            </div>

          </aside>

          {/* ===============================================
              CENTER VIDEO
          =============================================== */}

          <div className="tr-video-column">

            <div className="tr-video-card">

             

              {currentVideo ? (
                <video
                  key={`${selectedDestination}-${currentVideo}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source
                    src={currentVideo}
                    type="video/mp4"
                  />

                  Your browser does not
                  support the video tag.
                </video>
              ) : (
                <div className="tr-video-empty">
                  Video not available
                </div>
              )}

              {/* OVERLAY */}

              <div className="tr-video-shade" />

              {/* NOW PLAYING */}

              <div className="tr-live">
                <i />
                NOW PLAYING
              </div>

             

              {/* VIDEO TEXT */}

              <div className="tr-video-content">

                <span>
                  {reviewData.label}
                </span>

                <h3>
                  {reviewData.title}
                </h3>

                <p>
                  <FiMapPin />

                  {currentLocation}
                </p>

              </div>

            </div>

            {/* DESCRIPTION */}

            <p className="tr-video-description">
              {currentDescription}
            </p>

          </div>

          {/* ===============================================
              RIGHT REVIEWS
          =============================================== */}

          <aside className="tr-reviews">

            {/* =============================================
                REVIEW TOP
            ============================================= */}

            <div className="tr-rating">

              <div>

                <span>
                  TRAVELLER REVIEWS
                </span>

                <h3>
                  {selectedDestination}
                </h3>

              </div>

              {/* RATING */}

              <div className="tr-rating-score">

                <strong>
                  {reviewData.rating}
                </strong>

                <div>

                  <div className="tr-stars">
                    {renderStars(
                      reviewData.rating
                    )}
                  </div>

                  <small>
                    {
                      reviewData.totalReviews
                    }{" "}
                    reviews
                  </small>

                </div>

              </div>

            </div>

            {/* =============================================
                REVIEW CARDS
            ============================================= */}

            <div className="tr-review-list">

              {reviewData.reviews.map(
                (review) => (
                  <article
                    className="tr-review"
                    key={review.id}
                  >

                    {/* USER */}

                    <div className="tr-review-head">

                      <div className="tr-avatar">
                        {review.initials}
                      </div>

                      <div className="tr-person">

                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          {review.date}
                        </span>

                      </div>

                      {/* SCORE */}

                      <div className="tr-mini-rating">

                        <FiStar />

                        {review.rating}.0

                      </div>

                    </div>

                    {/* STARS */}

                    <div className="tr-small-stars">
                      {renderStars(
                        review.rating
                      )}
                    </div>

                    {/* TEXT */}

                    <p>
                      “{review.text}”
                    </p>

                  </article>
                )
              )}

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
};

export default PlaceReviews;