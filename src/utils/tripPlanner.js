import tripData from "../Data/tripData";

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const getNumberFromText = (value, fallback = 0) => {
  const match = String(value ?? "").match(/[\d,]+/);

  if (!match) return fallback;

  const number = Number(match[0].replace(/,/g, ""));

  return Number.isFinite(number) ? number : fallback;
};

/* =========================================================
   DAYS
========================================================= */

const getDays = (trip) => {
  const raw = trip?.days;

  /*
    Supports:
    10
    "10"
    "10 Days"
    "10 days"
  */

  const match = String(raw ?? "").match(/\d+/);

  const days = match ? Number(match[0]) : Number(raw);

  if (!Number.isFinite(days) || days < 1) {
    return 3;
  }

  return Math.min(Math.max(Math.round(days), 1), 30);
};

/* =========================================================
   TRAVELLERS
========================================================= */

const getTravellers = (trip) => {
  const travellers = Number(trip?.travellers);

  if (!Number.isFinite(travellers) || travellers < 1) {
    return 2;
  }

  return Math.min(Math.round(travellers), 20);
};

/* =========================================================
   BUDGET
========================================================= */

const getBudgetAmount = (budget) => {
  const text = normalize(budget);

  if (!text) return 50000;

  /*
    Under ₹10,000
  */
  if (text.includes("under")) {
    return getNumberFromText(text, 10000);
  }

  /*
    ₹25,000 – ₹50,000
    We take the upper limit.
  */
  const numbers = String(budget)
    .match(/[\d,]+/g)
    ?.map((item) => Number(item.replace(/,/g, "")));

  if (numbers?.length >= 2) {
    return Math.max(...numbers);
  }

  if (numbers?.length === 1) {
    return numbers[0];
  }

  return 50000;
};

const getBudgetLevel = (budgetAmount) => {
  if (budgetAmount <= 15000) {
    return "budget";
  }

  if (budgetAmount <= 50000) {
    return "standard";
  }

  return "premium";
};

/* =========================================================
   DESTINATION KEY
========================================================= */

const getDestinationKey = (destination) => {
  const input = normalize(destination);

  if (!input) return null;

  const keys = Object.keys(tripData || {});

  /*
    Exact key match
  */
  const exactKey = keys.find(
    (key) => normalize(key) === input
  );

  if (exactKey) return exactKey;

  /*
    Exact name match
  */
  const exactName = keys.find(
    (key) => normalize(tripData[key]?.name) === input
  );

  if (exactName) return exactName;

  /*
    Partial match
    Example:
    "goa beach trip" -> Goa
  */
  const partial = keys.find((key) => {
    const name = normalize(tripData[key]?.name);

    return (
      input.includes(name) ||
      name.includes(input)
    );
  });

  return partial || null;
};

/* =========================================================
   DYNAMIC DESTINATION
   FOR ANY DESTINATION NOT IN tripData.js
========================================================= */

