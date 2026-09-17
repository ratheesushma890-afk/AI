import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiHeart,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import "./PlaceDetail.css";

const placeData = {
  /* =========================
     GOA
  ========================= */

  "goa/baga-beach": {
    name: "Baga Beach",
    destination: "Goa",
    location: "North Goa, India",
    category: "Beach Experience",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "2,450",
    duration: "2–4 Hours",
    bestTime: "November – February",
    description:
      "Baga Beach is one of Goa's most popular beaches, known for its golden sand, lively atmosphere and beautiful Arabian Sea views.",
    about:
      "Baga is perfect for travellers who want a combination of beach relaxation, water activities, cafés and Goa's energetic nightlife.",
    experiences: [
      "Relax on the beach",
      "Water sports",
      "Sunset photography",
      "Beach cafés",
      "Shopping nearby",
      "Nightlife",
    ],
    tips: [
      "Visit early morning for a quieter experience.",
      "Sunset is one of the best times for photographs.",
      "Keep sunscreen and sunglasses with you.",
    ],
  },

  "goa/old-goa": {
    name: "Old Goa",
    destination: "Goa",
    location: "Old Goa, Goa, India",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1800&q=90",
    rating: "4.7",
    reviews: "1,820",
    duration: "2–3 Hours",
    bestTime: "November – February",
    description:
      "Old Goa is a historic area famous for magnificent churches, Portuguese architecture and centuries of Goan heritage.",
    about:
      "The old churches and heritage buildings make this one of the most culturally interesting areas of Goa.",
    experiences: [
      "Visit historic churches",
      "Explore Portuguese architecture",
      "Photography",
      "Heritage walk",
      "Local food",
      "Visit museums",
    ],
    tips: [
      "Wear comfortable footwear.",
      "Carry water during daytime visits.",
      "Morning hours are pleasant for exploring.",
    ],
  },

  "goa/vagator": {
    name: "Vagator",
    destination: "Goa",
    location: "North Goa, India",
    category: "Beach & Sunset",
    image:
      "https://images.unsplash.com/photo-1602303759148-4a5d1f1e4a4d?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "1,560",
    duration: "2–4 Hours",
    bestTime: "November – February",
    description:
      "Vagator is known for dramatic cliffs, beautiful beaches and spectacular sunset views.",
    about:
      "Vagator offers a more relaxed beach experience with rocky landscapes, cafés and memorable sunsets.",
    experiences: [
      "Watch sunset",
      "Beach walk",
      "Cliff views",
      "Photography",
      "Explore cafés",
      "Relax by the sea",
    ],
    tips: [
      "Reach before sunset.",
      "Wear comfortable shoes near rocky areas.",
      "Keep your camera ready.",
    ],
  },

  /* =========================
     MANALI
  ========================= */

  "manali/solang-valley": {
    name: "Solang Valley",
    destination: "Manali",
    location: "Manali, Himachal Pradesh",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "2,100",
    duration: "4–6 Hours",
    bestTime: "December – February",
    description:
      "Solang Valley is a beautiful mountain valley famous for snow activities, adventure sports and spectacular Himalayan views.",
    about:
      "Solang Valley is ideal for travellers looking for adventure and mountain scenery near Manali.",
    experiences: [
      "Snow activities",
      "Paragliding",
      "Mountain views",
      "Photography",
      "Cable car",
      "Adventure sports",
    ],
    tips: [
      "Carry warm clothes during winter.",
      "Check weather before adventure activities.",
      "Start early to avoid crowds.",
    ],
  },

  "manali/old-manali": {
    name: "Old Manali",
    destination: "Manali",
    location: "Manali, Himachal Pradesh",
    category: "Mountain Town",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "1,740",
    duration: "2–4 Hours",
    bestTime: "March – June",
    description:
      "Old Manali is a charming mountain neighbourhood filled with cafés, local shops, wooden houses and beautiful mountain scenery.",
    about:
      "Old Manali is perfect for slow travel, café hopping and enjoying the relaxed Himalayan atmosphere.",
    experiences: [
      "Café hopping",
      "Local shopping",
      "Mountain walks",
      "Photography",
      "Try local food",
      "Explore village lanes",
    ],
    tips: [
      "Wear comfortable walking shoes.",
      "Spend time exploring the small lanes.",
      "Try local cafés.",
    ],
  },

  "manali/himalayas": {
    name: "Himalayas",
    destination: "Manali",
    location: "Himachal Pradesh, India",
    category: "Mountain Experience",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "1,930",
    duration: "Half Day",
    bestTime: "March – June",
    description:
      "The Himalayan landscapes around Manali offer snow-covered peaks, green valleys and unforgettable mountain views.",
    about:
      "The Himalayan scenery is one of Manali's biggest attractions and makes the region perfect for nature lovers.",
    experiences: [
      "Mountain sightseeing",
      "Photography",
      "Nature walks",
      "Snow views",
      "Scenic drives",
      "Sunrise views",
    ],
    tips: [
      "Carry a jacket even during summer.",
      "Keep water with you.",
      "Avoid travelling during heavy snowfall without checking conditions.",
    ],
  },

  /* =========================
     JAIPUR
  ========================= */

  "jaipur/amber-fort": {
    name: "Amber Fort",
    destination: "Jaipur",
    location: "Jaipur, Rajasthan, India",
    category: "Royal Heritage",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "3,200",
    duration: "2–3 Hours",
    bestTime: "October – March",
    description:
      "Amber Fort is a magnificent hilltop fort known for its grand courtyards, artistic architecture and royal history.",
    about:
      "The fort offers a beautiful introduction to Jaipur's royal heritage and traditional Rajasthani architecture.",
    experiences: [
      "Explore palace courtyards",
      "Photography",
      "Royal architecture",
      "Museum visit",
      "Hilltop views",
      "Heritage walk",
    ],
    tips: [
      "Visit early morning.",
      "Wear comfortable footwear.",
      "Carry water during summer.",
    ],
  },

  "jaipur/hawa-mahal": {
    name: "Hawa Mahal",
    destination: "Jaipur",
    location: "Jaipur, Rajasthan, India",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "2,870",
    duration: "1–2 Hours",
    bestTime: "October – March",
    description:
      "Hawa Mahal is one of Jaipur's most recognisable landmarks, famous for its honeycomb-style windows and pink sandstone architecture.",
    about:
      "The Palace of Winds is a must-visit for architecture lovers and photographers exploring Jaipur.",
    experiences: [
      "Architecture photography",
      "Explore the palace",
      "Old city walk",
      "Local shopping",
      "Rooftop views",
      "Street photography",
    ],
    tips: [
      "Visit early for softer light.",
      "Explore the nearby old city streets.",
      "Try a rooftop café nearby.",
    ],
  },

  "jaipur/city-palace": {
    name: "City Palace",
    destination: "Jaipur",
    location: "Jaipur, Rajasthan, India",
    category: "Royal Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "2,340",
    duration: "2–3 Hours",
    bestTime: "October – March",
    description:
      "Jaipur City Palace is a beautiful royal complex featuring courtyards, museums, gateways and traditional architecture.",
    about:
      "The palace gives visitors a glimpse into Jaipur's royal history through its architecture, museums and royal collections.",
    experiences: [
      "Visit palace museums",
      "Explore courtyards",
      "Royal architecture",
      "Photography",
      "Traditional art",
      "Heritage walk",
    ],
    tips: [
      "Allow at least two hours.",
      "Wear comfortable shoes.",
      "Morning visits are usually pleasant.",
    ],
  },

  /* =========================
     KERALA
  ========================= */

  "kerala/alleppey": {
    name: "Alleppey",
    destination: "Kerala",
    location: "Alappuzha, Kerala, India",
    category: "Backwaters",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "2,600",
    duration: "Half Day",
    bestTime: "October – February",
    description:
      "Alleppey is famous for its peaceful backwaters, houseboats, palm-lined canals and beautiful Kerala landscapes.",
    about:
      "A backwater experience in Alleppey is perfect for travellers looking for a peaceful and scenic escape.",
    experiences: [
      "Houseboat ride",
      "Backwater cruise",
      "Village views",
      "Photography",
      "Local food",
      "Sunset cruise",
    ],
    tips: [
      "Book houseboats in advance.",
      "Sunset cruises are beautiful.",
      "Try authentic Kerala food.",
    ],
  },

  "kerala/munnar": {
    name: "Munnar",
    destination: "Kerala",
    location: "Munnar, Kerala, India",
    category: "Hill Station",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "2,220",
    duration: "Full Day",
    bestTime: "September – March",
    description:
      "Munnar is a peaceful hill station surrounded by tea plantations, misty mountains and lush green valleys.",
    about:
      "Munnar is ideal for nature lovers who want scenic drives, tea gardens and relaxing mountain views.",
    experiences: [
      "Tea plantation visit",
      "Mountain sightseeing",
      "Nature walks",
      "Photography",
      "Tea tasting",
      "Sunrise views",
    ],
    tips: [
      "Carry a light jacket.",
      "Start early for sightseeing.",
      "Visit a tea museum.",
    ],
  },

  "kerala/kovalam": {
    name: "Kovalam",
    destination: "Kerala",
    location: "Thiruvananthapuram, Kerala",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1800&q=90",
    rating: "4.7",
    reviews: "1,540",
    duration: "3–5 Hours",
    bestTime: "October – February",
    description:
      "Kovalam is a beautiful coastal destination known for palm-lined beaches, warm waters and relaxed seaside experiences.",
    about:
      "Kovalam is a great place to slow down, enjoy the beach and experience Kerala's coastal beauty.",
    experiences: [
      "Beach walk",
      "Swimming",
      "Sunset",
      "Photography",
      "Seafood",
      "Ayurvedic experiences",
    ],
    tips: [
      "Visit during sunset.",
      "Carry sunscreen.",
      "Try fresh local seafood.",
    ],
  },

  /* =========================
     RISHIKESH
  ========================= */

  "rishikesh/laxman-jhula": {
    name: "Laxman Jhula",
    destination: "Rishikesh",
    location: "Rishikesh, Uttarakhand, India",
    category: "Landmark",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "1,980",
    duration: "1–2 Hours",
    bestTime: "October – March",
    description:
      "Laxman Jhula is one of Rishikesh's famous landmarks and offers beautiful views of the Ganga and surrounding hills.",
    about:
      "The area around the bridge is filled with temples, cafés, ashrams and scenic riverside views.",
    experiences: [
      "River views",
      "Temple visits",
      "Photography",
      "Walk around the area",
      "Café hopping",
      "Explore local markets",
    ],
    tips: [
      "Visit early morning.",
      "Wear comfortable shoes.",
      "Explore the nearby riverside areas.",
    ],
  },

  "rishikesh/ganga-river": {
    name: "Ganga River",
    destination: "Rishikesh",
    location: "Rishikesh, Uttarakhand, India",
    category: "Nature & Spirituality",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "2,410",
    duration: "2–4 Hours",
    bestTime: "September – April",
    description:
      "The Ganga flowing through Rishikesh creates a peaceful setting for riverside walks, rafting and spiritual experiences.",
    about:
      "The river is at the heart of Rishikesh and offers both adventure and peaceful moments.",
    experiences: [
      "River rafting",
      "Ganga Aarti",
      "Riverside walk",
      "Photography",
      "Meditation",
      "Sunrise views",
    ],
    tips: [
      "Follow local safety instructions for rafting.",
      "Keep valuables secure near the river.",
      "Visit the ghats during evening aarti.",
    ],
  },

  "rishikesh/himalayan-trails": {
    name: "Himalayan Trails",
    destination: "Rishikesh",
    location: "Uttarakhand, India",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "1,230",
    duration: "Half Day",
    bestTime: "October – March",
    description:
      "The Himalayan trails around Rishikesh offer peaceful forests, mountain scenery and adventurous hiking experiences.",
    about:
      "These trails are ideal for travellers who want to experience the natural side of Uttarakhand.",
    experiences: [
      "Hiking",
      "Mountain views",
      "Forest walks",
      "Photography",
      "Nature exploration",
      "Sunrise",
    ],
    tips: [
      "Carry enough water.",
      "Wear proper trekking shoes.",
      "Follow marked trails.",
    ],
  },

  /* =========================
     UDAIPUR
  ========================= */

  "udaipur/lake-pichola": {
    name: "Lake Pichola",
    destination: "Udaipur",
    location: "Udaipur, Rajasthan, India",
    category: "Lake & Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "1,280",
    duration: "2–3 Hours",
    bestTime: "October – March",
    description:
      "Lake Pichola is one of Udaipur's most beautiful lakes, surrounded by palaces, historic buildings and Aravalli hills.",
    about:
      "A boat ride across Lake Pichola gives you beautiful views of Udaipur's royal architecture and golden evening light.",
    experiences: [
      "Sunset boat ride",
      "City Palace views",
      "Photography",
      "Lake views",
      "Explore nearby ghats",
      "Rooftop dining",
    ],
    tips: [
      "Visit around sunset.",
      "Carry a camera.",
      "Book boat rides early during peak season.",
    ],
  },

  "udaipur/city-palace": {
    name: "City Palace",
    destination: "Udaipur",
    location: "Udaipur, Rajasthan, India",
    category: "Royal Heritage",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1800&q=90",
    rating: "4.8",
    reviews: "1,640",
    duration: "2–3 Hours",
    bestTime: "October – March",
    description:
      "Udaipur City Palace is a magnificent royal complex overlooking Lake Pichola.",
    about:
      "Walking through the City Palace feels like stepping into Rajasthan's royal past.",
    experiences: [
      "Royal courtyards",
      "Palace museums",
      "Traditional architecture",
      "Lake views",
      "Photography",
      "Old city walk",
    ],
    tips: [
      "Start your visit in the morning.",
      "Wear comfortable shoes.",
      "Keep enough time to explore.",
    ],
  },

  "udaipur/udaipur-sunset": {
    name: "Udaipur Sunset",
    destination: "Udaipur",
    location: "Udaipur, Rajasthan, India",
    category: "Sunset Experience",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=90",
    rating: "4.9",
    reviews: "980",
    duration: "1–2 Hours",
    bestTime: "October – March",
    description:
      "Udaipur's golden sunsets create one of the city's most memorable experiences.",
    about:
      "The combination of lakes, hills, palaces and warm evening light makes Udaipur especially beautiful at sunset.",
    experiences: [
      "Watch sunset",
      "Photography",
      "Rooftop café",
      "Lake views",
      "Evening walk",
      "Local food",
    ],
    tips: [
      "Reach your viewpoint 30 minutes before sunset.",
      "Choose a rooftop with a lake view.",
      "Keep your camera ready.",
    ],
  },
};

