import React from "react";
import {
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiHeart,
  FiArrowUpRight,
  FiCheck,
} from "react-icons/fi";

import "./BeforeYouGo.css";

const beforeItems = [
  {
    number: "01",
    icon: <FiBriefcase />,
    tag: "PACK LIGHT",
    title: "Pack Smart",
    text: "Carry only what you need and leave some room for new memories.",
    points: ["Travel essentials", "Comfortable outfits", "Small day bag"],
  },
  {
    number: "02",
    icon: <FiFileText />,
    tag: "TRAVEL READY",
    title: "Keep Documents Ready",
    text: "Keep your passport, tickets and important travel documents organised.",
    points: ["Passport & ID", "Tickets & bookings", "Travel insurance"],
  },
  {
    number: "03",
    icon: <FiMapPin />,
    tag: "KNOW YOUR PLACE",
    title: "Save Important Places",
    text: "Mark the places you want to visit before your journey begins.",
    points: ["Local attractions", "Restaurants & cafes", "Emergency locations"],
  },
  {
    number: "04",
    icon: <FiHeart />,
    tag: "ENJOY THE JOURNEY",
    title: "Leave Room for Wonder",
    text: "The best travel moments are often the ones you never planned.",
    points: ["Explore freely", "Meet new people", "Make memories"],
  },
];

const BeforeYouGo = () => {
  return (
    <section className="before-go">
      <div className="before-go-container">

        {/* HEADER */}
        <div className="before-go-header">
          <div className="before-go-small-title">
            <span></span>
            BEFORE YOU GO
            <span></span>
          </div>

          <h2>
            A little preparation.
            <br />
            <em>A lot more freedom.</em>
          </h2>

          <p>
            Everything you need to know before you start your journey.
            Prepare less, travel better and enjoy every moment.
          </p>
        </div>

        {/* CARDS */}
        <div className="before-go-grid">
          {beforeItems.map((item) => (
            <article className="before-card" key={item.number}>

              <div className="before-card-top">
                <span className="before-number">
                  {item.number}
                </span>

                <div className="before-icon">
                  {item.icon}
                </div>

                <FiArrowUpRight className="before-arrow" />
              </div>

              <div className="before-card-content">

                <span className="before-tag">
                  {item.tag}
                </span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <div className="before-points">
                  {item.points.map((point) => (
                    <div className="before-point" key={point}>
                      <span>
                        <FiCheck />
                      </span>
                      {point}
                    </div>
                  ))}
                </div>

              </div>

            </article>
          ))}
        </div>

       

      </div>
    </section>
  );
};

export default BeforeYouGo;