const createDynamicDestination = (destination) => {
  const name =
    String(destination || "Your Destination").trim();

  return {
    name,
    state: "",

    bestFor: [
      "Couple",
      "Friends",
      "Family",
      "Solo",
    ],

    tags: [
      "Sightseeing",
      "Food",
      "Shopping",
      "Nature",
      "Adventure",
      "Relaxation",
      "Culture",
      "Nightlife",
    ],

    places: [
      {
        name: `${name} City Centre`,
        type: "Sightseeing",
        description:
          `Explore the main city area of ${name} and discover its local atmosphere.`,
      },
      {
        name: `${name} Old Town`,
        type: "Culture",
        description:
          `Walk through the historic and cultural side of ${name}.`,
      },
      {
        name: `${name} Main Attraction`,
        type: "Sightseeing",
        description:
          `Visit one of the most popular attractions around ${name}.`,
      },
      {
        name: `${name} Local Market`,
        type: "Shopping",
        description:
          `Explore local markets, shops, souvenirs and regional products.`,
      },
      {
        name: `${name} Food Street`,
        type: "Food",
        description:
          `Taste popular local dishes and explore the food scene.`,
      },
      {
        name: `${name} Scenic Point`,
        type: "Nature",
        description:
          `Enjoy beautiful views and a peaceful outdoor experience.`,
      },
      {
        name: `${name} Heritage Site`,
        type: "Culture",
        description:
          `Discover the history, culture and heritage of ${name}.`,
      },
      {
        name: `${name} Nature Trail`,
        type: "Nature",
        description:
          `Spend some time exploring nature around ${name}.`,
      },
      {
        name: `${name} Sunset Point`,
        type: "Relaxation",
        description:
          `Relax and enjoy a beautiful sunset experience.`,
      },
      {
        name: `${name} Adventure Zone`,
        type: "Adventure",
        description:
          `Try an exciting outdoor activity during your trip.`,
      },
      {
        name: `${name} Photography Spot`,
        type: "Photography",
        description:
          `Capture beautiful views and memorable travel moments.`,
      },
      {
        name: `${name} Night District`,
        type: "Nightlife",
        description:
          `Explore the evening atmosphere, cafés and local nightlife.`,
      },
    ],

    hotels: [
      {
        name: `${name} Comfort Stay`,
        type: "Hotel",
        rating: "4.1",
        price: "₹2,200/night",
        priceValue: 2200,
        description:
          `Comfortable budget-friendly stay in ${name}.`,
      },
      {
        name: `${name} Central Hotel`,
        type: "Hotel",
        rating: "4.4",
        price: "₹3,200/night",
        priceValue: 3200,
        description:
          `Modern hotel with convenient access to major attractions.`,
      },
      {
        name: `${name} Grand Resort`,
        type: "Resort",
        rating: "4.6",
        price: "₹4,800/night",
        priceValue: 4800,
        description:
          `Relaxing resort with comfortable rooms and good amenities.`,
      },
      {
        name: `${name} Premium Retreat`,
        type: "Resort",
        rating: "4.8",
        price: "₹7,000/night",
        priceValue: 7000,
        description:
          `Premium stay designed for a comfortable holiday.`,
      },
      {
        name: `${name} Luxury Stay`,
        type: "Villa",
        rating: "4.9",
        price: "₹9,500/night",
        priceValue: 9500,
        description:
          `Luxury accommodation for a memorable travel experience.`,
      },
    ],

    activities: [
      {
        name: `${name} Food Experience`,
        type: "Food",
        description:
          `Try local food and popular dishes of ${name}.`,
      },
      {
        name: `${name} Shopping Experience`,
        type: "Shopping",
        description:
          `Explore local markets, shopping streets and souvenirs.`,
      },
      {
        name: `${name} Heritage Walk`,
        type: "Culture",
        description:
          `Discover local history, architecture and culture.`,
      },
      {
        name: `${name} Adventure Experience`,
        type: "Adventure",
        description:
          `Enjoy an exciting outdoor adventure.`,
      },
      {
        name: `${name} Nature Experience`,
        type: "Nature",
        description:
          `Spend peaceful time surrounded by nature.`,
      },
      {
        name: `${name} Nightlife Experience`,
        type: "Nightlife",
        description:
          `Explore the evening cafés and entertainment scene.`,
      },
      {
        name: `${name} Photography Walk`,
        type: "Photography",
        description:
          `Find beautiful places for photos and memories.`,
      },
      {
        name: `${name} Relaxation Experience`,
        type: "Relaxation",
        description:
          `Enjoy a slow and relaxing travel experience.`,
      },
      {
        name: `${name} Sunset Experience`,
        type: "Relaxation",
        description:
          `Enjoy a peaceful sunset during your trip.`,
      },
      {
        name: `${name} Local Culture Experience`,
        type: "Culture",
        description:
          `Experience the local culture and traditions.`,
      },
    ],

    transport: {
      budget: {
        name: "Local Bus / Auto",
        daily: 600,
      },

      standard: {
        name: "Cab",
        daily: 1500,
      },

      premium: {
        name: "Private Cab",
        daily: 2800,
      },
    },
  };
};

