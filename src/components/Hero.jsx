import React from "react";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  

  return (
    <section className="trip-hero">

      {/* BACKGROUND VIDEO */}
   <video
  className="trip-bg-video"
  src="/trip2.mp4"
  autoPlay
  muted
  loop
  playsInline
/>
      {/* BLUE + WHITE OVERLAY */}
      <div className="trip-blue-overlay"></div>
      <div className="trip-white-glow"></div>


      {/* MAIN CONTENT */}
      <div className="trip-content">

        <div className="trip-small-label">
          <FiStar />
          YOUR PERSONAL TRAVEL PLANNER
        </div>

        <h1>
          Go somewhere
          <br />
          <span>extraordinary.</span>
        </h1>

        <p>
          Tell us where you want to go.
          
          We'll build the journey around you.
        </p>

        {/* SEARCH / AI PLANNER */}
        <div className="trip-planner-bar">

          <div className="trip-destination">

            <div className="trip-location-icon">
              <FiMapPin />
            </div>

            <div>
              <small>DESTINATION</small>
              <span>Where do you want to go?</span>
            </div>

          </div>

    <button
  className="trip-plan-button"
  onClick={() => navigate("/explore")}
>
  <span>Explore</span>
  <FiArrowRight />
</button>

        </div>

      </div>

      {/* FLOATING DESTINATION VIDEO */}
      <div className="trip-preview">

        <div className="trip-preview-video">
          <video
  src="/trip.mp4"
  autoPlay
  muted
  loop
  playsInline
/>
        </div>

        <div className="trip-preview-info">
          <span>✦ NEXT DESTINATION</span>
          <strong>Discover somewhere new</strong>
        </div>

        <div className="trip-preview-arrow">
          <FiArrowRight />
        </div>

      </div>

     

    </section>
  );
};

export default Hero;