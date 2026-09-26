import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheck,
  FiHeart,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";

import "./DestinationDetail.css";

/* =========================================================
   DESTINATION DATA
========================================================= */

const destinations = [

  /* =========================================================
     GOA
  ========================================================= */

  {
    id: "goa",
    name: "Goa",
    state: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=90",

    category: "Beach",
    rating: "4.9",
    reviews: "2,480",
    price: "₹8,999",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "Golden beaches, colourful streets, beautiful sunsets and slow mornings. Goa is the perfect escape when you want a little adventure mixed with relaxation.",

    places: [

      {
        name: "Baga Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90",
        location: "North Goa",

        description:
          "A lively coastal escape known for golden sand, beautiful sea views, beach cafés and a fun holiday atmosphere.",

        detail:
          "Spend your morning beside the Arabian Sea, enjoy local food at a beach shack and stay around the coast for a beautiful sunset.",

        highlights: [
          "Golden Beach",
          "Water Activities",
          "Sunset Views",
        ],
      },

      {
  name: "Fort Aguada",

  image:
    "https://www.cochintourstravelss.com/assets/images/west-india/goa/goa-fort-aguada.webp",

  location: "Candolim, Goa",

  description:
    "A historic coastal fort offering beautiful sea views, old Portuguese architecture and a peaceful atmosphere.",

  detail:
    "Walk around the historic fort, enjoy panoramic views of the Arabian Sea and explore the surrounding coastal area.",

  highlights: [
    "Historic Fort",
    "Sea Views",
    "Portuguese Architecture",
  ],
},

      {
        name: "Dudhsagar Falls",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=90",
        location: "South Goa",

        description:
          "A spectacular waterfall surrounded by lush greenery and dramatic natural landscapes.",

        detail:
          "Explore the beautiful forest surroundings and enjoy the powerful waterfall views during your Goa adventure.",

        highlights: [
          "Waterfall",
          "Nature",
          "Adventure",
        ],
      },

    ],
  },


  /* =========================================================
     DELHI
  ========================================================= */

  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi, India",

    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=90",

    category: "Culture",
    rating: "4.8",
    reviews: "2,360",
    price: "₹6,499",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "A vibrant mix of history, culture, food and modern city life. Delhi brings ancient monuments, colourful markets and unforgettable flavours together in one exciting journey.",

    places: [

      {
        name: "India Gate",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=90",
        location: "New Delhi",

        description:
          "One of Delhi's most recognisable landmarks, surrounded by spacious lawns and a lively city atmosphere.",

        detail:
          "Visit in the evening when the monument is beautifully illuminated. The surrounding area is perfect for a relaxed walk and photography.",

        highlights: [
          "City Landmark",
          "Evening Views",
          "Photography",
        ],
      },

      {
        name: "Red Fort",
        image:
          "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1400&q=90",
        location: "Old Delhi",

        description:
          "A magnificent historic monument known for its red sandstone architecture, grand entrances and impressive courtyards.",

        detail:
          "Explore the fort's historic buildings, gateways and courtyards while discovering the rich heritage of Old Delhi.",

        highlights: [
          "History",
          "Architecture",
          "Heritage",
        ],
      },

      {
        name: "Humayun's Tomb",
        image:
          "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1400&q=90",
        location: "Nizamuddin, Delhi",

        description:
          "A beautiful Mughal monument surrounded by peaceful gardens and elegant historic architecture.",

        detail:
          "Walk through the landscaped gardens and admire the detailed architecture. The monument looks especially beautiful during soft morning light.",

        highlights: [
          "Mughal Architecture",
          "Gardens",
          "Heritage",
        ],
      },

    ],
  },


  /* =========================================================
     MANALI
  ========================================================= */

  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh, India",

    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=90",

    category: "Mountains",
    rating: "4.8",
    reviews: "1,920",
    price: "₹7,499",
    days: "4 Days / 3 Nights",
    bestTime: "October – June",

    description:
      "Surrounded by pine forests and dramatic Himalayan peaks, Manali is made for mountain lovers, peaceful mornings and unforgettable road trips.",

    places: [

      {
        name: "Solang Valley",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90",
        location: "Near Manali",

        description:
          "A beautiful mountain valley surrounded by dramatic Himalayan peaks and open landscapes.",

        detail:
          "Visit during the day for spectacular mountain views, outdoor activities and beautiful seasonal scenery.",

        highlights: [
          "Mountain Views",
          "Adventure",
          "Snow",
        ],
      },

      {
        name: "Hidimba Temple",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=90",
        location: "Old Manali",

        description:
          "A peaceful wooden temple surrounded by tall cedar trees and beautiful mountain scenery.",

        detail:
          "Walk through the quiet forest around the temple and experience one of Manali's most distinctive cultural landmarks.",

        highlights: [
          "Temple",
          "Cedar Forest",
          "Culture",
        ],
      },

      {
        name: "Old Manali",
        image:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
        location: "Manali",

        description:
          "A relaxed mountain neighbourhood filled with cosy cafés, wooden houses, pine trees and peaceful streets.",

        detail:
          "Walk through the small streets, stop at a cosy café and enjoy the slower side of Himalayan life.",

        highlights: [
          "Cafés",
          "Pine Forests",
          "Local Life",
        ],
      },

    ],
  },


  /* =========================================================
     JAIPUR
  ========================================================= */

  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan, India",

    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=90",

    category: "Heritage",
    rating: "4.8",
    reviews: "1,760",
    price: "₹6,999",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "The Pink City brings together grand palaces, colourful markets, royal architecture and beautiful heritage experiences.",

    places: [

      {
        name: "Amber Fort",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90",
        location: "Amer, Jaipur",

        description:
          "A magnificent hilltop palace surrounded by the Aravalli hills and filled with grand courtyards and beautiful architecture.",

        detail:
          "Walk through impressive palace entrances, explore the courtyards and enjoy the views across the surrounding hills.",

        highlights: [
          "Royal Palace",
          "Architecture",
          "History",
        ],
      },

      {
        name: "Hawa Mahal",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=90",
        location: "Pink City, Jaipur",

        description:
          "One of Jaipur's most recognisable landmarks, famous for its beautiful pink façade and rows of windows.",

        detail:
          "Visit the monument and explore the colourful streets and traditional markets surrounding the old city.",

        highlights: [
          "Pink City",
          "Heritage",
          "Photography",
        ],
      },

      {
        name: "Jal Mahal",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90",
        location: "Amer Road, Jaipur",

        description:
          "A beautiful palace appearing to float on the calm waters of Man Sagar Lake.",

        detail:
          "Enjoy the palace views from the lakeside and experience one of Jaipur's most photogenic landscapes.",

        highlights: [
          "Lake Palace",
          "Photography",
          "Sunset",
        ],
      },

    ],
  },


  /* =========================================================
     KERALA
  ========================================================= */

  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala, India",

    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=90",

    category: "Nature",
    rating: "4.9",
    reviews: "2,110",
    price: "₹10,499",
    days: "5 Days / 4 Nights",
    bestTime: "September – March",

    description:
      "Discover peaceful backwaters, lush greenery, tropical beaches and slow moments that make Kerala one of India's most beautiful escapes.",

    places: [

      {
        name: "Alleppey",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=90",
        location: "Alappuzha, Kerala",

        description:
          "Famous for peaceful backwaters, traditional houseboats, coconut palms and quiet waterways.",

        detail:
          "Take a slow houseboat journey through the backwaters and watch village life unfold along the canals.",

        highlights: [
          "Backwaters",
          "Houseboat",
          "Nature",
        ],
      },

      {
        name: "Munnar",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1400&q=90",
        location: "Idukki, Kerala",

        description:
          "A peaceful hill destination surrounded by rolling tea gardens, misty mountains and lush green valleys.",

        detail:
          "Spend your day exploring tea plantations, scenic viewpoints and winding mountain roads.",

        highlights: [
          "Tea Gardens",
          "Mountain Views",
          "Nature",
        ],
      },

      {
        name: "Varkala Beach",
        image:
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=90",
        location: "Varkala, Kerala",

        description:
          "A beautiful coastal destination known for dramatic cliffs, golden beaches and peaceful Arabian Sea views.",

        detail:
          "Walk along the cliffside, relax beside the sea and stay until sunset for beautiful coastal views.",

        highlights: [
          "Beach",
          "Cliffs",
          "Sunset",
        ],
      },

    ],
  },


  /* =========================================================
     RISHIKESH
  ========================================================= */

  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand, India",

    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=90",

    category: "Adventure",
    rating: "4.7",
    reviews: "1,540",
    price: "₹5,999",
    days: "3 Days / 2 Nights",
    bestTime: "September – June",

    description:
      "From thrilling river adventures to peaceful riverside evenings, Rishikesh is where nature, adventure and soulful travel come together.",

    places: [

      {
        name: "Laxman Jhula",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1400&q=90",
        location: "Rishikesh",

        description:
          "A famous riverside landmark surrounded by temples, cafés, hills and beautiful views of the Ganga.",

        detail:
          "Walk around the riverside area, explore nearby temples and enjoy the atmosphere as the evening begins.",

        highlights: [
          "Ganga Views",
          "Temples",
          "Riverside",
        ],
      },

{
  name: "River Rafting",

  image:
    "https://manuadventuresindia.com/wp-content/uploads/2023/08/Rafting-rishikesh-featured.jpeg",

  location: "Ganga River, Rishikesh",

  description:
    "Feel the thrill of white-water rafting through the exciting rapids of the Ganga surrounded by the Himalayan landscape.",

  detail:
    "Experience an unforgettable rafting adventure with powerful rapids, mountain views and trained rafting guides.",

  highlights: [
    "White Water Rafting",
    "Ganga River",
    "Himalayan Views"
  ],
},


      {
        name: "Neer Garh Waterfall",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=90",
        location: "Near Rishikesh",

        description:
          "A peaceful natural escape surrounded by forest, rocks and flowing mountain water.",

        detail:
          "Take a short nature walk and spend some quiet time near the waterfall away from the busy town.",

        highlights: [
          "Waterfall",
          "Forest",
          "Nature",
        ],
      },

    ],
  },

