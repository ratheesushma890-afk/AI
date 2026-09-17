import React from "react";
import {
  FiArrowUpRight,
  FiHeart,
  FiMap,
  FiSun,
  FiWind,
  FiZap,
  FiCompass,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./TravelMood.css";

const moods = [
  {
    id: 1,
    icon: <FiSun />,
    title: "Beach Escape",
    text: "Slow mornings & blue horizons",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    className: "mood-beach",
    destinationId: "goa",
  },
  {
    id: 2,
    icon: <FiWind />,
    title: "Mountain Retreat",
    text: "Fresh air & quiet places",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    className: "mood-mountain",
    destinationId: "manali",
  },
  {
    id: 3,
    icon: <FiMap />,
    title: "City Energy",
    text: "Culture, food & nightlife",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=85",
    className: "mood-city",
    destinationId: "mumbai",
  },
  {
    id: 4,
    icon: <FiCompass />,
    title: "Nature Reset",
    text: "Disconnect & recharge",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    className: "mood-nature",
    destinationId: "kerala",
  },
  {
    id: 5,
    icon: <FiHeart />,
    title: "Romantic Escape",
    text: "Made for two",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85",
    className: "mood-romantic",
    destinationId: "udaipur",
  },
  {
    id: 6,
    icon: <FiZap />,
    title: "Adventure Mode",
    text: "For the thrill seekers",
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=85",
    className: "mood-adventure",
    destinationId: "rishikesh",
  },
];

const TravelMood = () => {
  const navigate = useNavigate();

  const openDestination = (destinationId) => {
    navigate(`/destination/${destinationId}`);
  };

  return (
    <section className="travel-mood">

      {/* HEADER */}
      <div className="travel-mood-header">
        <div>
          <span className="travel-mood-label">
            ✦ TRAVEL BY MOOD
          </span>

          <h2>
            How do you want<span>to feel?</span>
            
            
          </h2>
        </div>

      
      </div>

      {/* MOOD GRID */}
      <div className="travel-mood-grid">

        {moods.map((mood) => (
          <button
            type="button"
            className={`mood-card ${mood.className}`}
            key={mood.id}
            onClick={() => openDestination(mood.destinationId)}
          >

            {/* IMAGE */}
            <img
              src={mood.image}
              alt={mood.title}
              className="mood-image"
            />

            {/* OVERLAY */}
            <div className="mood-image-overlay"></div>

            {/* TOP */}
            <div className="mood-card-top">

              <div className="mood-icon">
                {mood.icon}
              </div>

              <div className="mood-arrow">
                <FiArrowUpRight />
              </div>

            </div>

            {/* CONTENT */}
            <div className="mood-card-content">

              <h3>{mood.title}</h3>

              <p>{mood.text}</p>

            </div>

          </button>
        ))}

      </div>

    </section>
  );
};

export default TravelMood;