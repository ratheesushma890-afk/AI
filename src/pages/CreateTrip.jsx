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
  FiCompass,
  FiEdit3,
  FiHome,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import destinations from "../Data/destinations";
import "./CreateTrip.css";

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85";

/* =========================================================
   HOTEL DATA
========================================================= */

const stayData = {
  Hotel: [
    {
      name: "Grand Heritage Hotel",
      type: "Hotel",
      location: "City Centre",
      rating: "4.8",
      reviews: "1,240 reviews",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Luxury City Hotel",
      type: "Hotel",
      location: "Central District",
      rating: "4.7",
      reviews: "980 reviews",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Boutique Heritage Hotel",
      type: "Hotel",
      location: "Heritage Area",
      rating: "4.9",
      reviews: "720 reviews",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    },
  ],

  Resort: [
    {
      name: "Luxury Resort",
      type: "Resort",
      location: "Scenic Location",
      rating: "4.9",
      reviews: "1,430 reviews",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Grand Palace Resort",
      type: "Resort",
      location: "Premium District",
      rating: "4.8",
      reviews: "1,050 reviews",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Nature View Resort",
      type: "Resort",
      location: "Nature Retreat",
      rating: "4.7",
      reviews: "840 reviews",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    },
  ],

  Villa: [
    {
      name: "Luxury Private Villa",
      type: "Villa",
      location: "Private Estate",
      rating: "4.9",
      reviews: "540 reviews",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Private Pool Villa",
      type: "Villa",
      location: "Peaceful Area",
      rating: "4.8",
      reviews: "430 reviews",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Modern Holiday Villa",
      type: "Villa",
      location: "Holiday District",
      rating: "4.7",
      reviews: "390 reviews",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    },
  ],

  Hostel: [
    {
      name: "Premium Backpackers Hostel",
      type: "Hostel",
      location: "City Centre",
      rating: "4.7",
      reviews: "1,180 reviews",
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Traveller Hostel",
      type: "Hostel",
      location: "Main Market",
      rating: "4.6",
      reviews: "920 reviews",
      image:
        "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Social Stay Hostel",
      type: "Hostel",
      location: "Tourist Area",
      rating: "4.8",
      reviews: "780 reviews",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (value = "") => {
  return String(value)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[,.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getDaysNumber = (value, fallback = 3) => {
  const match = String(value ?? "").match(/\d+/);

  if (!match) {
    return fallback;
  }

  const number = Number(match[0]);

  return Number.isFinite(number)
    ? number
    : fallback;
};

/* =========================================================
   CREATE TRIP
========================================================= */

const CreateTrip = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     STATES
  ======================================================= */

  const [trip, setTrip] = useState({});

  const [activePlace, setActivePlace] =
    useState(0);

  const [activeHotel, setActiveHotel] =
    useState(0);

  const [activeDay, setActiveDay] =
    useState(1);

  /* =======================================================
     LOAD TRIP
  ======================================================= */

  useEffect(() => {
    let savedTrip = {};

    try {
      const stored =
        localStorage.getItem("tripperTrip");

      savedTrip = stored
        ? JSON.parse(stored)
        : {};
    } catch (error) {
      console.error(
        "Trip restore error:",
        error
      );
    }

    const stateData =
      location.state || {};

    const stateTrip =
      stateData?.trip || {};

    /*
      TripPlan navigate("/create-trip", {
        state: tripData
      })

      karta hai.

      Isliye location.state ko bhi preserve
      karna zaroori hai.
    */

    const finalTrip = {
      ...savedTrip,
      ...stateTrip,
      ...stateData,
    };

    delete finalTrip.trip;

    setTrip(finalTrip);

    if (
      Object.keys(finalTrip).length > 0
    ) {
      localStorage.setItem(
        "tripperTrip",
        JSON.stringify(finalTrip)
      );
    }
  }, [location.state]);

  /* =======================================================
     DESTINATION NAME
  ======================================================= */

  const destinationName = useMemo(() => {
    const value =
      trip?.destination ||
      location.state?.destination ||
      "Goa";

    if (
      typeof value === "object"
    ) {
      return (
        value?.name ||
        "Goa"
      );
    }

    return String(value);
  }, [
    trip?.destination,
    location.state,
  ]);

  /* =======================================================
     FIND DESTINATION FROM SAME destinations.js

     TripPlan bhi isi destinations.js ko use karta hai.
  ======================================================= */

  const destinationData = useMemo(() => {
    const target =
      normalizeText(
        destinationName
      );

    if (!target) {
      return null;
    }

    if (
      Array.isArray(destinations)
    ) {
      return (
        destinations.find(
          (item) => {
            const id =
              normalizeText(
                item?.id || ""
              );

            const name =
              normalizeText(
                item?.name || ""
              );

            return (
              id === target ||
              name === target
            );
          }
        ) || null
      );
    }

    return (
      destinations?.[target] ||
      null
    );
  }, [destinationName]);

  /* =======================================================
     DESTINATION MAIN DATA
  ======================================================= */

  const destination = useMemo(() => {
    const passedImage =
      trip?.image ||
      trip?.destinationImage ||
      location.state?.image ||
      location.state
        ?.destinationImage;

    return {
      name:
        destinationData?.name ||
        destinationName ||
        "Destination",

      state:
        trip?.state ||
        trip?.destinationState ||
        destinationData?.state ||
        destinationData?.location ||
        destinationData?.country ||
        destinationName,

      image:
        passedImage ||
        destinationData?.image ||
        FALLBACK_IMAGE,

      description:
        trip?.description ||
        destinationData
          ?.description ||
        "",

      bestFor:
        trip?.bestFor ||
        destinationData
          ?.bestFor ||
        destinationData
          ?.category ||
        "Explore • Experience • Discover",

      rating:
        trip?.rating ||
        destinationData?.rating ||
        "4.8",
    };
  }, [
    destinationData,
    destinationName,
    trip,
    location.state,
  ]);

  /* =======================================================
     AVAILABLE DESTINATION PLACES

     IMPORTANT:
     TripPlan me jo circles aa rahe hain,
     woh bhi destinations.js ke places se aa rahe hain.

     Isliye CreateTrip bhi SAME source use karega.
  ======================================================= */

  const availablePlaces = useMemo(() => {
    if (
      !destinationData ||
      !Array.isArray(
        destinationData?.places
      )
    ) {
      return [];
    }

    return destinationData.places
      .map((place) => {
        if (
          typeof place ===
          "string"
        ) {
          return {
            name: place,

            image:
              destination.image,

            location:
              destination.state,

            description:
              `Explore ${place}.`,

            detail: "",

            highlights: [
              "Local Experience",
              "Beautiful Views",
              "Explore & Discover",
            ],
          };
        }

        return {
          ...place,

          name:
            place?.name || "",

          image:
            place?.image ||
            destination.image,

          location:
            place?.location ||
            destination.state,

          description:
            place?.description ||
            `Explore ${
              place?.name ||
              destination.name
            }.`,

          detail:
            place?.detail || "",

          highlights:
            Array.isArray(
              place?.highlights
            ) &&
            place.highlights.length
              ? place.highlights
              : [
                  "Local Experience",
                  "Beautiful Views",
                  "Explore & Discover",
                ],
        };
      })
      .filter(
        (place) =>
          place.name
      );
  }, [
    destinationData,
    destination.image,
    destination.state,
    destination.name,
  ]);

  /* =======================================================
     SELECTED PLACES

     *** MAIN FIX ***

     Agar TripPlan me:
     Place 1
     Place 2
     Place 3

     tino select hue hain, to tino preserve honge.

     Koi unmatched place filter/remove nahi hoga.
  ======================================================= */

  const selectedPlaces = useMemo(() => {
    let rawPlaces =
      trip?.places ||
      trip?.selectedPlaces ||
      [];

    if (
      !Array.isArray(rawPlaces)
    ) {
      rawPlaces = String(
        rawPlaces
      )
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);
    }

    /*
      TripPlan maximum 3 places deta hai.
    */

    const firstThree =
      rawPlaces
        .filter(Boolean)
        .slice(0, 3);

    /*
      Agar selected place available nahi
      hai to destination ke first 3
      fallback rahenge.
    */

    if (
      firstThree.length === 0
    ) {
      return availablePlaces.slice(
        0,
        3
      );
    }

    /*
      HAR selected place ko map karo.
      Filter karke remove MAT KARO.
    */

    return firstThree.map(
      (selected, index) => {
        const selectedName =
          typeof selected ===
          "string"
            ? selected.trim()
            : String(
                selected?.name ||
                ""
              ).trim();

        /*
          Same destinations.js me place find karo.
        */

        const matched =
          availablePlaces.find(
            (place) =>
              normalizeText(
                place?.name
              ) ===
              normalizeText(
                selectedName
              )
          );

        /*
          Match mil gaya:
          destinations.js ki SAME
          image/detail use hogi.
        */

        if (matched) {
          return {
            ...matched,

            ...(typeof selected ===
            "object"
              ? selected
              : {}),

            name:
              matched.name,

            image:
              (typeof selected ===
                "object" &&
                selected?.image) ||
              matched.image ||
              destination.image,

            location:
              (typeof selected ===
                "object" &&
                selected?.location) ||
              matched.location ||
              destination.state,

            description:
              (typeof selected ===
                "object" &&
                selected
                  ?.description) ||
              matched.description ||
              `Explore ${matched.name}.`,

            detail:
              (typeof selected ===
                "object" &&
                selected?.detail) ||
              matched.detail ||
              "",

            highlights:
              typeof selected ===
                "object" &&
              Array.isArray(
                selected?.highlights
              ) &&
              selected.highlights
                .length
                ? selected.highlights
                : matched.highlights,
          };
        }

        /*
          Agar kisi reason se exact
          matching nahi hui tab bhi
          selected place REMOVE NAHI hoga.
        */

        if (
          typeof selected ===
          "object"
        ) {
          return {
            ...selected,

            name:
              selected?.name ||
              `Place ${
                index + 1
              }`,

            image:
              selected?.image ||
              destination.image,

            location:
              selected?.location ||
              destination.state,

            description:
              selected
                ?.description ||
              `Explore ${
                selected?.name ||
                destination.name
              }.`,

            detail:
              selected?.detail ||
              "",

            highlights:
              Array.isArray(
                selected
                  ?.highlights
              ) &&
              selected.highlights
                .length
                ? selected.highlights
                : [
                    "Local Experience",
                    "Beautiful Views",
                    "Explore & Discover",
                  ],
          };
        }

        /*
          String selected place.
          Isko bhi third item ke roop
          me preserve karo.
        */

        return {
          name:
            selectedName ||
            `Place ${index + 1}`,

          image:
            destination.image,

          location:
            destination.state,

          description:
            `Explore ${
              selectedName ||
              destination.name
            }.`,

          detail: "",

          highlights: [
            "Local Experience",
            "Beautiful Views",
            "Explore & Discover",
          ],
        };
      }
    );
  }, [
    trip?.places,
    trip?.selectedPlaces,
    availablePlaces,
    destination.image,
    destination.state,
    destination.name,
  ]);

  /* =======================================================
     CURRENT PLACE
  ======================================================= */

  const currentPlace =
    selectedPlaces.length > 0
      ? selectedPlaces[
          activePlace %
            selectedPlaces.length
        ]
      : {
          name:
            destination.name,

          image:
            destination.image,

          location:
            destination.state,

          description:
            destination.description ||
            `Explore ${destination.name}.`,

          detail: "",

          highlights: [
            "Local Experience",
            "Beautiful Views",
            "Explore & Discover",
          ],
        };

  /* =======================================================
     AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    if (
      selectedPlaces.length <=
      1
    ) {
      return undefined;
    }

    const interval =
      setInterval(() => {
        setActivePlace(
          (previous) =>
            (previous + 1) %
            selectedPlaces.length
        );
      }, 5000);

    return () =>
      clearInterval(
        interval
      );
  }, [
    selectedPlaces.length,
  ]);

  /* =======================================================
     RESET PLACE
  ======================================================= */

  useEffect(() => {
    setActivePlace(0);
  }, [
    destinationName,
    selectedPlaces.length,
  ]);

  /* =======================================================
     PREVIOUS PLACE
  ======================================================= */

  const handlePreviousPlace =
    () => {
      if (
        selectedPlaces.length <=
        1
      ) {
        return;
      }

      setActivePlace(
        (previous) =>
          previous === 0
            ? selectedPlaces.length -
              1
            : previous - 1
      );
    };

  /* =======================================================
     NEXT PLACE
  ======================================================= */

  const handleNextPlace =
    () => {
      if (
        selectedPlaces.length <=
        1
      ) {
        return;
      }

      setActivePlace(
        (previous) =>
          (previous + 1) %
          selectedPlaces.length
      );
    };

  /* =======================================================
     TOTAL DAYS
  ======================================================= */

  const totalDays =
    Math.max(
      1,
      getDaysNumber(
        trip?.totalDays ||
          trip?.days ||
          trip?.duration,
        3
      )
    );

  /* =======================================================
     STAY TYPE
  ======================================================= */

  const stayType =
    trip?.stay ||
    trip?.stayType ||
    "Hotel";

  const normalizedStay =
    [
      "Hotel",
      "Resort",
      "Villa",
      "Hostel",
    ].find(
      (item) =>
        item.toLowerCase() ===
        String(stayType)
          .toLowerCase()
          .trim()
    ) || "Hotel";

  const hotels =
    stayData[
      normalizedStay
    ] || stayData.Hotel;

  const selectedHotel =
    hotels[
      activeHotel %
        hotels.length
    ];

  /* =======================================================
     RESET HOTEL
  ======================================================= */

  useEffect(() => {
    setActiveHotel(0);
  }, [normalizedStay]);

  /* =======================================================
     DAY
  ======================================================= */

  useEffect(() => {
    if (
      activeDay >
      totalDays
    ) {
      setActiveDay(1);
    }
  }, [
    activeDay,
    totalDays,
  ]);

  /* =======================================================
     MORNING TEXT
  ======================================================= */

  const getMorningText = () => {
    if (
      currentPlace?.morning
    ) {
      return currentPlace.morning;
    }

    return `Start your morning exploring ${
      currentPlace?.name ||
      destination.name
    } and enjoy the local atmosphere.`;
  };

  /* =======================================================
     EVENING TEXT
  ======================================================= */

  const getEveningText = () => {
    if (
      currentPlace?.evening
    ) {
      return currentPlace.evening;
    }

    return `Enjoy a relaxed evening around ${
      currentPlace?.name ||
      destination.name
    }.`;
  };

  /* =======================================================
     NIGHT
  ======================================================= */

  const getNightTitle = () => {
    if (
      activeDay ===
      totalDays
    ) {
      return "Trip Memories & Rest";
    }

    return `Return to ${
      selectedHotel?.name ||
      "your stay"
    }`;
  };

  const getNightDescription =
    () => {
      if (
        activeDay ===
        totalDays
      ) {
        return `Relax after your final day in ${destination.name} and enjoy the last evening of your journey.`;
      }

      return `Return to ${
        selectedHotel?.name ||
        "your stay"
      }, relax and prepare for the next day of your ${destination.name} journey.`;
    };

  /* =======================================================
     EDIT TRIP
  ======================================================= */

  const handleEditTrip = () => {
    const updatedTrip = {
      ...trip,

      destination:
        destination.name,

      image:
        destination.image,

      destinationImage:
        destination.image,

      places:
        selectedPlaces,
    };

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        updatedTrip
      )
    );

    navigate(
      "/trip-plan",
      {
        state: {
          trip:
            updatedTrip,

          editMode: true,

          destination:
            destination.name,

          image:
            destination.image,

          destinationImage:
            destination.image,

          places:
            selectedPlaces,
        },
      }
    );
  };

  /* =======================================================
     BOOK HOTEL
  ======================================================= */

  const handleBookHotel = () => {
    const selectedBudget =
      trip?.budget ||
      trip?.budgetRange ||
      trip?.budgetText ||
      "";

    const selectedHotelData =
      {
        name:
          selectedHotel?.name ||
          "",

        type:
          selectedHotel?.type ||
          normalizedStay,

        location:
          selectedHotel
            ?.location ||
          "",

        image:
          selectedHotel?.image ||
          "",

        rating:
          selectedHotel
            ?.rating ||
          "",

        reviews:
          selectedHotel
            ?.reviews ||
          "",
      };

    /*
      IMPORTANT:
      Yahan bhi tino places full objects
      ke saath save ho rahe hain.
    */

    const updatedTrip = {
      ...trip,

      destination:
        destination.name,

      destinationId:
        trip?.destinationId ||
        normalizeText(
          destination.name
        ),

      state:
        destination.state,

      destinationState:
        destination.state,

      image:
        destination.image,

      destinationImage:
        destination.image,

      description:
        destination.description,

      bestFor:
        destination.bestFor,

      rating:
        destination.rating,

      /*
        ALL 3 SELECTED PLACES
      */

      places:
        selectedPlaces.map(
          (place) => ({
            ...place,
          })
        ),

      selectedPlaces:
        selectedPlaces.map(
          (place) => ({
            ...place,
          })
        ),

      totalDays,

      days:
        trip?.days ||
        totalDays,

      stay:
        selectedHotelData.type,

      hotel:
        selectedHotelData,

      hotelImage:
        selectedHotelData.image,

      budget:
        selectedBudget,
    };

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(
        updatedTrip
      )
    );

    const bookingData = {
      trip:
        updatedTrip,

      destination:
        destination.name,

      image:
        destination.image,

      destinationImage:
        destination.image,

      places:
        selectedPlaces.map(
          (place) => ({
            ...place,
          })
        ),

      hotel:
        selectedHotelData,

      budget:
        selectedBudget,

      travellers:
        trip?.travellers ||
        trip?.travelers ||
        trip?.guests ||
        2,

      totalDays,

      stay:
        selectedHotelData.type,
    };

    localStorage.setItem(
      "bookingData",
      JSON.stringify(
        bookingData
      )
    );

    setTrip(
      updatedTrip
    );

    navigate(
      "/booking-details",
      {
        state: {
          trip:
            updatedTrip,

          destination:
            destination.name,

          state:
            destination.state,

          image:
            destination.image,

          destinationImage:
            destination.image,

          /*
            ALL 3 AGAIN
          */

          places:
            selectedPlaces.map(
              (place) => ({
                ...place,
              })
            ),

          hotel:
            selectedHotelData,

          bookingData,

          budget:
            selectedBudget,
        },
      }
    );
  };

  /* =======================================================
     DEBUG
     Console me check kar sakti ho:
     3 selected hain to array length 3 aayegi.
  ======================================================= */

  useEffect(() => {
    if (
      selectedPlaces.length
    ) {
      console.log(
        "CREATE TRIP SELECTED PLACES:",
        selectedPlaces
      );

      console.log(
        "TOTAL SELECTED PLACES:",
        selectedPlaces.length
      );
    }
  }, [selectedPlaces]);

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="create-trip-page">

      {/* ===================================================
          TOP
      =================================================== */}

      <section className="trip-top-section">

        <div className="trip-top-left">

          <span className="trip-small-label">
            YOUR PERSONALIZED JOURNEY
          </span>

          <h1>
            {destination.name}
          </h1>

          <p>
            {destination.bestFor}
          </p>

        </div>

        <button
          type="button"
          className="edit-trip-btn"
          onClick={
            handleEditTrip
          }
        >
          <FiEdit3 />

          Edit Trip
        </button>

      </section>

      {/* ===================================================
          INFO
      =================================================== */}

      <section className="trip-info-strip">

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiMapPin />
          </span>

          <div>

            <span>
              DESTINATION
            </span>

            <strong>
              {destination.name}
            </strong>

          </div>

        </div>

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiCalendar />
          </span>

          <div>

            <span>
              DURATION
            </span>

            <strong>
              {totalDays} Days
            </strong>

          </div>

        </div>

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiUsers />
          </span>

          <div>

            <span>
              TRAVELLERS
            </span>

            <strong>
              {trip?.travellers ||
                trip?.travelers ||
                trip?.guests ||
                2}
            </strong>

          </div>

        </div>

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiCompass />
          </span>

          <div>

            <span>
              TRIP STYLE
            </span>

            <strong>
              {trip?.travelType ||
                trip?.tripType ||
                trip?.travelStyle ||
                "Explorer"}
            </strong>

          </div>

        </div>

      </section>

      {/* ===================================================
          EXPERIENCE
      =================================================== */}

      <section className="experience-section">

        {/* LEFT IMAGE */}

        <div className="experience-image">

          <img
            key={`${currentPlace?.name}-${activePlace}`}
            src={
              currentPlace?.image ||
              destination.image
            }
            alt={
              currentPlace?.name ||
              destination.name
            }
            className="experience-single-image"
            onError={(event) => {
              event.currentTarget.src =
                destination.image ||
                FALLBACK_IMAGE;
            }}
          />

          <div className="experience-image-overlay" />

          <div className="experience-auto-label">

            <span className="auto-dot" />

            AUTO TOUR

            {selectedPlaces.length >
              1 &&
              " • 5 SEC"}

          </div>

          <div className="experience-location">

            <FiMapPin />

            <span>
              {currentPlace?.location ||
                destination.state}
            </span>

          </div>

          {selectedPlaces.length >
            1 && (
            <>
              <button
                type="button"
                className="experience-arrow experience-left"
                onClick={
                  handlePreviousPlace
                }
              >
                <FiArrowLeft />
              </button>

              <button
                type="button"
                className="experience-arrow experience-right"
                onClick={
                  handleNextPlace
                }
              >
                <FiArrowRight />
              </button>
            </>
          )}

          <div className="experience-place-count">

            <strong>
              {String(
                activePlace + 1
              ).padStart(
                2,
                "0"
              )}
            </strong>

            <span>
              /
              {String(
                Math.max(
                  selectedPlaces.length,
                  1
                )
              ).padStart(
                2,
                "0"
              )}
            </span>

          </div>

        </div>

        {/* RIGHT DETAILS */}

        <div className="experience-details">

          <div className="experience-number">

            <span>
              SELECTED PLACE
            </span>

            <strong>
              {String(
                activePlace + 1
              ).padStart(
                2,
                "0"
              )}
            </strong>

          </div>

          <h2>
            {currentPlace?.name ||
              destination.name}
          </h2>

          <div className="experience-place-location">

            <FiMapPin />

            <span>
              {currentPlace?.location ||
                destination.state}
            </span>

          </div>

          <p className="experience-description">
            {currentPlace?.description ||
              `Explore ${currentPlace?.name || destination.name}.`}
          </p>

          {currentPlace?.detail && (
            <p className="experience-detail-text">
              {currentPlace.detail}
            </p>
          )}

          {/* HIGHLIGHTS */}

          <div className="experience-highlights">

            <span className="experience-label">
              HIGHLIGHTS
            </span>

            <div className="highlight-list">

              {(currentPlace
                ?.highlights ||
                []).map(
                (
                  item,
                  index
                ) => (
                  <div
                    className="highlight-item"
                    key={`${item}-${index}`}
                  >
                    <span>
                      <FiCheck />
                    </span>

                    {item}
                  </div>
                )
              )}

            </div>

          </div>

          {/* MORNING / EVENING */}

          <div className="mini-itinerary">

            <div className="mini-plan">

              <span>
                MORNING
              </span>

              <p>
                {getMorningText()}
              </p>

            </div>

            <div className="mini-plan">

              <span>
                EVENING
              </span>

              <p>
                {getEveningText()}
              </p>

            </div>

          </div>

          {/* EXACT 3 DOTS WHEN 3 SELECTED */}

          <div className="experience-bottom">

            <div className="experience-dots">

              {selectedPlaces.map(
                (
                  place,
                  index
                ) => (
                  <button
                    type="button"
                    key={`${place?.name}-${index}`}
                    aria-label={`Show ${
                      place?.name ||
                      `place ${index + 1}`
                    }`}
                    className={
                      activePlace ===
                      index
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActivePlace(
                        index
                      )
                    }
                  />
                )
              )}

            </div>

            <span>
              {
                selectedPlaces.length
              }{" "}
              selected places
            </span>

          </div>

        </div>

      </section>

      {/* ===================================================
          HOTEL
      =================================================== */}

      <section className="hotel-stay-section">

        <div className="hotel-section-header">

          <div>

            <span className="hotel-section-label">
              YOUR STAY
            </span>

            <h2>
              Stay somewhere special.
            </h2>

          </div>

          <div className="hotel-header-location">

            <FiMapPin />

            <span>
              {destination.state}
            </span>

          </div>

        </div>

        <div className="hotel-stay-layout">

          {/* HOTEL LEFT */}

          <div className="hotel-selection-area">

            <div className="main-hotel-card">

              <div className="main-hotel-image">

                <img
                  src={
                    selectedHotel?.image
                  }
                  alt={
                    selectedHotel?.name
                  }
                />

                <div className="hotel-image-overlay" />

                <div className="hotel-card-location">

                  <FiMapPin />

                  <span>
                    {selectedHotel?.location ||
                      destination.state}
                  </span>

                </div>

              </div>

              <div className="main-hotel-info">

                <div className="hotel-rating">

                  <FiStar />

                  <strong>
                    {selectedHotel?.rating ||
                      "4.8"}
                  </strong>

                  <span>
                    {selectedHotel?.reviews ||
                      "Excellent stay"}
                  </span>

                </div>

                <h3>
                  {selectedHotel?.name}
                </h3>

                <p>
                  A carefully selected{" "}
                  {selectedHotel?.type}{" "}
                  for your{" "}
                  {destination.name}{" "}
                  journey. Comfortable
                  rooms, beautiful
                  surroundings and easy
                  access to your selected
                  places.
                </p>

              </div>

            </div>

            {/* HOTEL THUMBNAILS */}

            <div className="hotel-thumbnail-row">

              {hotels.map(
                (
                  hotel,
                  index
                ) => (
                  <button
                    type="button"
                    key={`${hotel.name}-${index}`}
                    className={`hotel-thumbnail ${
                      activeHotel ===
                      index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveHotel(
                        index
                      )
                    }
                  >

                    <img
                      src={
                        hotel.image
                      }
                      alt={
                        hotel.name
                      }
                    />

                    <div className="thumbnail-overlay" />

                    <span className="thumbnail-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="thumbnail-name">
                      {hotel.name}
                    </span>

                  </button>
                )
              )}

            </div>

          </div>

          {/* =================================================
              DAILY JOURNEY
          ================================================= */}

          <div className="hotel-schedule-card">

            <div className="schedule-top">

              <div>

                <span>
                  YOUR DAILY JOURNEY
                </span>

                <h3>
                  Day {activeDay}
                </h3>

              </div>

              <div className="schedule-days-count">

                <strong>
                  {totalDays}
                </strong>

                <span>
                  days
                </span>

              </div>

            </div>

            {/* DAYS */}

            <div className="day-selector">

              {Array.from(
                {
                  length:
                    totalDays,
                },
                (_, index) =>
                  index + 1
              ).map(
                (day) => (
                  <button
                    type="button"
                    key={day}
                    className={
                      activeDay ===
                      day
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveDay(
                        day
                      )
                    }
                  >

                    <span>
                      DAY
                    </span>

                    <strong>
                      {String(
                        day
                      ).padStart(
                        2,
                        "0"
                      )}
                    </strong>

                  </button>
                )
              )}

            </div>

            {/* SCHEDULE */}

            <div className="active-day-content">

              {/* MORNING */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span>
                    08:00
                  </span>

                  <small>
                    AM
                  </small>

                </div>

                <div className="day-circle">
                  <FiHome />
                </div>

                <div className="schedule-content">

                  <span>
                    MORNING
                  </span>

                  <h4>
                    Breakfast & Start
                  </h4>

                  <p>
                    Start your morning
                    at{" "}
                    {selectedHotel?.name}{" "}
                    and prepare for your
                    day in{" "}
                    {destination.name}.
                  </p>

                </div>

              </div>

              {/* EXPLORE */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span>
                    10:00
                  </span>

                  <small>
                    AM
                  </small>

                </div>

                <div className="day-circle">
                  <FiNavigation />
                </div>

                <div className="schedule-content">

                  <span>
                    EXPLORE
                  </span>

                  <h4>
                    {currentPlace?.name}
                  </h4>

                  <p>
                    {currentPlace?.description}
                  </p>

                </div>

              </div>

              {/* EVENING */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span>
                    06:00
                  </span>

                  <small>
                    PM
                  </small>

                </div>

                <div className="day-circle">
                  <FiMapPin />
                </div>

                <div className="schedule-content">

                  <span>
                    EVENING
                  </span>

                  <h4>
                    Local Experience
                  </h4>

                  <p>
                    {getEveningText()}
                  </p>

                </div>

              </div>

              {/* NIGHT */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span>
                    10:00
                  </span>

                  <small>
                    PM
                  </small>

                </div>

                <div className="day-circle">
                  <FiClock />
                </div>

                <div className="schedule-content">

                  <span>
                    NIGHT
                  </span>

                  <h4>
                    {getNightTitle()}
                  </h4>

                  <p>
                    {getNightDescription()}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BOOK
        ================================================= */}

        <div className="hotel-booking-area">

          <div className="hotel-booking-text">

            <span>
              READY TO RESERVE?
            </span>

            <h3>
              Complete your stay at{" "}

              <strong>
                {selectedHotel?.name}
              </strong>
            </h3>

            <p>
              Your destination, all{" "}
              {selectedPlaces.length}{" "}
              selected places, images,
              budget and stay will
              continue to booking.
            </p>

          </div>

          <button
            type="button"
            className="hotel-book-btn"
            onClick={
              handleBookHotel
            }
          >

            <span>
              Book This Stay
            </span>

            <FiArrowRight />

          </button>

        </div>

      </section>

    </main>
  );
};

export default CreateTrip;