{
  id: "mumbai",
  name: "Mumbai",
  state: "Maharashtra, India",

  image:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1800&q=90",

  category: "City",
  rating: "4.8",
  reviews: "2,240",
  price: "₹7,999",
  days: "3 Days / 2 Nights",
  bestTime: "October – February",

  description:
    "A vibrant city of sea views, iconic landmarks, colourful streets, delicious food and unforgettable experiences.",

  places: [
    {
      name: "Gateway of India",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=90",

      location: "Colaba, Mumbai",

      description:
        "Mumbai's iconic waterfront landmark overlooking the Arabian Sea.",

      detail:
        "Explore the historic monument, enjoy the waterfront views and discover the lively streets of South Mumbai.",

      highlights: [
        "Iconic Landmark",
        "Sea Views",
        "Photography",
      ],
    },

    {
      name: "Marine Drive",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=90",

      location: "South Mumbai",

      description:
        "A beautiful seaside promenade famous for sunset views, city lights and the Mumbai skyline.",

      detail:
        "Take an evening walk along the promenade and enjoy the famous Mumbai skyline while watching the sunset.",

      highlights: [
        "Sea View",
        "Sunset",
        "City Skyline",
      ],
    },

    {
      name: "Juhu Beach",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=90",

      location: "Juhu, Mumbai",

      description:
        "A lively beach known for street food, evening walks and beautiful Arabian Sea sunsets.",

      detail:
        "Enjoy local street food, walk beside the sea and experience the lively atmosphere of one of Mumbai's popular beaches.",

      highlights: [
        "Beach",
        "Street Food",
        "Sunset",
      ],
    },
  ],
},
{
  id: "agra",
  name: "Agra",
  state: "Uttar Pradesh, India",

  image:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=90",

  category: "Heritage",
  rating: "4.9",
  reviews: "2,180",
  price: "₹6,999",
  days: "3 Days / 2 Nights",
  bestTime: "October – March",

  description:
    "A timeless city of magnificent Mughal architecture, historic monuments, romantic sunsets and unforgettable heritage experiences.",

  places: [
    {
      name: "Taj Mahal",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=90",

      location: "Agra, Uttar Pradesh",

      description:
        "One of India's most famous monuments and a magnificent example of Mughal architecture.",

      detail:
        "Experience the beauty of the Taj Mahal, explore its detailed architecture and enjoy the surrounding gardens.",

      highlights: [
        "Mughal Architecture",
        "Iconic Monument",
        "Photography",
      ],
    },

    {
      name: "Agra Fort",
      image:
        "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1400&q=90",

      location: "Agra, Uttar Pradesh",

      description:
        "A grand historic fort showcasing impressive red sandstone architecture and Mughal history.",

      detail:
        "Walk through the massive gates, courtyards and historic structures while discovering Agra's royal past.",

      highlights: [
        "Historic Fort",
        "Mughal History",
        "Architecture",
      ],
    },

    {
      name: "Mehtab Bagh",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=90",

      location: "Agra, Uttar Pradesh",

      description:
        "A beautiful garden across the Yamuna River offering scenic views of the Taj Mahal.",

      detail:
        "Visit the garden for peaceful surroundings and beautiful views of the Taj Mahal, especially around sunset.",

      highlights: [
        "Garden",
        "Taj Mahal View",
        "Sunset",
      ],
    },
  ],
},
  /* =========================================================
     UDAIPUR
  ========================================================= */

  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan, India",

    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1800&q=90",

    category: "Romantic",
    rating: "4.8",
    reviews: "1,330",
    price: "₹8,499",
    days: "3 Days / 2 Nights",
    bestTime: "October – March",

    description:
      "Beautiful lakes, grand palaces and golden sunsets make Udaipur one of India's most romantic destinations.",

    places: [

      {
        name: "Lake Pichola",
        image:
          "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1400&q=90",
        location: "Udaipur, Rajasthan",

        description:
          "A beautiful lake surrounded by palaces, historic buildings, islands and hills.",

        detail:
          "Take a boat ride across the lake and enjoy views of the City Palace and surrounding architecture.",

        highlights: [
          "Lake",
          "Boat Ride",
          "Sunset",
        ],
      },

      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90",
        location: "Udaipur, Rajasthan",

        description:
          "A magnificent royal complex overlooking Lake Pichola and filled with courtyards, balconies and historic details.",

        detail:
          "Explore the grand rooms, courtyards and viewpoints while discovering the history of the Mewar royal family.",

        highlights: [
          "Palace",
          "Royalty",
          "Heritage",
        ],
      },

      {
        name: "Sajjangarh Palace",
        image:
          "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1400&q=90",
        location: "Bansdara, Udaipur",

        description:
          "A hilltop palace offering wide views over Udaipur's lakes, hills and surrounding landscape.",

        detail:
          "Head towards the hilltop before sunset and enjoy panoramic views across the city as the sky changes colour.",

        highlights: [
          "Hilltop Views",
          "Palace",
          "Sunset",
        ],
      },

    ],
  },

];


