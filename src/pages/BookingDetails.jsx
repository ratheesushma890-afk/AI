import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import "./BookingDetails.css";

/* =========================================================
   DESTINATION FALLBACK DATA
========================================================= */

const destinationData = {
  Jaipur: {
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=90",
    location: "Rajasthan, India",
    description:
      "Explore royal palaces, historic forts, colourful markets and traditional Rajasthani culture. Discover the beautiful Pink City with a comfortable and memorable travel experience.",
  },

  Goa: {
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
    location: "Goa, India",
    description:
      "Enjoy beautiful beaches, peaceful sunsets, local food and the vibrant coastal atmosphere of Goa.",
  },

  Manali: {
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=90",
    location: "Himachal Pradesh, India",
    description:
      "Experience beautiful mountains, peaceful valleys, cafés and exciting adventure activities in Manali.",
  },

  Kerala: {
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",
    location: "Kerala, India",
    description:
      "Explore peaceful backwaters, lush tea gardens, tropical beaches, beautiful hills and Kerala's rich culture.",
  },

  Rishikesh: {
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=90",
    location: "Uttarakhand, India",
    description:
      "Enjoy the peaceful Ganga river, mountain surroundings, spiritual experiences and adventure activities.",
  },

  Delhi: {
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=90",
    location: "Delhi, India",
    description:
      "Explore historical monuments, famous landmarks, markets and delicious food across Delhi.",
  },

  Mumbai: {
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=90",
    location: "Maharashtra, India",
    description:
      "Discover Mumbai's famous landmarks, beaches, food, entertainment and energetic city life.",
  },

  Agra: {
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=90",
    location: "Uttar Pradesh, India",
    description:
      "Visit the iconic Taj Mahal and explore the beautiful historical architecture of Agra.",
  },

  Udaipur: {
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=90",
    location: "Rajasthan, India",
    description:
      "Experience beautiful lakes, royal palaces and the peaceful romantic charm of Udaipur.",
  },
};

/* =========================================================
   DEFAULT HOTEL
========================================================= */

const defaultHotel = {
  name: "Royal Heritage Hotel",
  type: "Hotel",
  location: "City Centre",
  rating: "4.8",
  reviews:
    "Comfortable premium stay with excellent service and a convenient location.",
  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=90",
};

