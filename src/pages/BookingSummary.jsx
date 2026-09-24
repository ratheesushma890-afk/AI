import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  FiHome,
  FiCompass,
  FiNavigation,
} from "react-icons/fi";

import "./BookingSummary.css";

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (value) => {
  if (!value) return "Not selected";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   CLEAN NUMBER
========================================================= */

const cleanNumber = (value) => {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const number = Number(
    String(value)
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .replace(/\s/g, "")
  );

  return Number.isFinite(number) ? number : 0;
};

/* =========================================================
   FORMAT PRICE
========================================================= */

const formatPrice = (value) => {
  const number = cleanNumber(value);

  if (!number) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

/* =========================================================
   EXPIRY VALIDATION
========================================================= */

const validateExpiry = (value) => {
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return false;
  }

  const [month, year] = value.split("/").map(Number);

  if (month < 1 || month > 12) {
    return false;
  }

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear) {
    return false;
  }

  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
};

/* =========================================================
   NORMALIZE BUDGET
========================================================= */

const normalizeBudget = (value = "") => {
  return String(value)
    .replace(/\s/g, "")
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .toLowerCase();
};

/* =========================================================
   BUDGET PAYMENT AMOUNT

   Plan Trip ka selected budget same rahega.
   Ye sirf demo payment amount ke liye hai.
========================================================= */

const getBudgetPaymentAmount = (budget) => {
  const value = normalizeBudget(budget);

  if (!value) return 0;

  if (value.includes("5000-10000")) {
    return 7500;
  }

  if (value.includes("10000-25000")) {
    return 17500;
  }

  if (value.includes("25000-50000")) {
    return 37500;
  }

  if (value.includes("50000-100000")) {
    return 75000;
  }

  if (value.includes("100000-200000")) {
    return 150000;
  }

  if (value.includes("200000-300000")) {
    return 250000;
  }

  if (value.includes("300000-500000")) {
    return 400000;
  }

  return 0;
};

/* =========================================================
   GET TOTAL
========================================================= */

const getActualTotal = (trip) => {
  if (!trip) return 0;

  const total = cleanNumber(trip.total);

  if (total > 0) {
    return total;
  }

  const totalBudget = cleanNumber(trip.totalBudget);

  if (totalBudget > 0) {
    return totalBudget;
  }

  const finalTotal = cleanNumber(trip.finalTotal);

  if (finalTotal > 0) {
    return finalTotal;
  }

  return getBudgetPaymentAmount(trip.budget);
};

/* =========================================================
   COMPONENT
========================================================= */

const BookingSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     STATES
  ======================================================= */

  const [trip, setTrip] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bank: "",
  });

  const [errors, setErrors] = useState({});

  const [processing, setProcessing] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [bookingId, setBookingId] = useState("");

  const [transactionId, setTransactionId] = useState("");

  /* =======================================================
     LOAD TRIP
  ======================================================= */

  useEffect(() => {
    const stateTrip =
      location.state?.trip ||
      location.state ||
      null;

    const savedTrip =
      localStorage.getItem("tripperTrip");

    let localTrip = null;

    if (savedTrip) {
      try {
        localTrip = JSON.parse(savedTrip);
      } catch (error) {
        console.error("Unable to read saved trip:", error);
      }
    }

    const finalTrip =
      stateTrip &&
      typeof stateTrip === "object" &&
      Object.keys(stateTrip).length > 0
        ? stateTrip
        : localTrip;

    if (finalTrip) {
      setTrip(finalTrip);

      localStorage.setItem(
        "tripperTrip",
        JSON.stringify(finalTrip)
      );
    }
  }, [location.state]);

  /* =======================================================
     TOTAL
  ======================================================= */

  const totalAmount = useMemo(() => {
    return getActualTotal(trip);
  }, [trip]);

  /* =======================================================
     EXACT BUDGET
  ======================================================= */

  const selectedBudget = useMemo(() => {
    if (!trip?.budget) {
      return "Budget not selected";
    }

    return trip.budget;
  }, [trip]);

  /* =======================================================
     HOTEL
  ======================================================= */

  const selectedHotel = useMemo(() => {
    if (!trip) return null;

    return (
      trip.hotel ||
      trip.bookingDetails?.hotel ||
      null
    );
  }, [trip]);

  /* =======================================================
     HOTEL IMAGE
  ======================================================= */

  const hotelImage = useMemo(() => {
    if (!trip) {
      return FALLBACK_IMAGE;
    }

    return (
      selectedHotel?.image ||
      trip.hotelImage ||
      trip.image ||
      trip.destinationData?.image ||
      FALLBACK_IMAGE
    );
  }, [trip, selectedHotel]);

  /* =======================================================
     HOTEL NAME
  ======================================================= */

  const hotelName = useMemo(() => {
    if (!trip) {
      return "Selected Stay";
    }

    return (
      selectedHotel?.name ||
      trip.hotelName ||
      trip.bookingDetails?.hotelName ||
      `${trip.stay || "Hotel"} in ${
        trip.destination || "your destination"
      }`
    );
  }, [trip, selectedHotel]);

  /* =======================================================
     HOTEL RATING
  ======================================================= */

  const hotelRating = useMemo(() => {
    return (
      selectedHotel?.rating ||
      trip?.hotelRating ||
      "4.5"
    );
  }, [trip, selectedHotel]);

  /* =======================================================
     PAYMENT INPUT
  ======================================================= */

  const handlePaymentChange = (field, value) => {
    let nextValue = value;

    /* CARD NUMBER */

    if (field === "cardNumber") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    /* EXPIRY */

    if (field === "expiry") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 4);

      if (nextValue.length > 2) {
        nextValue =
          nextValue.slice(0, 2) +
          "/" +
          nextValue.slice(2);
      }
    }

    /* CVV - ONLY 3 DIGITS */

    if (field === "cvv") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 3);
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [field]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* =======================================================
     VALIDATE PAYMENT
  ======================================================= */

  const validatePayment = () => {
    const newErrors = {};

    /* CARD */

    if (paymentMethod === "card") {
      const cardName =
        paymentDetails.cardName.trim();

      const cardNumber =
        paymentDetails.cardNumber.replace(/\s/g, "");

      const expiry =
        paymentDetails.expiry.trim();

      const cvv =
        paymentDetails.cvv.trim();

      if (!cardName) {
        newErrors.cardName =
          "Enter card holder name";
      }

      if (
        !cardNumber ||
        cardNumber.length !== 16
      ) {
        newErrors.cardNumber =
          "Enter 16 digit card number";
      }

      if (!validateExpiry(expiry)) {
        newErrors.expiry =
          "Enter valid MM/YY";
      }

      if (
        !cvv ||
        cvv.length !== 3
      ) {
        newErrors.cvv =
          "Enter 3 digit CVV";
      }
    }

    /* UPI */

    if (paymentMethod === "upi") {
      if (!paymentDetails.upiId.trim()) {
        newErrors.upiId =
          "Enter UPI ID";
      }
    }

    /* NET BANKING */

    if (paymentMethod === "netbanking") {
      if (!paymentDetails.bank) {
        newErrors.bank =
          "Select your bank";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     PAYMENT
  ======================================================= */

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!trip) return;

    if (!validatePayment()) return;

    const paymentAmount = totalAmount;

    if (!paymentAmount) {
      alert(
        "Trip total is not available. Please go back and complete your trip plan."
      );
      return;
    }

    setProcessing(true);

    try {
      /* DEMO PAYMENT */

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      const newBookingId =
        `TRIP-${Date.now()
          .toString()
          .slice(-8)}`;

      const newTransactionId =
        `TXN-${Date.now()
          .toString()
          .slice(-10)}`;

      const finalTrip = {
        ...trip,

        /* SAME BUDGET */

        budget: trip.budget,

        /* TOTAL */

        total: paymentAmount,

        paymentStatus: "paid",

        bookingId: newBookingId,

        transactionId: newTransactionId,

        hotel:
          selectedHotel || trip.hotel,

        hotelImage,

        paidAt:
          new Date().toISOString(),
      };

      /* SAVE BOOKINGS */

      const existingBookings =
        JSON.parse(
          localStorage.getItem(
            "tripBookings"
          ) || "[]"
        );

      existingBookings.push(finalTrip);

      localStorage.setItem(
        "tripBookings",
        JSON.stringify(existingBookings)
      );

      localStorage.setItem(
        "tripperTrip",
        JSON.stringify(finalTrip)
      );

      localStorage.setItem(
        "tripPaymentDone",
        "true"
      );

      window.dispatchEvent(
        new Event("tripBookingsUpdated")
      );

      setBookingId(newBookingId);

      setTransactionId(
        newTransactionId
      );

      setPaymentSuccess(true);
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      alert(
        "Payment failed. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  /* =======================================================
     NO TRIP
  ======================================================= */

  if (!trip) {
    return (
      <main className="booking-summary-page">
        <div className="booking-empty">
          <FiMapPin />

          <h2>No trip found</h2>

          <p>
            Please create your trip first.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/trip-plan")
            }
          >
            Plan Your Trip
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     PAYMENT SUCCESS
  ======================================================= */

  if (paymentSuccess) {
    return (
      <main className="booking-summary-page">
        <div className="payment-success-card">

          <div className="success-icon">
            <FiCheck />
          </div>

          <span className="success-label">
            PAYMENT SUCCESSFUL
          </span>

          <h1>
            Your trip is booked!
          </h1>

          <p className="success-description">
            Your personalized trip to{" "}
            <strong>
              {trip.destination}
            </strong>{" "}
            has been confirmed.
          </p>

          <div className="success-details">

            <div>
              <span>Booking ID</span>
              <strong>
                {bookingId}
              </strong>
            </div>

            <div>
              <span>Transaction ID</span>
              <strong>
                {transactionId}
              </strong>
            </div>

            <div>
              <span>Trip Total</span>
              <strong>
                {formatPrice(totalAmount)}
              </strong>
            </div>

            <div>
              <span>Selected Budget</span>
              <strong>
                {selectedBudget}
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="success-bookings-btn"
            onClick={() =>
              navigate("/booking", {
                state: {
                  trip: {
                    ...trip,
                    total: totalAmount,
                    budget: selectedBudget,
                    bookingId,
                    transactionId,
                  },
                },
              })
            }
          >
            View My Booking
          </button>

        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <main className="booking-summary-page">

      {/* HEADER */}

      <header className="checkout-header">

        <button
          type="button"
          className="checkout-back"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>

        <div className="checkout-title">
          <span>TRIPPER</span>
          <h1>Booking Summary</h1>
        </div>

        <div className="secure-label">
          <FiLock />
          <span>Secure Checkout</span>
        </div>

      </header>

      {/* PROGRESS */}

      <div className="checkout-progress">

        <div className="progress-step done">
          <span>1</span>
          <small>Plan Trip</small>
        </div>

        <div className="progress-line done" />

        <div className="progress-step done">
          <span>2</span>
          <small>Trip Details</small>
        </div>

        <div className="progress-line done" />

        <div className="progress-step active">
          <span>3</span>
          <small>Payment</small>
        </div>

      </div>

      {/* CONTENT */}

      <section className="checkout-layout">

        {/* =================================================
            LEFT PAYMENT
        ================================================= */}

        <div className="payment-section">

          <div className="section-heading">

            <div>

              <span className="section-eyebrow">
                PAYMENT
              </span>

              <h2>
                Complete your booking
              </h2>

              <p>
                Pay securely to confirm
                your personalized trip.
              </p>

            </div>

            <div className="payment-security">
              <FiShield />
              <span>100% Secure</span>
            </div>

          </div>

          {/* PAYMENT METHODS */}

          <div className="payment-methods">

            {/* CARD */}

            <button
              type="button"
              className={`payment-method ${
                paymentMethod === "card"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod("card")
              }
            >
              <FiCreditCard />

              <div>
                <strong>Card</strong>

                <span>
                  Credit / Debit Card
                </span>
              </div>
            </button>

            {/* UPI */}

            <button
              type="button"
              className={`payment-method ${
                paymentMethod === "upi"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod("upi")
              }
            >
              <span className="upi-symbol">
                UPI
              </span>

              <div>
                <strong>UPI</strong>

                <span>
                  Google Pay / PhonePe / Paytm
                </span>
              </div>
            </button>

            {/* NET BANKING */}

            <button
              type="button"
              className={`payment-method ${
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
              <span className="bank-symbol">
                ₹
              </span>

              <div>
                <strong>
                  Net Banking
                </strong>

                <span>
                  Pay using your bank
                </span>
              </div>
            </button>

          </div>

          {/* PAYMENT FORM */}

          <form
            className="payment-form"
            onSubmit={handlePayment}
          >

            {/* =================================================
                CARD FORM
            ================================================= */}

            {paymentMethod === "card" && (
              <>

                <div className="demo-card">

                  <div>
                    <span>
                      Demo Payment
                    </span>

                    <strong>
                      Enter any test card details
                    </strong>
                  </div>

                  <FiCreditCard />

                </div>

                <div className="form-grid">

                  {/* CARD HOLDER */}

                  <label className="form-field full-field">

                    <span>
                      Card Holder Name
                    </span>

                    <input
                      type="text"
                      placeholder="Enter name on card"
                      value={
                        paymentDetails.cardName
                      }
                      onChange={(e) =>
                        handlePaymentChange(
                          "cardName",
                          e.target.value
                        )
                      }
                    />

                    {errors.cardName && (
                      <small className="field-error">
                        {errors.cardName}
                      </small>
                    )}

                  </label>

                  {/* CARD NUMBER */}

                  <label className="form-field full-field">

                    <span>
                      Card Number
                    </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={
                        paymentDetails.cardNumber
                      }
                      onChange={(e) =>
                        handlePaymentChange(
                          "cardNumber",
                          e.target.value
                        )
                      }
                    />

                    {errors.cardNumber && (
                      <small className="field-error">
                        {errors.cardNumber}
                      </small>
                    )}

                  </label>

                  {/* EXPIRY */}

                  <label className="form-field">

                    <span>
                      Expiry
                    </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={
                        paymentDetails.expiry
                      }
                      onChange={(e) =>
                        handlePaymentChange(
                          "expiry",
                          e.target.value
                        )
                      }
                    />

                    {errors.expiry && (
                      <small className="field-error">
                        {errors.expiry}
                      </small>
                    )}

                  </label>

                  {/* CVV */}

                  <label className="form-field">

                    <span>
                      CVV
                    </span>

                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={3}
                      placeholder="•••"
                      value={
                        paymentDetails.cvv
                      }
                      onChange={(e) =>
                        handlePaymentChange(
                          "cvv",
                          e.target.value
                        )
                      }
                    />

                    {errors.cvv && (
                      <small className="field-error">
                        {errors.cvv}
                      </small>
                    )}

                  </label>

                </div>

              </>
            )}

            {/* =================================================
                UPI
            ================================================= */}

            {paymentMethod === "upi" && (
              <div className="simple-payment">

                <div className="payment-icon-large">
                  UPI
                </div>

                <h3>
                  Pay with UPI
                </h3>

                <p>
                  Enter your UPI ID to
                  continue.
                </p>

                <label className="form-field full-field">

                  <span>
                    UPI ID
                  </span>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={
                      paymentDetails.upiId
                    }
                    onChange={(e) =>
                      handlePaymentChange(
                        "upiId",
                        e.target.value
                      )
                    }
                  />

                  {errors.upiId && (
                    <small className="field-error">
                      {errors.upiId}
                    </small>
                  )}

                </label>

                <div className="upi-hint">
                  Google Pay, PhonePe,
                  Paytm and other UPI apps
                  are supported.
                </div>

              </div>
            )}

            {/* =================================================
                NET BANKING
            ================================================= */}

            {paymentMethod ===
              "netbanking" && (
              <div className="simple-payment">

                <div className="payment-icon-large">
                  ₹
                </div>

                <h3>
                  Net Banking
                </h3>

                <p>
                  Select your bank to
                  continue.
                </p>

                <label className="form-field full-field">

                  <span>
                    Select Bank
                  </span>

                  <select
                    value={
                      paymentDetails.bank
                    }
                    onChange={(e) =>
                      handlePaymentChange(
                        "bank",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option value="HDFC Bank">
                      HDFC Bank
                    </option>

                    <option value="ICICI Bank">
                      ICICI Bank
                    </option>

                    <option value="SBI">
                      State Bank of India
                    </option>

                    <option value="Axis Bank">
                      Axis Bank
                    </option>

                    <option value="Kotak Bank">
                      Kotak Mahindra Bank
                    </option>

                  </select>

                  {errors.bank && (
                    <small className="field-error">
                      {errors.bank}
                    </small>
                  )}

                </label>

              </div>
            )}

            {/* PAY BUTTON */}

            <button
              type="submit"
              className="pay-button"
              disabled={processing}
            >

              {processing ? (
                <>
                  <span className="payment-loader" />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay {formatPrice(totalAmount)}

                  <FiArrowLeft
                    style={{
                      transform:
                        "rotate(180deg)",
                    }}
                  />
                </>
              )}

            </button>

            <div className="payment-note">
              <FiLock />

              <span>
                Demo payment only. Your
                payment information is not
                sent to a real payment gateway.
              </span>
            </div>

          </form>

        </div>

        {/* =================================================
            RIGHT SUMMARY
        ================================================= */}

        <aside className="trip-summary">

          <div className="summary-heading">

            <div>
              <span>YOUR TRIP</span>

              <h2>
                Booking Details
              </h2>
            </div>

            <FiCheck />

          </div>

          {/* IMAGE */}

          <div className="summary-image">

            <img
              src={hotelImage}
              alt={
                trip.destination ||
                "Trip"
              }
              onError={(e) => {
                e.currentTarget.src =
                  FALLBACK_IMAGE;
              }}
            />

            <div className="summary-image-overlay">

              <span>
                {trip.destination ||
                  "Destination"}
              </span>

            </div>

          </div>

          {/* HOTEL */}

          <div className="summary-hotel-details">

            <div className="summary-hotel-top">

              <span className="summary-hotel-label">
                SELECTED STAY
              </span>

              <span className="summary-rating">
                <FiStar />
                {hotelRating}
              </span>

            </div>

            <h3>
              {hotelName}
            </h3>

            <div className="summary-destination">

              <FiMapPin />

              <span>
                {trip.destination}
              </span>

            </div>

          </div>

          {/* DETAILS */}

          <div className="summary-details">

            <div className="summary-detail">

              <FiCalendar />

              <div>
                <small>
                  TRAVEL DATE
                </small>

                <strong>
                  {formatDate(trip.date)}
                </strong>
              </div>

            </div>

            <div className="summary-detail">

              <FiClock />

              <div>
                <small>
                  DURATION
                </small>

                <strong>
                  {trip.days || 3} Days
                </strong>
              </div>

            </div>

            <div className="summary-detail">

              <FiUsers />

              <div>
                <small>
                  TRAVELLERS
                </small>

                <strong>
                  {trip.travellers ||
                    trip.travelers ||
                    2}
                </strong>
              </div>

            </div>

            <div className="summary-detail">

              <FiHome />

              <div>
                <small>
                  STAY TYPE
                </small>

                <strong>
                  {trip.stay || "Any"}
                </strong>
              </div>

            </div>

            <div className="summary-detail">

              <FiCompass />

              <div>
                <small>
                  TRAVEL TYPE
                </small>

                <strong>
                  {trip.travelType ||
                    "Couple"}
                </strong>
              </div>

            </div>

            <div className="summary-detail">

              <FiNavigation />

              <div>
                <small>
                  TRANSPORT
                </small>

                <strong>
                  {trip.transport ||
                    "Any"}
                </strong>
              </div>

            </div>

          </div>

          {/* SELECTED BUDGET */}

          <div className="summary-divider" />

          <div className="summary-budget">

            <div>

              <span>
                SELECTED BUDGET
              </span>

              <strong>
                {selectedBudget}
              </strong>

            </div>

            <FiCheck />

          </div>

          {/* TRIP TOTAL */}

          <div className="summary-divider" />

          <div className="summary-price">

            <span>
              Trip Total
            </span>

            <strong>
              {formatPrice(totalAmount)}
            </strong>

          </div>

          {/* INCLUDED */}

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

      </section>

    </main>
  );
};

export default BookingSummary;