/* =========================================================
   HOTEL PRICE
========================================================= */

const getHotelPrice = (hotel) => {
  if (Number.isFinite(Number(hotel?.priceValue))) {
    return Number(hotel.priceValue);
  }

  return getNumberFromText(
    hotel?.price,
    2500
  );
};

/* =========================================================
   ADD HOTEL PRICE VALUE
========================================================= */

const normalizeHotels = (hotels = []) => {
  return hotels.map((hotel) => ({
    ...hotel,

    rating:
      hotel?.rating !== undefined
        ? String(hotel.rating)
        : "4.2",

    priceValue: getHotelPrice(hotel),
  }));
};

/* =========================================================
   INTEREST MATCHING
========================================================= */

const interestAliases = {
  sightseeing: [
    "sightseeing",
    "place",
    "places",
    "attraction",
  ],

  food: [
    "food",
    "restaurant",
    "foodie",
    "cuisine",
  ],

  beaches: [
    "beach",
    "beaches",
    "sea",
    "coast",
  ],

  mountains: [
    "mountain",
    "mountains",
    "hill",
    "hills",
    "snow",
  ],

  adventure: [
    "adventure",
    "rafting",
    "sports",
    "trek",
  ],

  shopping: [
    "shopping",
    "market",
    "bazaar",
    "shop",
  ],

  nightlife: [
    "nightlife",
    "night",
    "party",
    "club",
  ],

  culture: [
    "culture",
    "heritage",
    "history",
    "temple",
  ],

  nature: [
    "nature",
    "waterfall",
    "forest",
    "lake",
    "garden",
  ],

  photography: [
    "photography",
    "photo",
    "scenic",
    "view",
  ],

  relaxation: [
    "relaxation",
    "relax",
    "spa",
    "peaceful",
    "sunset",
  ],
};