/* =========================================================
   BOOKING DETAILS
========================================================= */

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* =======================================================
     GET LOCAL STORAGE TRIP
  ======================================================= */

  let storedTrip = {};

  try {
    const savedTrip =
      localStorage.getItem("tripperTrip");

    storedTrip = savedTrip
      ? JSON.parse(savedTrip)
      : {};
  } catch (error) {
    console.error(
      "Trip data error:",
      error
    );

    storedTrip = {};
  }

  /* =======================================================
     MAIN TRIP
  ======================================================= */

  const trip =
    location.state?.trip ||
    storedTrip ||
    {};

  /* =======================================================
     DESTINATION
  ======================================================= */

  const destinationName =
    location.state?.destination ||
    trip?.destination ||
    "Jaipur";

  const destination =
    destinationData[destinationName] ||
    destinationData.Jaipur;

  /* =======================================================
     SAME IMAGE FROM PREVIOUS PAGE
  ======================================================= */

  const destinationImage =
    trip?.image ||
    trip?.destinationImage ||
    location.state?.image ||
    location.state?.destinationImage ||
    destination?.image;

  /* =======================================================
     LOCATION
  ======================================================= */

  const destinationLocation =
    trip?.state ||
    trip?.destinationState ||
    location.state?.state ||
    location.state?.destinationState ||
    destination?.location;

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  const destinationDescription =
    trip?.description ||
    location.state?.description ||
    destination?.description;

  /* =======================================================
     DATE
  ======================================================= */

  const date =
    trip?.dateFormatted ||
    trip?.date ||
    "Not selected";

  /* =======================================================
     DAYS
  ======================================================= */

  const days =
    trip?.totalDays ||
    trip?.days ||
    trip?.duration ||
    3;

  /* =======================================================
     TRAVELLERS
  ======================================================= */

  const travellers = Number(
    trip?.travellers ||
      trip?.travelers ||
      trip?.guests ||
      2
  );

  /* =======================================================
     TRANSPORT
  ======================================================= */

  const transport =
    trip?.transport ||
    trip?.travelPreference ||
    "Any";

  /* =======================================================
     TRIP TYPE
  ======================================================= */

  const travelType =
    trip?.travelType ||
    trip?.tripType ||
    trip?.travelStyle ||
    "Couple";

  /* =======================================================
     BUDGET
  ======================================================= */

  const budget =
    trip?.budget ||
    trip?.selectedBudget ||
    trip?.budgetAmount ||
    "₹5,000 – ₹10,000";

  /* =======================================================
     BUDGET CALCULATION
  ======================================================= */

  const budgetInfo = useMemo(() => {
    const numbers =
      String(budget)
        .replace(/,/g, "")
        .match(/\d+/g)
        ?.map(Number) || [];

    if (numbers.length >= 2) {
      return {
        min: Math.min(
          numbers[0],
          numbers[1]
        ),

        max: Math.max(
          numbers[0],
          numbers[1]
        ),
      };
    }

    if (numbers.length === 1) {
      return {
        min: numbers[0],
        max: numbers[0],
      };
    }

    return {
      min: 5000,
      max: 10000,
    };
  }, [budget]);

  /* =======================================================
     ESTIMATED PRICE
  ======================================================= */

  const estimatedPrice =
    budgetInfo.min ===
    budgetInfo.max
      ? budgetInfo.min
      : Math.round(
          (budgetInfo.min +
            budgetInfo.max) /
            2
        );

  /* =======================================================
     PER PERSON
  ======================================================= */

  const perPerson =
    travellers > 0
      ? Math.round(
          estimatedPrice /
            travellers
        )
      : estimatedPrice;

  /* =======================================================
     HOTEL
  ======================================================= */

  const hotel =
    location.state?.hotel ||
    trip?.hotel ||
    defaultHotel;

  const stayType =
    trip?.stay ||
    hotel?.type ||
    "Hotel";

  /* =======================================================
     PLACES
  ======================================================= */

  let places =
    trip?.places ||
    trip?.selectedPlaces ||
    [];

  if (!Array.isArray(places)) {
    places = String(places)
      .split(",")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  }

  if (!places.length) {
    places = [
      "City Sightseeing",
      "Local Market",
      "Famous Attractions",
    ];
  }

  /* =======================================================
     INTERESTS
  ======================================================= */

  let interests =
    trip?.interests ||
    trip?.selectedInterests ||
    [];

  if (!Array.isArray(interests)) {
    interests = [interests];
  }

  if (!interests.length) {
    interests = [
      "Sightseeing",
      "Local Experience",
      "Relaxation",
    ];
  }

  /* =======================================================
     CONFIRM BOOKING
  ======================================================= */

  const handleConfirm = () => {
    const updatedTrip = {
      ...trip,

      destination:
        destinationName,

      image:
        destinationImage,

      destinationImage:
        destinationImage,

      state:
        destinationLocation,

      destinationState:
        destinationLocation,

      description:
        destinationDescription,

      date,

      days,

      totalDays:
        days,

      travellers,

      transport,

      travelType,

      budget,

      stay:
        stayType,

      hotel,

      places,

      selectedPlaces:
        places,

      interests,

      selectedInterests:
        interests,

      estimatedPrice,

      perPerson,

      bookingStatus:
        "confirmed",

      paymentStatus:
        "pending",
    };

    /* SAVE */

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        updatedTrip
      )
    );

    /* PAYMENT PAGE */

    navigate(
      "/booking-summary",
      {
        state: {
          trip:
            updatedTrip,

          destination:
            destinationName,

          hotel,

          image:
            destinationImage,

          destinationImage:
            destinationImage,

          description:
            destinationDescription,

          state:
            destinationLocation,

          places,

          interests,
        },
      }
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="booking-details-page">

      <main className="booking-container">

        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          className="back-link"
          onClick={() =>
            navigate(-1)
          }
        >
          <FiArrowLeft />

          <span>
            Back to trip
          </span>
        </button>

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <section className="page-heading">

          <div>

            <span>
              TRIP DETAILS
            </span>

            <h1>
              {destinationName} Trip
            </h1>

            <p>
              Everything you selected for your
              trip, organised in one simple place.
            </p>

          </div>

          <div className="heading-budget">

            <small>
              SELECTED BUDGET
            </small>

            <strong>
              {budget}
            </strong>

          </div>

        </section>

        {/* =================================================
            DESTINATION
        ================================================= */}

        <section className="destination-card">

          {/* IMAGE */}

          <div className="destination-photo">

            <img
              src={destinationImage}
              alt={destinationName}
              onError={(event) => {
                event.currentTarget.src =
                  destination?.image;
              }}
            />

            <div className="photo-label">

              <FiMapPin />

              <span>
                {destinationLocation}
              </span>

            </div>

          </div>

          {/* DETAILS */}

          <div className="destination-info">

            <div className="destination-top">

              <div>

                <span className="section-label">
                  DESTINATION
                </span>

                <h2>
                  {destinationName}
                </h2>

              </div>

              <div className="destination-rating">

                <FiStar />

                <strong>
                  {trip?.rating ||
                    "4.8"}
                </strong>

              </div>

            </div>

            <p className="destination-description">
              {destinationDescription}
            </p>

            {/* QUICK DETAILS */}

            <div className="quick-details">

              {/* DATE */}

              <div className="quick-detail">

                <div className="quick-icon">
                  <FiCalendar />
                </div>

                <div>

                  <small>
                    TRAVEL DATE
                  </small>

                  <strong>
                    {date}
                  </strong>

                </div>

              </div>

              {/* DURATION */}

              <div className="quick-detail">

                <div className="quick-icon">
                  <FiClock />
                </div>

                <div>

                  <small>
                    DURATION
                  </small>

                  <strong>
                    {days} Days
                  </strong>

                </div>

              </div>

              {/* TRAVELLERS */}

              <div className="quick-detail">

                <div className="quick-icon">
                  <FiUsers />
                </div>

                <div>

                  <small>
                    TRAVELLERS
                  </small>

                  <strong>
                    {travellers}{" "}
                    {travellers === 1
                      ? "Person"
                      : "People"}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            HOTEL + PREFERENCES + PRICE
        ================================================= */}

        <section className="details-grid">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="details-left-column">

            {/* ===============================================
                HOTEL
            =============================================== */}

            <div className="hotel-box">

              <div className="box-title">

                <div>

                  <span>
                    YOUR STAY
                  </span>

                  <h2>
                    {stayType}
                  </h2>

                </div>

                <div className="hotel-stars">

                  <FiStar />

                  <span>
                    {hotel?.rating ||
                      "4.8"}
                  </span>

                </div>

              </div>

              {/* HOTEL CONTENT */}

              <div className="hotel-main">

                <img
                  src={
                    hotel?.image ||
                    defaultHotel.image
                  }
                  alt={
                    hotel?.name ||
                    "Hotel"
                  }
                  onError={(event) => {
                    event.currentTarget.src =
                      defaultHotel.image;
                  }}
                />

                <div className="hotel-details">

                  <h3>
                    {hotel?.name ||
                      "Premium Stay"}
                  </h3>

                  <div className="hotel-place">

                    <FiMapPin />

                    <span>
                      {hotel?.location ||
                        destinationLocation}
                    </span>

                  </div>

                  <p>
                    {hotel?.reviews ||
                      `Comfortable stay with excellent service and a convenient location for your ${destinationName} trip.`}
                  </p>

                  {/* HOTEL FEATURES */}

                  <div className="hotel-features">

                    <span>
                      <FiCheck />
                      Comfortable Rooms
                    </span>

                    <span>
                      <FiCheck />
                      Great Location
                    </span>

                    <span>
                      <FiCheck />
                      Highly Rated
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ===============================================
                PREFERENCES
                HOTEL KE JUST NICHE
            =============================================== */}

            <div className="preferences-card">

              {/* =============================================
                  TRAVEL PREFERENCE
              ============================================= */}

              <div className="preference-block">

                <div className="preference-heading">

                  <div className="preference-icon">
                    <FiNavigation />
                  </div>

                  <div>

                    <span>
                      TRAVEL PREFERENCE
                    </span>

                    <h3>
                      {transport}
                    </h3>

                  </div>

                </div>

                <p>
                  Your transportation will be
                  planned according to your
                  selected travel preference.
                </p>

              </div>

              {/* DIVIDER */}

              <div className="preference-divider" />

              {/* =============================================
                  TRIP TYPE
              ============================================= */}

              <div className="preference-block">

                <div className="preference-heading">

                  <div className="preference-icon">
                    <FiUsers />
                  </div>

                  <div>

                    <span>
                      TRIP TYPE
                    </span>

                    <h3>
                      {travelType}
                    </h3>

                  </div>

                </div>

                <p>
                  Your {destinationName} trip is
                  planned for {travellers}{" "}
                  {travellers === 1
                    ? "traveller"
                    : "travellers"}.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
              PRICE
          ================================================= */}

          <div className="price-box">

            <div className="price-heading">

              <div>

                <span>
                  TRIP COST
                </span>

                <h2>
                  Estimated Price
                </h2>

              </div>

              <div className="rupee-icon">
                ₹
              </div>

            </div>

            {/* ===============================================
                SELECTED BUDGET
            =============================================== */}

            <div className="selected-budget">

              <small>
                YOUR SELECTED BUDGET
              </small>

              <strong>
                {budget}
              </strong>

            </div>

            {/* ===============================================
                ESTIMATED PRICE
            =============================================== */}

            <div className="estimated-price">

              <span>
                ESTIMATED TOTAL
              </span>

              <strong>
                ₹
                {estimatedPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <small>
                Approx. ₹
                {perPerson.toLocaleString(
                  "en-IN"
                )}{" "}
                per traveller
              </small>

            </div>

            {/* ===============================================
                PRICE DETAILS
            =============================================== */}

            <div className="price-row">

              <span>
                Stay
              </span>

              <strong>
                {stayType}
              </strong>

            </div>

            <div className="price-row">

              <span>
                Transport
              </span>

              <strong>
                {transport}
              </strong>

            </div>

            <div className="price-row">

              <span>
                Travellers
              </span>

              <strong>
                {travellers}
              </strong>

            </div>

            <div className="price-row">

              <span>
                Duration
              </span>

              <strong>
                {days} Days
              </strong>

            </div>

          </div>

        </section>

        {/* =================================================
            PLACES + INTERESTS
        ================================================= */}

        <section className="selection-grid">

          {/* =================================================
              PLACES
          ================================================= */}

          <div className="selection-card">

            <span>
              SELECTED PLACES
            </span>

            <h3>
              Places you want to explore
            </h3>

            <div className="tag-list">

              {places.map(
                (place, index) => {
                  const placeName =
                    typeof place ===
                    "string"
                      ? place
                      : place?.name ||
                        "Place";

                  return (
                    <div
                      className="travel-tag"
                      key={`${placeName}-${index}`}
                    >
                      <FiMapPin />

                      <span>
                        {placeName}
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              INTERESTS
          ================================================= */}

          <div className="selection-card">

            <span>
              YOUR INTERESTS
            </span>

            <h3>
              Things you want to enjoy
            </h3>

            <div className="tag-list">

              {interests.map(
                (
                  interest,
                  index
                ) => {
                  const interestName =
                    typeof interest ===
                    "string"
                      ? interest
                      : interest?.name ||
                        "Experience";

                  return (
                    <div
                      className="travel-tag"
                      key={`${interestName}-${index}`}
                    >
                      <FiCheck />

                      <span>
                        {interestName}
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="final-card">

          <div>

            <span>
              YOUR TRIP IS READY
            </span>

            <h2>
              Ready to continue?
            </h2>

            <p>
              Check your trip details once and
              continue to the secure booking and
              payment summary.
            </p>

          </div>

          <button
            type="button"
            className="continue-button"
            onClick={handleConfirm}
          >

            <span>
              Proceed to Payment
            </span>

            <FiArrowRight />

          </button>

        </section>

      </main>

    </div>
  );
};

export default BookingDetails;