import React, { useEffect, useMemo, useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiShield,
  FiUsers,
  FiStar,
} from "react-icons/fi";

import "./BookingSummary.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90";

/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (value) => {
  if (!value) return "Date not selected";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   CLEAN NUMBER
========================================================= */

const cleanNumber = (value) => {
  return String(value || "").replace(/[^\d]/g, "");
};

/* =========================================================
   FORMAT PRICE
========================================================= */

const formatPrice = (value) => {
  const number = Number(value || 0);

  if (!number) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

/* =========================================================
   EXPIRY VALIDATION
========================================================= */

const validateExpiry = (value) => {
  const expiry = value.replace(/\s/g, "");

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return "Enter expiry as MM/YY";
  }

  const [monthText, yearText] = expiry.split("/");

  const month = Number(monthText);
  const year = Number(`20${yearText}`);

  if (month < 1 || month > 12) {
    return "Enter a valid month";
  }

  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  ) {
    return "This card has expired";
  }

  return "";
};

/* =========================================================
   COMPONENT
========================================================= */

const BookingSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [trip, setTrip] = useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [paymentDetails, setPaymentDetails] =
    useState({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
      upi: "",
      bank: "",
    });

  const [errors, setErrors] = useState({});

  const [processing, setProcessing] =
    useState(false);

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [bookingId, setBookingId] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  /* =========================================================
     BUDGET
  ========================================================= */

  const getBudgetAmount = (budget) => {
    switch (budget) {
      case "Under ₹10,000":
        return 8000;

      case "₹10,000 – ₹25,000":
        return 18000;

      case "₹25,000 – ₹50,000":
        return 35000;

      case "₹50,000 – ₹1,00,000":
        return 75000;

      case "₹1,00,000 – ₹2,00,000":
        return 150000;

      case "₹2,00,000+":
        return 250000;

      default:
        return 0;
    }
  };

  /* =========================================================
     LOAD TRIP

     IMPORTANT:
     1. First priority = location.state
     2. Second priority = localStorage

     This makes selected hotel image continue
     from CreateTrip -> BookingDetails -> BookingSummary.
  ========================================================= */

  useEffect(() => {
    try {
      const stateData = location.state;

      const storedTrip = JSON.parse(
        localStorage.getItem("tripperTrip") || "null"
      );

      /*
        If BookingDetails sends final booking through
        navigate("/booking-summary", { state: finalBooking })
        then stateData will be used first.
      */

      if (stateData && typeof stateData === "object") {
        setTrip(stateData);

        /*
          Also save latest booking data so refresh does
          not remove selected hotel information.
        */

        localStorage.setItem(
          "tripperTrip",
          JSON.stringify(stateData)
        );

        return;
      }

      if (storedTrip) {
        setTrip(storedTrip);
        return;
      }

      setTrip(null);
    } catch (error) {
      console.error(
        "Trip data error:",
        error
      );

      setTrip(null);
    }
  }, [location.state]);

  /* =========================================================
     SELECTED HOTEL

     HOTEL IMAGE HAS FIRST PRIORITY
  ========================================================= */

  const selectedHotel = useMemo(() => {
    if (!trip) return null;

    /*
      Main expected structure:

      trip.hotel.image
    */

    if (
      trip.hotel &&
      typeof trip.hotel === "object"
    ) {
      return trip.hotel;
    }

    /*
      Backup structure in case BookingDetails
      stored hotel inside bookingDetails.
    */

    if (
      trip.bookingDetails &&
      trip.bookingDetails.hotel
    ) {
      return trip.bookingDetails.hotel;
    }

    return null;
  }, [trip]);

  /* =========================================================
     HOTEL IMAGE

     SELECTED HOTEL IMAGE FIRST
  ========================================================= */

  const hotelImage =
    selectedHotel?.image ||
    trip?.hotelImage ||
    trip?.image ||
    FALLBACK_IMAGE;

  /* =========================================================
     TOTAL PRICE
  ========================================================= */

  const totalAmount = useMemo(() => {
    if (!trip) {
      return 0;
    }

    /*
      BookingDetails ka final total first priority.
    */

    const tripTotal = Number(
      trip.total || 0
    );

    if (tripTotal > 0) {
      return tripTotal;
    }

    /*
      Old totalBudget support.
    */

    const savedTotal = Number(
      trip.totalBudget || 0
    );

    if (savedTotal > 0) {
      return savedTotal;
    }

    /*
      Last fallback.
    */

    return getBudgetAmount(
      trip.budget
    );
  }, [trip]);

  /* =========================================================
     INPUT HANDLER
  ========================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    let updatedValue = value;

    /* =====================================================
       CARD NUMBER
    ===================================================== */

    if (name === "cardNumber") {
      const digits = value
        .replace(/\D/g, "")
        .slice(0, 16);

      updatedValue = digits
        .replace(
          /(\d{4})(?=\d)/g,
          "$1 "
        )
        .trim();
    }

    /* =====================================================
       CARD HOLDER NAME
    ===================================================== */

    if (name === "cardName") {
      updatedValue = value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );
    }

    /* =====================================================
       EXPIRY
    ===================================================== */

    if (name === "expiry") {
      const digits = value
        .replace(/\D/g, "")
        .slice(0, 4);

      if (digits.length >= 3) {
        updatedValue =
          `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        updatedValue = digits;
      }
    }

    /* =====================================================
       CVV
    ===================================================== */

    if (name === "cvv") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 3);
    }

    /* =====================================================
       UPI
    ===================================================== */

    if (name === "upi") {
      updatedValue = value
        .replace(/\s/g, "")
        .toLowerCase();
    }

    setPaymentDetails(
      (previous) => ({
        ...previous,
        [name]: updatedValue,
      })
    );

    setErrors(
      (previous) => ({
        ...previous,
        [name]: "",
        payment: "",
      })
    );
  };

  /* =========================================================
     VALIDATE PAYMENT
  ========================================================= */

  const validatePayment = () => {
    const newErrors = {};

    /* =====================================================
       CARD
    ===================================================== */

    if (paymentMethod === "card") {
      const cardNumber =
        cleanNumber(
          paymentDetails.cardNumber
        );

      /*
        ANY 16 DIGIT CARD NUMBER ACCEPTED.

        No Luhn validation.
      */

      if (!cardNumber) {
        newErrors.cardNumber =
          "Card number is required";
      } else if (
        cardNumber.length !== 16
      ) {
        newErrors.cardNumber =
          "Card number must be 16 digits";
      }

      /* CARD NAME */

      if (
        !paymentDetails.cardName.trim()
      ) {
        newErrors.cardName =
          "Cardholder name is required";
      } else if (
        paymentDetails.cardName.trim()
          .length < 3
      ) {
        newErrors.cardName =
          "Enter a valid cardholder name";
      }

      /* EXPIRY */

      if (!paymentDetails.expiry) {
        newErrors.expiry =
          "Expiry date is required";
      } else {
        const expiryError =
          validateExpiry(
            paymentDetails.expiry
          );

        if (expiryError) {
          newErrors.expiry =
            expiryError;
        }
      }

      /* CVV */

      if (!paymentDetails.cvv) {
        newErrors.cvv =
          "CVV is required";
      } else if (
        !/^\d{3}$/.test(
          paymentDetails.cvv
        )
      ) {
        newErrors.cvv =
          "CVV must be exactly 3 digits";
      }
    }

    /* =====================================================
       UPI
    ===================================================== */

    if (paymentMethod === "upi") {
      if (!paymentDetails.upi) {
        newErrors.upi =
          "UPI ID is required";
      } else if (
        !/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(
          paymentDetails.upi
        )
      ) {
        newErrors.upi =
          "Enter a valid UPI ID";
      }
    }

    /* =====================================================
       NET BANKING
    ===================================================== */

    if (
      paymentMethod === "netbanking"
    ) {
      if (!paymentDetails.bank) {
        newErrors.bank =
          "Please select your bank";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =========================================================
     PAYMENT
  ========================================================= */

  const handlePayment = () => {
    if (!trip) {
      return;
    }

    const isValid =
      validatePayment();

    if (!isValid) {
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const newBookingId =
        `BK-${Date.now()}`;

      const newTransactionId =
        `TXN-${Date.now()}`;

      let existingBookings = [];

      try {
        existingBookings =
          JSON.parse(
            localStorage.getItem(
              "tripBookings"
            ) || "[]"
          );

        if (
          !Array.isArray(
            existingBookings
          )
        ) {
          existingBookings = [];
        }
      } catch {
        existingBookings = [];
      }

      /* =====================================================
         NEW BOOKING

         IMPORTANT:
         Selected hotel + selected hotel image
         is saved here.
      ===================================================== */

      const newBooking = {
        id: newBookingId,

        destination:
          trip.destination ||
          "Your Trip",

        country:
          trip.country ||
          "India",

        date:
          trip.date ||
          trip.tripDates?.start ||
          "",

        days:
          trip.days ||
          trip.tripDates?.days ||
          1,

        travellers:
          trip.travellers ||
          trip.adults ||
          1,

        budget:
          trip.budget ||
          "",

        totalBudget:
          totalAmount,

        total:
          totalAmount,

        travelType:
          trip.travelType ||
          trip.tripType ||
          "Solo",

        style:
          trip.style ||
          "Relaxed",

        stay:
          trip.stay ||
          "Any",

        transport:
          trip.transport ||
          "Any",

        interests:
          Array.isArray(
            trip.interests
          )
            ? trip.interests
            : [],

        /*
          IMPORTANT:
          Hotel image first.
        */

        image:
          selectedHotel?.image ||
          trip.hotelImage ||
          trip.image ||
          FALLBACK_IMAGE,

        /*
          Complete selected hotel.
        */

        hotel: selectedHotel
          ? {
              name:
                selectedHotel.name ||
                "Selected Hotel",

              location:
                selectedHotel.location ||
                trip.destination ||
                "",

              image:
                selectedHotel.image ||
                FALLBACK_IMAGE,

              rating:
                selectedHotel.rating ||
                "",

              reviews:
                selectedHotel.reviews ||
                "",
            }
          : null,

        status:
          "Confirmed",

        paymentStatus:
          "Paid",

        paymentMethod,

        transactionId:
          newTransactionId,

        itinerary:
          Array.isArray(
            trip.itinerary
          )
            ? trip.itinerary
            : [],

        bookedAt:
          new Date().toISOString(),
      };

      /* =====================================================
         SAVE BOOKING
      ===================================================== */

      localStorage.setItem(
        "tripBookings",
        JSON.stringify([
          newBooking,
          ...existingBookings,
        ])
      );

      /* =====================================================
         SAVE FINAL TRIP ALSO

         This keeps selected hotel image after refresh.
      ===================================================== */

      const finalTrip = {
        ...trip,

        image:
          selectedHotel?.image ||
          trip.hotelImage ||
          trip.image ||
          FALLBACK_IMAGE,

        hotel:
          selectedHotel
            ? {
                ...selectedHotel,
                image:
                  selectedHotel.image ||
                  FALLBACK_IMAGE,
              }
            : trip.hotel || null,

        totalBudget:
          totalAmount,

        total:
          totalAmount,
      };

      localStorage.setItem(
        "tripperTrip",
        JSON.stringify(finalTrip)
      );

      window.dispatchEvent(
        new Event(
          "tripBookingsUpdated"
        )
      );

      setBookingId(
        newBookingId
      );

      setTransactionId(
        newTransactionId
      );

      setProcessing(false);

      setPaymentSuccess(true);
    }, 1500);
  };

  /* =========================================================
     NO TRIP
  ========================================================= */

  if (
    !trip &&
    !paymentSuccess
  ) {
    return (
      <div className="booking-summary-page">
        <div className="booking-empty">
          <h2>
            No trip found
          </h2>

          <p>
            Please create your trip
            before continuing to payment.
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
      </div>
    );
  }

  /* =========================================================
     SUCCESS
  ========================================================= */

  if (paymentSuccess) {
    return (
      <div className="booking-summary-page">
        <div className="payment-success-card">

          <div className="success-icon">
            <FiCheck />
          </div>

          <span className="success-label">
            PAYMENT SUCCESSFUL
          </span>

          <h1>
            Booking Confirmed
          </h1>

          <p className="success-description">
            Your trip has been successfully
            booked. Your booking details are
            now available in My Bookings.
          </p>

          <div className="success-details">

            <div>
              <span>
                Booking ID
              </span>

              <strong>
                {bookingId}
              </strong>
            </div>

            <div>
              <span>
                Transaction ID
              </span>

              <strong>
                {transactionId}
              </strong>
            </div>

            <div>
              <span>
                Amount Paid
              </span>

              <strong>
                {formatPrice(
                  totalAmount
                )}
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="success-bookings-btn"
            onClick={() =>
              navigate("/booking")
            }
          >
            View My Bookings
          </button>

        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN CHECKOUT
  ========================================================= */

  return (
    <div className="booking-summary-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="checkout-header">

        <button
          type="button"
          className="checkout-back"
          onClick={() =>
            navigate(-1)
          }
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="checkout-title">

          <span>
            TRIPPER CHECKOUT
          </span>

          <h1>
            Complete your booking
          </h1>

        </div>

        <div className="secure-label">

          <FiLock />

          Secure Checkout

        </div>

      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="checkout-progress">

        <div className="progress-step active">
          <span>1</span>
          <p>Review</p>
        </div>

        <div className="progress-line active-line" />

        <div className="progress-step active">
          <span>2</span>
          <p>Payment</p>
        </div>

        <div className="progress-line" />

        <div className="progress-step">
          <span>3</span>
          <p>Confirmation</p>
        </div>

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="checkout-layout">

        {/* ===================================================
            LEFT PAYMENT
        =================================================== */}

        <section className="payment-section">

          <div className="section-heading">

            <div>

              <span className="section-eyebrow">
                PAYMENT
              </span>

              <h2>
                Choose payment method
              </h2>

              <p>
                Pay securely to confirm your trip.
              </p>

            </div>

            <div className="payment-security">

              <FiShield />

              <span>
                Secure payment
              </span>

            </div>

          </div>

          {/* =================================================
              PAYMENT METHODS
          ================================================= */}

          <div className="payment-methods">

            {/* CARD */}

            <button
              type="button"
              className={
                paymentMethod === "card"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setPaymentMethod("card");
                setErrors({});
              }}
            >

              <FiCreditCard />

              <span>

                <strong>
                  Card
                </strong>

                <small>
                  Credit / Debit
                </small>

              </span>

            </button>

            {/* UPI */}

            <button
              type="button"
              className={
                paymentMethod === "upi"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setPaymentMethod("upi");
                setErrors({});
              }}
            >

              <span className="upi-symbol">
                UPI
              </span>

              <span>

                <strong>
                  UPI
                </strong>

                <small>
                  Google Pay / PhonePe
                </small>

              </span>

            </button>

            {/* NET BANKING */}

            <button
              type="button"
              className={
                paymentMethod === "netbanking"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setPaymentMethod(
                  "netbanking"
                );

                setErrors({});
              }}
            >

              <span className="bank-symbol">
                ₹
              </span>

              <span>

                <strong>
                  Net Banking
                </strong>

                <small>
                  All major banks
                </small>

              </span>

            </button>

          </div>

          {/* =================================================
              CARD FORM
          ================================================= */}

          {paymentMethod === "card" && (
            <div className="payment-form">

              {/* DEMO CARD */}

              <div className="demo-card">

                <div className="demo-card-top">

                  <span>
                    TRIPPER
                  </span>

                  <span>
                    VISA
                  </span>

                </div>

                <div className="demo-card-number">

                  {paymentDetails.cardNumber ||
                    "•••• •••• •••• ••••"}

                </div>

                <div className="demo-card-bottom">

                  <div>

                    <small>
                      CARDHOLDER
                    </small>

                    <strong>
                      {paymentDetails.cardName ||
                        "YOUR NAME"}
                    </strong>

                  </div>

                  <div>

                    <small>
                      EXPIRES
                    </small>

                    <strong>
                      {paymentDetails.expiry ||
                        "MM/YY"}
                    </strong>

                  </div>

                </div>

              </div>

              {/* FORM */}

              <div className="form-grid">

                {/* CARD NUMBER */}

                <div className="form-field full-field">

                  <label>
                    Card Number
                  </label>

                  <input
                    type="text"
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={
                      paymentDetails.cardNumber
                    }
                    onChange={handleChange}
                  />

                  {errors.cardNumber && (
                    <small className="field-error">
                      {errors.cardNumber}
                    </small>
                  )}

                </div>

                {/* CARD HOLDER */}

                <div className="form-field full-field">

                  <label>
                    Cardholder Name
                  </label>

                  <input
                    type="text"
                    name="cardName"
                    autoComplete="cc-name"
                    placeholder="Enter name as on card"
                    value={
                      paymentDetails.cardName
                    }
                    onChange={handleChange}
                  />

                  {errors.cardName && (
                    <small className="field-error">
                      {errors.cardName}
                    </small>
                  )}

                </div>

                {/* EXPIRY */}

                <div className="form-field">

                  <label>
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={
                      paymentDetails.expiry
                    }
                    onChange={handleChange}
                  />

                  {errors.expiry && (
                    <small className="field-error">
                      {errors.expiry}
                    </small>
                  )}

                </div>

                {/* CVV */}

                <div className="form-field">

                  <label>
                    CVV
                  </label>

                  <input
                    type="password"
                    name="cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="•••"
                    maxLength={3}
                    value={
                      paymentDetails.cvv
                    }
                    onChange={handleChange}
                  />

                  {errors.cvv && (
                    <small className="field-error">
                      {errors.cvv}
                    </small>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              UPI
          ================================================= */}

          {paymentMethod === "upi" && (
            <div className="payment-form simple-payment">

              <div className="payment-icon-large">
                UPI
              </div>

              <h3>
                Pay using UPI
              </h3>

              <p>
                Enter your UPI ID to continue.
              </p>

              <div className="form-field">

                <label>
                  UPI ID
                </label>

                <input
                  type="text"
                  name="upi"
                  placeholder="yourname@upi"
                  value={
                    paymentDetails.upi
                  }
                  onChange={handleChange}
                />

                {errors.upi && (
                  <small className="field-error">
                    {errors.upi}
                  </small>
                )}

              </div>

              <div className="upi-hint">
                Example: name@okaxis
              </div>

            </div>
          )}

          {/* =================================================
              NET BANKING
          ================================================= */}

          {paymentMethod === "netbanking" && (
            <div className="payment-form simple-payment">

              <div className="payment-icon-large">
                ₹
              </div>

              <h3>
                Net Banking
              </h3>

              <p>
                Select your bank to continue.
              </p>

              <div className="form-field">

                <label>
                  Select Bank
                </label>

                <select
                  name="bank"
                  value={
                    paymentDetails.bank
                  }
                  onChange={handleChange}
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

                  <option value="other">
                    Other Bank
                  </option>

                </select>

                {errors.bank && (
                  <small className="field-error">
                    {errors.bank}
                  </small>
                )}

              </div>

            </div>
          )}

          {/* =================================================
              PAYMENT BUTTON
          ================================================= */}

          <button
            type="button"
            className="pay-button"
            onClick={handlePayment}
            disabled={processing}
          >

            {processing ? (
              <>
                <span className="payment-loader" />

                Processing Payment...
              </>
            ) : (
              <>
                <FiLock />

                Pay{" "}
                {formatPrice(
                  totalAmount
                )}
                {" "}
                Securely
              </>
            )}

          </button>

          <div className="payment-note">

            <FiShield />

            <span>
              Your payment information is protected.
              Never share your card PIN or OTP.
            </span>

          </div>

        </section>

        {/* ===================================================
            RIGHT SUMMARY
        =================================================== */}

        <aside className="trip-summary">

          <div className="summary-heading">

            <span>
              YOUR TRIP
            </span>

            <h2>
              Booking Summary
            </h2>

          </div>

          {/* =================================================
              SELECTED HOTEL IMAGE
          ================================================= */}

          <div className="summary-image">

            <img
              key={hotelImage}
              src={hotelImage}
              alt={
                selectedHotel?.name ||
                trip?.destination ||
                "Selected Hotel"
              }
              onError={(event) => {
                if (
                  event.currentTarget.src !==
                  FALLBACK_IMAGE
                ) {
                  event.currentTarget.src =
                    FALLBACK_IMAGE;
                }
              }}
            />

            <div className="summary-image-overlay">

              <span>

                <FiMapPin />

                {selectedHotel?.location ||
                  trip?.country ||
                  trip?.destination ||
                  "India"}

              </span>

            </div>

          </div>

          {/* =================================================
              SELECTED HOTEL DETAILS
          ================================================= */}

          {selectedHotel && (
            <div className="summary-hotel-details">

              <span className="summary-hotel-label">
                SELECTED HOTEL
              </span>

              <h3>
                {selectedHotel.name ||
                  "Selected Hotel"}
              </h3>

              <p>
                <FiMapPin />

                {selectedHotel.location ||
                  trip?.destination ||
                  "India"}
              </p>

              {selectedHotel.rating && (
                <div className="summary-rating">

                  <FiStar />

                  <strong>
                    {selectedHotel.rating}
                  </strong>

                  {selectedHotel.reviews && (
                    <span>
                      {selectedHotel.reviews}
                    </span>
                  )}

                </div>
              )}

            </div>
          )}

          {/* =================================================
              DESTINATION
          ================================================= */}

          <div className="summary-destination">

            <h3>
              {trip.destination ||
                "Your Trip"}
            </h3>

            <p>
              {trip.country ||
                "India"}
            </p>

          </div>

          {/* =================================================
              DETAILS
          ================================================= */}

          <div className="summary-details">

            {/* DATE */}

            <div className="summary-detail">

              <FiCalendar />

              <div>

                <span>
                  Travel Date
                </span>

                <strong>
                  {formatDate(
                    trip.date ||
                    trip.tripDates?.start
                  )}
                </strong>

              </div>

            </div>

            {/* DURATION */}

            <div className="summary-detail">

              <FiClock />

              <div>

                <span>
                  Duration
                </span>

                <strong>

                  {trip.days ||
                    trip.tripDates?.days ||
                    1}

                  {" "}

                  {Number(
                    trip.days ||
                    trip.tripDates?.days ||
                    1
                  ) === 1
                    ? "Day"
                    : "Days"}

                </strong>

              </div>

            </div>

            {/* TRAVELLERS */}

            <div className="summary-detail">

              <FiUsers />

              <div>

                <span>
                  Travellers
                </span>

                <strong>

                  {trip.travellers ||
                    trip.adults ||
                    1}

                  {" "}

                  {Number(
                    trip.travellers ||
                    trip.adults ||
                    1
                  ) === 1
                    ? "Traveller"
                    : "Travellers"}

                </strong>

              </div>

            </div>

          </div>

          <div className="summary-divider" />

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="summary-price">

            <span>
              Trip Total
            </span>

            <strong>
              {formatPrice(
                totalAmount
              )}
            </strong>

          </div>

          {/* =================================================
              INCLUDED
          ================================================= */}

          <div className="summary-included">

            <FiCheck />

            <span>
              Trip price included
            </span>

          </div>

          <div className="summary-included">

            <FiCheck />

            <span>
              Secure payment
            </span>

          </div>

          <div className="summary-included">

            <FiCheck />

            <span>
              Booking confirmation included
            </span>

          </div>

        </aside>

      </main>

    </div>
  );
};

export default BookingSummary;