const matchesInterest = (item, interest) => {
  if (!item || !interest) return false;

  const wanted = normalize(interest);

  const aliases =
    interestAliases[wanted] || [wanted];

  const text = normalize(
    [
      item.name,
      item.description,
      item.type,
      ...(item.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
  );

  return aliases.some((alias) =>
    text.includes(normalize(alias))
  );
};

/* =========================================================
   SELECT PLACES
========================================================= */

const selectPlaces = (
  destinationProfile,
  interests = []
) => {
  const places =
    Array.isArray(destinationProfile?.places)
      ? destinationProfile.places
      : [];

  if (!places.length) return [];

  const selected = [];

  /*
    First preference:
    User interests
  */

  interests.forEach((interest) => {
    places.forEach((place) => {
      if (
        matchesInterest(place, interest) &&
        !selected.includes(place)
      ) {
        selected.push(place);
      }
    });
  });

  /*
    Then remaining places
  */

  places.forEach((place) => {
    if (!selected.includes(place)) {
      selected.push(place);
    }
  });

  return selected;
};

/* =========================================================
   SELECT ACTIVITIES
========================================================= */

const selectActivities = (
  destinationProfile,
  interests = []
) => {
  const activities =
    Array.isArray(destinationProfile?.activities)
      ? destinationProfile.activities
      : [];

  if (!activities.length) return [];

  const selected = [];

  /*
    Interests first
  */

  interests.forEach((interest) => {
    activities.forEach((activity) => {
      if (
        matchesInterest(activity, interest) &&
        !selected.includes(activity)
      ) {
        selected.push(activity);
      }
    });
  });

  /*
    Remaining activities
  */

  activities.forEach((activity) => {
    if (!selected.includes(activity)) {
      selected.push(activity);
    }
  });

  return selected;
};

/* =========================================================
   HOTEL SCORE
========================================================= */

const scoreHotel = (
  hotel,
  trip,
  budgetLevel
) => {
  let score = 0;

  const price = getHotelPrice(hotel);

  const stayPreference =
    normalize(trip?.stay);

  /*
    Budget preference
  */

  if (budgetLevel === "budget") {
    if (price <= 3000) score += 30;
    else if (price <= 4500) score += 15;
  }

  if (budgetLevel === "standard") {
    if (price >= 2500 && price <= 5500) {
      score += 30;
    } else if (price <= 7000) {
      score += 15;
    }
  }

  if (budgetLevel === "premium") {
    if (price >= 5000) score += 30;
    else if (price >= 3500) score += 15;
  }

  /*
    Stay preference
  */

  if (
    stayPreference.includes("resort") &&
    normalize(hotel.type).includes("resort")
  ) {
    score += 40;
  }

  if (
    stayPreference.includes("hotel") &&
    normalize(hotel.type).includes("hotel")
  ) {
    score += 40;
  }

  if (
    stayPreference.includes("villa") &&
    normalize(hotel.type).includes("villa")
  ) {
    score += 40;
  }

  /*
    Rating
  */

  score +=
    Number(hotel.rating || 4) * 5;

  /*
    Cheaper hotel gets a little bonus
    in budget trips
  */

  if (budgetLevel === "budget") {
    score += Math.max(
      0,
      20 - price / 500
    );
  }

  return score;
};

/* =========================================================
   SELECT HOTELS
========================================================= */

const selectHotels = (
  destinationProfile,
  trip,
  budgetLevel
) => {
  const hotels = normalizeHotels(
    destinationProfile?.hotels || []
  );

  if (!hotels.length) return [];

  return [...hotels]
    .sort(
      (a, b) =>
        scoreHotel(
          b,
          trip,
          budgetLevel
        ) -
        scoreHotel(
          a,
          trip,
          budgetLevel
        )
    )
    .slice(0, 5);
};

/* =========================================================
   TRANSPORT
========================================================= */

const selectTransport = (
  destinationProfile,
  trip,
  budgetLevel
) => {
  const transport =
    destinationProfile?.transport || {};

  /*
    If user selected a specific transport,
    try to respect it.
  */

  const requested =
    normalize(trip?.transport);

  const allOptions = [
    transport.budget,
    transport.standard,
    transport.premium,
  ].filter(Boolean);

  if (!allOptions.length) {
    return {
      name: "Local Transport",
      daily: 800,
    };
  }

  /*
    Match words from user selection
  */

  const matching = allOptions.find((option) => {
    const text = normalize(option.name);

    return (
      requested &&
      text.includes(requested)
    );
  });

  if (matching) {
    return matching;
  }

  /*
    Otherwise use budget level
  */

  return (
    transport[budgetLevel] ||
    transport.standard ||
    transport.budget ||
    allOptions[0]
  );
};

/* =========================================================
   MEAL BUDGET
========================================================= */

const getMealBudget = (
  budgetLevel,
  travellers
) => {
  const perPerson = {
    budget: 500,
    standard: 900,
    premium: 1600,
  };

  return (
    perPerson[budgetLevel] || 900
  ) * travellers;
};

/* =========================================================
   ACTIVITY COST
========================================================= */

const calculateActivityCost = (
  activity,
  budgetLevel,
  travellers
) => {
  const type = normalize(
    activity?.type || activity?.name
  );

  let perPerson = 300;

  if (
    type.includes("adventure") ||
    type.includes("rafting") ||
    type.includes("water sport")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 2200
        : budgetLevel === "standard"
        ? 1400
        : 700;
  } else if (
    type.includes("food")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 1200
        : budgetLevel === "standard"
        ? 700
        : 400;
  } else if (
    type.includes("shopping")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 1500
        : budgetLevel === "standard"
        ? 800
        : 400;
  } else if (
    type.includes("night")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 1200
        : budgetLevel === "standard"
        ? 700
        : 400;
  } else if (
    type.includes("relax")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 1500
        : budgetLevel === "standard"
        ? 800
        : 400;
  } else if (
    type.includes("culture") ||
    type.includes("heritage")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 700
        : budgetLevel === "standard"
        ? 450
        : 250;
  }

  return perPerson * travellers;
};

/* =========================================================
   PLACE COST
========================================================= */

const calculatePlaceCost = (
  place,
  budgetLevel,
  travellers
) => {
  const text = normalize(
    `${place?.name || ""} ${
      place?.description || ""
    }`
  );

  let perPerson = 150;

  if (
    text.includes("waterfall") ||
    text.includes("adventure") ||
    text.includes("rafting")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 1200
        : budgetLevel === "standard"
        ? 700
        : 400;
  } else if (
    text.includes("fort") ||
    text.includes("palace") ||
    text.includes("museum") ||
    text.includes("heritage")
  ) {
    perPerson =
      budgetLevel === "premium"
        ? 500
        : budgetLevel === "standard"
        ? 300
        : 150;
  }

  return perPerson * travellers;
};

/* =========================================================
   DAY PLAN
========================================================= */

const createDayPlan = ({
  day,
  destinationProfile,
  places,
  activities,
  interests,
  budgetLevel,
  travellers,
}) => {
  /*
    Rotate through places and activities
    so 10 days don't repeat only Day 1.
  */

  const place =
    places.length
      ? places[(day - 1) % places.length]
      : {
          name: `Explore ${destinationProfile.name}`,
          description:
            `Explore the highlights of ${destinationProfile.name}.`,
        };

  /*
    Try to find activity based on selected interest.
  */

  let activity = null;

  if (interests.length) {
    const preferredInterest =
      interests[(day - 1) % interests.length];

    activity = activities.find(
      (item) =>
        matchesInterest(
          item,
          preferredInterest
        )
    );
  }

  if (!activity && activities.length) {
    activity =
      activities[
        (day - 1) % activities.length
      ];
  }

  if (!activity) {
    activity = {
      name: `Local Experience in ${destinationProfile.name}`,
      description:
        `Enjoy a memorable local experience in ${destinationProfile.name}.`,
    };
  }

  const placeCost = calculatePlaceCost(
    place,
    budgetLevel,
    travellers
  );

  const activityCost =
    calculateActivityCost(
      activity,
      budgetLevel,
      travellers
    );

  return {
    day,

    title: `Day ${day} — Explore ${destinationProfile.name}`,

    places: [
      {
        ...place,
        cost: placeCost,
      },
    ],

    activities: [
      {
        ...activity,
        cost: activityCost,
      },
    ],

    morning: {
      title: place.name,
      description:
        place.description ||
        `Explore ${place.name}.`,
    },

    afternoon: {
      title: activity.name,
      description:
        activity.description ||
        `Enjoy ${activity.name}.`,
    },

    evening: {
      title:
        interests.includes("Nightlife")
          ? "Evening & Nightlife"
          : "Relax & Explore",

      description:
        interests.includes("Nightlife")
          ? `Enjoy the evening atmosphere of ${destinationProfile.name}.`
          : `Relax and enjoy your evening in ${destinationProfile.name}.`,
    },

    estimatedCost:
      placeCost + activityCost,
  };
};

/* =========================================================
   ROOMS
========================================================= */

const calculateRooms = (
  travellers,
  travelType
) => {
  const type = normalize(travelType);

  if (
    type.includes("solo") ||
    travellers === 1
  ) {
    return 1;
  }

  if (
    type.includes("couple")
  ) {
    return 1;
  }

  /*
    2 people per room
  */

  return Math.max(
    1,
    Math.ceil(travellers / 2)
  );
};

/* =========================================================
   HOTEL COST
========================================================= */

const calculateStayCost = ({
  hotel,
  days,
  travellers,
  travelType,
}) => {
  if (!hotel) return 0;

  const rooms = calculateRooms(
    travellers,
    travelType
  );

  /*
    10 days = 9 hotel nights
    3 days = 2 nights

    Minimum 1 night.
  */

  const nights = Math.max(
    1,
    days - 1
  );

  return (
    getHotelPrice(hotel) *
    nights *
    rooms
  );
};

/* =========================================================
   TRANSPORT COST
========================================================= */

const calculateTransportCost = (
  transport,
  days
) => {
  if (!transport) return 0;

  const daily =
    Number(transport.daily) || 0;

  /*
    Transport is calculated for each trip day.
  */

  return daily * days;
};

/* =========================================================
   EXTRA BUDGET
========================================================= */

const calculateExtraBudget = ({
  budgetLevel,
  travellers,
  days,
}) => {
  const dailyExtra = {
    budget: 300,
    standard: 700,
    premium: 1400,
  };

  return (
    dailyExtra[budgetLevel] || 700
  ) *
    travellers *
    days;
};

/* =========================================================
   FIT HOTEL TO BUDGET
========================================================= */

const fitBudget = ({
  hotels,
  trip,
  days,
  travellers,
  transport,
  itinerary,
  budgetAmount,
  budgetLevel,
}) => {
  if (!hotels.length) {
    return {
      hotel: null,
      totalCost: 0,
      budgetRemaining: budgetAmount,
    };
  }

  const rooms = calculateRooms(
    travellers,
    trip?.travelType
  );

  const nights = Math.max(
    1,
    days - 1
  );

  /*
    Itinerary activity/place cost
  */

  const itineraryCost =
    itinerary.reduce(
      (sum, day) =>
        sum +
        (Number(day.estimatedCost) || 0),
      0
    );

  /*
    Food
  */

  const foodCost =
    getMealBudget(
      budgetLevel,
      travellers
    ) * days;

  /*
    Transport
  */

  const transportCost =
    calculateTransportCost(
      transport,
      days
    );

  /*
    Extra
  */

  const extraCost =
    calculateExtraBudget({
      budgetLevel,
      travellers,
      days,
    });

  /*
    Find hotel which fits best
  */

  let selectedHotel = hotels[0];
  let selectedTotal = Infinity;

  hotels.forEach((hotel) => {
    const hotelCost =
      getHotelPrice(hotel) *
      nights *
      rooms;

    const total =
      hotelCost +
      itineraryCost +
      foodCost +
      transportCost +
      extraCost;

    /*
      Prefer hotels that stay inside budget.
    */

    if (
      total <= budgetAmount &&
      total < selectedTotal
    ) {
      selectedHotel = hotel;
      selectedTotal = total;
    }
  });

  /*
    If no hotel fits,
    choose the cheapest one.
  */

  if (selectedTotal === Infinity) {
    selectedHotel =
      [...hotels].sort(
        (a, b) =>
          getHotelPrice(a) -
          getHotelPrice(b)
      )[0];

    const hotelCost =
      getHotelPrice(selectedHotel) *
      nights *
      rooms;

    selectedTotal =
      hotelCost +
      itineraryCost +
      foodCost +
      transportCost +
      extraCost;
  }

  return {
    hotel: selectedHotel,
    totalCost: selectedTotal,
    budgetRemaining:
      budgetAmount - selectedTotal,
  };
};

/* =========================================================
   MAIN GENERATOR
========================================================= */

export const generateTripPlan = (
  trip = {}
) => {
  const destination =
    String(
      trip?.destination ||
        "Your Destination"
    ).trim();

  const days = getDays(trip);

  const travellers =
    getTravellers(trip);

  const budgetAmount =
    getBudgetAmount(trip?.budget);

  const budgetLevel =
    getBudgetLevel(budgetAmount);

  /*
    Find destination in tripData.
    If not found, create automatically.
  */

  const destinationKey =
    getDestinationKey(destination);

  const destinationProfile =
    destinationKey
      ? tripData[destinationKey]
      : createDynamicDestination(
          destination
        );

  /*
    Interests
  */

  const interests =
    Array.isArray(trip?.interests)
      ? trip.interests
      : [];

  /*
    Places
  */

  const places =
    selectPlaces(
      destinationProfile,
      interests
    );

  /*
    Activities
  */

  const activities =
    selectActivities(
      destinationProfile,
      interests
    );

  /*
    Hotels
  */

  const hotels =
    selectHotels(
      destinationProfile,
      trip,
      budgetLevel
    );

  /*
    Transport
  */

  const transport =
    selectTransport(
      destinationProfile,
      trip,
      budgetLevel
    );

  /* =======================================================
     ITINERARY

     IMPORTANT:
     This always creates EXACTLY selected number of days.
     Example:
     days = 10
     => 10 itinerary objects
  ======================================================= */

  const itinerary = [];

  for (
    let day = 1;
    day <= days;
    day++
  ) {
    itinerary.push(
      createDayPlan({
        day,
        destinationProfile,
        places,
        activities,
        interests,
        budgetLevel,
        travellers,
      })
    );
  }

  /*
    Budget calculation
  */

  const budgetResult =
    fitBudget({
      hotels,
      trip,
      days,
      travellers,
      transport,
      itinerary,
      budgetAmount,
      budgetLevel,
    });

  const hotel =
    budgetResult.hotel;

  const rooms =
    calculateRooms(
      travellers,
      trip?.travelType
    );

  const nights = Math.max(
    1,
    days - 1
  );

  const hotelCost = hotel
    ? getHotelPrice(hotel) *
      nights *
      rooms
    : 0;

  const itineraryCost =
    itinerary.reduce(
      (sum, day) =>
        sum +
        (Number(day.estimatedCost) || 0),
      0
    );

  const foodCost =
    getMealBudget(
      budgetLevel,
      travellers
    ) * days;

  const transportCost =
    calculateTransportCost(
      transport,
      days
    );

  const extraCost =
    calculateExtraBudget({
      budgetLevel,
      travellers,
      days,
    });

  const totalCost =
    hotelCost +
    itineraryCost +
    foodCost +
    transportCost +
    extraCost;

  /* =======================================================
     AI MESSAGE
  ======================================================= */

  let aiMessage =
    `Your ${days}-day ${destination} trip is ready.`;

  if (interests.length) {
    aiMessage +=
      ` I have added ${interests.join(
        ", "
      )} experiences according to your interests.`;
  }

  if (budgetLevel === "budget") {
    aiMessage +=
      " The plan is optimized for a budget-friendly trip.";
  }

  if (budgetLevel === "standard") {
    aiMessage +=
      " The plan balances comfort and budget.";
  }

  if (budgetLevel === "premium") {
    aiMessage +=
      " The plan focuses on premium stays and experiences.";
  }

  /* =======================================================
     FINAL RESULT
  ======================================================= */

  return {
    destination,

    destinationKey,

    name: destinationProfile.name,

    state:
      destinationProfile.state || "",

    days,

    travellers,

    tripType:
      trip?.travelType || "Couple",

    date: trip?.date || "",

    budget:
      trip?.budget || "",

    budgetAmount,

    budgetLevel,

    style:
      trip?.style || "Relaxed",

    stay:
      trip?.stay || "Any",

    transportPreference:
      trip?.transport || "Any",

    interests,

    tags:
      destinationProfile.tags || [],

    bestFor:
      destinationProfile.bestFor || [],

    destinationImage:
      destinationProfile.image || "",

    places,

    activities,

    hotels,

    hotel,

    rooms,

    nights,

    transport,

    itinerary,

    budget: {
      total: totalCost,
      hotel: hotelCost,
      food: foodCost,
      transport: transportCost,
      activities: itineraryCost,
      extras: extraCost,
      remaining:
        budgetAmount - totalCost,
    },

    totalCost,

    budgetRemaining:
      budgetAmount - totalCost,

    aiMessage,

    generatedAt:
      new Date().toISOString(),
  };
};

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default generateTripPlan;