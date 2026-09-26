import React from "react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiCoffee,
  FiSun,
  FiHome,
  FiZap,
  FiHeart,
  FiCamera,
  FiCompass,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./TravelMood.css";

const travelOptions = [
  {
    id: 1,
    icon: <FiMapPin />,
    title: "Explore Places",
    location: "Goa, India",
    text: "Find beautiful destinations",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=90",
    destinationId: "goa",
    tag: "Destinations",
  },

  {
    id: 2,
    icon: <FiCoffee />,
    title: "Food & Flavours",
    location: "Delhi, India",
    text: "Taste local food & culture",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=90",
    destinationId: "delhi",
    tag: "Food",
  },

  {
    id: 3,
    icon: <FiSun />,
    title: "Best Weather",
    location: "Manali, India",
    text: "Travel in the perfect season",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=90",
    destinationId: "manali",
    tag: "Weather",
  },

  {
    id: 4,
    icon: <FiHome />,
    title: "Beautiful Stays",
    location: "Udaipur, India",
    text: "Hotels with unforgettable views",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=90",
    destinationId: "udaipur",
    tag: "Stay",
  },

  {
    id: 5,
    icon: <FiZap />,
    title: "Adventure",
    location: "Rishikesh, India",
    text: "Trekking, rafting & more",
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=90",
    destinationId: "rishikesh",
    tag: "Adventure",
  },

  {
    id: 6,
    icon: <FiHeart />,
    title: "Romantic Trips",
    location: "Udaipur, India",
    text: "Beautiful moments for two",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=90",
    destinationId: "udaipur",
    tag: "Couples",
  },

  {
    id: 7,
    icon: <FiCamera />,
    title: "Photo Spots",
    location: "Jaipur, India",
    text: "Places worth capturing",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=90",
    destinationId: "jaipur",
    tag: "Photography",
  },

  {
    id: 8,
    icon: <FiCompass />,
    title: "Nature Escape",
    location: "Kerala, India",
    text: "Green spaces & peaceful views",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=90",
    destinationId: "kerala",
    tag: "Nature",
  },
];

const TravelMood = () => {
  const navigate = useNavigate();

  const openDestination = (destinationId) => {
    navigate(`/destination/${destinationId}`);
  };

  return (
    <section className="travel-mood">

      {/* ================= HEADER ================= */}

      <div className="travel-mood-header">

        <div className="travel-mood-heading">

          <span className="travel-mood-label">
            ✦ PLAN YOUR EXPERIENCE
          </span>

          <h2>
            Travel your <span>way.</span>
          </h2>

          <p>
            Choose a destination, taste, experience or mood
            for your next journey.
          </p>

        </div>

        <button
          type="button"
          className="travel-mood-explore"
          onClick={() => navigate("/explore")}
        >
          Explore All
          <FiArrowUpRight />
        </button>

      </div>


      {/* ================= CARDS ================= */}

      <div className="travel-mood-grid">

        {travelOptions.map((item) => (

          <button
            key={item.id}
            type="button"
            className="travel-option-card"
            onClick={() => openDestination(item.destinationId)}
          >

            {/* IMAGE */}

            <img
              src={item.image}
              alt={item.title}
              className="travel-option-image"
            />

            {/* OVERLAY */}

            <div className="travel-option-overlay"></div>


            {/* TOP */}

            <div className="travel-option-top">

              <div className="travel-option-icon">
                {item.icon}
              </div>

              <span className="travel-option-tag">
                {item.tag}
              </span>

            </div>


            {/* CONTENT */}

            <div className="travel-option-content">

              <h3>
                {item.title}
              </h3>

              {/* LOCATION */}

              <div className="travel-option-location">

                <FiMapPin />

                <span>
                  {item.location}
                </span>

              </div>

              <p>
                {item.text}
              </p>

              {/* ACTION */}

              <div className="travel-option-link">

                <span>
                  Explore {item.location.split(",")[0]}
                </span>

                <FiArrowUpRight />

              </div>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
};

export default TravelMood;