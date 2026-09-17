
import React from "react";
import { FiArrowUpRight, FiMapPin, FiStar } from "react-icons/fi";
import "./StayHighlights.css";

import hotelGoa from "../assets/hotelgoa.jpg";
import hotelManali from "../assets/hotelmanali.jpg";
import hotelJaipur from "../assets/hoteljaipur.jpg";

const stays = [
  {
    id: "01",
    name: "The Palm House",
    place: "North Goa",
    type: "Beach Resort",
    price: "₹4,800",
    rating: "4.8",
    image: hotelGoa,
  },
  {
    id: "02",
    name: "Mountain Nest",
    place: "Manali",
    type: "Mountain Stay",
    price: "₹3,600",
    rating: "4.7",
    image: hotelManali,
  },
  {
    id: "03",
    name: "The Pink Courtyard",
    place: "Jaipur",
    type: "Heritage Hotel",
    price: "₹4,200",
    rating: "4.9",
    image: hotelJaipur,
  },
];

const StayHighlights = () => {
  const featured = stays[0];

  return (
    <section className="stay-section">

      {/* Decorative background */}
      <div className="stay-glow stay-glow-one"></div>
      <div className="stay-glow stay-glow-two"></div>

      {/* Header */}
      <div className="stay-header">

        <div>
          <span className="stay-eyebrow">
            <span className="stay-line"></span>
            PLACES TO STAY
          </span>

          <h2>
            Sleep somewhere <em>worth remembering.</em>
            
            
          </h2>
        </div>

        <div className="stay-header-right">
         

          
        </div>

      </div>

      {/* Main layout */}
      <div className="stay-layout">

        {/* Featured hotel */}
        <div className="stay-featured">

          <img
            src={featured.image}
            alt={featured.name}
          />

          <div className="stay-featured-overlay"></div>

          <div className="stay-featured-top">
            <span className="stay-number">
              {featured.id}
            </span>

            <span className="stay-rating">
              <FiStar />
              {featured.rating}
            </span>
          </div>

          <div className="stay-featured-content">

            <span className="stay-type">
              {featured.type}
            </span>

            <h3>{featured.name}</h3>

            <div className="stay-location">
              <FiMapPin />
              {featured.place}
            </div>

            <div className="stay-bottom">

              <div>
                <small>FROM</small>
                <strong>{featured.price}</strong>
                <span>/ night</span>
              </div>

              

            </div>

          </div>

        </div>

        {/* Side hotels */}
        <div className="stay-side">

          {stays.slice(1).map((stay) => (
            <article
              className="stay-card"
              key={stay.id}
            >

              <div className="stay-card-image">
                <img
                  src={stay.image}
                  alt={stay.name}
                />

                <span className="stay-card-number">
                  {stay.id}
                </span>

                <span className="stay-card-rating">
                  <FiStar />
                  {stay.rating}
                </span>
              </div>

              <div className="stay-card-content">

                <span>{stay.type}</span>

                <h3>{stay.name}</h3>

                <div className="stay-card-location">
                  <FiMapPin />
                  {stay.place}
                </div>

                <div className="stay-card-bottom">

                  <div>
                    <small>FROM</small>
                    <strong>{stay.price}</strong>
                    <span>/ night</span>
                  </div>

                  <button aria-label={`Explore ${stay.name}`}>
                    <FiArrowUpRight />
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

      {/* Bottom strip */}
      <div className="stay-strip">

        <div>
          <span className="strip-dot"></span>
          HANDPICKED STAYS
        </div>

        <div>
          120+ PLACES
        </div>

        <div>
          INDIA / 2026
        </div>

        <div className="strip-message">
          Stay a little longer.
        </div>

      </div>

    </section>
  );
};

export default StayHighlights;

