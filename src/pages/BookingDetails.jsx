import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit3,
  FiMapPin,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";

import destinations from "../Data/destinations";

import "./BookingDetails.css";

/* =========================================================
   OPTIONS
========================================================= */

const budgetOptions = [
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
];

const travelTypes = [
  "Solo",
  "Couple",
  "Family",
  "Friends",
];

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

const adultOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

const childOptions = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
];

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (value) => {
  if (!value) return "Not selected";

  const parts = String(value).split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
};

const calculateDays = (start, end) => {
  if (!start || !end) return 0;

  const startDate = new Date(
    `${start}T00:00:00`
  );

  const endDate = new Date(
    `${end}T00:00:00`
  );

  const difference =
    endDate.getTime() -
    startDate.getTime();

  const result = Math.round(
    difference /
      (1000 * 60 * 60 * 24)
  );

  return result > 0 ? result : 0;
};

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[,.]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   COMPONENT
========================================================= */

const BookingDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();

  /* =======================================================
     GET SAVED TRIP
  ======================================================= */

  const savedTrip = useMemo(() => {
    try {
      const stored =
        localStorage.getItem(
          "tripperTrip"
        );

      return stored
        ? JSON.parse(stored)
        : {};
    } catch (error) {
      console.error(
        "Trip restore error:",
        error
      );

      return {};
    }
  }, []);

  /* =======================================================
     MERGE DATA
  ======================================================= */

  const initialTrip = useMemo(
    () => ({
      ...savedTrip,
      ...(location.state?.trip || {}),
    }),
    [savedTrip, location.state]
  );

  /* =======================================================
     DESTINATION
  ======================================================= */

  const destinationName =
    initialTrip?.destination ||
    location.state?.destination ||
    "Jaipur";

  const destinationData = useMemo(() => {
    if (!Array.isArray(destinations)) {
      return null;
    }

    return (
      destinations.find(
        (item) =>
          normalize(item?.name) ===
            normalize(
              destinationName
            ) ||
          normalize(item?.id) ===
            normalize(
              destinationName
            )
      ) || null
    );
  }, [destinationName]);

  const destinationState =
    initialTrip?.destinationState ||
    initialTrip?.state ||
    destinationData?.state ||
    "India";

  /* =======================================================
     STATES
  ======================================================= */

  const [goingDate, setGoingDate] =
    useState(
      initialTrip?.goingDate ||
        initialTrip?.date ||
        ""
    );

  const [returnDate, setReturnDate] =
    useState(
      initialTrip?.returnDate || ""
    );

  const [travelType, setTravelType] =
    useState(
      initialTrip?.travelType ||
        initialTrip?.tripType ||
        "Couple"
    );

  const [adults, setAdults] =
    useState(
      String(
        initialTrip?.adults ??
          (initialTrip?.travelType ===
          "Solo"
            ? 1
            : 2)
      )
    );

  const [children, setChildren] =
    useState(
      String(
        initialTrip?.children ?? 0
      )
    );

  const [budget, setBudget] =
    useState(
      initialTrip?.budget ||
        initialTrip?.selectedBudget ||
        "₹25,000 – ₹50,000"
    );

  const [interests, setInterests] =
    useState(
      Array.isArray(
        initialTrip?.interests
      )
        ? initialTrip.interests
        : Array.isArray(
            initialTrip?.selectedInterests
          )
        ? initialTrip.selectedInterests
        : []
    );

  const [places, setPlaces] =
    useState(() => {
      const tripPlaces =
        initialTrip?.places ||
        initialTrip?.selectedPlaces ||
        [];

      if (!Array.isArray(tripPlaces)) {
        return [];
      }

      return tripPlaces
        .map((item) =>
          typeof item === "string"
            ? item
            : item?.name
        )
        .filter(Boolean)
        .slice(0, 3);
    });

  const [editing, setEditing] =
    useState(null);

  const [
    savedMessage,
    setSavedMessage,
  ] = useState("");

  /* =======================================================
     AVAILABLE PLACES
  ======================================================= */

  const availablePlaces =
    useMemo(() => {
      if (
        destinationData &&
        Array.isArray(
          destinationData?.places
        )
      ) {
        return destinationData.places
          .map((place) => {
            if (
              typeof place === "string"
            ) {
              return {
                name: place,
              };
            }

            return {
              name:
                place?.name || "",
            };
          })
          .filter(
            (place) => place.name
          )
          .slice(0, 3);
      }

      return places
        .map((name) => ({
          name,
        }))
        .slice(0, 3);
    }, [
      destinationData,
      places,
    ]);

  /* =======================================================
     DURATION
  ======================================================= */

  const days = useMemo(() => {
    const calculatedDays =
      calculateDays(
        goingDate,
        returnDate
      );

    if (calculatedDays > 0) {
      return calculatedDays;
    }

    return (
      Number(
        initialTrip?.days ||
          initialTrip?.totalDays
      ) || 0
    );
  }, [
    goingDate,
    returnDate,
    initialTrip?.days,
    initialTrip?.totalDays,
  ]);

  /* =======================================================
     TRAVELLERS
  ======================================================= */

  const travellers = useMemo(() => {
    if (travelType === "Solo") {
      return 1;
    }

    if (travelType === "Couple") {
      return 2;
    }

    if (travelType === "Family") {
      return (
        (Number(adults) || 0) +
        (Number(children) || 0)
      );
    }

    if (travelType === "Friends") {
      return Number(adults) || 2;
    }

    return 1;
  }, [
    travelType,
    adults,
    children,
  ]);

  /* =======================================================
     TRIP TYPE RULES
  ======================================================= */

  useEffect(() => {
    if (travelType === "Solo") {
      setAdults("1");
      setChildren("0");

      return;
    }

    if (travelType === "Couple") {
      setAdults("2");
      setChildren("0");

      return;
    }

    if (travelType === "Friends") {
      setChildren("0");

      if (Number(adults) < 2) {
        setAdults("2");
      }

      return;
    }

    if (
      travelType === "Family" &&
      Number(adults) < 1
    ) {
      setAdults("2");
    }
  }, [travelType]);

  /* =======================================================
     BASE PRICE FROM BUDGET
  ======================================================= */

  const basePrice = useMemo(() => {
    const numbers =
      String(budget)
        .replace(/,/g, "")
        .match(/\d+/g)
        ?.map(Number) || [];

    if (numbers.length >= 2) {
      return Math.round(
        (numbers[0] +
          numbers[1]) /
          2
      );
    }

    if (numbers.length === 1) {
      return numbers[0];
    }

    return 0;
  }, [budget]);

  /* =======================================================
     DYNAMIC PRICE

     Adult = 100%
     Child = 50%
  ======================================================= */

  const estimatedAmount =
    useMemo(() => {
      if (basePrice <= 0) {
        return 0;
      }

      const adultPrice =
        basePrice;

      const childPrice =
        Math.round(
          basePrice * 0.5
        );

      /* SOLO */

      if (
        travelType === "Solo"
      ) {
        return adultPrice;
      }

      /* COUPLE */

      if (
        travelType === "Couple"
      ) {
        return (
          adultPrice * 2
        );
      }

      /* FAMILY */

      if (
        travelType === "Family"
      ) {
        const totalAdults =
          Number(adults) || 1;

        const totalChildren =
          Number(children) || 0;

        return (
          totalAdults *
            adultPrice +
          totalChildren *
            childPrice
        );
      }

      /* FRIENDS */

      if (
        travelType === "Friends"
      ) {
        const totalFriends =
          Number(adults) || 2;

        return (
          totalFriends *
          adultPrice
        );
      }

      return basePrice;
    }, [
      basePrice,
      travelType,
      adults,
      children,
    ]);

  const formattedAmount =
    estimatedAmount > 0
      ? `₹${estimatedAmount.toLocaleString(
          "en-IN"
        )}`
      : "₹0";

  /* =======================================================
     INTEREST TOGGLE
  ======================================================= */

  const toggleInterest = (item) => {
    setInterests((current) => {
      if (
        current.includes(item)
      ) {
        return current.filter(
          (value) =>
            value !== item
        );
      }

      return [
        ...current,
        item,
      ];
    });
  };

  /* =======================================================
     PLACE TOGGLE
  ======================================================= */

  const togglePlace = (name) => {
    setPlaces((current) => {
      /*
       Selected place hai to
       remove kar sakte ho
      */

      if (
        current.includes(name)
      ) {
        return current.filter(
          (item) =>
            item !== name
        );
      }

      /*
       Maximum 3
      */

      if (
        current.length >= 3
      ) {
        alert(
          "3 places already selected hain. Pehle kisi ek selected place ko remove karo."
        );

        return current;
      }

      return [
        ...current,
        name,
      ];
    });
  };

  /* =======================================================
     UPDATED TRIP
  ======================================================= */

  const createUpdatedTrip =
    () => {
      return {
        ...initialTrip,

        destination:
          destinationName,

        state:
          destinationState,

        destinationState,

        date: goingDate,

        goingDate,

        returnDate,

        dateFormatted:
          formatDate(
            goingDate
          ),

        returnDateFormatted:
          formatDate(
            returnDate
          ),

        days,

        totalDays: days,

        travelType,

        tripType:
          travelType,

        adults:
          travelType ===
          "Solo"
            ? 1
            : travelType ===
              "Couple"
            ? 2
            : Number(
                adults
              ) || 1,

        children:
          travelType ===
          "Family"
            ? Number(
                children
              ) || 0
            : 0,

        travellers,

        budget,

        selectedBudget:
          budget,

        interests: [
          ...interests,
        ],

        selectedInterests: [
          ...interests,
        ],

        places: [
          ...places,
        ],

        selectedPlaces: [
          ...places,
        ],

        /* PRICE */

        basePrice,

        estimatedPrice:
          estimatedAmount,

        bookingAmount:
          estimatedAmount,

        finalPrice:
          estimatedAmount,

        totalPrice:
          estimatedAmount,

        bookingStatus:
          "reviewed",

        paymentStatus:
          "pending",
      };
    };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateTrip = () => {
    if (!goingDate) {
      alert(
        "Please select going date."
      );

      return false;
    }

    if (!returnDate) {
      alert(
        "Please select return date."
      );

      return false;
    }

    if (
      returnDate <= goingDate
    ) {
      alert(
        "Return date going date ke baad honi chahiye."
      );

      return false;
    }

    if (
      travelType ===
        "Family" &&
      Number(adults) < 1
    ) {
      alert(
        "Family trip ke liye at least 1 adult select karo."
      );

      return false;
    }

    return true;
  };

  /* =======================================================
     SAVE CHANGES
  ======================================================= */

  const saveChanges = () => {
    if (
      editing === "dates" &&
      !validateTrip()
    ) {
      return;
    }

    const updatedTrip =
      createUpdatedTrip();

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        updatedTrip
      )
    );

    setEditing(null);

    setSavedMessage(
      "Changes saved"
    );

    window.setTimeout(() => {
      setSavedMessage("");
    }, 1800);
  };

  /* =======================================================
     PAYMENT
  ======================================================= */

  const handlePayment = () => {
    if (!validateTrip()) {
      return;
    }

    if (
      places.length === 0
    ) {
      alert(
        "Please select at least one place."
      );

      return;
    }

    if (
      interests.length === 0
    ) {
      alert(
        "Please select at least one interest."
      );

      return;
    }

    const updatedTrip =
      createUpdatedTrip();

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        updatedTrip
      )
    );

    navigate(
      "/booking-summary",
      {
        state: {
          trip: updatedTrip,

          destination:
            destinationName,

          state:
            destinationState,

          destinationState,

          date:
            goingDate,

          goingDate,

          returnDate,

          days,

          totalDays:
            days,

          travelType,

          adults:
            updatedTrip.adults,

          children:
            updatedTrip.children,

          travellers,

          budget,

          selectedBudget:
            budget,

          interests: [
            ...interests,
          ],

          places: [
            ...places,
          ],

          basePrice,

          bookingAmount:
            estimatedAmount,

          estimatedPrice:
            estimatedAmount,

          finalPrice:
            estimatedAmount,

          totalPrice:
            estimatedAmount,
        },
      }
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="bd-page">

      {/* BACKGROUND */}

      <div className="bd-orb bd-orb-one" />
      <div className="bd-orb bd-orb-two" />

      <main className="bd-container">

        {/* BACK */}

        <button
          type="button"
          className="bd-back"
          onClick={() =>
            navigate(-1)
          }
        >
          <FiArrowLeft />
          Back to Trip
        </button>

        {/* HEADER */}

        <header className="bd-header">

          <span className="bd-eyebrow">
            REVIEW YOUR JOURNEY
          </span>

          <h1>
            Booking Details
          </h1>

          <p>
            Check your trip
            details and make any
            changes before
            proceeding to payment.
          </p>

        </header>

        {/* SAVED */}

        {savedMessage && (
          <div className="bd-toast">
            <FiCheck />
            {savedMessage}
          </div>
        )}

        {/* =================================================
            LAYOUT
        ================================================= */}

        <div className="bd-layout">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="bd-left">

            <section className="bd-main-card">

              {/* =============================================
                  DESTINATION & DATES
              ============================================= */}

              <div className="bd-section">

                <div className="bd-section-head">

                  <div className="bd-section-title">

                    <div className="bd-section-icon">
                      <FiMapPin />
                    </div>

                    <div>
                      <span>
                        TRIP DETAILS
                      </span>

                      <h2>
                        Destination & Dates
                      </h2>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="bd-edit-btn"
                    onClick={() =>
                      setEditing(
                        editing ===
                          "dates"
                          ? null
                          : "dates"
                      )
                    }
                  >
                    {editing ===
                    "dates" ? (
                      <>
                        <FiX />
                        Close
                      </>
                    ) : (
                      <>
                        <FiEdit3 />
                        Edit
                      </>
                    )}
                  </button>

                </div>

                <div className="bd-destination-row">

                  <div className="bd-destination-name">

                    <small>
                      DESTINATION
                    </small>

                    <strong>
                      {destinationName}
                    </strong>

                    <p>
                      <FiMapPin />
                      {destinationState}
                    </p>

                  </div>

                  <div className="bd-date-row">

                    <div>
                      <small>
                        GOING
                      </small>

                      <strong>
                        {formatDate(
                          goingDate
                        )}
                      </strong>
                    </div>

                    <FiArrowRight className="bd-date-arrow" />

                    <div>
                      <small>
                        RETURN
                      </small>

                      <strong>
                        {formatDate(
                          returnDate
                        )}
                      </strong>
                    </div>

                    <div className="bd-days-pill">
                      <FiClock />
                      {days} Days
                    </div>

                  </div>

                </div>

                {/* DATE EDIT */}

                {editing ===
                  "dates" && (
                  <div className="bd-edit-panel">

                    <div className="bd-two-fields">

                      <label>
                        <span>
                          Going Date
                        </span>

                        <input
                          type="date"
                          value={
                            goingDate
                          }
                          onChange={(
                            e
                          ) =>
                            setGoingDate(
                              e.target
                                .value
                            )
                          }
                        />
                      </label>

                      <label>
                        <span>
                          Return Date
                        </span>

                        <input
                          type="date"
                          value={
                            returnDate
                          }
                          min={
                            goingDate ||
                            undefined
                          }
                          onChange={(
                            e
                          ) =>
                            setReturnDate(
                              e.target
                                .value
                            )
                          }
                        />
                      </label>

                    </div>

                    <button
                      type="button"
                      className="bd-save-btn"
                      onClick={
                        saveChanges
                      }
                    >
                      <FiCheck />
                      Save Dates
                    </button>

                  </div>
                )}

              </div>

              {/* =============================================
                  TRAVELLERS
              ============================================= */}

              <div className="bd-section">

                <div className="bd-section-head">

                  <div className="bd-section-title">

                    <div className="bd-section-icon">
                      <FiUsers />
                    </div>

                    <div>
                      <span>
                        TRAVELLERS
                      </span>

                      <h2>
                        {travelType} Details
                      </h2>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="bd-edit-btn"
                    onClick={() =>
                      setEditing(
                        editing ===
                          "travellers"
                          ? null
                          : "travellers"
                      )
                    }
                  >
                    {editing ===
                    "travellers" ? (
                      <>
                        <FiX />
                        Close
                      </>
                    ) : (
                      <>
                        <FiEdit3 />
                        Edit
                      </>
                    )}
                  </button>

                </div>

                <div className="bd-traveller-row">

                  <div className="bd-total-travellers">

                    <small>
                      TOTAL TRAVELLERS
                    </small>

                    <strong>
                      {travellers}{" "}
                      {travellers === 1
                        ? "Traveller"
                        : "Travellers"}
                    </strong>

                  </div>

                  {/* SOLO */}

                  {travelType ===
                    "Solo" && (
                    <div className="bd-member-info">

                      <div>
                        <strong>
                          1
                        </strong>

                        <span>
                          Adult
                        </span>
                      </div>

                    </div>
                  )}

                  {/* COUPLE */}

                  {travelType ===
                    "Couple" && (
                    <div className="bd-member-info">

                      <div>
                        <strong>
                          2
                        </strong>

                        <span>
                          Adults
                        </span>
                      </div>

                    </div>
                  )}

                  {/* FAMILY */}

                  {travelType ===
                    "Family" && (
                    <div className="bd-member-info">

                      <div>
                        <strong>
                          {adults}
                        </strong>

                        <span>
                          Adults
                        </span>
                      </div>

                      <i />

                      <div>
                        <strong>
                          {children}
                        </strong>

                        <span>
                          Children
                        </span>
                      </div>

                    </div>
                  )}

                  {/* FRIENDS */}

                  {travelType ===
                    "Friends" && (
                    <div className="bd-member-info">

                      <div>
                        <strong>
                          {adults}
                        </strong>

                        <span>
                          Friends
                        </span>
                      </div>

                    </div>
                  )}

                </div>

                {/* TRAVELLER EDIT */}

                {editing ===
                  "travellers" && (
                  <div className="bd-edit-panel">

                    <label className="bd-full-field">

                      <span>
                        Trip Type
                      </span>

                      <select
                        value={
                          travelType
                        }
                        onChange={(
                          e
                        ) =>
                          setTravelType(
                            e.target
                              .value
                          )
                        }
                      >
                        {travelTypes.map(
                          (type) => (
                            <option
                              key={
                                type
                              }
                              value={
                                type
                              }
                            >
                              {type}
                            </option>
                          )
                        )}
                      </select>

                    </label>

                    {/* FAMILY */}

                    {travelType ===
                      "Family" && (
                      <div className="bd-two-fields">

                        <label>

                          <span>
                            Adults
                          </span>

                          <select
                            value={
                              adults
                            }
                            onChange={(
                              e
                            ) =>
                              setAdults(
                                e
                                  .target
                                  .value
                              )
                            }
                          >
                            {adultOptions.map(
                              (
                                number
                              ) => (
                                <option
                                  key={
                                    number
                                  }
                                  value={
                                    number
                                  }
                                >
                                  {
                                    number
                                  }{" "}
                                  {number ===
                                  1
                                    ? "Adult"
                                    : "Adults"}
                                </option>
                              )
                            )}
                          </select>

                        </label>

                        <label>

                          <span>
                            Children
                          </span>

                          <select
                            value={
                              children
                            }
                            onChange={(
                              e
                            ) =>
                              setChildren(
                                e
                                  .target
                                  .value
                              )
                            }
                          >
                            {childOptions.map(
                              (
                                number
                              ) => (
                                <option
                                  key={
                                    number
                                  }
                                  value={
                                    number
                                  }
                                >
                                  {
                                    number
                                  }{" "}
                                  {number ===
                                  1
                                    ? "Child"
                                    : "Children"}
                                </option>
                              )
                            )}
                          </select>

                        </label>

                      </div>
                    )}

                    {/* FRIENDS */}

                    {travelType ===
                      "Friends" && (
                      <label className="bd-full-field">

                        <span>
                          Number of Friends
                        </span>

                        <select
                          value={
                            adults
                          }
                          onChange={(
                            e
                          ) =>
                            setAdults(
                              e.target
                                .value
                            )
                          }
                        >
                          {adultOptions
                            .filter(
                              (
                                number
                              ) =>
                                number >=
                                2
                            )
                            .map(
                              (
                                number
                              ) => (
                                <option
                                  key={
                                    number
                                  }
                                  value={
                                    number
                                  }
                                >
                                  {
                                    number
                                  }{" "}
                                  Friends
                                </option>
                              )
                            )}
                        </select>

                      </label>
                    )}

                    {/* LIVE PRICE */}

                    <div className="bd-price-preview">

                      <span>
                        Updated Estimated Price
                      </span>

                      <strong>
                        {formattedAmount}
                      </strong>

                      <small>
                        {travelType ===
                        "Family"
                          ? `${adults} Adults + ${children} Children`
                          : `${travellers} ${
                              travellers ===
                              1
                                ? "Traveller"
                                : "Travellers"
                            }`}
                      </small>

                    </div>

                    <button
                      type="button"
                      className="bd-save-btn"
                      onClick={
                        saveChanges
                      }
                    >
                      <FiCheck />
                      Save Travellers
                    </button>

                  </div>
                )}

              </div>

              {/* =============================================
                  BUDGET
              ============================================= */}

              <div className="bd-section">

                <div className="bd-section-head">

                  <div className="bd-section-title">

                    <div className="bd-section-icon">
                      <span className="bd-rupee">
                        ₹
                      </span>
                    </div>

                    <div>
                      <span>
                        YOUR BUDGET
                      </span>

                      <h2>
                        Budget Range
                      </h2>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="bd-edit-btn"
                    onClick={() =>
                      setEditing(
                        editing ===
                          "budget"
                          ? null
                          : "budget"
                      )
                    }
                  >
                    {editing ===
                    "budget" ? (
                      <>
                        <FiX />
                        Close
                      </>
                    ) : (
                      <>
                        <FiEdit3 />
                        Change
                      </>
                    )}
                  </button>

                </div>

                <div className="bd-budget-display">

                  <div>
                    <small>
                      SELECTED BUDGET
                    </small>

                    <strong>
                      {budget}
                    </strong>
                  </div>

                  <p>
                    Complete trip
                    budget for{" "}
                    {travellers}{" "}
                    {travellers === 1
                      ? "traveller"
                      : "travellers"}
                  </p>

                </div>

                {/* BUDGET EDIT */}

                {editing ===
                  "budget" && (
                  <div className="bd-edit-panel">

                    <div className="bd-budget-options">

                      {budgetOptions.map(
                        (item) => (
                          <button
                            type="button"
                            key={item}
                            className={
                              budget ===
                              item
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setBudget(
                                item
                              )
                            }
                          >
                            <span>
                              {item}
                            </span>

                            {budget ===
                              item && (
                              <FiCheck />
                            )}
                          </button>
                        )
                      )}

                    </div>

                    <div className="bd-price-preview">

                      <span>
                        Estimated Total
                      </span>

                      <strong>
                        {formattedAmount}
                      </strong>

                      <small>
                        For{" "}
                        {travellers}{" "}
                        {travellers ===
                        1
                          ? "Traveller"
                          : "Travellers"}
                      </small>

                    </div>

                    <button
                      type="button"
                      className="bd-save-btn"
                      onClick={
                        saveChanges
                      }
                    >
                      <FiCheck />
                      Save Budget
                    </button>

                  </div>
                )}

              </div>

              {/* =============================================
                  INTERESTS
              ============================================= */}

              <div className="bd-section">

                <div className="bd-section-head">

                  <div className="bd-section-title">

                    <div className="bd-section-icon">
                      <FiTag />
                    </div>

                    <div>
                      <span>
                        YOUR CHOICES
                      </span>

                      <h2>
                        Interests
                      </h2>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="bd-edit-btn"
                    onClick={() =>
                      setEditing(
                        editing ===
                          "interests"
                          ? null
                          : "interests"
                      )
                    }
                  >
                    {editing ===
                    "interests" ? (
                      <>
                        <FiX />
                        Close
                      </>
                    ) : (
                      <>
                        <FiEdit3 />
                        Edit
                      </>
                    )}
                  </button>

                </div>

                <div className="bd-tags">

                  {interests.length >
                  0 ? (
                    interests.map(
                      (item) => (
                        <span
                          key={item}
                        >
                          <FiCheck />
                          {item}
                        </span>
                      )
                    )
                  ) : (
                    <p className="bd-empty">
                      No interests
                      selected
                    </p>
                  )}

                </div>

                {/* INTEREST EDIT */}

                {editing ===
                  "interests" && (
                  <div className="bd-edit-panel">

                    <div className="bd-choice-grid">

                      {interestOptions.map(
                        (item) => {
                          const active =
                            interests.includes(
                              item
                            );

                          return (
                            <button
                              type="button"
                              key={
                                item
                              }
                              className={
                                active
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                toggleInterest(
                                  item
                                )
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

                    <button
                      type="button"
                      className="bd-save-btn"
                      onClick={
                        saveChanges
                      }
                    >
                      <FiCheck />
                      Save Interests
                    </button>

                  </div>
                )}

              </div>

              {/* =============================================
                  PLACES
              ============================================= */}

              <div className="bd-section bd-last-section">

                <div className="bd-section-head">

                  <div className="bd-section-title">

                    <div className="bd-section-icon">
                      <FiMapPin />
                    </div>

                    <div>
                      <span>
                        YOUR ROUTE
                      </span>

                      <h2>
                        Places You'll Visit
                      </h2>
                    </div>

                  </div>

                  {/* EDIT ALWAYS VISIBLE */}

                  <button
                    type="button"
                    className="bd-edit-btn"
                    onClick={() =>
                      setEditing(
                        editing ===
                          "places"
                          ? null
                          : "places"
                      )
                    }
                  >
                    {editing ===
                    "places" ? (
                      <>
                        <FiX />
                        Close
                      </>
                    ) : (
                      <>
                        <FiEdit3 />
                        Edit
                      </>
                    )}
                  </button>

                </div>

                {/* SELECTED PLACES */}

                <div className="bd-place-list">

                  {places.length > 0 ? (
                    places.map(
                      (
                        place,
                        index
                      ) => (
                        <div
                          className="bd-place-item"
                          key={
                            place
                          }
                        >
                          <span>
                            {String(
                              index +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <strong>
                            {place}
                          </strong>
                        </div>
                      )
                    )
                  ) : (
                    <p className="bd-empty">
                      No places
                      selected
                    </p>
                  )}

                </div>

                {/* PLACES EDIT */}

                {editing ===
                  "places" && (
                  <div className="bd-edit-panel">

                    <p className="bd-help">
                      Maximum 3
                      places select
                      karo. Agar 3
                      already selected
                      hain to pehle
                      kisi selected
                      place ko remove
                      karo.
                    </p>

                    <div className="bd-choice-grid">

                      {availablePlaces.map(
                        (place) => {
                          const active =
                            places.includes(
                              place.name
                            );

                          return (
                            <button
                              type="button"
                              key={
                                place.name
                              }
                              className={
                                active
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                togglePlace(
                                  place.name
                                )
                              }
                            >
                              {active && (
                                <FiCheck />
                              )}

                              {
                                place.name
                              }
                            </button>
                          );
                        }
                      )}

                    </div>

                    <p className="bd-place-count">
                      {places.length} / 3
                      places selected
                    </p>

                    <button
                      type="button"
                      className="bd-save-btn"
                      onClick={
                        saveChanges
                      }
                    >
                      <FiCheck />
                      Save Places
                    </button>

                  </div>
                )}

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="bd-right">

            <div className="bd-summary">

              {/* HEADER */}

              <div className="bd-summary-head">

                <div className="bd-summary-icon">
                  <FiCalendar />
                </div>

                <div>
                  <span>
                    YOUR JOURNEY
                  </span>

                  <h2>
                    Trip Summary
                  </h2>
                </div>

              </div>

              {/* DESTINATION */}

              <div className="bd-summary-destination">

                <small>
                  DESTINATION
                </small>

                <strong>
                  {destinationName}
                </strong>

                <p>
                  <FiMapPin />
                  {destinationState}
                </p>

              </div>

              {/* SUMMARY */}

              <div className="bd-summary-list">

                <div>
                  <span>
                    Going Date
                  </span>

                  <strong>
                    {formatDate(
                      goingDate
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Return Date
                  </span>

                  <strong>
                    {formatDate(
                      returnDate
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {days} Days
                  </strong>
                </div>

                <div>
                  <span>
                    Trip Type
                  </span>

                  <strong>
                    {travelType}
                  </strong>
                </div>

                <div>
                  <span>
                    Travellers
                  </span>

                  <strong>
                    {travellers}
                  </strong>
                </div>

                {/* FAMILY */}

                {travelType ===
                  "Family" && (
                  <>
                    <div>
                      <span>
                        Adults
                      </span>

                      <strong>
                        {adults}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Children
                      </span>

                      <strong>
                        {children}
                      </strong>
                    </div>
                  </>
                )}

                {/* PRICE PER ADULT */}

                <div>
                  <span>
                    Base Price
                  </span>

                  <strong>
                    ₹
                    {basePrice.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Budget Range
                  </span>

                  <strong className="bd-blue">
                    {budget}
                  </strong>
                </div>

              </div>

              {/* PLACES */}

              <div className="bd-summary-section">

                <small>
                  SELECTED PLACES
                </small>

                <div className="bd-summary-tags">

                  {places.length >
                  0 ? (
                    places.map(
                      (place) => (
                        <span
                          key={
                            place
                          }
                        >
                          {place}
                        </span>
                      )
                    )
                  ) : (
                    <p>
                      No places
                      selected
                    </p>
                  )}

                </div>

              </div>

              {/* INTERESTS */}

              <div className="bd-summary-section">

                <small>
                  INTERESTS
                </small>

                <div className="bd-summary-tags">

                  {interests.length >
                  0 ? (
                    interests.map(
                      (item) => (
                        <span
                          key={
                            item
                          }
                        >
                          {item}
                        </span>
                      )
                    )
                  ) : (
                    <p>
                      No interests
                      selected
                    </p>
                  )}

                </div>

              </div>

              {/* TOTAL */}

              <div className="bd-total-box">

                <div className="bd-total-top">

                  <div>
                    <small>
                      ESTIMATED TOTAL
                    </small>

                    <strong>
                      {formattedAmount}
                    </strong>
                  </div>

                  <div className="bd-total-traveller">
                    For{" "}
                    {travellers}{" "}
                    {travellers === 1
                      ? "Traveller"
                      : "Travellers"}
                  </div>

                </div>

                {travelType ===
                  "Family" ? (
                  <p>
                    {adults} adult
                    {Number(
                      adults
                    ) !== 1
                      ? "s"
                      : ""}{" "}
                    + {children}{" "}
                    child
                    {Number(
                      children
                    ) !== 1
                      ? "ren"
                      : ""}.
                    Children are
                    calculated at
                    50% of the
                    adult price.
                  </p>
                ) : (
                  <p>
                    Price calculated
                    for your selected
                    travellers.
                  </p>
                )}

              </div>

              {/* PAYMENT */}

              <button
                type="button"
                className="bd-payment-btn"
                onClick={
                  handlePayment
                }
              >
                Proceed to Payment
                <FiArrowRight />
              </button>

              <p className="bd-payment-note">
                Final amount will
                be confirmed before
                payment.
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default BookingDetails;