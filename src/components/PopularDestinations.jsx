import React from "react";
import { useNavigate } from "react-router-dom";

import "./PopularDestinations.css";

import {
  FiArrowUpRight,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";


const destinations = [
  {
    id: "goa",
    location: "GOA, INDIA",
    title: "Goa",
    text: "Golden beaches, colourful streets & unforgettable sunsets.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "manali",
    location: "HIMACHAL PRADESH, INDIA",
    title: "Manali",
    text: "Snowy mountains, peaceful valleys & unforgettable road trips.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "jaipur",
    location: "RAJASTHAN, INDIA",
    title: "Jaipur",
    text: "Royal palaces, colourful markets & timeless heritage.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "kerala",
    location: "KERALA, INDIA",
    title: "Kerala",
    text: "Peaceful backwaters, lush greenery & slow tropical moments.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "rishikesh",
    location: "UTTARAKHAND, INDIA",
    title: "Rishikesh",
    text: "River adventures, mountains & peaceful riverside evenings.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: "udaipur",
    location: "RAJASTHAN, INDIA",
    title: "Udaipur",
    text: "Beautiful lakes, grand palaces & golden sunsets.",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=90",
  },
];


const PopularDestinations = () => {

  const navigate = useNavigate();


  const openDestination = (id) => {
    navigate(`/destination/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleViewAll = () => {
    navigate("/explore");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <section className="popular-destinations">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="popular-header">

        <div>

          <span className="popular-label">
            <span>✦</span>
            POPULAR DESTINATIONS
          </span>

          <h2>
            Places worth <span>going to.</span>
          </h2>

        </div>


        </div>

      


      {/* =====================================================
          DESTINATION GRID
      ===================================================== */}

      <div className="destination-grid">

        {destinations.slice(0, 5).map(
          (destination, index) => (

            <article
              key={destination.id}
              className={`destination-card destination-card-${index + 1}`}
              onClick={() => openDestination(destination.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {

                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  openDestination(destination.id);
                }

              }}
            >

              {/* IMAGE */}

              <img
                src={destination.image}
                alt={destination.title}
                className="destination-image"
              />


              {/* OVERLAY */}

              <div className="destination-overlay" />


              {/* TOP */}

              <div className="destination-top">

                <span className="destination-location">

                  <FiMapPin />

                  {destination.location}

                </span>


                <button
                  type="button"
                  className="destination-arrow"
                  onClick={(event) => {

                    event.stopPropagation();

                    openDestination(destination.id);

                  }}
                  aria-label={`Explore ${destination.title}`}
                >

                  <FiArrowUpRight />

                </button>

              </div>


              {/* CONTENT */}

              <div className="destination-content">

                <h3>
                  {destination.title}
                </h3>

                <p>
                  {destination.text}
                </p>


                <button
                  type="button"
                  className="destination-explore"
                  onClick={(event) => {

                    event.stopPropagation();

                    openDestination(destination.id);

                  }}
                >

                  Explore

                  <FiArrowRight />

                </button>

              </div>

            </article>

          )
        )}

      </div>

    </section>
  );
};


export default PopularDestinations;