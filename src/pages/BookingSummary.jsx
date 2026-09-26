
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiHome,
  FiLock,
  FiMapPin,
  FiNavigation,
  FiShield,
  FiSmartphone,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaPlane } from "react-icons/fa";

import "./BookingSummary.css";

const BookingSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =====================================================
     STATES
  ===================================================== */

  const [trip, setTrip] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");

  const [isPaying, setIsPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* =====================================================
     LOAD TRIP
  ===================================================== */

  useEffect(() => {
    const stateTrip =
      location.state?.trip ||
      location.state?.booking ||
      null;

    let savedTrip = null;

    try {
      const stored = localStorage.getItem("tripperTrip");

      if (stored) {
        savedTrip = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Trip load error:", error);
    }

    const finalTrip = stateTrip || savedTrip;

    if (finalTrip) {
      setTrip(finalTrip);
    }
  }, [location.state]);

  /* =====================================================
     HELPERS
  ===================================================== */

  const getText = (value, fallback = "") => {
    if (value === null || value === undefined) {
      return fallback;
    }

    if (
      typeof value === "string" ||
      typeof value === "number"
    ) {
      return String(value);
    }

    if (typeof value === "object") {
      return (
        value.name ||
        value.title ||
        value.label ||
        value.location ||
        fallback
      );
    }

    return fallback;
  };

  const parsePrice = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return 0;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }

    const text = String(value);

    // Budget range ko price nahi banana
    if (
      text.includes("–") ||
      text.includes("—")
    ) {
      return 0;
    }

    const cleaned = text
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .replace(/[^\d.]/g, "");

    const amount = Number(cleaned);

    return Number.isFinite(amount) ? amount : 0;
  };

  const formatMoney = (value) => {
    return `₹${Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")}`;
  };

  /* =====================================================
     DESTINATION
  ===================================================== */

  const destinationName = useMemo(() => {
    return getText(
      trip?.destinationData?.name ||
        trip?.destination?.name ||
        trip?.destination,
      "Your Destination"
    );
  }, [trip]);

  const destinationLocation =
    trip?.destinationData?.state ||
    trip?.destinationData?.location ||
    trip?.state ||
    `${destinationName}, India`;

  /* =====================================================
     DESTINATION IMAGES
  ===================================================== */

  const destinationImages = {
    Goa:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=90",

    Manali:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=90",

    Jaipur:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90",

    Kerala:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=90",

    Rishikesh:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1400&q=90",

    Delhi:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=90",

    Mumbai:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=90",

    Agra:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=90",

    Udaipur:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=90",

    Kashmir:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1400&q=90",
  };

  const destinationImage =
    trip?.destinationData?.image ||
    trip?.destinationData?.imageUrl ||
    trip?.destinationData?.photo ||
    trip?.destinationData?.img ||
    trip?.image ||
    destinationImages[destinationName] ||
    destinationImages.Goa;

  /* =====================================================
     TRIP DETAILS
  ===================================================== */

  const days =
    Number(
      trip?.days ||
        trip?.totalDays ||
        trip?.duration ||
        3
    ) || 3;

  const travellers =
    Number(
      trip?.travellers ||
        trip?.travelers ||
        trip?.guests ||
        2
    ) || 2;

  const travelDate =
    trip?.dateFormatted ||
    trip?.date ||
    "Not selected";

  const stay = getText(
    trip?.stay,
    "Comfort Hotel"
  );

  const transport = getText(
    trip?.transport,
    "Private Cab"
  );

  const travelType = getText(
    trip?.travelType,
    "Couple"
  );

  const hotelName = getText(
    trip?.hotel?.name ||
      trip?.selectedHotel?.name ||
      trip?.hotel,
    ""
  );

  /* =====================================================
     PLACES
  ===================================================== */

  const places = useMemo(() => {
    const source =
      trip?.places ||
      trip?.selectedPlaces ||
      [];

    if (!Array.isArray(source)) {
      return [];
    }

    return source
      .map((place) => {
        if (typeof place === "string") {
          return place;
        }

        return (
          place?.name ||
          place?.title ||
          place?.location ||
          ""
        );
      })
      .filter(Boolean);
  }, [trip]);

  /* =====================================================
     SAME FINAL BOOKING AMOUNT

     IMPORTANT:
     Budget se amount calculate nahi hoga.
     Booking Details ka final amount hi use hoga.
  ===================================================== */

  const bookingAmount = useMemo(() => {
    const candidates = [
      trip?.bookingAmount,
      trip?.amountToPay,
      trip?.payableAmount,
      trip?.finalPrice,
      trip?.totalPrice,
      trip?.estimatedPrice,
      trip?.packagePrice,
      trip?.price,
      trip?.basePrice,
    ];

    for (const candidate of candidates) {
      const amount = parsePrice(candidate);

      if (amount > 0) {
        return amount;
      }
    }

    return 0;
  }, [trip]);

  const formattedBookingAmount =
    formatMoney(bookingAmount);

  /* =====================================================
     CARD NUMBER
  ===================================================== */

  const handleCardNumber = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    value = value
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(value);
  };

  /* =====================================================
     EXPIRY
  ===================================================== */

  const handleExpiry = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (value.length > 2) {
      value =
        value.slice(0, 2) +
        "/" +
        value.slice(2);
    }

    setExpiry(value);
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validatePayment = () => {
    if (bookingAmount <= 0) {
      alert(
        "Booking amount missing. Please go back to Booking Details."
      );

      return false;
    }

    if (paymentMethod === "card") {
      const number =
        cardNumber.replace(/\s/g, "");

      if (number.length !== 16) {
        alert(
          "Please enter a valid 16 digit card number."
        );

        return false;
      }

      if (!cardName.trim()) {
        alert(
          "Please enter card holder name."
        );

        return false;
      }

      if (expiry.length !== 5) {
        alert(
          "Please enter expiry date."
        );

        return false;
      }

      if (cvv.length !== 3) {
        alert(
          "Please enter valid CVV."
        );

        return false;
      }
    }

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        alert(
          "Please enter your UPI ID."
        );

        return false;
      }
    }

    if (paymentMethod === "netbanking") {
      if (!bank) {
        alert(
          "Please select your bank."
        );

        return false;
      }
    }

    return true;
  };

  /* =====================================================
     FINAL BOOKING
  ===================================================== */

  const createFinalBooking = () => {
    return {
      ...(trip || {}),

      bookingAmount,
      amountToPay: bookingAmount,
      payableAmount: bookingAmount,

      finalPrice: bookingAmount,
      totalPrice: bookingAmount,

      paidAmount: bookingAmount,

      paymentMethod,
      paymentStatus: "paid",

      bookingStatus: "confirmed",
      bookingConfirmed: true,

      bookingDate:
        new Date().toISOString(),
    };
  };

  /* =====================================================
     PAYMENT
  ===================================================== */

  const handlePayment = () => {
    if (isPaying) return;

    if (!validatePayment()) return;

    setIsPaying(true);

    const updatedTrip =
      createFinalBooking();

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(updatedTrip)
    );

    setTrip(updatedTrip);

    setTimeout(() => {
      setIsPaying(false);
      setShowSuccess(true);
    }, 900);
  };

  /* =====================================================
     VIEW BOOKING
  ===================================================== */

  const openBookingPage = () => {
    const updatedTrip =
      createFinalBooking();

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(updatedTrip)
    );

    localStorage.setItem(
      "tripPaymentDone",
      "true"
    );

    setShowSuccess(false);

    navigate("/booking", {
      state: {
        trip: updatedTrip,
        booking: updatedTrip,
        paymentSuccess: true,
      },
    });
  };

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!trip) {
    return (
      <main className="booking-summary-page">
        <div className="booking-empty">
          <div className="empty-icon">
            <FiMapPin />
          </div>

          <h2>No Booking Found</h2>

          <p>
            Please create your trip before
            continuing to payment.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/trip-plan")
            }
          >
            Create Trip
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-summary-page">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="travel-bg-decoration">

        <div className="bg-sun" />

        <div className="bg-cloud cloud-one">
          <span />
          <span />
          <span />
        </div>

        <div className="bg-cloud cloud-two">
          <span />
          <span />
          <span />
        </div>

        <div className="mountain mountain-one" />
        <div className="mountain mountain-two" />
        <div className="mountain mountain-three" />

        <div className="flight-route">
          <span className="route-line" />

          <FaPlane className="route-plane" />
        </div>

        <div className="bg-circle circle-one" />
        <div className="bg-circle circle-two" />
        <div className="bg-circle circle-three" />

      </div>

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="booking-topbar">

        <button
          type="button"
          className="booking-back-button"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          <span>Back to Trip Plan</span>
        </button>

        <div className="booking-secure">
          <FiLock />
          <span>100% Secure Payment</span>
        </div>

      </div>

      {/* =================================================
          HERO HEADER
      ================================================= */}

      <section className="booking-header">

        <span className="booking-eyebrow">
          COMPLETE YOUR BOOKING
        </span>

        <h1>
          Secure Your Next
          <span> Adventure</span>
        </h1>

        <p>
          Almost there! Complete your payment
          and get ready for an amazing journey.
        </p>

      </section>

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <section className="booking-layout">

        {/* =================================================
            LEFT PAYMENT
        ================================================= */}

        <div className="booking-left">

          <div className="booking-card">

            {/* HEADING */}

            <div className="card-heading">

              <div className="card-heading-left">

                <span className="card-step">
                  01
                </span>

                <div>
                  <h2>Payment Details</h2>

                  <p>
                    Choose your preferred
                    payment method to continue
                  </p>
                </div>

              </div>

              <div className="secure-small">
                <FiShield />

                <div>
                  <strong>
                    Secure & Encrypted
                  </strong>

                  <span>
                    Your data is always safe
                  </span>
                </div>
              </div>

            </div>

            {/* =================================================
                TOTAL BOOKING AMOUNT
            ================================================= */}

            <div className="payment-amount-card">

              <div className="amount-left">

                <div className="amount-label">
                  <FiLock />
                  TOTAL BOOKING AMOUNT
                </div>

                <strong>
                  {formattedBookingAmount}
                </strong>

                <p>
                  Same final amount as your
                  booking details
                </p>

              </div>

              <div className="amount-travel-art">

                <FaPlane className="amount-plane" />

                <div className="amount-check">
                  <FiCheck />
                </div>

              </div>

            </div>

            {/* =================================================
                PAYMENT TABS
            ================================================= */}

            <div className="payment-method-tabs">

              <button
                type="button"
                className={`payment-tab ${
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                <FiCreditCard />
                <span>
                  Credit / Debit Card
                </span>
              </button>

              <button
                type="button"
                className={`payment-tab ${
                  paymentMethod === "upi"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                <FiSmartphone />
                <span>UPI Payment</span>
              </button>

              <button
                type="button"
                className={`payment-tab ${
                  paymentMethod ===
                  "netbanking"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "netbanking"
                  )
                }
              >
                <FiHome />
                <span>Net Banking</span>
              </button>

            </div>

            {/* =================================================
                CARD PAYMENT
            ================================================= */}

            {paymentMethod === "card" && (

              <div className="payment-form">

                <div className="card-payment-grid">

                  {/* DEMO CARD */}

                  <div className="demo-card-box">

                    <div className="demo-card-top">

                      <span>TRIPPER</span>

                      <FiCreditCard />

                    </div>

                    <div className="card-chip">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="demo-card-number">
                      {cardNumber ||
                        "1234 5678 9012 3456"}
                    </div>

                    <div className="demo-card-bottom">

                      <div>
                        <small>
                          CARD HOLDER
                        </small>

                        <strong>
                          {cardName ||
                            "YOUR NAME"}
                        </strong>
                      </div>

                      <div>
                        <small>
                          VALID THRU
                        </small>

                        <strong>
                          {expiry ||
                            "MM/YY"}
                        </strong>
                      </div>

                    </div>

                    <FaPlane className="card-plane" />

                  </div>

                  {/* CARD INPUTS */}

                  <div className="card-input-side">

                    <div className="form-field">

                      <label>
                        Card Number
                      </label>

                      <div className="input-with-icon">

                        <FiCreditCard />

                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={
                            handleCardNumber
                          }
                        />

                      </div>

                    </div>

                    <div className="form-field">

                      <label>
                        Card Holder Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter card holder name"
                        value={cardName}
                        onChange={(e) =>
                          setCardName(
                            e.target.value
                          )
                        }
                      />

                    </div>

                    <div className="form-row">

                      <div className="form-field">

                        <label>
                          Expiry Date
                        </label>

                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={expiry}
                          onChange={
                            handleExpiry
                          }
                        />

                      </div>

                      <div className="form-field">

                        <label>CVV</label>

                        <input
                          type="password"
                          inputMode="numeric"
                          placeholder="•••"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value
                                .replace(
                                  /\D/g,
                                  ""
                                )
                                .slice(0, 3)
                            )
                          }
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* =================================================
                UPI
            ================================================= */}

            {paymentMethod === "upi" && (

              <div className="payment-form">

                <div className="alternative-payment">

                  <div className="alternative-icon">
                    <FiSmartphone />
                  </div>

                  <div>
                    <span>
                      QUICK PAYMENT
                    </span>

                    <h3>
                      Pay using UPI
                    </h3>

                    <p>
                      Use Google Pay, PhonePe,
                      Paytm or any UPI app.
                    </p>
                  </div>

                </div>

                <div className="form-field">

                  <label>UPI ID</label>

                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            )}

            {/* =================================================
                NET BANKING
            ================================================= */}

            {paymentMethod ===
              "netbanking" && (

              <div className="payment-form">

                <div className="alternative-payment">

                  <div className="alternative-icon">
                    <FiHome />
                  </div>

                  <div>
                    <span>
                      ONLINE BANKING
                    </span>

                    <h3>
                      Net Banking
                    </h3>

                    <p>
                      Choose your bank and
                      continue securely.
                    </p>
                  </div>

                </div>

                <div className="form-field">

                  <label>
                    Select Bank
                  </label>

                  <select
                    value={bank}
                    onChange={(e) =>
                      setBank(
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option value="sbi">
                      State Bank of India
                    </option>

                    <option value="hdfc">
                      HDFC Bank
                    </option>

                    <option value="icici">
                      ICICI Bank
                    </option>

                    <option value="axis">
                      Axis Bank
                    </option>

                    <option value="kotak">
                      Kotak Mahindra Bank
                    </option>
                  </select>

                </div>

              </div>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="payment-security">

              <span className="security-icon">
                <FiShield />
              </span>

              <p>
                Your payment information is
                secure and encrypted. We do
                not store your card details.
              </p>

            </div>

            {/* =================================================
                AMOUNT TO PAY
            ================================================= */}

            <div className="final-payment-box">

              <div className="final-payment-icon">
                <FiLock />
              </div>

              <div className="final-payment-text">
                <small>Amount to Pay</small>

                <strong>
                  {formattedBookingAmount}
                </strong>
              </div>

              <div className="final-secure">
                <FiLock />
                Secure Payment
              </div>

            </div>

            {/* =================================================
                PAY BUTTON
            ================================================= */}

            <button
              type="button"
              className="pay-now-button"
              onClick={handlePayment}
              disabled={isPaying}
            >

              {isPaying ? (
                <>
                  <span className="payment-spinner" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <FiLock />

                  <span>
                    Pay{" "}
                    {formattedBookingAmount}
                  </span>

                  <span className="pay-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <aside className="booking-right">

          <div className="order-summary-card">

            {/* IMAGE */}

            <div className="summary-image">

              <img
                src={destinationImage}
                alt={destinationName}
              />

              <div className="summary-image-overlay" />

              <div className="summary-confirmed-badge">
                <FiCheck />
                Confirmed
              </div>

              <div className="summary-image-content">

                <h2>
                  {destinationName}
                </h2>

                <p>
                  <FiMapPin />
                  {destinationLocation}
                </p>

              </div>

            </div>

            {/* BODY */}

            <div className="order-summary-body">

              <div className="summary-title-row">

                <div className="summary-title-left">

                  <span className="summary-title-icon">
                    <FiCreditCard />
                  </span>

                  <h3>
                    Booking Summary
                  </h3>

                </div>

                <span className="trip-details-link">
                  Trip Details
                </span>

              </div>

              {/* DATE + TRAVELLERS */}

              <div className="summary-trip-details">

                <div className="summary-mini-card">

                  <span className="summary-mini-icon">
                    <FiCalendar />
                  </span>

                  <div>
                    <small>
                      Travel Date
                    </small>

                    <strong>
                      {travelDate}
                    </strong>
                  </div>

                </div>

                <div className="summary-mini-card">

                  <span className="summary-mini-icon">
                    <FiUsers />
                  </span>

                  <div>
                    <small>
                      Travellers
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

              {/* DETAILS */}

              <div className="summary-details-list">

                {hotelName && (
                  <div className="summary-info-row">
                    <span>Hotel</span>
                    <strong>
                      {hotelName}
                    </strong>
                  </div>
                )}

                <div className="summary-info-row">
                  <span>Duration</span>

                  <strong>
                    {days} Days
                  </strong>
                </div>

                <div className="summary-info-row">
                  <span>
                    Accommodation
                  </span>

                  <strong>
                    {stay}
                  </strong>
                </div>

                <div className="summary-info-row">
                  <span>Transport</span>

                  <strong>
                    {transport}
                  </strong>
                </div>

                <div className="summary-info-row">
                  <span>
                    Travel Type
                  </span>

                  <strong>
                    {travelType}
                  </strong>
                </div>

              </div>

              {/* PLACES */}

              {places.length > 0 && (

                <div className="summary-places">

                  <span>
                    Places to Visit
                  </span>

                  <div className="summary-place-chips">

                    {places
                      .slice(0, 4)
                      .map(
                        (place, index) => (

                          <span
                            key={`${place}-${index}`}
                          >
                            {place}
                          </span>

                        )
                      )}

                    {places.length > 4 && (
                      <span>
                        +{places.length - 4}
                      </span>
                    )}

                  </div>

                </div>

              )}

              {/* TOTAL */}

              <div className="order-total">

                <div className="order-total-icon">
                  <FiCreditCard />
                </div>

                <div className="order-total-text">
                  <span>
                    Total Amount
                  </span>

                  <small>
                    Final booking amount
                  </small>
                </div>

                <strong>
                  {formattedBookingAmount}
                </strong>

              </div>

              {/* SAFE */}

              <div className="summary-safe-box">

                <span>
                  <FiShield />
                </span>

                <div>
                  <strong>
                    Safe & Secure Booking
                  </strong>

                  <p>
                    Your booking is protected
                    with our secure system.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </aside>

      </section>

      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      {showSuccess && (

        <div className="payment-success-overlay">

          <div className="payment-success-popup">

            <button
              type="button"
              className="success-close"
              onClick={() =>
                setShowSuccess(false)
              }
            >
              <FiX />
            </button>

            <div className="success-check">
              <FiCheck />
            </div>

            <span className="success-small">
              PAYMENT SUCCESSFUL
            </span>

            <h2>
              Your Adventure is Confirmed!
            </h2>

            <p>
              Your payment of{" "}

              <strong>
                {formattedBookingAmount}
              </strong>{" "}

              has been completed
              successfully.
            </p>

            <div className="success-trip-card">

              <div>
                <small>
                  DESTINATION
                </small>

                <strong>
                  {destinationName}
                </strong>
              </div>

              <div>
                <small>
                  AMOUNT PAID
                </small>

                <strong>
                  {formattedBookingAmount}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="success-booking-button"
              onClick={openBookingPage}
            >
              View My Booking
            </button>

          </div>

        </div>

      )}

    </main>
  );
};

export default BookingSummary;