/* =========================================================
   DESTINATION DETAIL
========================================================= */

const DestinationDetail = () => {

  const { id } = useParams();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const destination = destinations.find(
    (item) => item.id === id
  );


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!destination) {

    return (
      <main className="destination-not-found">

        <div className="not-found-content">

          <span className="not-found-number">
            404
          </span>

          <h1>
            Destination not found
          </h1>

          <p>
            We couldn't find the destination
            you're looking for.
          </p>

          <Link
            to="/explore"
            className="not-found-btn"
          >
            <span>
              Back to Explore
            </span>

            <FiArrowUpRight />
          </Link>

        </div>

      </main>
    );
  }


  const liked = isWishlisted(
    destination.id
  );


  return (

    <main className="destination-detail-page">


      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <div className="destination-topbar">

        <Link
          to="/explore"
          className="destination-back"
        >

          <FiArrowLeft />

          <span>
            Back to Explore
          </span>

        </Link>


        <div className="destination-top-info">

          <span>
            {destination.category}
          </span>

          <strong>
            {destination.name}
          </strong>

        </div>


        <button
          type="button"
          className={`destination-wishlist ${
            liked ? "liked" : ""
          }`}
          onClick={() =>
            toggleWishlist(destination)
          }
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >

          <FiHeart />

        </button>

      </div>

{/* =====================================================
    DESTINATION HERO
===================================================== */}

<section className="destination-hero">

  <img
    src={destination.image}
    alt={destination.name}
    className="destination-hero-image"
  />

  <div className="destination-hero-overlay"></div>

  <div className="destination-hero-content">

    <span className="destination-hero-category">
      {destination.category}
    </span>

    <h1>
      {destination.name}
    </h1>

    <div className="destination-hero-location">
      <FiMapPin />
      <span>{destination.state}</span>
    </div>

  </div>

  

</section>
      {/* =====================================================
          DESTINATION INTRO
      ===================================================== */}

      <section className="destination-intro">

        <div className="intro-small">
          DESTINATION
        </div>


        <div className="intro-heading-row">

          <div>

            <h1>
              Explore{" "}
              <span>
                {destination.name}
              </span>
            </h1>


            <div className="intro-location">

              <FiMapPin />

              <span>
                {destination.state}
              </span>

            </div>

          </div>


          <div className="intro-rating">

            <div className="rating-icon">
              <FiStar />
            </div>


            <div>

              <strong>
                {destination.rating}
              </strong>

              <span>
                {destination.reviews} travellers
              </span>

            </div>

          </div>

        </div>


        <p className="intro-description">
          {destination.description}
        </p>

      </section>


      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="destination-timeline">

        <div className="timeline-line" />


        {destination.places.map(
          (place, index) => {

            const isEven =
              index % 2 === 0;


            return (

              <article
                key={place.name}
                className={`timeline-item ${
                  isEven
                    ? "timeline-left"
                    : "timeline-right"
                }`}
              >


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="timeline-side timeline-image-side">

                  {isEven ? (

                    <div className="timeline-image-wrap">

                      <img
                        src={place.image}
                        alt={place.name}
                      />

                      <div className="timeline-image-overlay" />


                      <span className="image-number">
                        0{index + 1}
                      </span>


                      <span className="image-category">
                        {place.name}
                      </span>

                    </div>

                  ) : (

                    <div className="timeline-detail-box">

                      <span className="place-number">
                        PLACE 0{index + 1}
                      </span>


                      <h2>
                        {place.name}
                      </h2>


                      <div className="place-location">

                        <FiMapPin />

                        <span>
                          {place.location}
                        </span>

                      </div>


                      <div className="detail-line" />


                      <p>
                        {place.description}
                      </p>


                      <p className="place-detail-text">
                        {place.detail}
                      </p>


                      <div className="place-highlights">

                        {place.highlights.map(
                          (item) => (

                            <span key={item}>

                              <FiCheck />

                              {item}

                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

                </div>


                {/* =================================================
                    CENTER CIRCLE
                ================================================= */}

                <div className="timeline-center">

                  <span className="timeline-dot">

                    {String(
                      index + 1
                    ).padStart(2, "0")}

                  </span>

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="timeline-side timeline-detail-side">

                  {isEven ? (

                    <div className="timeline-detail-box">

                      <span className="place-number">
                        PLACE 0{index + 1}
                      </span>


                      <h2>
                        {place.name}
                      </h2>


                      <div className="place-location">

                        <FiMapPin />

                        <span>
                          {place.location}
                        </span>

                      </div>


                      <div className="detail-line" />


                      <p>
                        {place.description}
                      </p>


                      <p className="place-detail-text">
                        {place.detail}
                      </p>


                      <div className="place-highlights">

                        {place.highlights.map(
                          (item) => (

                            <span key={item}>

                              <FiCheck />

                              {item}

                            </span>

                          )
                        )}

                      </div>

                    </div>

                  ) : (

                    <div className="timeline-image-wrap">

                      <img
                        src={place.image}
                        alt={place.name}
                      />

                      <div className="timeline-image-overlay" />


                      <span className="image-number">
                        0{index + 1}
                      </span>


                      <span className="image-category">
                        {place.name}
                      </span>

                    </div>

                  )}

                </div>

              </article>

            );

          }
        )}

      </section>


      {/* =====================================================
          PLAN TRIP
      ===================================================== */}

      <section className="destination-plan-section">


        <div className="plan-mini-info">

          <span>
            READY FOR YOUR NEXT ESCAPE?
          </span>

          <h2>

            Plan your{" "}

            <em>
              {destination.name}
            </em>{" "}

            journey.

          </h2>

        </div>


        <div className="plan-trip-info">


          <div className="plan-price">

            <span>
              FROM
            </span>

            <strong>
              {destination.price}
            </strong>

          </div>


          <div className="plan-days">

            <span>
              TRIP LENGTH
            </span>

            <strong>
              {destination.days}
            </strong>

          </div>

<Link
  to="/trip-plan"
  state={{
    destination: destination.name,
    days: destination.days,
    price: destination.price,
  }}
  className="plan-trip-button"
>
  <span>Plan This Trip</span>
  <FiArrowUpRight />
</Link>
        </div>

      </section>

    </main>

  );
};


export default DestinationDetail;