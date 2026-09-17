import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiCompass,
  FiHeart,
  FiHome,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiUsers,
  FiShoppingBag,
  FiCoffee,
} from "react-icons/fi";

import "./CreateTrip.css";
import BookingSummary from "./BookingSummary";

/* =========================================================
   FALLBACK IMAGES
========================================================= */

const FALLBACK_PLACE_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85";

const FALLBACK_HOTEL_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90";

/* =========================================================
   YOUR DESTINATION DATA
========================================================= */

const destinationData = {
  goa: {
    name: "Goa",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Baga Beach",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Calangute Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Fort Aguada",
        image:
          "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Candolim",
        image:
          "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Anjuna",
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Panaji",
        image:
          "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Dudhsagar Falls",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Chapora Fort",
        image:
          "https://images.unsplash.com/photo-1590050752117-23a9d65b9c15?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Goa Beach Resort",
        type: "Beach Resort",
        rating: "4.7",
        price: "₹6,500",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Palm Grove Goa",
        type: "Premium Hotel",
        rating: "4.6",
        price: "₹5,200",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  london: {
    name: "London",
    country: "United Kingdom",

    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Big Ben",
        image:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "London Eye",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Tower Bridge",
        image:
          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Buckingham Palace",
        image:
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Westminster Abbey",
        image:
          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Covent Garden",
        image:
          "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "British Museum",
        image:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Hyde Park",
        image:
          "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Camden Market",
        image:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "St. Paul's Cathedral",
        image:
          "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Central London Hotel",
        type: "Premium Hotel",
        rating: "4.7",
        price: "₹18,500",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "The London Grand",
        type: "Luxury Hotel",
        rating: "4.8",
        price: "₹28,900",
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  paris: {
    name: "Paris",
    country: "France",

    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Eiffel Tower",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Louvre Museum",
        image:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Arc de Triomphe",
        image:
          "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Notre-Dame",
        image:
          "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Montmartre",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Champs-Élysées",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Seine River",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Luxembourg Gardens",
        image:
          "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Paris Central Stay",
        type: "Premium Hotel",
        rating: "4.7",
        price: "₹16,800",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Maison Paris",
        type: "Luxury Hotel",
        rating: "4.8",
        price: "₹25,500",
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",

    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Burj Khalifa",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Dubai Mall",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Palm Jumeirah",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Dubai Marina",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Jumeirah Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Desert Safari",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Dubai Frame",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Museum of the Future",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Dubai Marina Hotel",
        type: "Premium Hotel",
        rating: "4.7",
        price: "₹12,500",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Palm Luxury Resort",
        type: "Luxury Resort",
        rating: "4.9",
        price: "₹24,500",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  manali: {
    name: "Manali",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Solang Valley",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Rohtang Pass",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Hadimba Temple",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Mall Road",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Old Manali",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Vashisht",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Manu Temple",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Sissu",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Mountain View Resort",
        type: "Mountain Resort",
        rating: "4.7",
        price: "₹5,500",
        image:
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Himalayan Retreat",
        type: "Premium Hotel",
        rating: "4.6",
        price: "₹4,800",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  jaipur: {
    name: "Jaipur",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1599661046827-dacff0c2b7e4?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Amber Fort",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Hawa Mahal",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c2b7e4?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Jantar Mantar",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Jal Mahal",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Nahargarh Fort",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c2b7e4?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Albert Hall Museum",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Johari Bazaar",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Royal Jaipur Palace",
        type: "Heritage Hotel",
        rating: "4.8",
        price: "₹7,200",
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Pink City Stay",
        type: "Premium Hotel",
        rating: "4.6",
        price: "₹5,900",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },

  kerala: {
    name: "Kerala",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=90",
    ],

    places: [
      {
        name: "Alleppey",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Munnar",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Kovalam",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Varkala",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Thekkady",
        image:
          "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Fort Kochi",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Wayanad",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Marari Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      },
    ],

    hotels: [
      {
        name: "Kerala Backwater Resort",
        type: "Resort",
        rating: "4.8",
        price: "₹6,800",
        image:
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Munnar Hills Stay",
        type: "Mountain Resort",
        rating: "4.7",
        price: "₹5,700",
        image:
          "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=90",
      },
    ],
  },
};

/* =========================================================
   NORMALIZER
========================================================= */

const normalizeDestination = (value = "") =>
  value
    .toLowerCase()
    .replace(/[,.]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   ALIASES
========================================================= */

const destinationAliases = {
  "new delhi": "delhi",
  bengaluru: "bangalore",
  puducherry: "pondicherry",
  "united kingdom": "london",
  uk: "london",
  france: "paris",
  uae: "dubai",
};

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
      return 35000;
  }
};

/* =========================================================
   CURRENCY
========================================================= */

const formatCurrency = (number) =>
  `₹${Number(number || 0).toLocaleString("en-IN")}`;

/* =========================================================
   DATE
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
   PLACE PICKER
========================================================= */

const getPlacesForInterest = (
  places,
  interests,
  dayIndex
) => {
  if (!places?.length) return [];

  const selected = interests.map((item) =>
    item.toLowerCase()
  );

  const result = [];

  const addPlace = (place) => {
    if (
      place &&
      !result.some(
        (item) => item.name === place.name
      ) &&
      result.length < 3
    ) {
      result.push(place);
    }
  };

  if (
    selected.includes("beaches") ||
    selected.includes("relaxation")
  ) {
    places
      .filter((place) =>
        /beach|coast|marina|island|water/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (
    selected.includes("culture") ||
    selected.includes("sightseeing")
  ) {
    places
      .filter((place) =>
        /fort|palace|museum|temple|tower|bridge|cathedral|abbey|hawa|louvre|eiffel/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (selected.includes("shopping")) {
    places
      .filter((place) =>
        /market|mall|bazaar|covent|camden/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (
    selected.includes("nature") ||
    selected.includes("mountains")
  ) {
    places
      .filter((place) =>
        /valley|mountain|park|garden|falls|sissu|munnar|wayanad|thekkady/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (selected.includes("adventure")) {
    places
      .filter((place) =>
        /falls|safari|valley|rohtang|solang|desert/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (selected.includes("food")) {
    places
      .filter((place) =>
        /market|old manali|panaji|camden|bazaar/i.test(
          place.name
        )
      )
      .forEach(addPlace);
  }

  if (result.length < 3) {
    const start = dayIndex % places.length;

    for (let i = 0; i < places.length; i++) {
      addPlace(
        places[(start + i) % places.length]
      );

      if (result.length === 3) break;
    }
  }

  return result;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const CreateTrip = () => {
  const navigate = useNavigate();

  const [tripData, setTripData] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [saved, setSaved] = useState(false);

  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const [bookings, setBookings] = useState([]);

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  const [showBookings, setShowBookings] =
    useState(false);

  /* =======================================================
     CREATE BOOKING
  ======================================================= */

  const createBooking = () => {
    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("tripBookings") || "[]"
      );

      const newBooking = {
        id: `BK-${Date.now()}`,

        destination: destination.name,
        country: destination.country,

        date: tripData?.date || "",
        days: totalDays,
        travellers: travellers,

        travelType: travelType,
        budget: budgetText,
        totalBudget: totalBudget,

        style: tripData?.style || "Relaxed",

        stay: stay,
        transport: transport,
        interests: interests,

        image:
          destination.images?.[0] ||
          FALLBACK_PLACE_IMAGE,

        hotel: selectedHotel
          ? {
              name: selectedHotel.name,
              type:
                selectedHotel.type || "Hotel",
              rating:
                selectedHotel.rating || "4.5",
              price:
                selectedHotel.price || "₹0",
              image:
                selectedHotel.image ||
                FALLBACK_HOTEL_IMAGE,
            }
          : null,

        status: "Confirmed",

        itinerary: itinerary,

        bookedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "tripBookings",
        JSON.stringify([
          newBooking,
          ...existingBookings,
        ])
      );

      window.dispatchEvent(
        new Event("tripBookingsUpdated")
      );

      navigate("/booking");
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      alert(
        "Booking create nahi ho saki."
      );
    }
  };

  /* =======================================================
     LOAD TRIP
  ======================================================= */

  useEffect(() => {
    const savedTrip =
      localStorage.getItem("tripperTrip");

    if (!savedTrip) {
      navigate("/trip-plan");
      return;
    }

    try {
      const parsedTrip =
        JSON.parse(savedTrip);

      setTripData(parsedTrip);
      setActiveDay(1);

      const alreadySaved =
        localStorage.getItem("savedTrip");

      if (alreadySaved) {
        setSaved(true);
      }
    } catch (error) {
      console.error(
        "Could not read trip data:",
        error
      );

      localStorage.removeItem(
        "tripperTrip"
      );

      navigate("/trip-plan");
    }
  }, [navigate]);

  /* =======================================================
     DESTINATION
  ======================================================= */

  const destinationKey = useMemo(() => {
    const normalized =
      normalizeDestination(
        tripData?.destination
      );

    return (
      destinationAliases[normalized] ||
      normalized
    );
  }, [tripData]);

  const destination =
    destinationData[destinationKey] || {
      name:
        tripData?.destination ||
        "Your Destination",

      country: "",

      images: [
        FALLBACK_PLACE_IMAGE,
      ],

      places: [
        {
          name: "City Centre",
          image:
            FALLBACK_PLACE_IMAGE,
        },
        {
          name: "Local Market",
          image:
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Popular Landmark",
          image:
            FALLBACK_PLACE_IMAGE,
        },
      ],

      hotels: [
        {
          name: "Recommended Stay",
          type: "Comfort Stay",
          rating: "4.5",
          price: "₹6,200",
          image:
            FALLBACK_HOTEL_IMAGE,
        },
      ],
    };

  /* =======================================================
     EXACT VALUES
  ======================================================= */

  const totalDays = Math.max(
    1,
    Number(tripData?.days || 1)
  );

  const travellers = Math.max(
    1,
    Number(tripData?.travellers || 1)
  );

  const budgetText =
    tripData?.budget ||
    "₹25,000 – ₹50,000";

  const interests =
    Array.isArray(
      tripData?.interests
    )
      ? tripData.interests
      : [];

  const travelType =
    tripData?.travelType || "Solo";

  const stay =
    tripData?.stay || "Any";

  const transport =
    tripData?.transport || "Any";

  /* =======================================================
     ACTIVE DAY
  ======================================================= */

  useEffect(() => {
    if (activeDay > totalDays) {
      setActiveDay(totalDays);
    }
  }, [activeDay, totalDays]);

  /* =======================================================
     BUDGET
  ======================================================= */

  const totalBudget =
    getBudgetAmount(budgetText);

  const budgetBreakdown = useMemo(
    () => ({
      stay: Math.round(
        totalBudget * 0.35
      ),

      transport: Math.round(
        totalBudget * 0.25
      ),

      food: Math.round(
        totalBudget * 0.15
      ),

      activities: Math.round(
        totalBudget * 0.15
      ),

      misc: Math.round(
        totalBudget * 0.1
      ),
    }),
    [totalBudget]
  );

  /* =======================================================
     HOTEL
  ======================================================= */

  const selectedHotel = useMemo(() => {
    if (!destination.hotels?.length) {
      return null;
    }

    const lowerStay =
      stay.toLowerCase();

    if (lowerStay === "resort") {
      return (
        destination.hotels.find(
          (hotel) =>
            hotel.type
              .toLowerCase()
              .includes("resort")
        ) ||
        destination.hotels[0]
      );
    }

    if (lowerStay === "hostel") {
      return {
        ...destination.hotels[0],
        name: `${destination.name} Backpacker Stay`,
        type: "Hostel",
        price: "₹2,800",
      };
    }

    if (lowerStay === "villa") {
      return {
        ...destination.hotels[0],
        name: `${destination.name} Private Villa`,
        type: "Villa",
        price: "₹8,500",
      };
    }

    return destination.hotels[0];
  }, [destination, stay]);

  /* =======================================================
     ITINERARY
  ======================================================= */

  const itinerary = useMemo(() => {
    return Array.from(
      { length: totalDays },
      (_, index) => {
        const dayNumber =
          index + 1;

        const places =
          getPlacesForInterest(
            destination.places,
            interests,
            index
          );

        const first =
          places[0] ||
          destination.places[
            index %
              destination.places.length
          ];

        const second =
          places[1] ||
          destination.places[
            (index + 1) %
              destination.places.length
          ];

        const third =
          places[2] ||
          destination.places[
            (index + 2) %
              destination.places.length
          ];

        let morning =
          `Start your day with ${first.name}.`;

        let afternoon =
          `Explore ${second.name} and nearby attractions.`;

        let evening =
          `Spend your evening around ${third.name}.`;

        const lowerInterests =
          interests.map((item) =>
            item.toLowerCase()
          );

        if (
          lowerInterests.includes(
            "shopping"
          )
        ) {
          evening =
            `Enjoy shopping and local experiences around ${third.name}.`;
        }

        if (
          lowerInterests.includes(
            "food"
          )
        ) {
          evening =
            `Enjoy local food and cafés around ${third.name}.`;
        }

        if (
          lowerInterests.includes(
            "nightlife"
          )
        ) {
          evening =
            `Enjoy the local nightlife around ${third.name}.`;
        }

        if (
          lowerInterests.includes(
            "photography"
          )
        ) {
          afternoon =
            `Explore ${second.name} and capture beautiful photographs.`;
        }

        if (
          lowerInterests.includes(
            "relaxation"
          )
        ) {
          morning =
            `Take a relaxed morning around ${first.name}.`;
        }

        if (
          lowerInterests.includes(
            "adventure"
          )
        ) {
          afternoon =
            `Enjoy an adventure experience around ${second.name}.`;
        }

        return {
          day: dayNumber,

          title:
            dayNumber === 1
              ? "Arrival & First Experience"
              : dayNumber === totalDays
              ? "Final Day & Departure"
              : "Explore & Experience",

          places,

          /* =================================================
             5 ACTIVITIES
          ================================================= */

          schedule: [
            {
              time: "09:00 AM",
              title: "Morning",
              text: morning,
              icon: FiCompass,
            },

            {
              time: "11:00 AM",
              title: "Shopping",
              text: `Explore local markets and shop for souvenirs around ${first.name}.`,
              icon: FiShoppingBag,
            },

            {
              time: "01:00 PM",
              title: "Afternoon",
              text: afternoon,
              icon: FiMapPin,
            },

            {
              time: "04:30 PM",
              title: "Local Experience",
              text: `Enjoy local food, cafés and nearby experiences around ${second.name}.`,
              icon: FiCoffee,
            },

            {
              time: "07:00 PM",
              title: "Evening",
              text: evening,
              icon: FiHeart,
            },
          ],
        };
      }
    );
  }, [
    totalDays,
    destination,
    interests,
  ]);

  const currentDay =
    itinerary.find(
      (item) =>
        item.day === activeDay
    ) || itinerary[0];

  /* =======================================================
     SAVE TRIP
  ======================================================= */

  const saveTrip = () => {
    const savedTrips =
      JSON.parse(
        localStorage.getItem(
          "savedTrips"
        ) || "[]"
      );

    const newTrip = {
      ...tripData,
      destination:
        destination.name,
      savedAt:
        new Date().toISOString(),
    };

    const filteredTrips =
      savedTrips.filter(
        (trip) =>
          !(
            trip.destination ===
              newTrip.destination &&
            trip.date ===
              newTrip.date &&
            Number(trip.days) ===
              Number(newTrip.days)
          )
      );

    localStorage.setItem(
      "savedTrips",
      JSON.stringify([
        newTrip,
        ...filteredTrips,
      ])
    );

    navigate("/saved-trips");
  };

  /* =======================================================
     VIEW STAY
  ======================================================= */

  const viewStay = () => {
    const slug =
      destination.name
        .toLowerCase()
        .replace(
          /[^\w\s-]/g,
          ""
        )
        .replace(
          /\s+/g,
          "-"
        );

    navigate(
      `/destination/${slug}`
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (!tripData) {
    return (
      <main className="create-trip-loading">
        <div>
          <FiCompass />

          <h2>
            Creating your trip...
          </h2>

          <p>
            Preparing your personalized
            itinerary.
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="create-trip-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="create-trip-hero">

        <div className="hero-image-box">

          <img
            src={
              destination.images[0] ||
              FALLBACK_PLACE_IMAGE
            }
            alt={destination.name}
            onError={(e) => {
              e.currentTarget.src =
                FALLBACK_PLACE_IMAGE;
            }}
          />

          <div className="hero-image-overlay" />

          <div className="hero-image-content">

            <span>
              {destination.country}
            </span>

            <h1>
              {destination.name}
            </h1>

            <p>
              Your {totalDays}-day
              personalized journey
            </p>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="trip-summary-card">

          <div className="summary-label">
            YOUR TRIP
          </div>

          <h2>
            {destination.name}
          </h2>

          <div className="summary-grid">

            <div className="summary-item">

              <FiCalendar />

              <div>
                <small>
                  Travel date
                </small>

                <strong>
                  {formatDate(
                    tripData.date
                  )}
                </strong>
              </div>

            </div>

            <div className="summary-item">

              <FiClock />

              <div>
                <small>
                  Duration
                </small>

                <strong>
                  {totalDays} Days
                </strong>
              </div>

            </div>

            <div className="summary-item">

              <FiUsers />

              <div>
                <small>
                  Travellers
                </small>

                <strong>
                  {travellers}
                </strong>
              </div>

            </div>

            <div className="summary-item">

              <FiHeart />

              <div>
                <small>
                  Travel type
                </small>

                <strong>
                  {travelType}
                </strong>
              </div>

            </div>

          </div>

          <div className="summary-budget">

            <div>
              <span>
                Selected budget
              </span>

              <strong>
                {budgetText}
              </strong>
            </div>

            <FiArrowRight />

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="create-trip-content">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <aside className="trip-left-column">

          {/* BUDGET */}

          <div className="trip-panel budget-panel">

            <div className="panel-heading">

              <div>

                <span>
                  YOUR BUDGET
                </span>

                <h2>
                  {budgetText}
                </h2>

              </div>

              <div className="panel-logo">
                <FiNavigation />
              </div>

            </div>

            <div className="budget-total">

              <small>
                Planned trip budget
              </small>

              <strong>
                {formatCurrency(
                  totalBudget
                )}
              </strong>

            </div>

            <div className="budget-list">

              <div className="budget-row">

                <div>
                  <span>
                    Hotel / Stay
                  </span>

                  <small>
                    35%
                  </small>
                </div>

                <strong>
                  {formatCurrency(
                    budgetBreakdown.stay
                  )}
                </strong>

              </div>

              <div className="budget-row">

                <div>
                  <span>
                    Transport
                  </span>

                  <small>
                    25%
                  </small>
                </div>

                <strong>
                  {formatCurrency(
                    budgetBreakdown.transport
                  )}
                </strong>

              </div>

              <div className="budget-row">

                <div>
                  <span>
                    Food
                  </span>

                  <small>
                    15%
                  </small>
                </div>

                <strong>
                  {formatCurrency(
                    budgetBreakdown.food
                  )}
                </strong>

              </div>

              <div className="budget-row">

                <div>
                  <span>
                    Activities
                  </span>

                  <small>
                    15%
                  </small>
                </div>

                <strong>
                  {formatCurrency(
                    budgetBreakdown.activities
                  )}
                </strong>

              </div>

              <div className="budget-row">

                <div>
                  <span>
                    Miscellaneous
                  </span>

                  <small>
                    10%
                  </small>
                </div>

                <strong>
                  {formatCurrency(
                    budgetBreakdown.misc
                  )}
                </strong>

              </div>

            </div>

          </div>

          {/* =================================================
              HOTEL
          ================================================= */}

          {selectedHotel && (
            <div className="trip-panel hotel-panel">

              <div className="panel-top-line">

                <span>
                  RECOMMENDED STAY
                </span>

                <FiHome />

              </div>

              <div className="hotel-image">

                <img
                  src={
                    selectedHotel.image ||
                    FALLBACK_HOTEL_IMAGE
                  }
                  alt={
                    selectedHotel.name
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      FALLBACK_HOTEL_IMAGE;
                  }}
                />

                <span className="hotel-rating">

                  <FiStar />

                  {selectedHotel.rating}

                </span>

                <span className="hotel-price-tag">

                  {selectedHotel.price}

                  <small>
                    / night
                  </small>

                </span>

              </div>

              <div className="hotel-content">

                <div className="hotel-title-row">

                  <div>

                    <h3>
                      {selectedHotel.name}
                    </h3>

                    <p>
                      {selectedHotel.type}
                      {" • "}
                      {destination.name}
                    </p>

                  </div>

                  <div className="hotel-small-rating">

                    <FiStar />

                    {selectedHotel.rating}

                  </div>

                </div>

                <div className="hotel-meta">

                  <span>

                    <FiHome />

                    {stay === "Any"
                      ? "Flexible stay"
                      : stay}

                  </span>

                  <span>

                    <FiUsers />

                    {travellers} guests

                  </span>

                </div>

                <div className="hotel-bottom">

                  <div>

                    <small>
                      From
                    </small>

                    <strong>
                      {selectedHotel.price}
                    </strong>

                    <span>
                      / night
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={viewStay}
                  >

                    View stay

                    <FiArrowRight />

                  </button>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              PREFERENCES
          ================================================= */}

          <div className="trip-panel preference-panel">

            <div className="panel-top-line">

              <span>
                TRIP PREFERENCES
              </span>

              <FiCompass />

            </div>

            <div className="preference-list">

              <div>

                <small>
                  Style
                </small>

                <strong>
                  {tripData.style ||
                    "Relaxed"}
                </strong>

              </div>

              <div>

                <small>
                  Stay
                </small>

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

            </div>

          </div>

        </aside>

        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="trip-right-column">

          {/* ITINERARY HEADER */}

          <div className="itinerary-header">

            <div>

              <span>
                YOUR ITINERARY
              </span>

              <h2>
                {totalDays} days in{" "}
                {destination.name}
              </h2>

              <p>
                A personalized plan based
                on your budget, interests
                and travel style.
              </p>

            </div>

            <div className="itinerary-interest-count">

              <strong>
                {interests.length}
              </strong>

              <span>
                selected
                <br />
                interests
              </span>

            </div>

          </div>

          {/* INTERESTS */}

          {interests.length > 0 && (
            <div className="selected-interests">

              <span>
                Your interests
              </span>

              <div>

                {interests.map(
                  (interest) => (
                    <span
                      key={interest}
                      className="interest-tag"
                    >
                      {interest}
                    </span>
                  )
                )}

              </div>

            </div>
          )}

          {/* =================================================
              DAY SELECTOR
          ================================================= */}

          <div className="day-selector">

            <div className="day-selector-header">

              <span>
                DAY BY DAY
              </span>

              <small>
                {totalDays} days planned
              </small>

            </div>

            <div className="day-list">

              {itinerary.map(
                (item) => (
                  <button
                    type="button"
                    key={item.day}
                    className={
                      activeDay === item.day
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveDay(
                        item.day
                      )
                    }
                  >

                    <small>
                      DAY
                    </small>

                    <strong>
                      {String(
                        item.day
                      ).padStart(2, "0")}
                    </strong>

                  </button>
                )
              )}

            </div>

          </div>

          {/* =================================================
              ACTIVE DAY
          ================================================= */}

          {currentDay && (
            <div className="active-day-card">

              <div className="active-day-top">

                <div>

                  <span>
                    DAY{" "}
                    {String(
                      currentDay.day
                    ).padStart(2, "0")}
                  </span>

                  <h2>
                    {currentDay.title}
                  </h2>

                </div>

                <div className="day-place-count">

                  <FiMapPin />

                  <span>
                    {
                      currentDay.places
                        .length
                    }{" "}
                    places
                  </span>

                </div>

              </div>

              {/* =================================================
                  SCHEDULE
              ================================================= */}

              <div className="schedule">

                <div className="schedule-heading">

                  <div>

                    <span>
                      SUGGESTED FLOW
                    </span>

                    <h3>
                      Your day at a glance
                    </h3>

                  </div>

                  <FiClock />

                </div>

                {currentDay.schedule.map(
                  (item) => {

                    const Icon =
                      item.icon;

                    return (
                      <div
                        className="schedule-row"
                        key={item.time}
                      >

                        <div className="schedule-time">
                          {item.time}
                        </div>

                        <div className="schedule-icon">
                          <Icon />
                        </div>

                        <div className="schedule-content">

                          <span>
                            {item.title}
                          </span>

                          <p>
                            {item.text}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>
          )}

          {/* =================================================
              SAVE / BOOKING
          ================================================= */}

          <div className="save-trip-section">

            <div>

              <span>
                READY TO GO?
              </span>

              <h2>
                Your {destination.name}
                {" "}
                trip is ready.
              </h2>

              <p>
                You can edit your
                preferences anytime.
              </p>

            </div>

            <button
              type="button"
              className="booking-button"
              onClick={() =>
                navigate(
                  "/booking-summary"
                )
              }
            >

              <FiCalendar />

              <span>
                Booking
              </span>

              <FiArrowRight />

            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default CreateTrip;