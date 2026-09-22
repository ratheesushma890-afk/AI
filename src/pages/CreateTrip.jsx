import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiCompass,
  FiArrowLeft,
  FiArrowRight,
  FiStar,
  FiCheck,
  FiClock,
  FiEdit3,
} from "react-icons/fi";

import "./CreateTrip.css";

/* =========================================================
   DESTINATION DATA
========================================================= */

const destinationData = {
  jaipur: {
    name: "Jaipur",
    country: "Rajasthan, India",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "The Royal Pink City",
        description:
          "Step into Jaipur's royal world where grand palaces, colourful streets and centuries of Rajput heritage come together.",
        highlights: ["Hawa Mahal", "City Palace", "Pink City Walk"],
        morning:
          "Explore Hawa Mahal and the historic old city.",
        evening:
          "Enjoy sunset views and the royal atmosphere of Jaipur.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Palaces & Heritage",
        description:
          "Discover magnificent architecture, royal courtyards and stories from Jaipur's rich cultural past.",
        highlights: ["Amber Fort", "City Palace", "Jantar Mantar"],
        morning:
          "Visit Amber Fort and explore its beautiful courtyards.",
        evening:
          "Walk through the heritage streets and local markets.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1592639296346-560c37a0f711?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Colours of Rajasthan",
        description:
          "Experience Jaipur through local food, colourful bazaars and traditional Rajasthani culture.",
        highlights: [
          "Local Markets",
          "Rajasthani Food",
          "Cultural Experience",
        ],
        morning:
          "Explore local bazaars and traditional handicrafts.",
        evening:
          "Enjoy authentic Rajasthani food and cultural moments.",
      },
    ],
  },

  goa: {
    name: "Goa",
    country: "India",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Tropical Goa",
        description:
          "Relax by golden beaches, explore colourful coastal streets and enjoy Goa's laid-back tropical atmosphere.",
        highlights: ["Beach Walk", "Sea Views", "Coastal Cafes"],
        morning:
          "Start your day with a peaceful beach walk.",
        evening:
          "Watch the sunset beside the Arabian Sea.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Goa Heritage",
        description:
          "Discover Portuguese-inspired architecture, historic churches and the charming old side of Goa.",
        highlights: ["Old Goa", "Heritage Streets", "Local Culture"],
        morning:
          "Explore Old Goa and its historic landmarks.",
        evening:
          "Enjoy a relaxed evening around Panjim.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Beachside Evenings",
        description:
          "Slow down and enjoy Goa's famous beachside evenings with beautiful views and relaxed moments.",
        highlights: ["Sunset", "Beach Cafes", "Nightlife"],
        morning:
          "Spend a relaxed morning near the coast.",
        evening:
          "Enjoy sunset, cafes and Goa's vibrant nightlife.",
      },
    ],
  },

  manali: {
    name: "Manali",
    country: "Himachal Pradesh, India",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Into the Mountains",
        description:
          "Escape into the Himalayas with dramatic mountain views, peaceful valleys and fresh mountain air.",
        highlights: ["Mountain Views", "Valley Walk", "Nature"],
        morning:
          "Start with a peaceful mountain walk.",
        evening:
          "Enjoy sunset views across the Himalayan valley.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Adventure Manali",
        description:
          "Discover Manali's adventurous side through mountain roads, valleys and outdoor experiences.",
        highlights: ["Adventure", "Mountain Roads", "Nature Trails"],
        morning:
          "Head towards the scenic mountain areas.",
        evening:
          "Return to town and enjoy a peaceful evening.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Peaceful Valleys",
        description:
          "Slow down in beautiful valleys surrounded by pine forests, rivers and snow-covered mountains.",
        highlights: ["Pine Forests", "River Views", "Relaxation"],
        morning:
          "Explore quiet forest paths and river views.",
        evening:
          "Relax and enjoy the peaceful mountain atmosphere.",
      },
    ],
  },

  kerala: {
    name: "Kerala",
    country: "India",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "God's Own Country",
        description:
          "Experience Kerala's lush landscapes, peaceful waters and timeless natural beauty.",
        highlights: ["Backwaters", "Nature", "Local Culture"],
        morning:
          "Explore the peaceful backwaters and surrounding villages.",
        evening:
          "Enjoy a calm sunset beside the water.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Backwater Escape",
        description:
          "Float through Kerala's beautiful waterways and discover a slower, more peaceful way to travel.",
        highlights: ["Houseboat", "Backwaters", "Village Life"],
        morning:
          "Cruise through the peaceful Kerala backwaters.",
        evening:
          "Watch the changing colours of the sky over the water.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Tropical Nature",
        description:
          "Surround yourself with tropical greenery, peaceful landscapes and Kerala's unique natural charm.",
        highlights: ["Green Landscapes", "Wildlife", "Relaxation"],
        morning:
          "Explore Kerala's green landscapes and nature.",
        evening:
          "Relax in a peaceful tropical setting.",
      },
    ],
  },

  rishikesh: {
    name: "Rishikesh",
    country: "Uttarakhand, India",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "By the Ganges",
        description:
          "Discover the spiritual energy of Rishikesh along the banks of the sacred Ganges.",
        highlights: ["Ganga", "Ghats", "Spirituality"],
        morning:
          "Walk beside the Ganges and explore the ghats.",
        evening:
          "Experience the peaceful evening Ganga atmosphere.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Adventure & Nature",
        description:
          "Combine peaceful surroundings with adventure and beautiful Himalayan landscapes.",
        highlights: ["River Adventure", "Nature", "Mountains"],
        morning:
          "Explore outdoor activities around the river.",
        evening:
          "Relax while enjoying the mountain surroundings.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Peace & Wellness",
        description:
          "Slow down with peaceful surroundings, yoga-inspired moments and riverside relaxation.",
        highlights: ["Yoga", "Meditation", "Relaxation"],
        morning:
          "Start the day with a calm wellness experience.",
        evening:
          "Relax beside the Ganges during sunset.",
      },
    ],
  },

  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Modern Dubai",
        description:
          "Experience Dubai's futuristic skyline, iconic architecture and energetic city atmosphere.",
        highlights: ["Burj Khalifa", "Downtown", "City Views"],
        morning:
          "Explore the heart of Downtown Dubai.",
        evening:
          "Enjoy spectacular city views after sunset.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Desert Adventure",
        description:
          "Leave the city behind and discover Dubai's golden desert landscapes.",
        highlights: ["Desert", "Sunset", "Adventure"],
        morning:
          "Explore the desert region and surrounding landscapes.",
        evening:
          "Watch the sunset across the golden dunes.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Luxury by the Sea",
        description:
          "Enjoy Dubai's beautiful coastline, modern resorts and relaxed seaside atmosphere.",
        highlights: ["Palm Jumeirah", "Sea Views", "Luxury"],
        morning:
          "Explore the Palm and waterfront areas.",
        evening:
          "Relax beside the sea and enjoy the skyline.",
      },
    ],
  },

  paris: {
    name: "Paris",
    country: "France",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "The City of Light",
        description:
          "Discover elegant streets, iconic architecture and the timeless romance of Paris.",
        highlights: ["Eiffel Tower", "Seine River", "Paris Streets"],
        morning:
          "Explore iconic Paris landmarks.",
        evening:
          "Enjoy the city's beautiful evening atmosphere.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Parisian Streets",
        description:
          "Walk through charming neighbourhoods filled with cafes, architecture and local character.",
        highlights: ["Cafes", "Architecture", "Local Life"],
        morning:
          "Walk through historic Parisian neighbourhoods.",
        evening:
          "Enjoy a relaxed cafe experience.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Romantic Paris",
        description:
          "Enjoy the softer side of Paris with riverside walks, beautiful views and unforgettable evenings.",
        highlights: ["Seine", "Sunset", "Romance"],
        morning:
          "Explore the riverside and nearby attractions.",
        evening:
          "Enjoy a beautiful Paris sunset.",
      },
    ],
  },

  london: {
    name: "London",
    country: "United Kingdom",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Classic London",
        description:
          "Explore London's historic landmarks, grand architecture and famous city streets.",
        highlights: ["Big Ben", "Westminster", "River Thames"],
        morning:
          "Explore Westminster and central London.",
        evening:
          "Walk beside the River Thames.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "London Streets",
        description:
          "Discover charming streets, famous neighbourhoods and the everyday character of London.",
        highlights: ["Markets", "Neighbourhoods", "Shopping"],
        morning:
          "Explore one of London's famous neighbourhoods.",
        evening:
          "Enjoy the city's lively streets and cafes.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "London After Dark",
        description:
          "See a different side of London as the city lights come alive in the evening.",
        highlights: ["City Lights", "Thames", "Night Walk"],
        morning:
          "Continue exploring central London.",
        evening:
          "Enjoy London's illuminated skyline.",
      },
    ],
  },

  bali: {
    name: "Bali",
    country: "Indonesia",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Island Escape",
        description:
          "Discover Bali's tropical landscapes, peaceful temples and beautiful coastal experiences.",
        highlights: ["Beaches", "Temples", "Nature"],
        morning:
          "Explore Bali's tropical surroundings.",
        evening:
          "Relax by the coast during sunset.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Tropical Bali",
        description:
          "Enjoy lush landscapes, peaceful surroundings and the natural beauty of the island.",
        highlights: ["Rice Terraces", "Nature", "Local Culture"],
        morning:
          "Explore Bali's lush countryside.",
        evening:
          "Enjoy a peaceful tropical evening.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Bali Sunset",
        description:
          "Slow down and enjoy one of Bali's beautiful sunsets beside the ocean.",
        highlights: ["Ocean", "Sunset", "Relaxation"],
        morning:
          "Spend a relaxed morning near the coast.",
        evening:
          "Watch the sunset over the ocean.",
      },
    ],
  },

  tokyo: {
    name: "Tokyo",
    country: "Japan",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 01",
        title: "Tokyo Energy",
        description:
          "Experience Tokyo's futuristic skyline, vibrant streets and unique city culture.",
        highlights: ["Shibuya", "City Lights", "Modern Tokyo"],
        morning:
          "Explore Tokyo's famous city districts.",
        evening:
          "Experience the city's colourful night lights.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 02",
        title: "Traditional Japan",
        description:
          "Discover the peaceful side of Tokyo through temples, gardens and traditional neighbourhoods.",
        highlights: ["Temples", "Gardens", "Culture"],
        morning:
          "Visit a peaceful temple and traditional area.",
        evening:
          "Explore the surrounding local streets.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1600&q=90",
        tag: "EXPERIENCE 03",
        title: "Tokyo After Dark",
        description:
          "See Tokyo transform after sunset with glowing streets, food spots and city energy.",
        highlights: ["Nightlife", "Food", "City Lights"],
        morning:
          "Explore Tokyo's food and shopping districts.",
        evening:
          "Experience Tokyo's vibrant nightlife.",
      },
    ],
  },
};

