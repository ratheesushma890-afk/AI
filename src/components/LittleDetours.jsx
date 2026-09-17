import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiCoffee,
  FiCamera,
  FiMusic,
  FiHeart,
} from "react-icons/fi";

import "./LittleDetours.css";

import goa from "../assets/goa.jpg";
import manali from "../assets/manali.jpg";
import jaipur from "../assets/jaipur.jpg";
import kerala from "../assets/kerala.jpg";

const detours = [
  {
    id: "01",
    place: "GOA",
    title: "A tiny café by the sea",
    type: "COFFEE STOP",
    distance: "12 min detour",
    description:
      "Cold coffee, salty air and a table you won't want to leave.",
    image: goa,
    icon: <FiCoffee />,
    position: "detour-one",
  },
  {
    id: "02",
    place: "MANALI",
    title: "The road above the clouds",
    type: "SCENIC STOP",
    distance: "18 min detour",
    description:
      "Take the slower road. The view at the end is worth it.",
    image: manali,
    icon: <FiCamera />,
    position: "detour-two",
  },
  {
    id: "03",
    place: "JAIPUR",
    title: "A market after sunset",
    type: "LOCAL FIND",
    distance: "8 min detour",
    description:
      "Colourful streets, handmade treasures and stories everywhere.",
    image: jaipur,
    icon: <FiMusic />,
    position: "detour-three",
  },
  {
    id: "04",
    place: "KERALA",
    title: "A quiet corner of green",
    type: "HIDDEN PLACE",
    distance: "20 min detour",
    description:
      "Leave the busy road behind and find a little more silence.",
    image: kerala,
    icon: <FiHeart />,
    position: "detour-four",
  },
];

const LittleDetours = () => {
  const [active, setActive] = useState(0);

  const current = detours[active];

  return (
    <section className="little-detours">

      {/* BACKGROUND DETAILS */}

      <div className="detour-bg-circle detour-circle-one"></div>
      <div className="detour-bg-circle detour-circle-two"></div>

      <div className="detour-dots"></div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="detour-header">

        <div className="detour-heading">

          <span className="detour-label">
            <i></i>
            LITTLE DETOURS
          </span>

          <h2>
            The best part <em>&nbsp;wasn't on the map.</em>
            
            
          </h2>

        </div>

        <div className="detour-intro">

         

        </div>

      </div>


      {/* =====================================================
          MAIN MAP AREA
      ===================================================== */}

      <div className="detour-map">

        {/* TOP ROAD */}

        <div className="road-label road-label-start">
          START
        </div>

        <div className="road-label road-label-end">
          KEEP GOING
        </div>


        {/* ROUTE */}

        <svg
          className="detour-route"
          viewBox="0 0 1200 430"
          preserveAspectRatio="none"
        >

          <path
            d="
              M 20 215
              C 170 100,
                250 330,
                390 205
              S 610 90,
                730 210
              S 920 330,
                1180 145
            "
          />

        </svg>


        {/* ROUTE DOTS */}

        <div className="route-dot route-dot-start"></div>

        <div className="route-dot route-dot-one"></div>

        <div className="route-dot route-dot-two"></div>

        <div className="route-dot route-dot-three"></div>

        <div className="route-dot route-dot-four"></div>


        {/* =================================================
            DETOUR CARDS
        ================================================= */}

        {detours.map((item, index) => (

          <button
            key={item.id}
            className={`detour-card ${item.position} ${
              active === index ? "selected" : ""
            }`}
            onClick={() => setActive(index)}
          >

            <div className="detour-card-image">

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="detour-card-shade"></div>

              <span className="detour-card-number">
                {item.id}
              </span>

              <span className="detour-card-icon">
                {item.icon}
              </span>

            </div>


            <div className="detour-card-content">

              <div className="detour-card-top">

                <span>
                  {item.type}
                </span>

                <small>
                  {item.distance}
                </small>

              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <div className="detour-card-arrow">
                <FiArrowUpRight />
              </div>

            </div>

          </button>

        ))}


        {/* =================================================
            CENTER PIN
        ================================================= */}

        <div className="detour-center-pin">

          <div className="pin-ring">
            <FiMapPin />
          </div>

          <span>
            WORTH THE
            <br />
            DETOUR
          </span>

        </div>

      </div>


      {/* =====================================================
          ACTIVE DESTINATION STRIP
      ===================================================== */}

      <div className="detour-bottom">

        <div className="detour-current">

          <span className="current-small">
            CURRENT DETOUR
          </span>

          <div className="current-info">

            <strong>
              {current.place}
            </strong>

            <span>
              {current.distance}
            </span>

          </div>

        </div>


        



      </div>

    </section>
  );
};

export default LittleDetours;