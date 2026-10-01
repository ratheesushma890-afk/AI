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
   HOTEL / STAY DATA
========================================================= */

const stayData = {

  /* =======================================================
     HOTELS
  ======================================================= */

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


  /* =======================================================
     RESORTS
  ======================================================= */

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


  /* =======================================================
     VILLAS
  ======================================================= */

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


  /* =======================================================
     HOSTELS
  ======================================================= */

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
   NORMALIZE TEXT
========================================================= */

const normalizeText = (
  value = ""
) => {

  return String(value)

    .toLowerCase()

    .replace(/[’']/g, "")

    .replace(/[,.]/g, "")

    .replace(/\s+/g, " ")

    .trim();
};


/* =========================================================
   GET DAYS NUMBER
========================================================= */

const getDaysNumber = (
  value,
  fallback = 3
) => {

  const match =
    String(
      value ?? ""
    ).match(/\d+/);

  if (!match) {
    return fallback;
  }

  const number =
    Number(match[0]);

  return Number.isFinite(number)
    ? number
    : fallback;
};


/* =========================================================
   CREATE TRIP COMPONENT
========================================================= */

const CreateTrip = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  /* =======================================================
     STATES
  ======================================================= */

  const [trip, setTrip] =
    useState({});


  /*
    Selected place ka index.

    Ye place images ko automatic
    change karne ke liye use hoga.
  */

  const [
    activePlace,
    setActivePlace,
  ] = useState(0);


  /*
    Selected hotel ka index.

    IMPORTANT:
    Hotel automatic change nahi hoga.
    Neeche hotel thumbnail par click karne
    par hi selected hotel change hoga.
  */

  const [
    activeHotel,
    setActiveHotel,
  ] = useState(0);


  /*
    Daily journey me selected day.
  */

  const [
    activeDay,
    setActiveDay,
  ] = useState(1);


  /* =======================================================
     LOAD TRIP
  ======================================================= */

  useEffect(() => {

    let savedTrip = {};

    try {

      const stored =
        localStorage.getItem(
          "tripperTrip"
        );

      savedTrip =
        stored
          ? JSON.parse(stored)
          : {};

    } catch (error) {

      console.error(
        "Trip restore error:",
        error
      );

    }


    /* =========================
       ROUTER STATE
    ========================= */

    const stateData =
      location.state || {};


    const stateTrip =
      stateData?.trip || {};

    const finalTrip = {

      ...savedTrip,

      ...stateTrip,

      ...stateData,

    };


    /*
      Agar state ke andar trip
      property thi to duplicate
      object remove kar do.
    */

    delete finalTrip.trip;


    setTrip(
      finalTrip
    );


    /*
      Latest merged trip ko
      localStorage me preserve karo.
    */

    if (
      Object.keys(
        finalTrip
      ).length > 0
    ) {

      localStorage.setItem(

        "tripperTrip",

        JSON.stringify(
          finalTrip
        )

      );

    }

  }, [
    location.state,
  ]);


  /* =======================================================
     DESTINATION NAME
  ======================================================= */

  const destinationName =
    useMemo(() => {

      const value =

        trip?.destination ||

        location.state
          ?.destination ||

        "Goa";


      /*
        Agar destination object
        ke form me aa gaya.
      */

      if (
        typeof value ===
        "object"
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
     FIND DESTINATION DATA

     TripPlan aur CreateTrip dono
     same destinations.js use karenge.
  ======================================================= */

  const destinationData =
    useMemo(() => {

      const target =
        normalizeText(
          destinationName
        );


      if (!target) {
        return null;
      }


      /*
        destinations.js ARRAY hai
        to id/name se search karo.
      */

      if (
        Array.isArray(
          destinations
        )
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


      /*
        Agar destinations object
        form me ho.
      */

      return (

        destinations?.[
          target
        ] ||

        null

      );

    }, [
      destinationName,
    ]);


  /* =======================================================
     DESTINATION MAIN DATA
  ======================================================= */

  const destination =
    useMemo(() => {

      const passedImage =

        trip?.image ||

        trip?.destinationImage ||

        location.state?.image ||

        location.state
          ?.destinationImage;


      return {

        /* NAME */

        name:

          destinationData?.name ||

          destinationName ||

          "Destination",


        /* STATE / LOCATION */

        state:

          trip?.state ||

          trip?.destinationState ||

          destinationData?.state ||

          destinationData
            ?.location ||

          destinationData
            ?.country ||

          destinationName,


        /* MAIN IMAGE */

        image:

          passedImage ||

          destinationData?.image ||

          FALLBACK_IMAGE,


        /* DESCRIPTION */

        description:

          trip?.description ||

          destinationData
            ?.description ||

          "",


        /* BEST FOR */

        bestFor:

          trip?.bestFor ||

          destinationData
            ?.bestFor ||

          destinationData
            ?.category ||

          "Explore • Experience • Discover",


        /* RATING */

        rating:

          trip?.rating ||

          destinationData
            ?.rating ||

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
  ======================================================= */

  const availablePlaces =
    useMemo(() => {

      /*
        Agar destination me
        places nahi hain.
      */

      if (

        !destinationData ||

        !Array.isArray(
          destinationData
            ?.places
        )

      ) {

        return [];

      }


      return destinationData
        .places

        .map(
          (place) => {

            /*
              Agar place sirf string hai.
            */

            if (
              typeof place ===
              "string"
            ) {

              return {

                name:
                  place,

                image:
                  destination.image,

                location:
                  destination.state,

                description:
                  `Explore ${place}.`,

                detail:
                  "",

                highlights: [
                  "Local Experience",
                  "Beautiful Views",
                  "Explore & Discover",
                ],

              };

            }


            /*
              Agar full place object hai.
            */

            return {

              ...place,


              name:

                place?.name ||

                "",


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

                place?.detail ||

                "",


              highlights:

                Array.isArray(
                  place?.highlights
                ) &&

                place.highlights
                  .length

                  ? place.highlights

                  : [
                      "Local Experience",
                      "Beautiful Views",
                      "Explore & Discover",
                    ],

            };

          }
        )

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

     TripPlan me selected maximum
     3 places yahan preserve honge.
  ======================================================= */

  const selectedPlaces =
    useMemo(() => {

      let rawPlaces =

        trip?.places ||

        trip?.selectedPlaces ||

        [];


      /*
        Agar array nahi hai aur
        comma separated string hai.
      */

      if (
        !Array.isArray(
          rawPlaces
        )
      ) {

        rawPlaces =
          String(rawPlaces)

            .split(",")

            .map(
              (item) =>
                item.trim()
            )

            .filter(Boolean);

      }


      /*
        Maximum first 3 places.
      */

      const firstThree =
        rawPlaces

          .filter(Boolean)

          .slice(
            0,
            3
          );


      /*
        Agar TripPlan se places
        nahi aaye to destination
        ke first 3 fallback.
      */

      if (
        firstThree.length ===
        0
      ) {

        return (
          availablePlaces.slice(
            0,
            3
          )
        );

      }


      /*
        Har selected place ko
        destination data ke saath
        match karo.

        IMPORTANT:
        Kisi selected place ko
        remove nahi karna.
      */

      return firstThree.map(
        (
          selected,
          index
        ) => {

          const selectedName =

            typeof selected ===
            "string"

              ? selected.trim()

              : String(
                  selected?.name ||
                  ""
                ).trim();


          /* =====================
             FIND MATCH
          ===================== */

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


          /* =====================
             MATCH FOUND
          ===================== */

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

                (
                  typeof selected ===
                    "object" &&

                  selected?.image
                ) ||

                matched.image ||

                destination.image,


              location:

                (
                  typeof selected ===
                    "object" &&

                  selected?.location
                ) ||

                matched.location ||

                destination.state,


              description:

                (
                  typeof selected ===
                    "object" &&

                  selected
                    ?.description
                ) ||

                matched.description ||

                `Explore ${matched.name}.`,


              detail:

                (
                  typeof selected ===
                    "object" &&

                  selected?.detail
                ) ||

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


          /* =====================
             SELECTED OBJECT
             BUT NO MATCH
          ===================== */

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


          /* =====================
             STRING PLACE FALLBACK
          ===================== */

          return {

            name:

              selectedName ||

              `Place ${
                index + 1
              }`,


            image:
              destination.image,


            location:
              destination.state,


            description:

              `Explore ${
                selectedName ||
                destination.name
              }.`,


            detail:
              "",


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

          detail:
            "",

          highlights: [
            "Local Experience",
            "Beautiful Views",
            "Explore & Discover",
          ],

        };
          /* =======================================================
     PLACE AUTO SLIDER

  ======================================================= */

  useEffect(() => {

    if (
      selectedPlaces.length <= 1
    ) {
      return undefined;
    }

    const placeInterval =
      setInterval(() => {

        setActivePlace(
          (previous) =>
            (previous + 1) %
            selectedPlaces.length
        );

      }, 5000);


    return () => {

      clearInterval(
        placeInterval
      );

    };

  }, [
    selectedPlaces.length,
  ]);


  /* =======================================================
     RESET PLACE

     Destination ya selected places
     change hue to first place se
     start karna hai.
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

  const handlePreviousPlace = () => {

    if (
      selectedPlaces.length <= 1
    ) {
      return;
    }


    setActivePlace(
      (previous) =>

        previous === 0

          ? selectedPlaces.length - 1

          : previous - 1
    );

  };


  /* =======================================================
     NEXT PLACE
  ======================================================= */

  const handleNextPlace = () => {

    if (
      selectedPlaces.length <= 1
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


  /* =======================================================
     NORMALIZED STAY
  ======================================================= */

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


  /* =======================================================
     AVAILABLE HOTELS / STAYS

  ======================================================= */

  const hotels =

    stayData[
      normalizedStay
    ] ||

    stayData.Hotel;


  /* =======================================================
     SELECTED HOTEL
  ======================================================= */

  const selectedHotel =

    hotels.length > 0

      ? hotels[
          activeHotel %
          hotels.length
        ]

      : null;


  /* =======================================================
     RESET HOTEL

     Stay type change hote hi:
     first hotel/stay show hoga.
  ======================================================= */

  useEffect(() => {

    setActiveHotel(0);

  }, [
    normalizedStay,
  ]);


  


  /* =======================================================
     MANUAL HOTEL SELECT

     Thumbnail click karne par bhi
     hotel change hoga.
  ======================================================= */

  const handleHotelSelect = (
    index
  ) => {

    if (
      index < 0 ||
      index >= hotels.length
    ) {
      return;
    }


    setActiveHotel(
      index
    );

  };


  /* =======================================================
     ACTIVE HOTEL NUMBER
  ======================================================= */

  const activeHotelNumber =
    String(
      activeHotel + 1
    ).padStart(
      2,
      "0"
    );


  /* =======================================================
     TOTAL HOTEL NUMBER
  ======================================================= */

  const totalHotelNumber =
    String(
      hotels.length
    ).padStart(
      2,
      "0"
    );


  /* =======================================================
     ACTIVE DAY FIX

     Example:
     Pehle trip = 5 days
     activeDay = 5

     Edit karke trip = 3 days

     To activeDay automatically
     Day 1 par aa jayega.
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
     SCHEDULE PLACE

     Daily Journey ko active day ke hisaab se
     selected place diya jayega. Isse upar ka
     5-second place slider schedule ko random
     change nahi karega.
  ======================================================= */

  const schedulePlace =
    selectedPlaces.length > 0
      ? selectedPlaces[
          (activeDay - 1) %
            selectedPlaces.length
        ]
      : currentPlace;
/* =======================================================
   DAY WISE SCHEDULE
======================================================= */

const daySchedule = useMemo(() => {
  const place =
    selectedPlaces.length > 0
      ? selectedPlaces[
          (activeDay - 1) % selectedPlaces.length
        ]
      : currentPlace;

  const hotelName =
    selectedHotel?.name || "your stay";

  const isFirstDay = activeDay === 1;
  const isLastDay = activeDay === totalDays;

  if (isFirstDay) {
    return {
      morningTitle: "Arrival & Breakfast",
      morningText: `Start your first day at ${hotelName}. Freshen up, enjoy breakfast and get ready to explore ${destination.name}.`,

      exploreTitle:
        place?.name || destination.name,
      exploreText:
        place?.description ||
        `Explore ${place?.name || destination.name} and enjoy the local attractions.`,

      eveningTitle: "Sunset & Local Experience",
      eveningText:
        place?.evening ||
        `Spend your evening around ${place?.name || destination.name}, explore nearby markets and enjoy the local atmosphere.`,

      nightTitle: `Return to ${hotelName}`,
      nightText: `Return to ${hotelName}, enjoy dinner and relax after your first day in ${destination.name}.`,
    };
  }

  if (isLastDay) {
    return {
      morningTitle: "Breakfast & Final Morning",
      morningText: `Enjoy your final breakfast at ${hotelName} and prepare for the last day of your ${destination.name} journey.`,

      exploreTitle:
        place?.name || destination.name,
      exploreText:
        place?.description ||
        `Spend your final sightseeing hours exploring ${place?.name || destination.name}.`,

      eveningTitle: "Last Evening & Memories",
      eveningText:
        place?.evening ||
        `Enjoy your final evening in ${destination.name}, take photos and collect some beautiful trip memories.`,

      nightTitle: "Trip Memories & Rest",
      nightText: `Relax after your final day in ${destination.name} and enjoy the last evening of your journey.`,
    };
  }

  return {
    morningTitle: `Day ${activeDay} Breakfast & Start`,
    morningText:
      place?.morning ||
      `Enjoy breakfast at ${hotelName} and get ready for another beautiful day in ${destination.name}.`,

    exploreTitle:
      place?.name || destination.name,
    exploreText:
      place?.description ||
      `Explore ${place?.name || destination.name} and discover its popular attractions.`,

    eveningTitle: "Local Experience",
    eveningText:
      place?.evening ||
      `Enjoy a relaxed evening around ${place?.name || destination.name}.`,

    nightTitle: `Return to ${hotelName}`,
    nightText: `Return to ${hotelName}, relax and prepare for Day ${
      activeDay + 1
    } of your ${destination.name} journey.`,
  };
}, [
  activeDay,
  totalDays,
  selectedPlaces,
  currentPlace,
  selectedHotel,
  destination.name,
]);

  /* =======================================================
     MORNING TEXT
  ======================================================= */

  const getMorningText = () => {

    if (
      currentPlace?.morning
    ) {

      return (
        currentPlace.morning
      );

    }


    return `Start your morning exploring ${
      currentPlace?.name ||
      destination.name
    } and enjoy the local atmosphere.`;

  };


  /* =======================================================
     EVENING TEXT
  ======================================================= */

  const getEveningText = (
    place = currentPlace
  ) => {

    if (
      place?.evening
    ) {

      return (
        place.evening
      );

    }


    return `Enjoy a relaxed evening around ${
      place?.name ||
      destination.name
    }.`;

  };


  /* =======================================================
     NIGHT TITLE
  ======================================================= */

  const getNightTitle = () => {

    /*
      Last day par hotel return ki
      jagah trip ending text.
    */

    if (
      activeDay ===
      totalDays
    ) {

      return (
        "Trip Memories & Rest"
      );

    }


    return `Return to ${
      selectedHotel?.name ||
      "your stay"
    }`;

  };


  /* =======================================================
     NIGHT DESCRIPTION
  ======================================================= */

  const getNightDescription = () => {

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

    /*
      Current trip ke saath
      latest destination + places
      preserve karo.
    */

    const updatedTrip = {

      ...trip,


      /* DESTINATION */

      destination:
        destination.name,


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


      /* SELECTED PLACES */

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


      /* DAYS */

      totalDays,


      /* STAY */

      stay:
        normalizedStay,

    };


    /* =========================
       SAVE
    ========================= */

    localStorage.setItem(

      "tripperTrip",

      JSON.stringify(
        updatedTrip
      )

    );


    /* =========================
       BACK TO TRIP PLAN
    ========================= */

    navigate(
      "/trip-plan",
      {

        state: {

          trip:
            updatedTrip,


          editMode:
            true,


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

        },

      }
    );

  };


  /* =======================================================
     BOOK HOTEL
  ======================================================= */

  const handleBookHotel = () => {

    /*
      Budget wahi use hoga jo
      TripPlan me user ne select
      kiya tha.

      Automatic budget yahan
      dobara calculate nahi hoga.
    */

    const selectedBudget =

      trip?.budget ||

      trip?.budgetRange ||

      trip?.budgetText ||

      "";


    /* =====================================================
       SELECTED HOTEL DATA

       IMPORTANT:
       User ne thumbnail se jo hotel
       select kiya hai, wahi hotel
       yahan save hoga.
    ===================================================== */

    const selectedHotelData = {

      name:

        selectedHotel?.name ||

        "",


      type:

        selectedHotel?.type ||

        normalizedStay,


      location:

        selectedHotel?.location ||

        destination.state ||

        "",


      image:

        selectedHotel?.image ||

        FALLBACK_IMAGE,


      rating:

        selectedHotel?.rating ||

        "4.8",


      reviews:

        selectedHotel?.reviews ||

        "Excellent stay",

    };


    /* =====================================================
       UPDATED TRIP
    ===================================================== */

    const updatedTrip = {

      ...trip,


      /* =========================
         DESTINATION
      ========================= */

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


      /* =========================
         ALL SELECTED PLACES

         Maximum 3 selected places
         full objects ke saath.
      ========================= */

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


      /* =========================
         DAYS
      ========================= */

      totalDays,


      days:

        trip?.days ||

        totalDays,


      /* =========================
         TRAVELLERS
      ========================= */

      travellers:

        trip?.travellers ||

        trip?.travelers ||

        trip?.guests ||

        2,


      adults:

        trip?.adults ||

        (
          trip?.travelType ===
          "Solo"

            ? 1

            : 2
        ),


      children:

        trip?.children ||

        0,


      /* =========================
         TRIP TYPE
      ========================= */

      travelType:

        trip?.travelType ||

        trip?.tripType ||

        "Couple",


      /* =========================
         STAY TYPE
      ========================= */

      stay:
        selectedHotelData.type,


      stayType:
        selectedHotelData.type,


      /* =========================
         SELECTED HOTEL

         Ye bahut important hai.

         BookingDetails me isi
         object ko use karna.
      ========================= */

      hotel:
        selectedHotelData,


      selectedHotel:
        selectedHotelData,


      hotelName:
        selectedHotelData.name,


      hotelImage:
        selectedHotelData.image,


      hotelLocation:
        selectedHotelData.location,


      hotelRating:
        selectedHotelData.rating,


      hotelReviews:
        selectedHotelData.reviews,


      /* =========================
         BUDGET

         User selected budget
         exactly preserve hoga.
      ========================= */

      budget:
        selectedBudget,


      /* =========================
         OTHER PREFERENCES
      ========================= */

      style:

        trip?.style ||

        "Relaxed",


      transport:

        trip?.transport ||

        "Any",


      interests:

        Array.isArray(
          trip?.interests
        )

          ? [
              ...trip.interests,
            ]

          : [],

    };


    /* =====================================================
       SAVE UPDATED TRIP
    ===================================================== */

    localStorage.setItem(

      "tripperTrip",

      JSON.stringify(
        updatedTrip
      )

    );


    /* =====================================================
       BOOKING DATA

       BookingDetails page ko
       direct clean data milega.
    ===================================================== */

    const bookingData = {

      /* FULL TRIP */

      trip:
        updatedTrip,


      /* DESTINATION */

      destination:
        destination.name,


      state:
        destination.state,


      image:
        destination.image,


      destinationImage:
        destination.image,


      /* PLACES */

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


      /* HOTEL */

      hotel:
        selectedHotelData,


      selectedHotel:
        selectedHotelData,


      hotelName:
        selectedHotelData.name,


      hotelImage:
        selectedHotelData.image,


      /* BUDGET */

      budget:
        selectedBudget,


      /* MEMBERS */

      travellers:

        trip?.travellers ||

        trip?.travelers ||

        trip?.guests ||

        2,


      adults:

        trip?.adults ||

        2,


      children:

        trip?.children ||

        0,


      /* DAYS */

      totalDays,


      days:
        totalDays,


      /* STAY */

      stay:
        selectedHotelData.type,


      /* TRAVEL TYPE */

      travelType:

        trip?.travelType ||

        trip?.tripType ||

        "Couple",

    };


    /* =====================================================
       SAVE BOOKING DATA
    ===================================================== */

    localStorage.setItem(

      "bookingData",

      JSON.stringify(
        bookingData
      )

    );


    /*
      Current CreateTrip state bhi
      latest selected hotel ke saath
      update kar do.
    */

    setTrip(
      updatedTrip
    );


    /* =====================================================
       GO TO BOOKING DETAILS
    ===================================================== */

    navigate(
      "/booking-details",
      {

        state: {

          /* FULL TRIP */

          trip:
            updatedTrip,


          /* DESTINATION */

          destination:
            destination.name,


          state:
            destination.state,


          image:
            destination.image,


          destinationImage:
            destination.image,


          /* ALL PLACES */

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


          /* HOTEL */

          hotel:
            selectedHotelData,


          selectedHotel:
            selectedHotelData,


          hotelName:
            selectedHotelData.name,


          hotelImage:
            selectedHotelData.image,


          /* BOOKING */

          bookingData,


          /* BUDGET */

          budget:
            selectedBudget,


          /* MEMBERS */

          travellers:

            trip?.travellers ||

            trip?.travelers ||

            trip?.guests ||

            2,


          adults:

            trip?.adults ||

            2,


          children:

            trip?.children ||

            0,


          /* DAYS */

          totalDays,


          /* STAY */

          stay:
            selectedHotelData.type,


          /* TRIP TYPE */

          travelType:

            trip?.travelType ||

            trip?.tripType ||

            "Couple",

        },

      }
    );

  };


  /* =======================================================
     DEBUG SELECTED PLACES
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

  }, [
    selectedPlaces,
  ]);


  /* =======================================================
     DEBUG SELECTED HOTEL

     Thumbnail se selected hotel
     console me check karne ke liye.
  ======================================================= */

  useEffect(() => {

    if (!selectedHotel) {
      return;
    }


    console.log(

      "CURRENT HOTEL:",

      selectedHotel.name

    );

  }, [
    selectedHotel,
  ]);
    /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="create-trip-page">

      {/* ===================================================
          TOP SECTION
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


        {/* EDIT TRIP */}

        <button
          type="button"
          className="edit-trip-btn"
          onClick={handleEditTrip}
        >
          <FiEdit3 />

          <span>
            Edit Trip
          </span>
        </button>

      </section>


      {/* ===================================================
          TRIP INFO STRIP
      =================================================== */}

      <section className="trip-info-strip">

        {/* DESTINATION */}

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


        {/* DURATION */}

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiCalendar />
          </span>

          <div>

            <span>
              DURATION
            </span>

            <strong>
              {totalDays}{" "}
              {totalDays === 1
                ? "Day"
                : "Days"}
            </strong>

          </div>

        </div>


        {/* TRAVELLERS */}

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


        {/* TRIP TYPE */}

        <div className="trip-info-item">

          <span className="trip-info-icon">
            <FiCompass />
          </span>

          <div>

            <span>
              TRIP TYPE
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
          EXPERIENCE / SELECTED PLACES
      =================================================== */}

      <section className="experience-section">


        {/* =================================================
            LEFT — AUTO CHANGING IMAGE
        ================================================= */}

        <div className="experience-image">

          <img
            key={`${currentPlace?.name}-${activePlace}`}
            src={
              currentPlace?.image ||
              destination.image ||
              FALLBACK_IMAGE
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


          {/* DARK/LIGHT IMAGE OVERLAY */}

          <div className="experience-image-overlay" />


          {/* =================================================
              AUTO TOUR LABEL
          ================================================= */}

          <div className="experience-auto-label">

            <span className="auto-dot" />

            <span>
              AUTO TOUR
            </span>

            {selectedPlaces.length > 1 && (
              <small>
                • 5 SEC
              </small>
            )}

          </div>


          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="experience-location">

            <FiMapPin />

            <span>
              {currentPlace?.location ||
                destination.state}
            </span>

          </div>


          {/* =================================================
              LEFT / RIGHT ARROWS
          ================================================= */}

          {selectedPlaces.length > 1 && (
            <>

              <button
                type="button"
                className="experience-arrow experience-left"
                aria-label="Previous place"
                onClick={
                  handlePreviousPlace
                }
              >
                <FiArrowLeft />
              </button>


              <button
                type="button"
                className="experience-arrow experience-right"
                aria-label="Next place"
                onClick={
                  handleNextPlace
                }
              >
                <FiArrowRight />
              </button>

            </>
          )}


          {/* =================================================
              PLACE NUMBER

              01 / 03
          ================================================= */}

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


        {/* =================================================
            RIGHT — PLACE DETAILS
        ================================================= */}

        <div className="experience-details">


          {/* PLACE NUMBER */}

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


          {/* PLACE NAME */}

          <h2>
            {currentPlace?.name ||
              destination.name}
          </h2>


          {/* PLACE LOCATION */}

          <div className="experience-place-location">

            <FiMapPin />

            <span>
              {currentPlace?.location ||
                destination.state}
            </span>

          </div>


          {/* DESCRIPTION */}

          <p className="experience-description">

            {currentPlace?.description ||

              `Explore ${
                currentPlace?.name ||
                destination.name
              }.`}

          </p>


          {/* DETAIL */}

          {currentPlace?.detail && (

            <p className="experience-detail-text">
              {currentPlace.detail}
            </p>

          )}


          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="experience-highlights">

            <span className="experience-label">
              HIGHLIGHTS
            </span>


            <div className="highlight-list">

              {(
                currentPlace?.highlights ||
                []
              ).map(
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

                    <strong>
                      {item}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>


          {/* =================================================
              MORNING + EVENING
          ================================================= */}

          <div className="mini-itinerary">


            {/* MORNING */}

            <div className="mini-plan">

              <span>
                MORNING
              </span>

              <p>
                {getMorningText()}
              </p>

            </div>


            {/* EVENING */}

            <div className="mini-plan">

              <span>
                EVENING
              </span>

              <p>
                {getEveningText()}
              </p>

            </div>

          </div>


          {/* =================================================
              BOTTOM DOTS
          ================================================= */}

          <div className="experience-bottom">


            {/* DOT BUTTONS */}

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


            {/* TOTAL SELECTED */}

            <span className="selected-place-total">

              {selectedPlaces.length}{" "}

              {selectedPlaces.length === 1
                ? "selected place"
                : "selected places"}

            </span>

          </div>

        </div>

      </section>
            {/* ===================================================
          HOTEL / STAY SECTION
      =================================================== */}

      <section className="hotel-stay-section">


        {/* =================================================
            HOTEL HEADER
        ================================================= */}

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


        {/* =================================================
            HOTEL + DAILY JOURNEY LAYOUT
        ================================================= */}

        <div className="hotel-stay-layout">


          {/* =================================================
              LEFT — HOTEL
          ================================================= */}

          <div className="hotel-selection-area">


            {/* ===============================================
                MAIN HOTEL CARD
            =============================================== */}

            <div className="main-hotel-card">


              {/* =============================================
                  MAIN HOTEL IMAGE
              ============================================= */}

              <div className="main-hotel-image">
  <img
    src={
      selectedHotel?.image ||
      FALLBACK_IMAGE
    }
    alt={
      selectedHotel?.name ||
      "Selected hotel"
    }
    onError={(event) => {
      event.currentTarget.src =
        FALLBACK_IMAGE;
    }}
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



              {/* =============================================
                  HOTEL INFORMATION
              ============================================= */}

              <div className="main-hotel-info">


                {/* RATING */}

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


                {/* HOTEL NAME */}

                <h3>

                  {selectedHotel?.name ||
                    "Selected Stay"}

                </h3>


                {/* HOTEL DESCRIPTION */}

                <p>

                  A carefully selected{" "}

                  {selectedHotel?.type ||
                    normalizedStay}{" "}

                  for your{" "}

                  {destination.name}{" "}

                  journey. Comfortable rooms,
                  beautiful surroundings and easy
                  access to your selected places.

                </p>

              </div>

            </div>


            {/* ===============================================
                HOTEL THUMBNAILS
            =============================================== */}

            <div className="hotel-manual-note">
              Select a stay below — the main hotel changes only when you click a hotel.
            </div>

            <div className="hotel-thumbnail-row">

              {hotels.map(
                (
                  hotel,
                  index
                ) => {

                  const isActive =
                    activeHotel ===
                    index;


                  return (

                    <button
                      type="button"
                      key={`${hotel.name}-${index}`}
                      className={`hotel-thumbnail ${
                        isActive
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleHotelSelect(
                          index
                        )
                      }
                      aria-label={`Select ${hotel.name}`}
                    >


                      {/* THUMBNAIL IMAGE */}

                      <img
                        src={
                          hotel?.image ||
                          FALLBACK_IMAGE
                        }
                        alt={
                          hotel?.name ||
                          `Stay ${index + 1}`
                        }
                        onError={(event) => {

                          event.currentTarget.src =
                            FALLBACK_IMAGE;

                        }}
                      />


                      {/* OVERLAY */}

                      <div className="thumbnail-overlay" />


                      {/* NUMBER */}

                      <span className="thumbnail-number">

                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}

                      </span>


                      {/* NAME */}

                      <span className="thumbnail-name">

                        {hotel.name}

                      </span>

                    </button>

                  );

                }
              )}

            </div>

</div>


          {/* =================================================
              RIGHT — DAILY JOURNEY
          ================================================= */}

          <div className="hotel-schedule-card">


            {/* ===============================================
                DAILY JOURNEY TOP
            =============================================== */}

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
                  {totalDays === 1
                    ? "day"
                    : "days"}
                </span>

              </div>

            </div>


            {/* ===============================================
                DAY SELECTOR
            =============================================== */}

            <div className="day-selector">

              {Array.from(
                {
                  length:
                    totalDays,
                },
                (
                  _,
                  index
                ) =>
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

{/* ===============================================
    ACTIVE DAY CONTENT
=============================================== */}

<div className="active-day-content">

  {/* =============================================
      MORNING
  ============================================= */}

  <div className="schedule-row">

    <div className="schedule-time">
      <span>08:00</span>
      <small>AM</small>
    </div>

    <div className="day-circle">
      <FiHome />
    </div>

    <div className="schedule-content">

      <span>
        MORNING
      </span>

      <h4>
        {daySchedule.morningTitle}
      </h4>

      <p>
        {daySchedule.morningText}
      </p>

    </div>

  </div>


  {/* =============================================
      EXPLORE
  ============================================= */}

  <div className="schedule-row">

    <div className="schedule-time">
      <span>10:00</span>
      <small>AM</small>
    </div>

    <div className="day-circle">
      <FiNavigation />
    </div>

    <div className="schedule-content">

      <span>
        EXPLORE
      </span>

      <h4>
        {daySchedule.exploreTitle}
      </h4>

      <p>
        {daySchedule.exploreText}
      </p>

    </div>

  </div>


  {/* =============================================
      EVENING
  ============================================= */}

  <div className="schedule-row">

    <div className="schedule-time">
      <span>06:00</span>
      <small>PM</small>
    </div>

    <div className="day-circle">
      <FiMapPin />
    </div>

    <div className="schedule-content">

      <span>
        EVENING
      </span>

      <h4>
        {daySchedule.eveningTitle}
      </h4>

      <p>
        {daySchedule.eveningText}
      </p>

    </div>

  </div>


  {/* =============================================
      NIGHT
  ============================================= */}

  <div className="schedule-row">

    <div className="schedule-time">
      <span>10:00</span>
      <small>PM</small>
    </div>

    <div className="day-circle">
      <FiClock />
    </div>

    <div className="schedule-content">

      <span>
        NIGHT
      </span>

      <h4>
        {daySchedule.nightTitle}
      </h4>

      <p>
        {daySchedule.nightText}
      </p>

    </div>

  </div>

</div>

</div>

</div>


{/* =================================================
    BOOK THIS STAY
================================================= */}

<div className="hotel-booking-area">

  <div className="hotel-booking-text">

    <span>
      READY TO RESERVE?
    </span>

    <h3>
      Complete your stay at{" "}
      <strong>
        {selectedHotel?.name || "Selected Stay"}
      </strong>
    </h3>

    <p>
      Your destination, all{" "}
      {selectedPlaces.length}{" "}
      selected places, images, budget and stay
      will continue to booking.
    </p>

  </div>


  <button
    type="button"
    className="hotel-book-btn"
    onClick={handleBookHotel}
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