/* =========================================================
   HOTEL DATA
========================================================= */

const hotelData = {
  jaipur: [
    {
      name: "Rambagh Palace",
      rating: "4.9",
      reviews: "1,248 reviews",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Oberoi Rajvilas",
      rating: "4.8",
      reviews: "986 reviews",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Samode Haveli",
      rating: "4.7",
      reviews: "754 reviews",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  goa: [
    {
      name: "Taj Exotica Resort",
      rating: "4.8",
      reviews: "1,120 reviews",
      location: "South Goa",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "W Goa",
      rating: "4.7",
      reviews: "892 reviews",
      location: "North Goa",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Alila Diwa Goa",
      rating: "4.8",
      reviews: "1,035 reviews",
      location: "Majorda, Goa",
      image:
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  manali: [
    {
      name: "The Himalayan",
      rating: "4.8",
      reviews: "825 reviews",
      location: "Manali, Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Span Resort",
      rating: "4.7",
      reviews: "712 reviews",
      location: "Manali, Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Johnson Lodge",
      rating: "4.6",
      reviews: "638 reviews",
      location: "Old Manali",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  kerala: [
    {
      name: "Kumarakom Lake Resort",
      rating: "4.9",
      reviews: "1,340 reviews",
      location: "Kumarakom, Kerala",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Taj Green Cove",
      rating: "4.8",
      reviews: "980 reviews",
      location: "Kovalam, Kerala",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Marari Beach Resort",
      rating: "4.7",
      reviews: "875 reviews",
      location: "Marari, Kerala",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  rishikesh: [
    {
      name: "Aloha on the Ganges",
      rating: "4.8",
      reviews: "925 reviews",
      location: "Rishikesh, Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Taj Rishikesh",
      rating: "4.9",
      reviews: "1,020 reviews",
      location: "Rishikesh, Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Glasshouse",
      rating: "4.7",
      reviews: "685 reviews",
      location: "Rishikesh",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  dubai: [
    {
      name: "Atlantis The Palm",
      rating: "4.8",
      reviews: "2,540 reviews",
      location: "Palm Jumeirah, Dubai",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Jumeirah Beach Hotel",
      rating: "4.7",
      reviews: "1,890 reviews",
      location: "Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Address Downtown",
      rating: "4.8",
      reviews: "1,670 reviews",
      location: "Downtown Dubai",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  paris: [
    {
      name: "Le Bristol Paris",
      rating: "4.9",
      reviews: "1,210 reviews",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Hotel Lutetia",
      rating: "4.8",
      reviews: "980 reviews",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Hoxton Paris",
      rating: "4.7",
      reviews: "765 reviews",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  london: [
    {
      name: "The Savoy London",
      rating: "4.8",
      reviews: "1,450 reviews",
      location: "Central London",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Ritz London",
      rating: "4.7",
      reviews: "1,180 reviews",
      location: "Piccadilly, London",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Langham London",
      rating: "4.7",
      reviews: "965 reviews",
      location: "Regent Street, London",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  bali: [
    {
      name: "The Kayon Resort",
      rating: "4.9",
      reviews: "1,080 reviews",
      location: "Ubud, Bali",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Alila Seminyak",
      rating: "4.8",
      reviews: "945 reviews",
      location: "Seminyak, Bali",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Potato Head Suites",
      rating: "4.7",
      reviews: "820 reviews",
      location: "Seminyak, Bali",
      image:
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=90",
    },
  ],

  tokyo: [
    {
      name: "Park Hyatt Tokyo",
      rating: "4.8",
      reviews: "1,420 reviews",
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "The Prince Gallery",
      rating: "4.7",
      reviews: "1,020 reviews",
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
    },
    {
      name: "Hotel Chinzanso Tokyo",
      rating: "4.7",
      reviews: "890 reviews",
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
    },
  ],
};

/* =========================================================
   DEFAULT HOTELS
========================================================= */

const defaultHotels = [
  {
    name: "Grand Heritage Hotel",
    rating: "4.8",
    reviews: "850 reviews",
    location: "Your Destination",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Premium Resort",
    rating: "4.7",
    reviews: "720 reviews",
    location: "Your Destination",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Boutique Stay",
    rating: "4.6",
    reviews: "610 reviews",
    location: "Your Destination",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90",
  },
];

/* =========================================================
   FALLBACK EXPERIENCE
========================================================= */

const fallbackExperience = {
  name: "Your Destination",
  country: "Your selected destination",
  slides: [
    {
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
      tag: "EXPERIENCE 01",
      title: "Your Travel Experience",
      description:
        "Explore beautiful places, local experiences and memorable moments during your personalized trip.",
      highlights: [
        "Local Attractions",
        "Food & Culture",
        "Beautiful Views",
      ],
      morning:
        "Start your day by exploring the destination.",
      evening:
        "Enjoy a relaxing evening and discover local surroundings.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=90",
      tag: "EXPERIENCE 02",
      title: "Discover Something New",
      description:
        "Enjoy a day filled with sightseeing, local culture and experiences selected around your travel style.",
      highlights: ["Sightseeing", "Culture", "Photography"],
      morning:
        "Explore one of the destination's popular areas.",
      evening:
        "Enjoy local food and the evening atmosphere.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",
      tag: "EXPERIENCE 03",
      title: "Relax & Explore",
      description:
        "Balance exploration with peaceful moments and create memories at your own pace.",
      highlights: ["Relaxation", "Nature", "Local Life"],
      morning:
        "Enjoy a relaxed morning experience.",
      evening:
        "Finish the day with beautiful views and local experiences.",
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

const normalizeDestination = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const formatDate = (date) => {
  if (!date) return "";

  const parts = date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
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

  const [trip, setTrip] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeHotel, setActiveHotel] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  /* =======================================================
     LOAD TRIP
  ======================================================= */

  useEffect(() => {
    try {
      const savedTrip =
        localStorage.getItem("tripperTrip");

      const localTrip = savedTrip
        ? JSON.parse(savedTrip)
        : null;

      const stateTrip =
        location.state?.trip;

      setTrip(
        stateTrip ||
          localTrip ||
          null
      );
    } catch (error) {
      console.error(
        "Unable to load trip:",
        error
      );

      setTrip(
        location.state?.trip ||
          null
      );
    }
  }, [location.state]);

  /* =======================================================
     DESTINATION
  ======================================================= */

  const destinationKey =
    normalizeDestination(
      trip?.destination
    );

  const destination =
    destinationData[
      destinationKey
    ] || fallbackExperience;

  /* =======================================================
     HOTELS
  ======================================================= */

  const hotels =
    hotelData[destinationKey] ||
    defaultHotels;

  const selectedHotel =
    hotels[activeHotel] ||
    hotels[0];

  /* =======================================================
     TOTAL DAYS
  ======================================================= */

  const totalDays = Math.max(
    Number(trip?.days) || 1,
    1
  );

  /* =======================================================
     SELECTED PLACES
  ======================================================= */

  const selectedPlaces = useMemo(() => {
    if (!Array.isArray(trip?.places)) {
      return [];
    }

    return trip.places.filter(Boolean);
  }, [trip]);

  /* =======================================================
     RESET WHEN DESTINATION CHANGES
  ======================================================= */

  useEffect(() => {
    setActiveImage(0);
    setActiveHotel(0);
    setActiveDay(1);
  }, [destinationKey]);

  /* =======================================================
     EXPERIENCE AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    if (
      !destination?.slides?.length ||
      destination.slides.length <= 1
    ) {
      return;
    }

    const experienceTimer =
      setInterval(() => {
        setActiveImage((prev) => {
          return (
            (prev + 1) %
            destination.slides.length
          );
        });
      }, 5000);

    return () => {
      clearInterval(
        experienceTimer
      );
    };
  }, [
    destinationKey,
    destination?.slides?.length,
  ]);

  /* =======================================================
     HOTEL AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    if (
      !hotels ||
      hotels.length <= 1
    ) {
      return;
    }

    const hotelTimer =
      setInterval(() => {
        setActiveHotel((prev) => {
          return (
            (prev + 1) %
            hotels.length
          );
        });
      }, 4500);

    return () => {
      clearInterval(hotelTimer);
    };
  }, [
    destinationKey,
    hotels.length,
  ]);

  /* =======================================================
     EXPERIENCE NEXT
  ======================================================= */

  const nextImage = () => {
    setActiveImage((prev) => {
      return (
        (prev + 1) %
        destination.slides.length
      );
    });
  };

  /* =======================================================
     EXPERIENCE PREVIOUS
  ======================================================= */

  const previousImage = () => {
    setActiveImage((prev) => {
      return (
        (prev -
          1 +
          destination.slides.length) %
        destination.slides.length
      );
    });
  };

  /* =======================================================
     HOTEL NEXT
  ======================================================= */

  const nextHotel = () => {
    setActiveHotel((prev) => {
      return (
        (prev + 1) %
        hotels.length
      );
    });
  };

  /* =======================================================
     HOTEL PREVIOUS
  ======================================================= */

  const previousHotel = () => {
    setActiveHotel((prev) => {
      return (
        (prev -
          1 +
          hotels.length) %
        hotels.length
      );
    });
  };

  /* =======================================================
     DAY PLACE
  ======================================================= */

  const getPlaceForDay = () => {
    if (!selectedPlaces.length) {
      return destination.name;
    }

    const index =
      (activeDay - 1) %
      selectedPlaces.length;

    return selectedPlaces[index];
  };

  /* =======================================================
     DAY TITLE
  ======================================================= */

  const getDayTitle = () => {
    if (activeDay === 1) {
      return "Arrival & First Exploration";
    }

    if (activeDay === totalDays) {
      return "Final Experience & Departure";
    }

    return "Explore & Discover";
  };

  /* =======================================================
     MORNING TITLE
  ======================================================= */

  const getMorningTitle = () => {
    if (activeDay === 1) {
      return "Hotel Check-in & Fresh Start";
    }

    return `Explore ${getPlaceForDay()}`;
  };

  /* =======================================================
     MORNING DESCRIPTION
  ======================================================= */

  const getMorningDescription = () => {
    if (activeDay === 1) {
      return `Arrive at ${selectedHotel.name}, settle in and get ready to begin your ${destination.name} journey.`;
    }

    return `Start your day by exploring ${getPlaceForDay()} and enjoy the local atmosphere.`;
  };

  /* =======================================================
     AFTERNOON TITLE
  ======================================================= */

  const getAfternoonTitle = () => {
    if (activeDay === totalDays) {
      return "Last Day Highlights";
    }

    return "Local Experience";
  };

  /* =======================================================
     AFTERNOON DESCRIPTION
  ======================================================= */

  const getAfternoonDescription = () => {
    if (activeDay === totalDays) {
      return `Enjoy your final moments in ${destination.name} and explore anything you may have missed.`;
    }

    return `Discover local attractions, food, culture and experiences according to your travel preferences.`;
  };

  /* =======================================================
     EVENING TITLE
  ======================================================= */

  const getEveningTitle = () => {
    if (activeDay === 1) {
      return "Evening in the City";
    }

    return "Evening Experience";
  };

  /* =======================================================
     EVENING DESCRIPTION
  ======================================================= */

  const getEveningDescription = () => {
    return `Relax and enjoy the evening atmosphere of ${destination.name}. Take time for photos, local food and memorable moments.`;
  };

  /* =======================================================
     NIGHT TITLE
  ======================================================= */

  const getNightTitle = () => {
    if (activeDay === totalDays) {
      return "Prepare for Departure";
    }

    return "Return to Hotel";
  };

  /* =======================================================
     NIGHT DESCRIPTION
  ======================================================= */

  const getNightDescription = () => {
    if (activeDay === totalDays) {
      return `Return to ${selectedHotel.name}, relax and prepare for the next day's departure.`;
    }

    return `Return to ${selectedHotel.name} and enjoy a comfortable night before your next day of exploring.`;
  };

  /* =======================================================
     ⭐ IMPORTANT - BOOK SELECTED HOTEL
  ======================================================= */

  const handleBookHotel = () => {
    /*
      Yahan hum selected hotel ko exact object ke saath
      Booking Details page par bhej rahe hain.
    */

    const selectedHotelData = {
      name: selectedHotel?.name || "",
      location: selectedHotel?.location || "",
      image: selectedHotel?.image || "",
      rating: selectedHotel?.rating || "",
      reviews: selectedHotel?.reviews || "",
    };

    /*
      Purane trip data ko copy karke usme selected hotel
      bhi store kar rahe hain.
    */

    const updatedTrip = {
      ...trip,

      destination:
        destination.name,

      hotel: selectedHotelData,

      /*
        Ye extra property future fallback ke liye useful hai.
      */
      hotelImage:
        selectedHotelData.image,
    };

    /*
      LocalStorage me bhi immediately save.
      Isse old Goa data replace ho jayega.
    */

    localStorage.setItem(
      "tripperTrip",
      JSON.stringify(updatedTrip)
    );

    /*
      Booking Details ko exact selected hotel bhejo.
    */

    navigate(
      "/booking-details",
      {
        state: {
          trip: updatedTrip,

          destination:
            destination.name,

          hotel: selectedHotelData,
        },
      }
    );
  };

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!trip) {
    return (
      <div className="create-trip-empty">

        <div className="empty-icon">
          <FiCompass />
        </div>

        <h2>
          No Trip Found
        </h2>

        <p>
          Please create your trip first.
        </p>

        <button
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );
  }

  /* =======================================================
     CURRENT EXPERIENCE
  ======================================================= */

  const currentSlide =
    destination.slides[
      activeImage
    ];

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="create-trip-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <section className="trip-top-section">

        <div className="trip-top-left">

          <span className="trip-small-label">
            YOUR PERSONALIZED JOURNEY
          </span>

          <h1>
            Your trip to{" "}
            <span>
              {destination.name}
            </span>
          </h1>

          <p>
            A thoughtfully planned travel
            experience created around your
            preferences.
          </p>

        </div>

        <button
          className="edit-trip-btn"
          onClick={() => navigate(-1)}
        >
          <FiEdit3 />
          Edit Trip
        </button>

      </section>

      {/* =====================================================
          TRIP INFO
      ===================================================== */}

      <section className="trip-info-strip">

        <div className="trip-info-item">

          <div className="trip-info-icon">
            <FiMapPin />
          </div>

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

          <div className="trip-info-icon">
            <FiCalendar />
          </div>

          <div>
            <span>
              TRAVEL DATE
            </span>

            <strong>
              {trip.dateFormatted ||
                formatDate(
                  trip.date
                ) ||
                "Not selected"}
            </strong>
          </div>

        </div>

        <div className="trip-info-item">

          <div className="trip-info-icon">
            <FiClock />
          </div>

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

        <div className="trip-info-item">

          <div className="trip-info-icon">
            <FiUsers />
          </div>

          <div>
            <span>
              TRAVELLERS
            </span>

            <strong>
              {trip.travellers || 1}{" "}
              {Number(
                trip.travellers
              ) === 1
                ? "Traveller"
                : "Travellers"}
            </strong>
          </div>

        </div>

        <div className="trip-info-item">

          <div className="trip-info-icon">
            <FiCompass />
          </div>

          <div>
            <span>
              TRAVEL STYLE
            </span>

            <strong>
              {trip.style ||
                trip.travelType ||
                "Explore"}
            </strong>
          </div>

        </div>

      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="experience-section">

        <div className="experience-image">

          {destination.slides.map(
            (slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className={`experience-slide ${
                  activeImage === index
                    ? "active"
                    : ""
                }`}
                onError={(event) => {
                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90";
                }}
              />
            )
          )}

          <div className="experience-image-overlay"></div>

          <div className="experience-location">

            <FiMapPin />

            <div>

              <strong>
                {destination.name}
              </strong>

              <span>
                {destination.country}
              </span>

            </div>

          </div>

          <button
            className="experience-arrow experience-left"
            onClick={previousImage}
            aria-label="Previous experience"
          >
            <FiArrowLeft />
          </button>

          <button
            className="experience-arrow experience-right"
            onClick={nextImage}
            aria-label="Next experience"
          >
            <FiArrowRight />
          </button>

        </div>

        <div className="experience-details">

          <div className="experience-number">

            <span>
              {currentSlide.tag}
            </span>

            <strong>
              {String(
                activeImage + 1
              ).padStart(2, "0")}
            </strong>

          </div>

          <h2>
            {currentSlide.title}
          </h2>

          <p className="experience-description">
            {currentSlide.description}
          </p>

          <div className="experience-highlights">

            <span className="experience-label">
              HIGHLIGHTS
            </span>

            <div className="highlight-list">

              {currentSlide.highlights.map(
                (item, index) => (
                  <div
                    className="highlight-item"
                    key={index}
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

          <div className="mini-itinerary">

            <div className="mini-plan">

              <span>
                MORNING
              </span>

              <p>
                {currentSlide.morning}
              </p>

            </div>

            <div className="mini-plan">

              <span>
                EVENING
              </span>

              <p>
                {currentSlide.evening}
              </p>

            </div>

          </div>

          <div className="experience-bottom">

            <div className="experience-dots">

              {destination.slides.map(
                (_, index) => (
                  <button
                    key={index}
                    className={
                      activeImage === index
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                    aria-label={`Experience ${
                      index + 1
                    }`}
                  />
                )
              )}

            </div>

            <span>
              {activeImage + 1} /{" "}
              {destination.slides.length}
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          HOTEL SECTION
      ===================================================== */}

      <section className="hotel-stay-section">

        <div className="hotel-section-header">

          <div>

            <span className="hotel-section-label">
              YOUR STAY
            </span>

            <h2>
              Stay & Trip Schedule
            </h2>

            <p>
              Choose your stay and follow
              your personalized day-by-day
              travel plan.
            </p>

          </div>

          <div className="hotel-header-location">

            <FiMapPin />

            <span>
              {destination.name}
            </span>

          </div>

        </div>

        <div className="hotel-stay-layout">

          {/* =================================================
              HOTEL SIDE
          ================================================= */}

          <div className="hotel-selection-area">

            <div className="main-hotel-card">

              <img
                key={selectedHotel?.image}
                src={selectedHotel?.image}
                alt={
                  selectedHotel?.name ||
                  "Hotel"
                }
                onError={(event) => {
                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90";
                }}
              />

              <div className="hotel-image-overlay"></div>

              <div className="main-hotel-info">

                <div className="hotel-rating">

                  <FiStar />

                  <strong>
                    {selectedHotel?.rating}
                  </strong>

                  <span>
                    {selectedHotel?.reviews}
                  </span>

                </div>

                <h3>
                  {selectedHotel?.name}
                </h3>

                <p>

                  <FiMapPin />

                  {selectedHotel?.location}

                </p>

              </div>

            </div>

            {/* =================================================
                HOTEL THUMBNAILS
            ================================================= */}

            <div className="hotel-thumbnail-row">

              {hotels.map(
                (hotel, index) => (

                  <button
                    key={hotel.name}
                    type="button"
                    className={`hotel-thumbnail ${
                      activeHotel === index
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
                      src={hotel.image}
                      alt={hotel.name}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />

                    <div className="thumbnail-overlay"></div>

                    <div className="thumbnail-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="thumbnail-name">
                      {hotel.name}
                    </div>

                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              SCHEDULE SIDE
          ================================================= */}

          <div className="hotel-schedule-card">

            <div className="schedule-top">

              <div>

                <span>
                  ITINERARY
                </span>

                <h3>
                  Your Stay Schedule
                </h3>

              </div>

              <div className="schedule-days-count">

                {totalDays}{" "}

                {totalDays === 1
                  ? "DAY"
                  : "DAYS"}

              </div>

            </div>

            <div className="day-selector">

              {Array.from(
                {
                  length: totalDays,
                },
                (_, index) => {

                  const day =
                    index + 1;

                  return (
                    <button
                      key={day}
                      type="button"
                      className={
                        activeDay === day
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveDay(
                          day
                        )
                      }
                    >
                      Day {day}
                    </button>
                  );

                }
              )}

            </div>

            <div className="active-day-content">

              <div className="active-day-heading">

                <div className="day-circle">
                  {activeDay}
                </div>

                <div>

                  <span>
                    DAY {activeDay}
                  </span>

                  <h4>
                    {getDayTitle()}
                  </h4>

                </div>

              </div>

              {/* MORNING */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span></span>

                  <strong>
                    Morning
                  </strong>

                </div>

                <div className="schedule-content">

                  <h5>
                    {getMorningTitle()}
                  </h5>

                  <p>
                    {getMorningDescription()}
                  </p>

                </div>

              </div>

              {/* AFTERNOON */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span></span>

                  <strong>
                    Afternoon
                  </strong>

                </div>

                <div className="schedule-content">

                  <h5>
                    {getAfternoonTitle()}
                  </h5>

                  <p>
                    {getAfternoonDescription()}
                  </p>

                </div>

              </div>

              {/* EVENING */}

              <div className="schedule-row">

                <div className="schedule-time">

                  <span></span>

                  <strong>
                    Evening
                  </strong>

                </div>

                <div className="schedule-content">

                  <h5>
                    {getEveningTitle()}
                  </h5>

                  <p>
                    {getEveningDescription()}
                  </p>

                </div>

              </div>

              {/* NIGHT */}

              <div className="schedule-row last">

                <div className="schedule-time">

                  <span></span>

                  <strong>
                    Night
                  </strong>

                </div>

                <div className="schedule-content">

                  <h5>
                    {getNightTitle()}
                  </h5>

                  <p>
                    {getNightDescription()}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                BOOK HOTEL
            ================================================= */}

            <div className="hotel-booking-area">

              <div>

                <span>
                  SELECTED STAY
                </span>

                <strong>
                  {selectedHotel?.name}
                </strong>

              </div>

              <button
                type="button"
                className="hotel-book-btn"
                onClick={handleBookHotel}
              >
                Book Now
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default CreateTrip;