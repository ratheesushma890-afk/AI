import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

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

  const goingDateInputRef = useRef(null);
  const returnDateInputRef = useRef(null);
  const destinationInitializedRef = useRef("");

  /* =====================================================
     STATES
  ===================================================== */

  const [destination, setDestination] = useState("");

  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [days, setDays] = useState("0");

  const [travelType, setTravelType] = useState("Couple");

  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [travellers, setTravellers] = useState("2");

  /*
    IMPORTANT:
    Budget ab automatic lock nahi hoga.
    User available higher budget me se choose kar sakta hai.
  */
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
     DESTINATION OPTIONS
  ===================================================== */

  const destinationOptions = {
    "Popular India": [
      "Goa",
      "Manali",
      "Jaipur",
      "Kerala",
      "Rishikesh",
      "Udaipur",
      "Delhi",
      "Mumbai",
      "Agra",
    ],

    
  };

  const validDestinations = Object.values(
    destinationOptions
  )
    .flat()
    .map((item) =>
      item
        .toLowerCase()
        .replace(/[,.]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    );

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
     MEMBER OPTIONS
  ===================================================== */

  const adultOptions = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
  ];

  const childrenOptions = [
    0, 1, 2, 3, 4,
    5, 6, 7, 8,
  ];

  /* =====================================================
     BUDGET OPTIONS

     Ye saare options rahenge.
     Members + days ke hisaab se sirf LOW options hide honge.
     Higher options user khud select kar sakta hai.
  ===================================================== */

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
     NORMALIZE DESTINATION
  ===================================================== */

  const normalizeDestination = (value = "") => {
    return String(value)
      .toLowerCase()
      .replace(/[,.]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =====================================================
     GET DESTINATION DATA
  ===================================================== */

  const getDestinationData = (value = "") => {
    const normalized = normalizeDestination(value);

    if (!normalized) {
      return null;
    }

    if (Array.isArray(destinations)) {
      return (
        destinations.find((item) => {
          const itemId = normalizeDestination(
            item?.id || ""
          );

          const itemName = normalizeDestination(
            item?.name || ""
          );

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
     GET PLACES
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
     DATE HELPERS
  ===================================================== */

  const formatLocalDate = (dateObject) => {
    const year = dateObject.getFullYear();

    const month = String(
      dateObject.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      dateObject.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    return formatLocalDate(tomorrow);
  };

  const getNextDate = (value) => {
    if (!value) {
      return getTomorrowDate();
    }

    const nextDate = new Date(
      `${value}T00:00:00`
    );

    nextDate.setDate(
      nextDate.getDate() + 1
    );

    return formatLocalDate(nextDate);
  };

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
     CALCULATE DAYS
  ===================================================== */

  const calculateDays = (
    startDate,
    endDate
  ) => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    const difference =
      end.getTime() - start.getTime();

    const totalDays = Math.round(
      difference /
        (1000 * 60 * 60 * 24)
    );

    return totalDays > 0
      ? totalDays
      : 0;
  };
    /* =====================================================
     DATE CHANGE HANDLERS
  ===================================================== */

  const handleGoingDateChange = (e) => {
    const selectedDate = e.target.value;

    setDate(selectedDate);

    /*
      Agar return date going date se
      chhoti ya same ho gayi to reset.
    */
    if (
      returnDate &&
      returnDate <= selectedDate
    ) {
      setReturnDate("");
      setDays("0");
      return;
    }

    if (returnDate) {
      const totalDays = calculateDays(
        selectedDate,
        returnDate
      );

      setDays(
        totalDays > 0
          ? String(totalDays)
          : "0"
      );
    } else {
      setDays("0");
    }
  };

  const handleReturnDateChange = (e) => {
    const selectedReturnDate =
      e.target.value;

    setReturnDate(selectedReturnDate);

    const totalDays = calculateDays(
      date,
      selectedReturnDate
    );

    setDays(
      totalDays > 0
        ? String(totalDays)
        : "0"
    );
  };

  /* =====================================================
     OPEN DATE PICKER
  ===================================================== */

  const openGoingDatePicker = () => {
    const input =
      goingDateInputRef.current;

    if (!input) return;

    try {
      if (
        typeof input.showPicker ===
        "function"
      ) {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  };

  const openReturnDatePicker = () => {
    const input =
      returnDateInputRef.current;

    if (!input || !date) return;

    try {
      if (
        typeof input.showPicker ===
        "function"
      ) {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  };

  /* =====================================================
     TOTAL MEMBERS
  ===================================================== */

  const getTotalMembers = (
    type = travelType,
    adultCount = adults,
    childCount = children
  ) => {
    if (type === "Solo") {
      return 1;
    }

   if (type === "Couple") {
  return Number(adultCount) || 2;
}

    if (type === "Family") {
      return (
        (Number(adultCount) || 0) +
        (Number(childCount) || 0)
      );
    }

    if (type === "Friends") {
      return Number(adultCount) || 2;
    }

    return 1;
  };

  /* =====================================================
     MINIMUM BUDGET CALCULATION

  ===================================================== */

  const getMinimumBudgetIndex = (
    type,
    adultCount,
    childCount,
    totalDays
  ) => {
    const memberCount =
      getTotalMembers(
        type,
        adultCount,
        childCount
      );

    /*
      Agar dates abhi select nahi hain,
      minimum 1 day maan rahe hain.
    */
    const tripDays =
      Number(totalDays) > 0
        ? Number(totalDays)
        : 1;

    /*
      Demo estimated cost:
      ₹4,000 per member / per day.
    */
    const minimumAmount =
      memberCount *
      tripDays *
      4000;

    if (minimumAmount <= 10000) {
      return 0;
    }

    if (minimumAmount <= 25000) {
      return 1;
    }

    if (minimumAmount <= 50000) {
      return 2;
    }

    if (minimumAmount <= 100000) {
      return 3;
    }

    if (minimumAmount <= 200000) {
      return 4;
    }

    if (minimumAmount <= 300000) {
      return 5;
    }

    return 6;
  };

  /* =====================================================
     CURRENT MINIMUM BUDGET
  ===================================================== */

  const minimumBudgetIndex =
    getMinimumBudgetIndex(
      travelType,
      adults,
      children,
      days
    );

  const minimumBudget =
    budgetOptions[
      minimumBudgetIndex
    ];

  /*
    MAIN FIX:

    Example minimum index = 3

    Then:
    0,1,2 hide

    Only:
    ₹50k – ₹1L
    ₹1L – ₹2L
    ₹2L – ₹3L
    ₹3L – ₹5L

    show honge.
  */

  const availableBudgetOptions =
    budgetOptions.slice(
      minimumBudgetIndex
    );

  /* =====================================================
     TRAVEL TYPE CHANGE
  ===================================================== */
useEffect(() => {
  // SOLO
  if (travelType === "Solo") {
    setAdults("1");
    setChildren("0");
    setTravellers("1");
    return;
  }

  // COUPLE
  if (travelType === "Couple") {
    setChildren("0");

    setAdults((current) => {
      const value = Number(current);

      if ([2, 4, 6, 8, 10].includes(value)) {
        return String(value);
      }

      return "2";
    });

    return;
  }

  // FAMILY
  if (travelType === "Family") {
    setAdults((current) => {
      const value = Number(current);

      if (value >= 1) {
        return String(value);
      }

      return "2";
    });

    return;
  }

  // FRIENDS
  if (travelType === "Friends") {
    setChildren("0");

    setAdults((current) => {
      const value = Number(current);

      if (value >= 2) {
        return String(value);
      }

      return "2";
    });
  }
}, [travelType]);

  /* =====================================================
     AUTO TOTAL TRAVELLERS
  ===================================================== */

  useEffect(() => {
    const total =
      getTotalMembers(
        travelType,
        adults,
        children
      );

    setTravellers(
      String(total)
    );
  }, [
    travelType,
    adults,
    children,
  ]);

  /* =====================================================
     IMPORTANT BUDGET FIX

     Purana code:
     setBudget(newBudget)

     har baar chalta tha.

     Isliye user ₹1L–₹2L choose karta
     tha to bhi budget automatic
     wapas change ho jata tha.

     Ab:
     Selected budget valid hai
     to SAME rahega.

     Sirf selected budget minimum
     se kam hua to minimum par jayega.
  ===================================================== */

  useEffect(() => {
    const newMinimumIndex =
      getMinimumBudgetIndex(
        travelType,
        adults,
        children,
        days
      );

    const currentBudgetIndex =
      budgetOptions.indexOf(
        budget
      );

    /*
      Current budget kam ho gaya
      ya valid list me nahi mila.
    */

    if (
      currentBudgetIndex === -1 ||
      currentBudgetIndex <
        newMinimumIndex
    ) {
      setBudget(
        budgetOptions[
          newMinimumIndex
        ]
      );
    }

    /*
      Agar user ka selected budget
      minimum se HIGHER hai,
      kuch mat karo.

      Example:
      Minimum = ₹50k – ₹1L
      User selected = ₹1L – ₹2L

      To ₹1L – ₹2L hi rahega.
    */
  }, [
    travelType,
    adults,
    children,
    days,
    budget,
  ]);

  /* =====================================================
     BUDGET SELECT
  ===================================================== */

  const handleBudgetSelect = (
    selectedBudget
  ) => {
    const selectedIndex =
      budgetOptions.indexOf(
        selectedBudget
      );

    /*
      Normally hidden options click
      hi nahi ho sakte.

      Extra safety ke liye check.
    */

    if (
      selectedIndex <
      minimumBudgetIndex
    ) {
      alert(
        `For ${travellers} travellers and ${
          Number(days) > 0
            ? `${days} days`
            : "your trip"
        }, please select ${minimumBudget} or a higher budget.`
      );

      return;
    }

    setBudget(
      selectedBudget
    );
  };

  /* =====================================================
     INTEREST TOGGLE
  ===================================================== */

  const toggleInterest = (item) => {
    setInterests((prev) => {
      if (prev.includes(item)) {
        return prev.filter(
          (interest) =>
            interest !== item
        );
      }

      return [
        ...prev,
        item,
      ];
    });
  };

  /* =====================================================
     PLACE SELECT
  ===================================================== */

  const handlePlaceSelect = (
    placeName
  ) => {
    if (!placeName) {
      return;
    }

    setSelectedPlaces(
      (prev) => {
        if (
          prev.includes(placeName)
        ) {
          return prev.filter(
            (item) =>
              item !== placeName
          );
        }

        if (prev.length >= 3) {
          return prev;
        }

        return [
          ...prev,
          placeName,
        ];
      }
    );
  };
    /* =====================================================
     PAYMENT COMPLETE RESET
  ===================================================== */

  useEffect(() => {
    const paymentDone =
      localStorage.getItem(
        "tripPaymentDone"
      );

    if (paymentDone !== "true") {
      return;
    }

    setDestination("");

    setDate("");
    setReturnDate("");
    setDays("0");

    setTravelType("Couple");

    setAdults("2");
    setChildren("0");
    setTravellers("2");

    setBudget(
      "₹25,000 – ₹50,000"
    );

    setStyle("Relaxed");
    setStay("Any");
    setTransport("Any");

    setInterests([]);
    setSelectedPlaces([]);

    destinationInitializedRef.current =
      "";

    localStorage.removeItem(
      "tripPaymentDone"
    );

    localStorage.removeItem(
      "tripperTrip"
    );

    setIsLoaded(true);
  }, []);

  /* =====================================================
     RESTORE TRIP DATA
  ===================================================== */

  useEffect(() => {
    const paymentDone =
      localStorage.getItem(
        "tripPaymentDone"
      );

    if (paymentDone === "true") {
      return;
    }

    /* =========================
       LOCAL STORAGE DATA
    ========================= */

    let savedData = null;

    const savedTrip =
      localStorage.getItem(
        "tripperTrip"
      );

    if (savedTrip) {
      try {
        savedData =
          JSON.parse(savedTrip);
      } catch (error) {
        console.error(
          "Error restoring trip:",
          error
        );
      }
    }

    /* =========================
       LOCATION STATE
    ========================= */

    const stateData =
      location.state || {};

    const stateTrip =
      stateData.trip || {};

    /* =========================
       DESTINATION
    ========================= */

    const finalDestination =
      stateData.destination ||
      stateTrip.destination ||
      savedData?.destination ||
      "";

    setDestination(
      finalDestination
    );

    destinationInitializedRef.current =
      normalizeDestination(
        finalDestination
      );

    /* =========================
       DATES
    ========================= */

    const finalDate =
      stateData.date ||
      stateData.goingDate ||
      stateTrip.date ||
      stateTrip.goingDate ||
      savedData?.date ||
      savedData?.goingDate ||
      "";

    const finalReturnDate =
      stateData.returnDate ||
      stateTrip.returnDate ||
      savedData?.returnDate ||
      "";

    setDate(finalDate);
    setReturnDate(
      finalReturnDate
    );

    /* =========================
       DAYS
    ========================= */

    let finalDays = 0;

    if (
      finalDate &&
      finalReturnDate
    ) {
      finalDays =
        calculateDays(
          finalDate,
          finalReturnDate
        );
    }

    setDays(
      String(finalDays)
    );

    /* =========================
       TRAVEL TYPE
    ========================= */

    const finalTravelType =
      stateData.travelType ||
      stateTrip.travelType ||
      savedData?.travelType ||
      "Couple";

    setTravelType(
      finalTravelType
    );

    /* =========================
       MEMBERS
    ========================= */

    const savedAdults =
      Number(
        stateData.adults ??
          stateTrip.adults ??
          savedData?.adults ??
          0
      );

    const savedChildren =
      Number(
        stateData.children ??
          stateTrip.children ??
          savedData?.children ??
          0
      );

    /* SOLO */

    if (
      finalTravelType === "Solo"
    ) {
      setAdults("1");
      setChildren("0");
      setTravellers("1");
    }

    /* COUPLE */

    else if (
      finalTravelType === "Couple"
    ) {
      setAdults("2");
      setChildren("0");
      setTravellers("2");
    }

    /* FAMILY */

    else if (
      finalTravelType === "Family"
    ) {
      const familyAdults =
        savedAdults >= 1
          ? savedAdults
          : 2;

      const familyChildren =
        savedChildren >= 0
          ? savedChildren
          : 0;

      setAdults(
        String(familyAdults)
      );

      setChildren(
        String(familyChildren)
      );

      setTravellers(
        String(
          familyAdults +
            familyChildren
        )
      );
    }

    /* FRIENDS */

    else if (
      finalTravelType === "Friends"
    ) {
      const friendCount =
        savedAdults >= 2
          ? savedAdults
          : 2;

      setAdults(
        String(friendCount)
      );

      setChildren("0");

      setTravellers(
        String(friendCount)
      );
    }

    /* =========================
       RESTORE BUDGET

       IMPORTANT:
       Saved selected budget ko
       restore kar rahe hain.

       Lekin agar wo current
       members + days ke hisaab
       se bahut low hai to
       minimum budget use hoga.
    ========================= */

    const restoredBudget =
      stateData.budget ||
      stateTrip.budget ||
      savedData?.budget ||
      "₹25,000 – ₹50,000";

    const restoreMinimumIndex =
      getMinimumBudgetIndex(
        finalTravelType,

        finalTravelType === "Solo"
          ? 1
          : finalTravelType ===
              "Couple"
            ? 2
            : savedAdults ||
              2,

        finalTravelType ===
        "Family"
          ? savedChildren
          : 0,

        finalDays
      );

    const restoredBudgetIndex =
      budgetOptions.indexOf(
        restoredBudget
      );

    if (
      restoredBudgetIndex === -1 ||
      restoredBudgetIndex <
        restoreMinimumIndex
    ) {
      setBudget(
        budgetOptions[
          restoreMinimumIndex
        ]
      );
    } else {
      /*
        User ne higher budget
        choose kiya tha to wahi
        restore hoga.
      */

      setBudget(
        restoredBudget
      );
    }

    /* =========================
       STYLE
    ========================= */

    setStyle(
      stateData.style ||
        stateTrip.style ||
        savedData?.style ||
        "Relaxed"
    );

    /* =========================
       STAY
    ========================= */

    setStay(
      stateData.stay ||
        stateTrip.stay ||
        savedData?.stay ||
        "Any"
    );

    /* =========================
       TRANSPORT
    ========================= */

    setTransport(
      stateData.transport ||
        stateTrip.transport ||
        savedData?.transport ||
        "Any"
    );

    /* =========================
       INTERESTS
    ========================= */

    let restoredInterests = [];

    if (
      Array.isArray(
        stateData.interests
      )
    ) {
      restoredInterests =
        stateData.interests;
    } else if (
      Array.isArray(
        stateTrip.interests
      )
    ) {
      restoredInterests =
        stateTrip.interests;
    } else if (
      Array.isArray(
        savedData?.interests
      )
    ) {
      restoredInterests =
        savedData.interests;
    }

    setInterests(
      restoredInterests
    );

    /* =========================
       PLACES
    ========================= */

    let restoredPlaces = [];

    if (
      Array.isArray(
        stateData.places
      )
    ) {
      restoredPlaces =
        stateData.places;
    } else if (
      Array.isArray(
        stateTrip.places
      )
    ) {
      restoredPlaces =
        stateTrip.places;
    } else if (
      Array.isArray(
        savedData?.places
      )
    ) {
      restoredPlaces =
        savedData.places;
    }

    const availablePlaces =
      getPlacesForDestination(
        finalDestination
      );

    const availableNames =
      availablePlaces.map(
        (item) => item.name
      );

    const validPlaces =
      restoredPlaces
        .map((place) => {
          if (
            typeof place ===
            "string"
          ) {
            return place;
          }

          return place?.name;
        })
        .filter(Boolean)
        .filter((name) =>
          availableNames.includes(
            name
          )
        )
        .slice(0, 3);

    setSelectedPlaces(
      validPlaces
    );

    setIsLoaded(true);
  }, [location.state]);

  /* =====================================================
     DESTINATION CHANGE

     Destination change hone par
     old destination ke selected
     places remove honge.
  ===================================================== */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const currentDestination =
      normalizeDestination(
        destination
      );

    if (!currentDestination) {
      return;
    }

    if (
      !destinationInitializedRef.current
    ) {
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
  }, [
    destination,
    isLoaded,
  ]);

  /* =====================================================
     AUTO SAVE TRIP
  ===================================================== */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!destination.trim()) {
      return;
    }

    const tripData = {
      destination:
        destination.trim(),

      date,

      goingDate:
        date,

      returnDate,

      dateFormatted:
        formatDate(date),

      returnDateFormatted:
        formatDate(
          returnDate
        ),

      days:
        Number(days) || 0,

      travellers:
        Number(travellers) || 1,

      adults:
        Number(adults) || 1,

      children:
        travelType === "Family"
          ? Number(children) || 0
          : 0,

      travelType,

      /*
        User ka actual selected
        budget save hoga.
      */
      budget,

      /*
        Minimum suggested budget
        bhi save kar rahe hain.
        CreateTrip me future me
        use kar sakti ho.
      */
      minimumBudget,

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

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        tripData
      )
    );
  }, [
    isLoaded,
    destination,
    date,
    returnDate,
    days,
    travellers,
    adults,
    children,
    travelType,
    budget,
    minimumBudget,
    style,
    stay,
    transport,
    interests,
    selectedPlaces,
  ]);
    /* =====================================================
     SUBMIT / CREATE TRIP
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* =================================================
       DESTINATION VALIDATION
    ================================================= */

    const cleanDestination =
      destination.trim();

    if (!cleanDestination) {
      alert(
        "Please select your destination."
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
        "Please select a valid destination."
      );
      return;
    }

    /* =================================================
       GOING DATE
    ================================================= */

    if (!date) {
      alert(
        "Please select your going date."
      );
      return;
    }

    if (
      date < getTomorrowDate()
    ) {
      alert(
        "Trip must start from tomorrow or a future date."
      );
      return;
    }

    /* =================================================
       RETURN DATE
    ================================================= */

    if (!returnDate) {
      alert(
        "Please select your return date."
      );
      return;
    }

    if (
      returnDate <= date
    ) {
      alert(
        "Return date must be after going date."
      );
      return;
    }

    /* =================================================
       DAYS
    ================================================= */

    const selectedDays =
      calculateDays(
        date,
        returnDate
      );

    if (selectedDays < 1) {
      alert(
        "Please select valid travel dates."
      );
      return;
    }

    /* =================================================
       MEMBERS
    ================================================= */

    let selectedTravellers = 1;
    let finalAdults = 1;
    let finalChildren = 0;

    /* =========================
       SOLO
    ========================= */

    if (
      travelType === "Solo"
    ) {
      selectedTravellers = 1;

      finalAdults = 1;
      finalChildren = 0;
    }

    /* =========================
       COUPLE
    ========================= */

    if (
      travelType === "Couple"
    ) {
      selectedTravellers = 2;

      finalAdults = 2;
      finalChildren = 0;
    }

    /* =========================
       FAMILY
    ========================= */

    if (
      travelType === "Family"
    ) {
      finalAdults =
        Number(adults);

      finalChildren =
        Number(children);

      /*
        Family me kam se kam
        1 adult required hai.
      */

      if (
        !Number.isInteger(
          finalAdults
        ) ||
        finalAdults < 1
      ) {
        alert(
          "Please select at least 1 adult."
        );
        return;
      }

      /*
        Children 0 ho sakte hain.
      */

      if (
        !Number.isInteger(
          finalChildren
        ) ||
        finalChildren < 0
      ) {
        alert(
          "Please select valid children."
        );
        return;
      }

      selectedTravellers =
        finalAdults +
        finalChildren;

      if (
        selectedTravellers < 1
      ) {
        alert(
          "Please select family members."
        );
        return;
      }
    }

    /* =========================
       FRIENDS
    ========================= */

    if (
      travelType === "Friends"
    ) {
      finalAdults =
        Number(adults);

      finalChildren = 0;

      /*
        Friends trip me
        minimum 2 friends.
      */

      if (
        !Number.isInteger(
          finalAdults
        ) ||
        finalAdults < 2
      ) {
        alert(
          "Please select at least 2 friends."
        );
        return;
      }

      selectedTravellers =
        finalAdults;
    }

    /* =================================================
       CHECK MINIMUM BUDGET
    ================================================= */

    const finalMinimumBudgetIndex =
      getMinimumBudgetIndex(
        travelType,
        finalAdults,
        finalChildren,
        selectedDays
      );

    const finalMinimumBudget =
      budgetOptions[
        finalMinimumBudgetIndex
      ];

    const selectedBudgetIndex =
      budgetOptions.indexOf(
        budget
      );

    /*
      Safety validation:

      Agar kisi wajah se selected
      budget minimum se kam reh gaya,
      user ko error milega.

      Normally UI me lower budgets
      hidden honge isliye ye error
      nahi aana chahiye.
    */

    if (
      selectedBudgetIndex === -1 ||
      selectedBudgetIndex <
        finalMinimumBudgetIndex
    ) {
      alert(
        `For ${selectedTravellers} travellers and ${selectedDays} days, please select ${finalMinimumBudget} or a higher budget.`
      );

      return;
    }

    /* =================================================
       INTERESTS
    ================================================= */

    if (
      interests.length === 0
    ) {
      alert(
        "Please select at least one interest."
      );
      return;
    }

    /* =================================================
       PLACES
    ================================================= */

    const finalSelectedPlaces =
      selectedPlaces.filter(
        Boolean
      );

    const availablePlaces =
      getPlacesForDestination(
        cleanDestination
      );

    /*
      Agar destination ke places
      available hain to minimum
      1 place select hona chahiye.
    */

    if (
      availablePlaces.length > 0 &&
      finalSelectedPlaces.length === 0
    ) {
      alert(
        "Please select at least one place to visit."
      );
      return;
    }

    /* =================================================
       FINAL TRIP DATA
    ================================================= */

    const tripData = {
      /* DESTINATION */

      destination:
        cleanDestination,

      destinationId:
        normalizeDestination(
          cleanDestination
        ),

      /* DATES */

      date,

      goingDate:
        date,

      returnDate,

      dateFormatted:
        formatDate(date),

      returnDateFormatted:
        formatDate(
          returnDate
        ),

      /* DURATION */

      days:
        selectedDays,

      /* MEMBERS */

      travellers:
        selectedTravellers,

      adults:
        finalAdults,

      children:
        finalChildren,

      travelType,

      /* =========================
         IMPORTANT BUDGET FIX

         User ne jo budget choose
         kiya hai wahi save hoga.

         Yahan calculateAutoBudget()
         bilkul nahi lagana.
      ========================= */

      budget,

      minimumBudget:
        finalMinimumBudget,

      /* OTHER PREFERENCES */

      style,
      stay,
      transport,

      interests: [
        ...interests,
      ],

      places: [
        ...finalSelectedPlaces,
      ],

      /* DESTINATION DATA */

      destinationData:
        selectedDestination ||
        null,

      paymentStatus:
        "pending",
    };

    /* =================================================
       SAVE LOCAL STORAGE
    ================================================= */

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        tripData
      )
    );

    /* =================================================
       NEXT PAGE
    ================================================= */

    navigate(
      "/create-trip",
      {
        state: tripData,
      }
    );
  };
    /* =====================================================
     JSX
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
            Enter your destination, dates,
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
          PLANNER
      ================================================= */}

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

          {/* =================================================
              FORM
          ================================================= */}

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
                  Where do you want
                  to go?
                </h2>
              </div>

              <p>
                Give us the basics
                and we'll handle the planning.
              </p>

            </div>

            {/* =================================================
                DESTINATION + PLACES + DATES
            ================================================= */}

            <div className="planner-grid">

              {/* DESTINATION */}

              <label className="planner-field field-large">

                <span>
                  Destination
                </span>

                <div className="input-wrap">

                  <FiMapPin />

                  <select
                    value={destination}
                    onChange={(e) => {
                      setDestination(
                        e.target.value
                      );

                      setSelectedPlaces([]);
                    }}
                  >

                    <option value="">
                      Choose destination
                    </option>

                    {Object.entries(
                      destinationOptions
                    ).map(
                      ([
                        group,
                        options,
                      ]) => (
                        <optgroup
                          key={group}
                          label={group}
                        >

                          {options.map(
                            (item) => (
                              <option
                                key={item}
                                value={item}
                              >
                                {item}
                              </option>
                            )
                          )}

                        </optgroup>
                      )
                    )}

                  </select>

                  {destination && (
                    <FiCheck className="input-success-icon" />
                  )}

                </div>

              </label>

              {/* =================================================
                  PLACES
              ================================================= */}

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

                {getPlacesForDestination(
                  destination
                ).length > 0 ? (

                  <small className="places-help-text">
                    {selectedPlaces.length}/3
                    {" "}places selected
                  </small>

                ) : destination ? (

                  <small className="places-help-text">
                    Places will be added for
                    this destination.
                  </small>

                ) : (

                  <small className="places-help-text">
                    Select a destination first.
                  </small>

                )}

              </div>

              {/* =================================================
                  GOING DATE
              ================================================= */}

              <label className="planner-field">

                <span>
                  Going Date
                </span>

                <div className="input-wrap date-input-wrap">

                  <span
                    className={`date-display ${
                      date
                        ? "has-date"
                        : ""
                    }`}
                  >
                    {date
                      ? formatDate(date)
                      : "DD/MM/YYYY"}
                  </span>

                  <input
                    ref={goingDateInputRef}
                    className="real-date-input"
                    type="date"
                    value={date}
                    min={getTomorrowDate()}
                    onChange={
                      handleGoingDateChange
                    }
                  />

                  <button
                    type="button"
                    className="date-calendar-button"
                    onClick={
                      openGoingDatePicker
                    }
                  >
                    <FiCalendar />
                  </button>

                </div>

              </label>

              {/* =================================================
                  RETURN DATE
              ================================================= */}

              <label className="planner-field">

                <span>
                  Return Date
                </span>

                <div
                  className={`input-wrap date-input-wrap ${
                    !date
                      ? "date-disabled"
                      : ""
                  }`}
                >

                  <span
                    className={`date-display ${
                      returnDate
                        ? "has-date"
                        : ""
                    }`}
                  >
                    {returnDate
                      ? formatDate(
                          returnDate
                        )
                      : "DD/MM/YYYY"}
                  </span>

                  <input
                    ref={returnDateInputRef}
                    className="real-date-input"
                    type="date"
                    value={returnDate}
                    min={getNextDate(date)}
                    disabled={!date}
                    onChange={
                      handleReturnDateChange
                    }
                  />

                  <button
                    type="button"
                    className="date-calendar-button"
                    disabled={!date}
                    onClick={
                      openReturnDatePicker
                    }
                  >
                    <FiCalendar />
                  </button>

                </div>

              </label>

              {/* =================================================
                  DURATION
              ================================================= */}

              <div className="planner-field">

                <span>
                  Duration
                </span>

                <div className="input-wrap duration-auto-field">

                  <FiCalendar />

                  <strong>
                    {date && returnDate
                      ? `${days} ${
                          Number(days) === 1
                            ? "Day"
                            : "Days"
                        }`
                      : "Select both dates"}
                  </strong>

                </div>

              </div>

            </div>

            <div className="planner-divider" />

            {/* =================================================
                TRAVEL TYPE
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                02 — WHO IS TRAVELLING?
              </span>

              <div className="travel-type-grid">

                {[
                  [
                    "Solo",
                    "Just me",
                  ],
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
                  ([
                    type,
                    text,
                  ]) => (

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

              {/* =================================================
                  MEMBER DETAILS
              ================================================= */}

              <div className="member-selection-box">

                {/* SOLO */}

                {travelType === "Solo" && (

                  <div className="member-fixed-card">

                    <FiUsers />

                    <div>

                      <span>
                        Travellers
                      </span>

                      <strong>
                        1 Adult
                      </strong>

                      <small>
                        Solo trip
                      </small>

                    </div>

                  </div>

                )}

                {/* COUPLE */}

                {/* COUPLE */}

{travelType === "Couple" && (
  <label className="planner-field">
    <span>Travellers</span>

    <div className="input-wrap">
      <FiUsers />

      <select
        value={adults}
        onChange={(e) =>
          setAdults(e.target.value)
        }
      >
        {[2, 4, 6, 8, 10].map((number) => (
          <option
            key={number}
            value={number}
          >
            {number} Travellers
          </option>
        ))}
      </select>
    </div>

    
  </label>
)}

                {/* =================================================
                    FAMILY
                ================================================= */}

                {travelType === "Family" && (
                  <>

                    <div className="family-member-grid">

                      {/* ADULTS */}

                      <label className="planner-field">

                        <span>
                          Adults
                        </span>

                        <div className="input-wrap">

                          <FiUsers />

                          <select
                            value={adults}
                            onChange={(e) =>
                              setAdults(
                                e.target.value
                              )
                            }
                          >

                            {adultOptions.map(
                              (number) => (

                                <option
                                  key={number}
                                  value={number}
                                >
                                  {number}{" "}
                                  {number === 1
                                    ? "Adult"
                                    : "Adults"}
                                </option>

                              )
                            )}

                          </select>

                        </div>

                      </label>

                      {/* CHILDREN */}

                      <label className="planner-field">

                        <span>
                          Children
                        </span>

                        <div className="input-wrap">

                          <FiUsers />

                          <select
                            value={children}
                            onChange={(e) =>
                              setChildren(
                                e.target.value
                              )
                            }
                          >

                            {childrenOptions.map(
                              (number) => (

                                <option
                                  key={number}
                                  value={number}
                                >
                                  {number}{" "}
                                  {number === 1
                                    ? "Child"
                                    : "Children"}
                                </option>

                              )
                            )}

                          </select>

                        </div>

                      </label>

                    </div>

                    {/* FAMILY TOTAL */}

                    <div className="total-member-card">

                      <span>
                        Total Family Members
                      </span>

                      <strong>
                        {Number(adults) +
                          Number(children)}
                        {" "}Members
                      </strong>

                      <small>
                        {adults} Adults •{" "}
                        {children} Children
                      </small>

                    </div>

                  </>
                )}

                {/* =================================================
                    FRIENDS
                ================================================= */}

                {travelType === "Friends" && (
                  <>

                    <label className="planner-field">

                      <span>
                        Number of Friends
                      </span>

                      <div className="input-wrap">

                        <FiUsers />

                        <select
                          value={adults}
                          onChange={(e) =>
                            setAdults(
                              e.target.value
                            )
                          }
                        >

                          {adultOptions
                            .filter(
                              (number) =>
                                number >= 2
                            )
                            .map(
                              (number) => (

                                <option
                                  key={number}
                                  value={number}
                                >
                                  {number} Friends
                                </option>

                              )
                            )}

                        </select>

                      </div>

                    </label>

                   

                  </>
                )}

              </div>

            </div>

            <div className="planner-divider" />

            {/* =================================================
                BUDGET — MAIN FIX
            ================================================= */}

            <div className="planner-section-block">

              <span className="section-label">
                03 — YOUR BUDGET
              </span>

              <p className="section-description">
                Based on {travellers}{" "}
                {Number(travellers) === 1
                  ? "traveller"
                  : "travellers"}

                {Number(days) > 0
                  ? ` and ${days} ${
                      Number(days) === 1
                        ? "day"
                        : "days"
                    }`
                  : ""}

                , lower budgets that may not
                fit your trip are hidden.
                You can choose any higher budget.
              </p>

              {/* MINIMUM BUDGET INFO */}

              <div className="budget-info">

                <div>
                  <small>
                    Minimum suggested
                  </small>

                  <strong>
                    {minimumBudget}
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
                    Duration
                  </small>

                  <strong>
                    {Number(days) > 0
                      ? `${days} ${
                          Number(days) === 1
                            ? "Day"
                            : "Days"
                        }`
                      : "Select dates"}
                  </strong>
                </div>

              </div>

              {/* =================================================
                  AVAILABLE BUDGET OPTIONS

                  IMPORTANT:
                  Sirf minimum aur usse
                  HIGHER options render honge.
              ================================================= */}

              <div className="option-row budget-option-row">

                {availableBudgetOptions.map(
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
                        handleBudgetSelect(
                          item
                        )
                      }
                    >

                      {budget === item && (
                        <FiCheck />
                      )}

                      <span>
                        {item}
                      </span>

                    </button>

                  )
                )}

              </div>

              <p className="budget-help-text">
                You can select the suggested
                budget or any higher budget
                according to your preference.
              </p>

            </div>

            <div className="planner-divider" />

            {/* =================================================
                INTERESTS
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
                  (item) => {

                    const active =
                      interests.includes(
                        item
                      );

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

            </div>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="trip-selection-summary">

              {/* DESTINATION */}

              <div>

                <small>
                  Destination
                </small>

                <strong>
                  {destination ||
                    "Not selected"}
                </strong>

              </div>

              {/* GOING */}

              <div>

                <small>
                  Going
                </small>

                <strong>
                  {date
                    ? formatDate(date)
                    : "Not selected"}
                </strong>

              </div>

              {/* RETURN */}

              <div>

                <small>
                  Return
                </small>

                <strong>
                  {returnDate
                    ? formatDate(
                        returnDate
                      )
                    : "Not selected"}
                </strong>

              </div>

              {/* DURATION */}

              <div>

                <small>
                  Duration
                </small>

                <strong>
                  {date && returnDate
                    ? `${days} ${
                        Number(days) === 1
                          ? "Day"
                          : "Days"
                      }`
                    : "Not selected"}
                </strong>

              </div>

              {/* TRIP TYPE */}

              <div>

                <small>
                  Trip Type
                </small>

                <strong>
                  {travelType}
                </strong>

              </div>

              {/* MEMBERS */}

              <div>

                <small>
                  Members
                </small>

                <strong>
                  {travellers}
                </strong>

              </div>

              {/* FAMILY DETAILS */}

              {travelType === "Family" && (

                <div>

                  <small>
                    Family
                  </small>

                  <strong>
                    {adults} Adults •{" "}
                    {children} Children
                  </strong>

                </div>

              )}

              {/* FRIENDS DETAILS */}

              {travelType === "Friends" && (

                <div>

                  <small>
                    Friends
                  </small>

                  <strong>
                    {adults} Friends
                  </strong>

                </div>

              )}

              {/* BUDGET */}

              <div>

                <small>
                  Budget
                </small>

                <strong>
                  {budget}
                </strong>

              </div>

              {/* PLACES */}

              <div>

                <small>
                  Places
                </small>

                <strong>
                  {selectedPlaces.length}/3
                </strong>

              </div>

              {/* INTERESTS */}

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
                CREATE TRIP
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
              Your plan automatically adjusts
              according to your dates,
              travellers, budget, travel type,
              selected places and interests.
            </p>

          </form>

        </div>

      </section>

    </main>
  );
};

export default TripPlan;