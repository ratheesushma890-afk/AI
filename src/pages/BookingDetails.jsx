import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiCoffee,
  FiHeart,
  FiHome,
  FiMapPin,
  FiMinus,
  FiNavigation,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiUsers,
  FiCompass,
  FiCamera,
  FiMusic,
  FiX,
} from "react-icons/fi";

import "./BookingDetails.css";

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     DATA COMING FROM CREATE TRIP
  ========================================================= */

  const trip = location.state || {};

  const destination =
    trip.destination ||
    trip.trip?.destination ||
    "Jaipur, Rajasthan";

  const budget = Number(
    trip.budget ||
      trip.trip?.budget ||
      50000
  );

  const rawTripDate =
  trip.date ||
  trip.trip?.date ||
  "";

const formatTripDate = (date) => {
  if (!date) return "";

  const parts = date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  const [year, month, day] = parts;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${monthNames[Number(month) - 1]} ${year}`;
};

const tripDates =
  trip.dateFormatted ||
  trip.trip?.dateFormatted ||
  formatTripDate(rawTripDate) ||
  trip.dates ||
  trip.trip?.dates ||
  "Travel date not selected";

  const travelers =
    trip.travelers ||
    trip.guests ||
    trip.trip?.travelers ||
    2;

  const tripType =
    trip.tripType ||
    trip.travelType ||
    trip.trip?.tripType ||
    "Couple";

  const transport =
    trip.transport ||
    trip.transportation ||
    trip.trip?.transport ||
    "Private Cab";

  const transportPrice = Number(
    trip.transportPrice ||
      trip.trip?.transportPrice ||
      3500
  );

  const hotel =
    trip.hotel || {
      name: "The Grand Palace",
      location: destination,
      rating: "4.8",
      reviews: "245 reviews",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    };

  const selectedActivities =
    trip.activities ||
    trip.selectedActivities ||
    [
      {
        name: "City Sightseeing",
        price: 1200,
      },
      {
        name: "Local Cultural Experience",
        price: 1000,
      },
    ];

  const mealPlan =
    trip.mealPlan ||
    trip.meals ||
    "Breakfast Included";

  const roomType =
    trip.roomType ||
    "Premium Room";

  const rooms = Number(
    trip.rooms || 1
  );

  const adults = Number(
    trip.adults || travelers
  );

  const children = Number(
    trip.children || 0
  );

  /* =========================================================
     STAY
  ========================================================= */

  const nights = Number(
    trip.nights ||
      trip.totalNights ||
      4
  );

  /* =========================================================
     HOTEL PRICE
  ========================================================= */

  const hotelPrice = Number(
    trip.hotelPrice ||
      trip.price ||
      6000
  );

  const hotelTotal =
    hotelPrice *
    nights *
    rooms;

  /* =========================================================
     EXTRA ACTIVITIES
  ========================================================= */

  const additionalOptions = [
   
    {
      id: "spa",
      title: "Spa & Wellness",
      description:
        "Relaxing spa and wellness experience.",
      price: 1200,
      icon: <FiHeart />,
    },
    {
      id: "adventure",
      title: "Adventure",
      description:
        "Add an exciting outdoor adventure.",
      price: 1800,
      icon: <FiCompass />,
    },
    {
      id: "food",
      title: "Food Experience",
      description:
        "Local food and premium dining experience.",
      price: 1600,
      icon: <FiCoffee />,
    },
    {
      id: "sightseeing",
      title: "Extra Sightseeing",
      description:
        "Discover more places around the destination.",
      price: 1400,
      icon: <FiCamera />,
    },
    {
      id: "culture",
      title: "Cultural Experience",
      description:
        "Music, culture and local experiences.",
      price: 1100,
      icon: <FiMusic />,
    },
  ];

  const [addedExtras, setAddedExtras] =
    useState([]);

  const toggleExtra = (id) => {
    setAddedExtras((current) => {
      if (current.includes(id)) {
        return current.filter(
          (item) => item !== id
        );
      }

      return [...current, id];
    });
  };

  /* =========================================================
     ACTIVITY TOTAL
  ========================================================= */

  const activitiesTotal = selectedActivities.reduce(
    (total, activity) =>
      total + Number(activity.price || 0),
    0
  );

  /* =========================================================
     EXTRA TOTAL
  ========================================================= */

  const extrasTotal = additionalOptions
    .filter((item) =>
      addedExtras.includes(item.id)
    )
    .reduce(
      (total, item) =>
        total + item.price,
      0
    );

  /* =========================================================
     FOOD
  ========================================================= */

  const mealPrice =
    mealPlan === "Breakfast Included"
      ? 1500
      : mealPlan === "Breakfast + Dinner"
      ? 3500
      : mealPlan === "All Meals"
      ? 5000
      : 0;

  /* =========================================================
     TOTAL
  ========================================================= */

  const tripTotal = useMemo(() => {
    return (
      hotelTotal +
      transportPrice +
      activitiesTotal +
      mealPrice +
      extrasTotal
    );
  }, [
    hotelTotal,
    transportPrice,
    activitiesTotal,
    mealPrice,
    extrasTotal,
  ]);

  const remainingBudget =
    budget - tripTotal;

  /* =========================================================
     CONFIRM
  ========================================================= */

  const handleConfirmBooking = () => {
    const finalBooking = {
      destination,
      budget,
      tripDates,
      travelers,
      adults,
      children,
      tripType,
      transport,
      transportPrice,
      hotel,
      roomType,
      rooms,
      nights,
      hotelTotal,
      mealPlan,
      mealPrice,
      activities: selectedActivities,
      activitiesTotal,
      additionalServices:
        additionalOptions.filter((item) =>
          addedExtras.includes(item.id)
        ),
      extrasTotal,
      total: tripTotal,
      remainingBudget,
    };

    navigate(
      "/booking-confirmed",
      {
        state: finalBooking,
      }
    );
  };

  return (
    <div className="booking-details-page">

      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="booking-details-top">

        <button
          className="booking-back"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Back to Trip
        </button>

        <div className="booking-title-area">

          <span className="booking-eyebrow">
            FINAL TRIP REVIEW
          </span>

          <h1>
            Your Trip,
            <span> All Set.</span>
          </h1>

          <p>
            Review everything you have selected
            before confirming your trip.
          </p>

        </div>

      </div>


      {/* =====================================================
          TRIP OVERVIEW
      ===================================================== */}

      <section className="trip-overview">

        <div className="section-heading">

          <span>01</span>

          <div>
            <small>TRIP OVERVIEW</small>
            <h2>Everything you planned</h2>
          </div>

        </div>


        <div className="overview-grid">

          <div className="overview-card">

            <div className="overview-icon">
              <FiMapPin />
            </div>

            <div>
              <span>DESTINATION</span>
              <strong>{destination}</strong>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon">
              <FiCalendar />
            </div>

            <div>
              <span>TRAVEL DATES</span>
              <strong>{tripDates}</strong>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon">
              <FiUsers />
            </div>

            <div>
              <span>TRAVELERS</span>

              <strong>
                {adults} Adults
                {children > 0
                  ? ` • ${children} Children`
                  : ""}
              </strong>

            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon">
              <FiHeart />
            </div>

            <div>
              <span>TRIP STYLE</span>
              <strong>{tripType}</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="booking-content">

        <main className="booking-left">


          {/* =================================================
              HOTEL
          ================================================= */}

          <section className="detail-card">

            <div className="detail-heading">

              <div className="detail-number">
                02
              </div>

              <div>
                <span>YOUR STAY</span>
                <h2>Hotel Details</h2>
              </div>

            </div>


            <div className="hotel-review">

              <div className="hotel-review-image">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                />

              </div>


              <div className="hotel-review-info">

                <div className="hotel-rating">

                  <FiStar />

                  <strong>
                    {hotel.rating}
                  </strong>

                  <span>
                    {hotel.reviews}
                  </span>

                </div>


                <h3>{hotel.name}</h3>


                <p className="hotel-place">
                  <FiMapPin />
                  {hotel.location}
                </p>


                <div className="hotel-tags">

                  <span>
                    <FiHome />
                    {roomType}
                  </span>

                  <span>
                    <FiClock />
                    {nights} Nights
                  </span>

                  <span>
                    <FiUsers />
                    {rooms} Room
                  </span>

                </div>

              </div>

            </div>


            <div className="stay-info-row">

              <div>
                <span>CHECK-IN / CHECK-OUT</span>
                <strong>{tripDates}</strong>
              </div>

              <div>
                <span>STAY</span>
                <strong>
                  {nights} Nights /{" "}
                  {nights + 1} Days
                </strong>
              </div>

              <div>
                <span>MEAL PLAN</span>
                <strong>{mealPlan}</strong>
              </div>

            </div>

          </section>


          {/* =================================================
              TRANSPORT
          ================================================= */}

          <section className="detail-card">

            <div className="detail-heading">

              <div className="detail-number">
                03
              </div>

              <div>
                <span>TRAVEL</span>
                <h2>Transportation</h2>
              </div>

            </div>


            <div className="transport-review">

              <div className="transport-big-icon">
                <FiTruck />
              </div>

              <div className="transport-info">

                <span>SELECTED TRANSPORT</span>

                <h3>{transport}</h3>

                <p>
                  Your transportation has
                  already been selected for
                  this trip.
                </p>

              </div>

              <strong>
                ₹
                {transportPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </section>


          {/* =================================================
              ACTIVITIES
          ================================================= */}

          <section className="detail-card">

            <div className="detail-heading">

              <div className="detail-number">
                04
              </div>

              <div>
                <span>EXPERIENCES</span>
                <h2>Selected Activities</h2>
              </div>

            </div>


            <div className="selected-activity-list">

              {selectedActivities.length > 0 ? (

                selectedActivities.map(
                  (activity, index) => (

                    <div
                      className="selected-activity"
                      key={index}
                    >

                      <div className="activity-success">
                        <FiCheck />
                      </div>

                      <div>
                        <strong>
                          {activity.name}
                        </strong>

                        {activity.description && (
                          <p>
                            {activity.description}
                          </p>
                        )}
                      </div>

                      <span>
                        ₹
                        {Number(
                          activity.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  )
                )

              ) : (

                <div className="no-activity">
                  No activities selected yet.
                </div>

              )}

            </div>

          </section>


          {/* =================================================
              ADD MORE
          ================================================= */}

          <section className="detail-card add-more-card">

            <div className="add-more-heading">

              <div>

                <span>MAKE IT YOURS</span>

                <h2>
                  Add More to Your Trip
                </h2>

                <p>
                  Want to make your trip more
                  special? Add something extra.
                </p>

              </div>

              <FiPlus />

            </div>


            <div className="extra-options-grid">

              {additionalOptions.map(
                (item) => {

                  const active =
                    addedExtras.includes(
                      item.id
                    );

                  return (
                    <button
                      key={item.id}
                      className={`extra-option ${
                        active
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleExtra(
                          item.id
                        )
                      }
                    >

                      <div className="extra-option-icon">
                        {item.icon}
                      </div>

                      <div className="extra-option-content">

                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {item.description}
                        </p>

                        <span>
                          + ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <div className="extra-add">

                        {active ? (
                          <FiCheck />
                        ) : (
                          <FiPlus />
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          </section>

        </main>


        {/* ===================================================
            RIGHT SIDE SUMMARY
        =================================================== */}

        <aside className="booking-right">

          <div className="final-summary">

            <span className="summary-eyebrow">
              YOUR BOOKING
            </span>

            <h2>
              Final Summary
            </h2>


            <div className="summary-destination">

              <img
                src={hotel.image}
                alt={hotel.name}
              />

              <div>

                <strong>
                  {destination}
                </strong>

                <span>
                  {hotel.name}
                </span>

              </div>

            </div>


            <div className="summary-items">

              <div className="summary-item">
                <span>Hotel</span>
                <strong>
                  ₹
                  {hotelTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div className="summary-item">
                <span>Transportation</span>
                <strong>
                  ₹
                  {transportPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div className="summary-item">
                <span>Activities</span>
                <strong>
                  ₹
                  {activitiesTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div className="summary-item">
                <span>Food / Meals</span>
                <strong>
                  ₹
                  {mealPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              {extrasTotal > 0 && (
                <div className="summary-item">
                  <span>Added Extras</span>

                  <strong>
                    ₹
                    {extrasTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              )}

            </div>


            <div className="summary-divider" />


            <div className="summary-total">

              <span>TOTAL TRIP COST</span>

              <strong>
                ₹
                {tripTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>




           <button
  className="confirm-trip-btn"
  onClick={() => navigate("/booking-summary")}
>
  Confirm & Book
  <FiChevronRight />
</button>

            <p className="summary-note">
              🔒 Your trip details are secure.
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
};

export default BookingDetails;