const PlaceDetail = () => {
  const { destinationId, placeId } = useParams();

  const key = `${destinationId}/${placeId}`;
  const place = placeData[key];

  if (!place) {
    return (
      <main className="place-not-found">
        <div>
          <span>404</span>

          <h1>Place not found</h1>

          <p>
            We couldn't find this place.
          </p>

          <Link
            to="/explore"
            className="place-back-btn"
          >
            <span>Back to Explore</span>
            <FiArrowUpRight />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="place-detail-page">

      {/* HERO */}

      <section className="place-detail-hero">

        <img
          src={place.image}
          alt={place.name}
          className="place-detail-hero-image"
        />

        <div className="place-detail-overlay" />

        <div className="place-detail-top">

          <Link
            to={`/destination/${destinationId}`}
            className="place-back"
          >
            <FiArrowLeft />

            <span>
              Back to {place.destination}
            </span>
          </Link>

        

        </div>

        <div className="place-detail-content">

          <span className="place-category">
            {place.category}
          </span>

          <h1>
            {place.name}
          </h1>

          <div className="place-location">
            <FiMapPin />

            <span>
              {place.location}
            </span>
          </div>

          <p>
            {place.description}
          </p>

        </div>

        <div className="place-rating">

          <FiStar />

          <strong>
            {place.rating}
          </strong>

          <span>
            {place.reviews} travellers
          </span>

        </div>

      </section>

      {/* QUICK INFO */}

      <section className="place-quick-info">

        <div className="place-quick-item">

          <div className="place-quick-icon">
            <FiClock />
          </div>

          <div>
            <small>DURATION</small>
            <strong>{place.duration}</strong>
          </div>

        </div>

        <div className="place-quick-item">

          <div className="place-quick-icon">
            <FiCalendar />
          </div>

          <div>
            <small>BEST TIME</small>
            <strong>{place.bestTime}</strong>
          </div>

        </div>

        <div className="place-quick-item">

          <div className="place-quick-icon">
            <FiMapPin />
          </div>

          <div>
            <small>LOCATION</small>
            <strong>{place.destination}</strong>
          </div>

        </div>

        <div className="place-quick-item">

          <div className="place-quick-icon">
            <FiStar />
          </div>

          <div>
            <small>RATING</small>
            <strong>{place.rating} / 5</strong>
          </div>

        </div>

      </section>

      {/* MAIN */}

      <section className="place-detail-main">

        <div className="place-detail-left">

          

          <section className="place-section">

            <span className="place-label">
              EXPERIENCES
            </span>

            <h2>
              Things to
              <br />
              experience.
            </h2>

            <div className="place-experience-grid">

              {place.experiences.map(
                (experience) => (
                  <div
                    className="place-experience-item"
                    key={experience}
                  >

                    <span>
                      <FiCheck />
                    </span>

                    <strong>
                      {experience}
                    </strong>

                  </div>
                )
              )}

            </div>

          </section>


        </div>

        {/* SIDE CARD */}

        <aside className="place-info-card">

          <div className="place-card-icon">
            <FiMapPin />
          </div>

          <span>
            EXPLORE
          </span>

          <h3>
            {place.name}
          </h3>

          <p>
            Add this place to your{" "}
            {place.destination} itinerary
            and create your perfect
            travel day.
          </p>

          <Link
            to="/trip-plan"
            className="place-plan-btn"
          >
            <span>
              Plan this trip
            </span>

            <FiArrowUpRight />
          </Link>

          <div className="place-card-divider" />

          <div className="place-card-row">
            <FiUsers />

            <span>
              Couples · Friends · Family
            </span>
          </div>

          <div className="place-card-row">
            <FiCalendar />

            <span>
              Best time: {place.bestTime}
            </span>
          </div>

        </aside>

      </section>

     

    </main>
  );
};

export default PlaceDetail;