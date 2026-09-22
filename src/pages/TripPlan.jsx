import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  /* =====================================================
     DATE INPUT REF
  ===================================================== */

  const dateInputRef = useRef(null);

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

  const [selectedPlaces, setSelectedPlaces] = useState([]);

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
     PLACES BY DESTINATION
  ===================================================== */

  const destinationPlaces = {
    goa: [
      "Baga Beach",
      "Old Goa",
      "Vagator",
    ],

    manali: [
      "Solang Valley",
      "Rohtang Pass",
      "Mall Road",
    ],

    jaipur: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
    ],

    kerala: [
      "Munnar",
      "Alleppey",
      "Varkala Beach",
    ],

    rishikesh: [
      "Laxman Jhula",
      "River Ganga",
      "Beatles Ashram",
    ],

    mumbai: [
      "Gateway of India",
      "Marine Drive",
      "Colaba",
    ],

    delhi: [
      "India Gate",
      "Red Fort",
      "Qutub Minar",
    ],

    udaipur: [
      "City Palace",
      "Lake Pichola",
      "Sajjangarh Palace",
    ],

    jodhpur: [
      "Mehrangarh Fort",
      "Blue City",
      "Jaswant Thada",
    ],

    jaisalmer: [
      "Jaisalmer Fort",
      "Sam Sand Dunes",
      "Patwon Ki Haveli",
    ],

    shimla: [
      "Mall Road",
      "Kufri",
      "The Ridge",
    ],

    amritsar: [
      "Golden Temple",
      "Jallianwala Bagh",
      "Wagah Border",
    ],

    agra: [
      "Taj Mahal",
      "Agra Fort",
      "Mehtab Bagh",
    ],

    varanasi: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath",
      "Assi Ghat",
    ],

    london: [
      "Big Ben",
      "London Eye",
      "Tower Bridge",
    ],

    paris: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre Dame",
    ],

    dubai: [
      "Burj Khalifa",
      "Dubai Marina",
      "Palm Jumeirah",
    ],

    bali: [
      "Ubud",
      "Kuta Beach",
      "Nusa Dua",
    ],

    singapore: [
      "Marina Bay Sands",
      "Sentosa",
      "Gardens by the Bay",
    ],

    tokyo: [
      "Shibuya",
      "Tokyo Tower",
      "Senso-ji Temple",
    ],

    maldives: [
      "Male",
      "Maafushi",
      "Hulhumale",
    ],

    bangkok: [
      "Grand Palace",
      "Wat Arun",
      "Chatuchak Market",
    ],

    phuket: [
      "Patong Beach",
      "Old Phuket Town",
      "Phi Phi Islands",
    ],

    rome: [
      "Colosseum",
      "Trevi Fountain",
      "Vatican City",
    ],

    barcelona: [
      "Sagrada Familia",
      "Park Guell",
      "Gothic Quarter",
    ],
  };

  /* =====================================================
     INTEREST OPTIONS
  ===================================================== */

  const interestOptions = [
    "Sightseeing",
    "Food",
    "Beaches",
    "Mountains",
    "Adventure",
    "Nightlife",
    "Culture",
    "Nature",
    "Photography",
    "Relaxation",
  ];

  /* =====================================================
     NORMALIZE DESTINATION
  ===================================================== */

  const normalizeDestination = (value = "") => {
    return value
      .toLowerCase()
      .replace(/[,.]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =====================================================
     GET PLACES
  ===================================================== */

  const getPlacesForDestination = (value) => {
    const normalized = normalizeDestination(value);

    if (destinationPlaces[normalized]) {
      return destinationPlaces[normalized];
    }

    if (!value.trim()) {
      return [
        "Popular City Center",
        "Local Market",
        "Top Sightseeing",
      ];
    }

    return [
      `${value.trim()} Main City`,
      `${value.trim()} Local Market`,
      `${value.trim()} Sightseeing`,
    ];
  };

  /* =====================================================
     VALID DESTINATION
  ===================================================== */

  const isValidDestination = (value) => {
    const normalized = normalizeDestination(value);

    if (!normalized) {
      return false;
    }

    return validDestinations.includes(normalized);
  };

  /* =====================================================
     TRAVELLER OPTIONS
     
     SOLO     → 1
     COUPLE   → 2,4,6,8,10
     FAMILY   → 1 TO 10
     FRIENDS  → 1 TO 10
  ===================================================== */

  const getTravellerOptions = () => {
    if (travelType === "Solo") {
      return [1];
    }

    if (
      travelType === "Family" ||
      travelType === "Friends"
    ) {
      return [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ];
    }

    return [2, 4, 6, 8, 10];
  };

  /* =====================================================
     TODAY DATE
  ===================================================== */

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (value) => {
    if (!value) {
      return "DD/MM/YYYY";
    }

    const parts = value.split("-");

    if (parts.length !== 3) {
      return "DD/MM/YYYY";
    }

    const [year, month, day] = parts;

    return `${day}/${month}/${year}`;
  };

  /* =====================================================
     DATE CHANGE
  ===================================================== */

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (!selectedDate) {
      setDate("");
      return;
    }

    setDate(selectedDate);
  };

  /* =====================================================
     OPEN DATE PICKER
  ===================================================== */

  const openDatePicker = () => {
    const input = dateInputRef.current;

    if (!input) {
      return;
    }

    try {
      if (
        typeof input.showPicker === "function"
      ) {
        input.showPicker();
      } else {
        input.click();
      }
    } catch (error) {
      input.click();
    }
  };

  /* =====================================================
     RESTORE SAVED TRIP
  ===================================================== */

  useEffect(() => {
    const savedTrip =
      localStorage.getItem("tripperTrip");

    let savedData = null;

    if (savedTrip) {
      try {
        savedData = JSON.parse(savedTrip);
      } catch (error) {
        console.error(
          "Error restoring saved trip:",
          error
        );
      }
    }

    const stateDestination =
      location.state?.destination;

    const finalDestination =
      stateDestination ||
      savedData?.destination ||
      "";

    const savedTravelType =
      savedData?.travelType || "Couple";

    const savedTravellers =
      Number(savedData?.travellers);

    setDestination(finalDestination);

    setDate(savedData?.date || "");

    setDays(
      savedData?.days !== undefined
        ? String(savedData.days)
        : "3"
    );

    setTravelType(savedTravelType);

    setBudget(
      savedData?.budget ||
        "₹25,000 – ₹50,000"
    );

    setStyle(
      savedData?.style || "Relaxed"
    );

    setStay(
      savedData?.stay || "Any"
    );

    setTransport(
      savedData?.transport || "Any"
    );

    setInterests(
      Array.isArray(savedData?.interests)
        ? savedData.interests
        : []
    );

    setSelectedPlaces(
      Array.isArray(savedData?.places)
        ? savedData.places.slice(0, 3)
        : []
    );

    /* =================================================
       RESTORE TRAVELLERS CORRECTLY
    ================================================= */

    if (savedTravelType === "Solo") {
      setTravellers("1");
    } else if (
      savedTravelType === "Family" ||
      savedTravelType === "Friends"
    ) {
      if (
        Number.isInteger(savedTravellers) &&
        savedTravellers >= 1 &&
        savedTravellers <= 10
      ) {
        setTravellers(
          String(savedTravellers)
        );
      } else {
        setTravellers("1");
      }
    } else {
      if (
        [2, 4, 6, 8, 10].includes(
          savedTravellers
        )
      ) {
        setTravellers(
          String(savedTravellers)
        );
      } else {
        setTravellers("2");
      }
    }

    setIsLoaded(true);
  }, [location.state]);

  /* =====================================================
     AUTO SAVE
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
      places: selectedPlaces,
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
    selectedPlaces,
  ]);

  /* =====================================================
     TRAVEL TYPE CHANGE
  ===================================================== */

  useEffect(() => {
    const current = Number(travellers);

    /* SOLO */
    if (travelType === "Solo") {
      setTravellers("1");
      return;
    }

    /* FAMILY / FRIENDS */
    if (
      travelType === "Family" ||
      travelType === "Friends"
    ) {
      if (
        current < 1 ||
        current > 10 ||
        !Number.isFinite(current)
      ) {
        setTravellers("1");
      }

      return;
    }

    /* COUPLE */
    if (
      ![2, 4, 6, 8, 10].includes(current)
    ) {
      setTravellers("2");
    }
  }, [travelType]);

  /* =====================================================
     DESTINATION CHANGE
  ===================================================== */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    setSelectedPlaces([]);
  }, [destination]);

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
     SELECT / REMOVE PLACE
  ===================================================== */

  const handlePlaceSelect = (place) => {
    if (!place) {
      return;
    }

    if (selectedPlaces.includes(place)) {
      setSelectedPlaces((prev) =>
        prev.filter(
          (item) => item !== place
        )
      );

      return;
    }

    if (selectedPlaces.length >= 3) {
      return;
    }

    setSelectedPlaces((prev) => [
      ...prev,
      place,
    ]);
  };

  const removePlace = (place) => {
    setSelectedPlaces((prev) =>
      prev.filter(
        (item) => item !== place
      )
    );
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanDestination =
      destination.trim();

    /* DESTINATION */

    if (!cleanDestination) {
      alert(
        "Please enter your destination."
      );
      return;
    }

    if (
      !isValidDestination(
        cleanDestination
      )
    ) {
      alert(
        "Please enter a valid destination.\n\nExample: Goa, London, Paris, Manali, Dubai, Tokyo."
      );
      return;
    }

    /* DATE */

    if (!date) {
      alert(
        "Please select your travel date."
      );
      return;
    }

    /* DAYS */

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

    /* =================================================
       TRAVELLERS VALIDATION
    ================================================= */

    const selectedTravellers =
      Number(travellers);

    let validTravellerNumbers = [];

    if (travelType === "Solo") {
      validTravellerNumbers = [1];
    } else if (
      travelType === "Family" ||
      travelType === "Friends"
    ) {
      validTravellerNumbers = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ];
    } else {
      validTravellerNumbers = [
        2,
        4,
        6,
        8,
        10,
      ];
    }

    if (
      !validTravellerNumbers.includes(
        selectedTravellers
      )
    ) {
      alert(
        "Please select valid travellers."
      );
      return;
    }

    /* INTERESTS */

    if (interests.length === 0) {
      alert(
        "Please select at least one interest."
      );
      return;
    }

    /* PLACES */

    if (selectedPlaces.length === 0) {
      alert(
        "Please select at least one place to visit."
      );
      return;
    }

    /* =================================================
       FINAL DATA
    ================================================= */

    const tripData = {
      destination:
        cleanDestination,

      date,

      dateFormatted:
        formatDate(date),

      days: selectedDays,

      travellers:
        selectedTravellers,

      travelType,

      budget,

      style,

      stay,

      transport,

      interests: [
        ...interests,
      ],

      places: [
        ...selectedPlaces,
      ],
    };

    /* SAVE */

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(tripData)
    );

    /* NAVIGATE */

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
            Enter your destination,
            budget, people and
            interests. Your
            personalized itinerary
            will be created around
            your travel style.
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

        {/* HERO VISUAL */}

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

          {/* VIDEO */}

          <div className="trip-media">

            <video
              className="trip-media-video"
              src="/trip1.mp4"
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
                Tell us what you love
                and we'll create a trip
                around you.
              </p>

            </div>

          </div>

          {/* FORM */}

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
                Give us the basics and
                we'll handle the planning.
              </p>

            </div>

            {/* BASIC DETAILS */}

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
                    autoComplete="off"
                  />

                </div>

              </label>

              {/* PLACES TO VISIT */}

              <div className="planner-field places-field">

                <span>
                  Places to Visit
                </span>

                <p className="places-select-description">
                  Choose up to 3 places you
                  want to explore.
                </p>

                <div className="places-circle-grid">

                  {getPlacesForDestination(
                    destination
                  )
                    .slice(0, 3)
                    .map((place) => {

                      const isSelected =
                        selectedPlaces.includes(
                          place
                        );

                      return (
                        <button
                          type="button"
                          key={place}
                          className={`place-circle-option ${
                            isSelected
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handlePlaceSelect(
                              place
                            )
                          }
                        >

                          <span className="place-check-circle">
                            {isSelected && "✓"}
                          </span>

                          <span className="place-option-name">
                            {place}
                          </span>

                        </button>
                      );

                    })}

                </div>

                <small className="places-help-text">

                  {selectedPlaces.length}/3
                  places selected

                </small>

              </div>

              {/* TRAVEL DATE */}

              <label className="planner-field">

                <span>
                  Travel date
                </span>

                <div className="input-wrap date-input-wrap">

                  <span
                    className={`date-display ${
                      date ? "has-date" : ""
                    }`}
                  >
                    {date
                      ? formatDate(date)
                      : "DD/MM/YYYY"}
                  </span>

                  <input
                    ref={dateInputRef}
                    className="real-date-input"
                    type="date"
                    value={date}
                    min={getTodayDate()}
                    onChange={handleDateChange}
                    aria-label="Select travel date"
                  />

                  <button
                    type="button"
                    className="date-calendar-button"
                    onClick={openDatePicker}
                    aria-label="Open calendar"
                  >
                    <FiCalendar />
                  </button>

                </div>

              </label>

              {/* DURATION */}

              <label className="planner-field">

                <span>
                  Duration
                </span>

                <div className="input-wrap">

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

              {/* TRAVELLERS */}

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

                    {getTravellerOptions().map(
                      (number) => (

                        <option
                          key={number}
                          value={number}
                        >

                          {number}{" "}

                          {number === 1
                            ? "Traveller"
                            : "Travellers"}

                        </option>

                      )
                    )}

                  </select>

                </div>

              </label>

            </div>

            <div className="planner-divider" />

            {/* =================================================
                02 — WHO IS TRAVELLING?
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
                ].map(
                  ([type, text]) => (

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

                  )
                )}

              </div>

            </div>

            <div className="planner-divider" />

            {/* =================================================
                03 — YOUR BUDGET
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                03 — YOUR BUDGET
              </span>

              <div className="option-row">

                {[
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

            {/* TRAVEL STYLE */}

            <div className="planner-section-block">

              <span className="section-label">
                TRAVEL STYLE
              </span>

              <div className="mini-options">

                {[
                  "Relaxed",
                  "Balanced",
                  "Fast-paced",
                ].map((item) => (

                  <button
                    type="button"
                    key={item}
                    className={
                      style === item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setStyle(item)
                    }
                  >

                    {item}

                  </button>

                ))}

              </div>

            </div>

            <div className="planner-divider" />

            {/* STAY + TRANSPORT */}

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
                Select everything you want
                in your trip.
              </p>

              <div className="interest-grid">

                {interestOptions.map(
                  (item) => (

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

                  )
                )}

              </div>

            </div>

            {/* =================================================
                SUMMARY
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
                  Date
                </small>

                <strong>
                  {formatDate(date)}
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
                  Places
                </small>

                <strong>
                  {selectedPlaces.length}
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

              Your plan will automatically
              adjust according to your budget,
              travel type, selected places and
              interests.

            </p>

          </form>

        </div>

      </section>

    </main>
  );
};

export default TripPlan;