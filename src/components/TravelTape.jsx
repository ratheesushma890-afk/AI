import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiCompass,
} from "react-icons/fi";

import "./TravelTape.css";

import goa from "../assets/goa.jpg";
import manali from "../assets/manali.jpg";
import jaipur from "../assets/jaipur.jpg";
import kerala from "../assets/kerala.jpg";

const destinations = [
  {
    number: "01",
    place: "GOA",
    location: "GOA · INDIA",
    title: "Leave room for the unexpected.",
    text: "Salt in the air, warm roads and nowhere you really need to be.",
    image: goa,
    stamp: "WEST COAST",
  },
  {
    number: "02",
    place: "MANALI",
    location: "HIMACHAL · INDIA",
    title: "Take the road above the clouds.",
    text: "Mountain air, quiet cafés and roads that make you stop for a while.",
    image: manali,
    stamp: "HIGH ALTITUDE",
  },
  {
    number: "03",
    place: "JAIPUR",
    location: "RAJASTHAN · INDIA",
    title: "Every street has a story.",
    text: "Old walls, colourful markets and evenings that glow differently.",
    image: jaipur,
    stamp: "THE PINK CITY",
  },
  {
    number: "04",
    place: "KERALA",
    location: "KERALA · INDIA",
    title: "Let the journey slow down.",
    text: "Backwaters, palms and little moments that stay longer than expected.",
    image: kerala,
    stamp: "SOUTH INDIA",
  },
];

const TravelTape = () => {
  const [active, setActive] = useState(0);

  const current = destinations[active];

  const changeDestination = (index) => {
    setActive(index);
  };

  return (
    <section className="travel-tape">

      {/* Decorative background */}
      <div className="tape-orb tape-orb-one"></div>
      <div className="tape-orb tape-orb-two"></div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="tape-header">

        <div>
          <div className="tape-kicker">
            <span></span>
            THE TRAVEL TAPE
          </div>

          <h2>
            Some places<i>&nbsp;stay with you.</i>
            
            
          </h2>
        </div>

        <div className="tape-header-note">
          <FiCompass />

          <p>
            A collection of places,
            <br />
            routes & little detours.
          </p>
        </div>

      </div>


      {/* =====================================================
          MAIN EXPERIENCE
      ===================================================== */}

      <div className="tape-experience">

        {/* LEFT INDEX */}

        <div className="tape-index">

          <span className="index-label">
            DESTINATIONS
          </span>

          <div className="index-list">

            {destinations.map((item, index) => (

              <button
                key={item.number}
                className={
                  active === index
                    ? "index-item active"
                    : "index-item"
                }
                onClick={() => changeDestination(index)}
              >

                <span className="index-number">
                  {item.number}
                </span>

                <span className="index-name">
                  {item.place}
                </span>

                <FiArrowUpRight />

              </button>

            ))}

          </div>

        </div>


        {/* CENTER IMAGE */}

        <div className="tape-image-card">

          <img
            key={current.image}
            src={current.image}
            alt={current.place}
          />

          <div className="tape-image-overlay"></div>

          <div className="tape-location">
            <FiMapPin />
            {current.location}
          </div>

          <div className="tape-image-number">
            {current.number}
          </div>

          <div className="tape-stamp">
            {current.stamp}
          </div>

          <div className="tape-image-place">
            {current.place}
          </div>

        </div>


        {/* RIGHT STORY */}

        <div className="tape-story">

          <span className="story-small">
            CURRENT FRAME
          </span>

          <div className="story-line"></div>

          <h3>
            {current.title}
          </h3>

          <p>
            {current.text}
          </p>

          <button className="discover-btn">

            <span>
              Discover {current.place}
            </span>

            <div>
              <FiArrowUpRight />
            </div>

          </button>


          {/* mini metadata */}

          <div className="story-meta">

            <div>
              <span>FRAME</span>
              <strong>{current.number} / 04</strong>
            </div>

            <div>
              <span>JOURNAL</span>
              <strong>TRIPPER</strong>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MOVING TAPE
      ===================================================== */}

      <div className="moving-tape">

        <div className="moving-track">

          {[...destinations, ...destinations].map(
            (item, index) => (
              <React.Fragment key={index}>

                <span>{item.place}</span>

                <b>✦</b>

                <span>{item.stamp}</span>

                <b>✦</b>

              </React.Fragment>
            )
          )}

        </div>

      </div>


      {/* =====================================================
          BOTTOM NOTE
      ===================================================== */}

      <div className="tape-bottom">

        <span>
          04 DESTINATIONS
        </span>

        <div className="bottom-line"></div>

        <span>
          KEEP EXPLORING →
        </span>

      </div>

    </section>
  );
};

export default TravelTape;