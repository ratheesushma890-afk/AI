import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import trip1 from "../assets/trip1.mp4";

import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiHeart,
  FiCompass,
  FiHome,
  FiNavigation,
  FiArrowRight,
} from "react-icons/fi";

import "./TripPlan.css";

const TripPlan = () => {
  const navigate = useNavigate();

  /* =====================================================
     STATES
  ===================================================== */

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const [days, setDays] = useState("3");

  const [travellers, setTravellers] = useState("2");

  const [travelType, setTravelType] = useState("Couple");

  const [budget, setBudget] = useState(
    "₹25,000 – ₹50,000"
  );

  const [style, setStyle] = useState("Relaxed");

  const [stay, setStay] = useState("Any");

  const [transport, setTransport] = useState("Any");

  const [interests, setInterests] = useState([]);

  /* =====================================================
     IMPORTANT
     SAVED DATA LOAD COMPLETE
  ===================================================== */

  const [isLoaded, setIsLoaded] = useState(false);

  /* =====================================================
     VALID DESTINATIONS
  ===================================================== */

  const validDestinations = [
    /* INDIA */

    "goa",
    "manali",
    "jaipur",
    "kerala",
    "rishikesh",
    "mumbai",
    "delhi",
    "new delhi",
    "agra",
    "amritsar",
    "shimla",
    "udaipur",
    "jodhpur",
    "jaisalmer",
    "varanasi",
    "haridwar",
    "mussoorie",
    "nainital",
    "darjeeling",
    "srinagar",
    "leh",
    "ladakh",
    "kasol",
    "dharamshala",
    "mount abu",
    "pushkar",
    "pondicherry",
    "puducherry",
    "andaman",
    "andaman and nicobar",
    "lakshadweep",
    "coorg",
    "ooty",
    "munnar",
    "alleppey",
    "varkala",
    "hyderabad",
    "bangalore",
    "bengaluru",
    "chennai",
    "kolkata",
    "pune",
    "ahmedabad",
    "surat",
    "lucknow",
    "chandigarh",
    "karnal",
    "panipat",
    "kurukshetra",

    /* WORLD */

    "london",
    "paris",
    "dubai",
    "abu dhabi",
    "new york",
    "los angeles",
    "san francisco",
    "las vegas",
    "miami",
    "orlando",
    "chicago",
    "toronto",
    "vancouver",
    "singapore",
    "bali",
    "jakarta",
    "bangkok",
    "phuket",
    "krabi",
    "malaysia",
    "kuala lumpur",
    "maldives",
    "nepal",
    "kathmandu",
    "bhutan",
    "thimphu",
    "sri lanka",
    "colombo",
    "tokyo",
    "osaka",
    "kyoto",
    "japan",
    "seoul",
    "south korea",
    "hong kong",
    "australia",
    "sydney",
    "melbourne",
    "new zealand",
    "auckland",
    "rome",
    "venice",
    "milan",
    "italy",
    "switzerland",
    "zurich",
    "interlaken",
    "greece",
    "athens",
    "istanbul",
    "turkey",
    "spain",
    "barcelona",
    "madrid",
    "portugal",
    "lisbon",
    "egypt",
    "cairo",
    "cape town",
    "south africa",
    "mauritius",
    "seychelles",
    "vietnam",
    "hanoi",
    "ho chi minh city",
    "philippines",
    "manila",
    "indonesia",
    "usa",
    "united states",
    "canada",
    "france",
    "uk",
    "united kingdom",
  ];

  /* =====================================================
     INTEREST OPTIONS
  ===================================================== */

  const interestOptions = [
    "Sightseeing",
    "Food",
    "Beaches",
    "Mountains",
    "Adventure",
    "Shopping",
    "Nightlife",
    "Culture",
    "Nature",
    "Photography",
    "Relaxation",
  ];

  /* =====================================================
     NORMALIZE DESTINATION
  ===================================================== */

  const normalizeDestination = (value) => {
    return value
      .toLowerCase()
      .replace(/[,.]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =====================================================
     DESTINATION VALIDATION
  ===================================================== */

  const isValidDestination = (value) => {
    const normalized = normalizeDestination(value);

    if (!normalized) {
      return false;
    }

    return validDestinations.includes(normalized);
  };

  /* =====================================================
     RESTORE SAVED TRIP
    
  ===================================================== */

  useEffect(() => {
    const savedTrip = localStorage.getItem("tripperTrip");

    if (savedTrip) {
      try {
        const tripData = JSON.parse(savedTrip);

        setDestination(tripData.destination || "");

        setDate(tripData.date || "");

        setDays(
          tripData.days !== undefined
            ? String(tripData.days)
            : "3"
        );

        setTravellers(
          tripData.travellers !== undefined
            ? String(tripData.travellers)
            : "2"
        );

        setTravelType(
          tripData.travelType || "Couple"
        );

        setBudget(
          tripData.budget || "₹25,000 – ₹50,000"
        );

        setStyle(
          tripData.style || "Relaxed"
        );

        setStay(
          tripData.stay || "Any"
        );

        setTransport(
          tripData.transport || "Any"
        );

        setInterests(
          Array.isArray(tripData.interests)
            ? tripData.interests
            : []
        );
      } catch (error) {
        console.error(
          "Error restoring saved trip:",
          error
        );
      }
    }

   

    setIsLoaded(true);
  }, []);

  /* =====================================================
     AUTO SAVE TRIP

     USER JO BHI CHANGE KAREGA
     TURANT LOCAL STORAGE ME SAVE HOGA
  ===================================================== */

  useEffect(() => {
   

    if (!isLoaded) {
      return;
    }

    const tripData = {
      destination,
      date,
      days,
      travellers,
      travelType,
      budget,
      style,
      stay,
      transport,
      interests,
    };

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(tripData)
    );
  }, [
    isLoaded,
    destination,
    date,
    days,
    travellers,
    travelType,
    budget,
    style,
    stay,
    transport,
    interests,
  ]);

  /* =====================================================
     TOGGLE INTEREST
  ===================================================== */

  const toggleInterest = (item) => {
    setInterests((prev) => {
      if (prev.includes(item)) {
        return prev.filter(
          (interest) => interest !== item
        );
      }

      return [...prev, item];
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* ---------------------------------------------------
       CLEAN DESTINATION
    --------------------------------------------------- */

    const cleanDestination = destination.trim();

    /* ---------------------------------------------------
       EMPTY DESTINATION
    --------------------------------------------------- */

    if (!cleanDestination) {
      alert(
        "Please enter your destination."
      );

      return;
    }

    /* ---------------------------------------------------
       VALID DESTINATION
    --------------------------------------------------- */

    if (!isValidDestination(cleanDestination)) {
      alert(
        "Please enter a valid destination.\n\nExample: Goa, London, Paris, Manali, Dubai, Tokyo."
      );

      return;
    }

    /* ---------------------------------------------------
       DATE
    --------------------------------------------------- */

    if (!date) {
      alert(
        "Please select your travel date."
      );

      return;
    }

    /* ---------------------------------------------------
       DAYS
    --------------------------------------------------- */

    const selectedDays = Number(days);

    if (
      !Number.isFinite(selectedDays) ||
      selectedDays < 1
    ) {
      alert(
        "Please select trip duration."
      );

      return;
    }

    /* ---------------------------------------------------
       TRAVELLERS
    --------------------------------------------------- */

    const selectedTravellers = Number(travellers);

    if (
      !Number.isFinite(selectedTravellers) ||
      selectedTravellers < 1
    ) {
      alert(
        "Please select travellers."
      );

      return;
    }

    /* ===================================================
       SOLO TRIP VALIDATION

       Solo + more than 1 traveller
       NOT ALLOWED
    =================================================== */

    if (
      travelType === "Solo" &&
      selectedTravellers > 1
    ) {
      alert(
        "Solo trip can have only 1 traveller."
      );

      return;
    }

    /* ---------------------------------------------------
       INTEREST
    --------------------------------------------------- */

    if (interests.length === 0) {
      alert(
        "Please select at least one interest."
      );

      return;
    }

    /* ---------------------------------------------------
       FINAL TRIP DATA
    --------------------------------------------------- */

    const tripData = {
      destination: cleanDestination,

      date: date,

      days: selectedDays,

      travellers: selectedTravellers,

      travelType: travelType,

      budget: budget,

      style: style,

      stay: stay,

      transport: transport,

      interests: [...interests],
    };

    /* ---------------------------------------------------
       SAVE TRIP DATA

       Submit ke time bhi save hoga
    --------------------------------------------------- */

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(tripData)
    );

    /* ---------------------------------------------------
       OPEN CREATE TRIP PAGE
    --------------------------------------------------- */

    navigate("/create-trip");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="trip-plan-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="trip-plan-hero">

        <div className="trip-plan-hero-content">

          <span className="trip-plan-eyebrow">
            SMART TRIP PLANNER
          </span>

          <h1>
            Tell us your trip.
            <br />

            <span>
              We'll build the rest.
            </span>
          </h1>

          <p>
            Enter your destination, budget,
            people and interests. Your
            personalized itinerary will be
            created around your travel style.
          </p>

          <div className="trip-plan-features">

            <div>
              <FiCompass />

              <span>
                Smart itinerary
              </span>
            </div>

            <div>
              <FiHome />

              <span>
                Stay suggestions
              </span>
            </div>

            <div>
              <FiNavigation />

              <span>
                Transport planning
              </span>
            </div>

          </div>

        </div>

        {/* =================================================
            HERO VISUAL
        ================================================= */}

        <div className="trip-plan-visual">

          <div className="trip-plan-visual-card">

            <div className="visual-icon">
              <FiMapPin />
            </div>

            <strong>
              Personalized Trip
            </strong>

            <span>
              Built around your budget
            </span>

          </div>

          <div className="trip-plan-floating-card">

            <FiHeart />

            <div>

              <strong>
                Made for you
              </strong>

              <span>
                Couple • Family • Friends • Solo
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          VIDEO + FORM
      ================================================= */}

      <section className="trip-planner-section">

        <div className="trip-planner-layout">

          {/* =================================================
              LEFT VIDEO
          ================================================= */}

          <div className="trip-media">

        <video
  className="trip-media-video"
  src="/videos/trip1.mp4"
  autoPlay
  muted
  controls
  playsInline
  preload="auto"
/>

            <div className="trip-media-overlay">

              <span>
                PLAN • EXPLORE • EXPERIENCE
              </span>

              <h2>
                Your journey,
                <br />
                your way.
              </h2>

              <p>
                Tell us what you love and
                we'll create a trip around you.
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <form
            className="trip-planner-card"
            onSubmit={handleSubmit}
          >

            {/* =================================================
                01 — YOUR TRIP
            ================================================= */}

            <div className="planner-heading">

              <div>

                <span>
                  01 — YOUR TRIP
                </span>

                <h2>
                  Where do you want to go?
                </h2>

              </div>

              <p>
                Give us the basics and we'll
                handle the planning.
              </p>

            </div>


            {/* =================================================
                BASIC DETAILS
            ================================================= */}

            <div className="planner-grid">

              {/* DESTINATION */}

              <label className="planner-field field-large">

                <span>
                  Destination
                </span>

                <div className="input-wrap">

                  <FiMapPin />

                  <input
                    type="text"
                    placeholder="Goa, Manali, Jaipur..."
                    value={destination}
                    onChange={(e) =>
                      setDestination(
                        e.target.value
                      )
                    }
                  />

                </div>

              </label>


              {/* DATE */}

              <label className="planner-field">

                <span>
                  Travel date
                </span>

                <div className="input-wrap">

                  <FiCalendar />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(
                        e.target.value
                      )
                    }
                  />

                </div>

              </label>


              {/* DURATION */}

              <label className="planner-field">

                <span>
                  Duration
                </span>

                <div className="input-wrap">

                  <FiCalendar />

                  <select
                    value={days}
                    onChange={(e) =>
                      setDays(
                        e.target.value
                      )
                    }
                  >

                    <option value="2">
                      2 Days
                    </option>

                    <option value="3">
                      3 Days
                    </option>

                    <option value="4">
                      4 Days
                    </option>

                    <option value="5">
                      5 Days
                    </option>

                    <option value="6">
                      6 Days
                    </option>

                    <option value="7">
                      7 Days
                    </option>

                    <option value="8">
                      8 Days
                    </option>

                    <option value="9">
                      9 Days
                    </option>

                    <option value="10">
                      10 Days
                    </option>

                    <option value="12">
                      12 Days
                    </option>

                    <option value="15">
                      15 Days
                    </option>

                    <option value="20">
                      20 Days
                    </option>

                    <option value="25">
                      25 Days
                    </option>

                    <option value="30">
                      30 Days
                    </option>

                  </select>

                </div>

              </label>


              {/* =================================================
                  TRAVELLERS
              ================================================= */}

              <label className="planner-field">

                <span>
                  Travellers
                </span>

                <div className="input-wrap">

                  <FiUsers />

                  <select
                    value={travellers}
                    onChange={(e) =>
                      setTravellers(
                        e.target.value
                      )
                    }
                  >

                    {Array.from(
                      {
                        length: 10,
                      },
                      (_, index) =>
                        index + 1
                    ).map((number) => (

                      <option
                        key={number}
                        value={number}
                      >

                        {number}{" "}

                        {number === 1
                          ? "Traveller"
                          : "Travellers"}

                      </option>

                    ))}

                  </select>

                </div>

              </label>

            </div>


            <div className="planner-divider" />


            {/* =================================================
                02 — WHO IS TRAVELLING
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                02 — WHO IS TRAVELLING?
              </span>

              <div className="travel-type-grid">

                {[
                  ["Solo", "Just me"],
                  [
                    "Couple",
                    "Romantic escape",
                  ],
                  [
                    "Family",
                    "For everyone",
                  ],
                  [
                    "Friends",
                    "Fun together",
                  ],
                ].map(([type, text]) => (

                  <button
                    type="button"
                    key={type}
                    className={`travel-type ${
                      travelType === type
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setTravelType(type)
                    }
                  >

                    <FiHeart />

                    <strong>
                      {type}
                    </strong>

                    <span>
                      {text}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            <div className="planner-divider" />


            {/* =================================================
                03 — BUDGET
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                03 — YOUR BUDGET
              </span>

              <div className="option-row">

                {[
                  "Under ₹10,000",
                  "₹10,000 – ₹25,000",
                  "₹25,000 – ₹50,000",
                  "₹50,000 – ₹1,00,000",
                  "₹1,00,000 – ₹2,00,000",
                  "₹2,00,000+",
                ].map((item) => (

                  <button
                    type="button"
                    key={item}
                    className={`option-pill ${
                      budget === item
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setBudget(item)
                    }
                  >

                    {item}

                  </button>

                ))}

              </div>

            </div>


            <div className="planner-divider" />


            {/* =================================================
                STAY + TRANSPORT
            ================================================= */}

            <div className="planner-two-column">

              {/* STAY */}

              <div className="planner-section-block">

                <span className="section-label">
                  STAY
                </span>

                <div className="mini-options">

                  {[
                    "Any",
                    "Hotel",
                    "Resort",
                    "Hostel",
                    "Villa",
                  ].map((item) => (

                    <button
                      type="button"
                      key={item}
                      className={
                        stay === item
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setStay(item)
                      }
                    >

                      {item}

                    </button>

                  ))}

                </div>

              </div>


              {/* TRANSPORT */}

              <div className="planner-section-block">

                <span className="section-label">
                  TRANSPORT
                </span>

                <div className="mini-options">

                  {[
                    "Any",
                    "Flight",
                    "Train",
                    "Bus",
                    "Car",
                    "Bike",
                  ].map((item) => (

                    <button
                      type="button"
                      key={item}
                      className={
                        transport === item
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setTransport(item)
                      }
                    >

                      {item}

                    </button>

                  ))}

                </div>

              </div>

            </div>


            <div className="planner-divider" />


            {/* =================================================
                04 — INTERESTS
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                04 — WHAT DO YOU LOVE?
              </span>

              <p className="section-description">
                Select everything you want in
                your trip.
              </p>

              <div className="interest-grid">

                {interestOptions.map((item) => (

                  <button
                    type="button"
                    key={item}
                    className={`interest-chip ${
                      interests.includes(item)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleInterest(item)
                    }
                  >

                    {item}

                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                SELECTED SUMMARY
            ================================================= */}

            <div className="trip-selection-summary">

              <div>

                <small>
                  Destination
                </small>

                <strong>
                  {destination ||
                    "Not selected"}
                </strong>

              </div>


              <div>

                <small>
                  Duration
                </small>

                <strong>
                  {days} Days
                </strong>

              </div>


              <div>

                <small>
                  Travellers
                </small>

                <strong>
                  {travellers}
                </strong>

              </div>


              <div>

                <small>
                  Interests
                </small>

                <strong>
                  {interests.length}
                </strong>

              </div>

            </div>


            {/* =================================================
                CREATE BUTTON
            ================================================= */}

            <button
              type="submit"
              className="create-trip-button"
            >

              <span>
                Create My Personalized Trip
              </span>

              <FiArrowRight />

            </button>


            <p className="planner-note">

              Your plan will automatically adjust
              according to your budget, travel type
              and selected interests.

            </p>

          </form>

        </div>

      </section>

    </main>
  );
};

export default TripPlan;