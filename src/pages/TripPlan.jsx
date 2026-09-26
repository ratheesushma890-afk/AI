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
  FiCheck,
} from "react-icons/fi";

import destinations from "../Data/destinations";
import "./TripPlan.css";

const TripPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dateInputRef = useRef(null);
  const destinationInitializedRef = useRef("");

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
     OPTIONS
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

  const budgetOptions = [
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹2,00,000",
    "₹2,00,000 – ₹3,00,000",
    "₹3,00,000 – ₹5,00,000",
  ];

  /* =====================================================
     NORMALIZE
  ===================================================== */

  const normalizeDestination = (value = "") => {
    return String(value)
      .toLowerCase()
      .replace(/[,.]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =====================================================
     DESTINATION DATA
  ===================================================== */

  const getDestinationData = (value = "") => {
    const normalized = normalizeDestination(value);

    if (!normalized) return null;

    if (Array.isArray(destinations)) {
      return (
        destinations.find((item) => {
          const itemId = normalizeDestination(item?.id || "");
          const itemName = normalizeDestination(item?.name || "");

          return (
            itemId === normalized ||
            itemName === normalized
          );
        }) || null
      );
    }

    return destinations?.[normalized] || null;
  };

  const selectedDestination =
    getDestinationData(destination);

  /* =====================================================
     PLACES
  ===================================================== */

  const getPlacesForDestination = (value = "") => {
    const destinationData =
      getDestinationData(value);

    if (
      !destinationData ||
      !Array.isArray(destinationData.places)
    ) {
      return [];
    }

    return destinationData.places
      .map((place) => {
        if (typeof place === "string") {
          return {
            name: place,
            image: "",
            description: `Explore ${place}.`,
          };
        }

        return {
          name: place?.name || "",
          image: place?.image || "",
          description:
            place?.description ||
            `Explore ${place?.name || "this place"}.`,
        };
      })
      .filter((place) => place.name)
      .slice(0, 3);
  };

  /* =====================================================
     DAYS
  ===================================================== */

  const getDaysNumber = (value) => {
    if (value === undefined || value === null) {
      return "3";
    }

    const match = String(value).match(/\d+/);

    return match ? match[0] : "3";
  };

  /* =====================================================
     PRICE -> BUDGET

     ₹8,999  -> ₹5,000 – ₹10,000
     ₹10,499 -> ₹10,000 – ₹25,000

     NOTE:
     Ye sirf starting budget select karega.
     Budget LOCK nahi hoga.
  ===================================================== */

  const getBudgetFromPrice = (value) => {
    if (!value) return "";

    const match = String(value).match(/[\d,]+/);

    if (!match) return "";

    const cleanPrice = Number(
      match[0].replace(/,/g, "")
    );

    if (!Number.isFinite(cleanPrice)) {
      return "";
    }

    if (cleanPrice <= 10000) {
      return "₹5,000 – ₹10,000";
    }

    if (cleanPrice <= 25000) {
      return "₹10,000 – ₹25,000";
    }

    if (cleanPrice <= 50000) {
      return "₹25,000 – ₹50,000";
    }

    if (cleanPrice <= 100000) {
      return "₹50,000 – ₹1,00,000";
    }

    if (cleanPrice <= 200000) {
      return "₹1,00,000 – ₹2,00,000";
    }

    if (cleanPrice <= 300000) {
      return "₹2,00,000 – ₹3,00,000";
    }

    return "₹3,00,000 – ₹5,00,000";
  };

  /* =====================================================
     TODAY
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

    const parts = String(value).split("-");

    if (parts.length !== 3) {
      return "DD/MM/YYYY";
    }

    const [year, month, day] = parts;

    return `${day}/${month}/${year}`;
  };

  /* =====================================================
     TRAVELLERS
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
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
      ];
    }

    return [2, 4, 6, 8, 10];
  };

  /* =====================================================
     DATE
  ===================================================== */

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const openDatePicker = () => {
    const input = dateInputRef.current;

    if (!input) return;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  };

  /* =====================================================
     PAYMENT RESET
  ===================================================== */

  useEffect(() => {
    const paymentDone =
      localStorage.getItem("tripPaymentDone");

    if (paymentDone !== "true") {
      return;
    }

    setDestination("");
    setDate("");
    setDays("3");
    setTravellers("2");
    setTravelType("Couple");

    setBudget("₹25,000 – ₹50,000");

    setStyle("Relaxed");
    setStay("Any");
    setTransport("Any");

    setInterests([]);
    setSelectedPlaces([]);

    destinationInitializedRef.current = "";

    localStorage.removeItem("tripPaymentDone");
    localStorage.removeItem("tripperTrip");

    setIsLoaded(true);
  }, []);

  /* =====================================================
     RESTORE DATA
  ===================================================== */

  useEffect(() => {
    const paymentDone =
      localStorage.getItem("tripPaymentDone");

    if (paymentDone === "true") {
      return;
    }

    let savedData = null;

    const savedTrip =
      localStorage.getItem("tripperTrip");

    if (savedTrip) {
      try {
        savedData = JSON.parse(savedTrip);
      } catch (error) {
        console.error(
          "Error restoring trip:",
          error
        );
      }
    }

    const stateData = location.state || {};
    const stateTrip = stateData.trip || {};

    /* =================================================
       DESTINATION
    ================================================= */

    const finalDestination =
      stateData.destination ||
      stateTrip.destination ||
      savedData?.destination ||
      "";

    setDestination(finalDestination);

    destinationInitializedRef.current =
      normalizeDestination(finalDestination);

    const destinationData =
      getDestinationData(finalDestination);

    /* =================================================
       DAYS
    ================================================= */

    const finalDays =
      stateData.days ??
      stateTrip.days ??
      destinationData?.days ??
      savedData?.days ??
      "3";

    setDays(getDaysNumber(finalDays));

    /* =================================================
       DATE
    ================================================= */

    const finalDate =
      stateData.date ||
      stateTrip.date ||
      savedData?.date ||
      "";

    setDate(finalDate);

    /* =================================================
       TRAVEL TYPE
    ================================================= */

    const finalTravelType =
      stateData.travelType ||
      stateTrip.travelType ||
      savedData?.travelType ||
      "Couple";

    setTravelType(finalTravelType);

    /* =================================================
       BUDGET

       Detail se price mila:
       price ke according starting budget.

       BUT USER CAN CHANGE IT.
    ================================================= */

    const detailPrice =
      stateData.price ??
      stateData.basePrice ??
      stateTrip.price ??
      stateTrip.basePrice ??
      "";

    if (detailPrice) {
      const priceBudget =
        getBudgetFromPrice(detailPrice);

      setBudget(
        priceBudget ||
          "₹25,000 – ₹50,000"
      );
    } else {
      /*
       * Normal Plan Trip
       */

      const normalBudget =
        stateData.budget ||
        stateTrip.budget ||
        savedData?.budget ||
        "₹25,000 – ₹50,000";

      setBudget(normalBudget);
    }

    /* =================================================
       STYLE
    ================================================= */

    setStyle(
      stateData.style ||
        stateTrip.style ||
        savedData?.style ||
        "Relaxed"
    );

    /* =================================================
       STAY
    ================================================= */

    setStay(
      stateData.stay ||
        stateTrip.stay ||
        savedData?.stay ||
        "Any"
    );

    /* =================================================
       TRANSPORT
    ================================================= */

    setTransport(
      stateData.transport ||
        stateTrip.transport ||
        savedData?.transport ||
        "Any"
    );

    /* =================================================
       INTERESTS
    ================================================= */

    let restoredInterests = [];

    if (Array.isArray(stateData.interests)) {
      restoredInterests =
        stateData.interests;
    } else if (
      Array.isArray(stateTrip.interests)
    ) {
      restoredInterests =
        stateTrip.interests;
    } else if (
      Array.isArray(savedData?.interests)
    ) {
      restoredInterests =
        savedData.interests;
    }

    setInterests(restoredInterests);

    /* =================================================
       PLACES
    ================================================= */

    let restoredPlaces = [];

    if (Array.isArray(stateData.places)) {
      restoredPlaces = stateData.places;
    } else if (
      Array.isArray(stateTrip.places)
    ) {
      restoredPlaces = stateTrip.places;
    } else if (
      Array.isArray(savedData?.places)
    ) {
      restoredPlaces = savedData.places;
    }

    const availablePlaces =
      getPlacesForDestination(finalDestination);

    const availableNames =
      availablePlaces.map(
        (item) => item.name
      );

    const validPlaces =
      restoredPlaces
        .map((place) => {
          if (typeof place === "string") {
            return place;
          }

          return place?.name;
        })
        .filter(Boolean)
        .filter((name) =>
          availableNames.includes(name)
        )
        .slice(0, 3);

    setSelectedPlaces(validPlaces);

    /* =================================================
       TRAVELLERS
    ================================================= */

    const savedTravellers =
      Number(
        stateData.travellers ??
          stateData.travelers ??
          stateTrip.travellers ??
          stateTrip.travelers ??
          savedData?.travellers ??
          savedData?.travelers ??
          0
      );

    if (finalTravelType === "Solo") {
      setTravellers("1");
    } else if (
      finalTravelType === "Family" ||
      finalTravelType === "Friends"
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
     DESTINATION CHANGE
  ===================================================== */

  useEffect(() => {
    if (!isLoaded) return;

    const currentDestination =
      normalizeDestination(destination);

    if (!currentDestination) return;

    if (!destinationInitializedRef.current) {
      destinationInitializedRef.current =
        currentDestination;

      return;
    }

    if (
      destinationInitializedRef.current !==
      currentDestination
    ) {
      setSelectedPlaces([]);

      destinationInitializedRef.current =
        currentDestination;
    }
  }, [destination, isLoaded]);

  /* =====================================================
     AUTO SAVE
  ===================================================== */

  useEffect(() => {
    if (!isLoaded) return;

    if (!destination.trim()) return;

    const tripData = {
      destination: destination.trim(),
      date,
      days: Number(days) || 3,
      travellers:
        Number(travellers) || 2,
      travelType,
      budget,
      style,
      stay,
      transport,
      interests: [...interests],
      places: [...selectedPlaces],
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

    if (travelType === "Solo") {
      if (travellers !== "1") {
        setTravellers("1");
      }

      return;
    }

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

    if (
      ![2, 4, 6, 8, 10].includes(current)
    ) {
      setTravellers("2");
    }
  }, [travelType]);

  /* =====================================================
     INTEREST
  ===================================================== */

  const toggleInterest = (item) => {
    setInterests((prev) => {
      if (prev.includes(item)) {
        return prev.filter(
          (interest) =>
            interest !== item
        );
      }

      return [...prev, item];
    });
  };

  /* =====================================================
     PLACE
  ===================================================== */

  const handlePlaceSelect = (placeName) => {
    if (!placeName) return;

    setSelectedPlaces((prev) => {
      if (prev.includes(placeName)) {
        return prev.filter(
          (item) =>
            item !== placeName
        );
      }

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, placeName];
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanDestination =
      destination.trim();

    if (!cleanDestination) {
      alert(
        "Please enter your destination."
      );

      return;
    }

    const normalized =
      normalizeDestination(
        cleanDestination
      );

    if (
      !validDestinations.includes(
        normalized
      )
    ) {
      alert(
        "Please enter a valid destination."
      );

      return;
    }

    if (!date) {
      alert(
        "Please select your travel date."
      );

      return;
    }

    if (date < getTodayDate()) {
      alert(
        "Please select today or a future travel date."
      );

      return;
    }

    const selectedDays =
      Number(days);

    if (
      !Number.isFinite(selectedDays) ||
      selectedDays < 1
    ) {
      alert(
        "Please select trip duration."
      );

      return;
    }

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
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
      ];
    } else {
      validTravellerNumbers = [
        2, 4, 6, 8, 10,
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

    if (!budget) {
      alert(
        "Please select your budget."
      );

      return;
    }

    if (interests.length === 0) {
      alert(
        "Please select at least one interest."
      );

      return;
    }

    const finalSelectedPlaces =
      selectedPlaces.filter(Boolean);

    if (
      finalSelectedPlaces.length === 0
    ) {
      alert(
        "Please select at least one place to visit."
      );

      return;
    }

    const tripData = {
      destination: cleanDestination,

      destinationId:
        normalizeDestination(
          cleanDestination
        ),

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

      interests: [...interests],

      places: [
        ...finalSelectedPlaces,
      ],

      destinationData:
        selectedDestination || null,

      paymentStatus: "pending",
    };

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(tripData)
    );

    navigate("/create-trip", {
      state: tripData,
    });
  };

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <main className="trip-plan-page">

      {/* HERO */}

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
            budget, people and interests.
            Your personalized itinerary
            will be created around your
            travel style.
          </p>

          <div className="trip-plan-features">

            <div>
              <FiCompass />
              <span>Smart itinerary</span>
            </div>

            <div>
              <FiHome />
              <span>Stay suggestions</span>
            </div>

            <div>
              <FiNavigation />
              <span>
                Transport planning
              </span>
            </div>

          </div>

        </div>

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

      {/* PLANNER */}

      <section className="trip-planner-section">

        <div className="trip-planner-layout">

          {/* VIDEO */}

          <div className="trip-media">

            <video
              key={
                selectedDestination?.video ||
                "default-trip-video"
              }
              className="trip-media-video"
              src={
                selectedDestination?.video ||
                "/trip1.mp4"
              }
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            <div className="trip-media-overlay">

              <span>
                PLAN • EXPLORE • EXPERIENCE
              </span>

              <h2>
                {selectedDestination
                  ? `Discover ${selectedDestination.name}`
                  : "Your journey, your way."}
              </h2>

              <p>
                {selectedDestination?.description ||
                  "Tell us what you love and we'll create a trip around you."}
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            className="trip-planner-card"
            onSubmit={handleSubmit}
          >

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

            {/* BASIC */}

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

                  {destination && (
                    <FiCheck className="input-success-icon" />
                  )}

                </div>

              </label>

              {/* PLACES */}

              <div className="planner-field places-field">

                <span>
                  Places to Visit
                </span>

                <p className="places-select-description">
                  Choose up to 3 places
                  you want to explore.
                </p>

                <div className="places-circle-grid">

                  {getPlacesForDestination(
                    destination
                  ).map(
                    (place, index) => {

                      const placeName =
                        place.name;

                      const isSelected =
                        selectedPlaces.includes(
                          placeName
                        );

                      return (
                        <button
                          key={`${placeName}-${index}`}
                          type="button"
                          className={`place-circle-option ${
                            isSelected
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handlePlaceSelect(
                              placeName
                            )
                          }
                        >

                          <span className="place-check-circle">
                            {isSelected
                              ? "✓"
                              : ""}
                          </span>

                          <span className="place-option-name">
                            {placeName}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                <small className="places-help-text">
                  {selectedPlaces.length}/3 places selected
                </small>

              </div>

              {/* DATE */}

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
                    onChange={
                      handleDateChange
                    }
                  />

                  <button
                    type="button"
                    className="date-calendar-button"
                    onClick={
                      openDatePicker
                    }
                  >
                    <FiCalendar />
                  </button>

                </div>

              </label>

              {/* DAYS */}

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

                    {[
                      2, 3, 4, 5, 6,
                      7, 8, 9, 10,
                      12, 15, 20, 25, 30,
                    ].map((day) => (
                      <option
                        key={day}
                        value={day}
                      >
                        {day} Days
                      </option>
                    ))}

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

            {/* TRAVEL TYPE */}

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
                BUDGET

                NO LOCK
                NO ERROR
                USER CAN CHANGE
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                03 — YOUR BUDGET
              </span>

              <p className="section-description">
                Select your approximate
                budget for the complete trip.
              </p>

              <div className="option-row">

                {budgetOptions.map(
                  (item) => (
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

                      {budget === item && (
                        <FiCheck />
                      )}

                      {item}

                    </button>
                  )
                )}

              </div>

            </div>

            <div className="planner-divider" />

            {/* STAY + TRANSPORT */}

            <div className="planner-two-column">

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

            {/* INTEREST */}

            <div className="planner-section-block">

              <span className="section-label">
                04 — WHAT DO YOU LOVE?
              </span>

              <p className="section-description">
                Select everything you
                want in your trip.
              </p>

              <div className="interest-grid">

                {interestOptions.map(
                  (item) => {
                    const active =
                      interests.includes(item);

                    return (
                      <button
                        type="button"
                        key={item}
                        className={`interest-chip ${
                          active
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleInterest(item)
                        }
                      >
                        {active && (
                          <FiCheck />
                        )}

                        {item}
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* SUMMARY */}

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
                <small>Date</small>

                <strong>
                  {formatDate(date)}
                </strong>
              </div>

              <div>
                <small>Duration</small>

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
                <small>Budget</small>

                <strong>
                  {budget}
                </strong>
              </div>

              <div>
                <small>Stay</small>

                <strong>
                  {stay}
                </strong>
              </div>

              <div>
                <small>
                  Transport
                </small>

                <strong>
                  {transport}
                </strong>
              </div>

              <div>
                <small>Places</small>

                <strong>
                  {selectedPlaces.length}/3
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

            {/* BUTTON */}

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
              adjust according to your
              budget, travel type, selected
              places and interests.
            </p>

          </form>

        </div>

      </section>

    </main>
  );
};

export default TripPlan;