
import delhi from "../assets/delhi.mp4";
import goa from "../assets/goa.mp4";
import manali from "../assets/manali.mp4";
import jaipur from "../assets/jaipur.mp4";
import kerala from "../assets/kerala.mp4";
import rishikesh from "../assets/rishikesh.mp4";
import udaipur from "../assets/udaipur.mp4";
import Mumbai from "../assets/Mumbai.mp4";
import agra from "../assets/agra.mp4";
import uttarakhand from "../assets/uttarakhand.mp4";

const destinations = {
  /* =========================================================
     GOA
  ========================================================= */

  goa: {
    id: "goa",
    name: "Goa",
    country: "India",
    location: "Goa, India",

    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",

    video: goa,

    description:
      "Discover Goa's beautiful beaches, vibrant nightlife, delicious food, historic forts and relaxing coastal experiences.",

    places: [
      {
        name: "Baga Beach",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=85",
        description:
          "A lively beach known for water sports, cafés and beautiful sunsets.",
      },
      {
        name: "Candolim Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful beach perfect for relaxing, swimming and sunset walks.",
      },
      {
        name: "Fort Aguada",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=700&q=85",
        description:
          "A historic Portuguese fort with beautiful sea views.",
      },
      {
        name: "Anjuna Beach",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
        description:
          "A famous beach known for its relaxed atmosphere and nightlife.",
      },
      {
        name: "Dudhsagar Falls",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=700&q=85",
        description:
          "A spectacular waterfall surrounded by lush green forests.",
      },
      {
        name: "Chapora Fort",
        image:
          "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=700&q=85",
        description:
          "A hilltop fort offering panoramic views of the Arabian Sea.",
      },
    ],

    bestTime: "November – February",
    duration: "4 Days / 3 Nights",
    budget: "₹24,999",
    category: "Domestic",
  },

  /* =========================================================
     MANALI
  ========================================================= */

  manali: {
    id: "manali",
    name: "Manali",
    country: "India",
    location: "Manali, Himachal Pradesh",

    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90",

    video: manali,

    description:
      "Experience snow-covered mountains, peaceful valleys, adventure activities, cafés and beautiful Himalayan landscapes.",

    places: [
      {
        name: "Solang Valley",
        image:
          "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful mountain valley famous for snow activities and adventure sports.",
      },
      {
        name: "Mall Road",
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=700&q=85",
        description:
          "The heart of Manali for shopping, cafés and local food.",
      },
      {
        name: "Hadimba Temple",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=85",
        description:
          "A unique wooden temple surrounded by tall cedar trees.",
      },
      {
        name: "Old Manali",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful area filled with cafés, shops and mountain vibes.",
      },
      {
        name: "Atal Tunnel",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=85",
        description:
          "A remarkable engineering landmark connecting Manali with Lahaul.",
      },
      {
        name: "Vashisht Hot Springs",
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=700&q=85",
        description:
          "Natural hot springs surrounded by beautiful Himalayan scenery.",
      },
    ],

    bestTime: "October – June",
    duration: "5 Days / 4 Nights",
    budget: "₹29,999",
    category: "Domestic",
  },

  /* =========================================================
     JAIPUR
  ========================================================= */

  jaipur: {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    location: "Jaipur, Rajasthan",

    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=90",

    video: jaipur,

    description:
      "Explore Jaipur's royal heritage, magnificent forts, colourful bazaars, traditional food and beautiful architecture.",

    places: [
      {
        name: "Amber Fort",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "A magnificent hilltop fort showcasing Rajasthan's royal architecture.",
      },
      {
        name: "Hawa Mahal",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "Jaipur's iconic palace famous for its beautiful honeycomb windows.",
      },
      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=700&q=85",
        description:
          "A grand royal complex featuring museums, courtyards and palaces.",
      },
      {
        name: "Jal Mahal",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful palace appearing to float in the middle of Man Sagar Lake.",
      },
      {
        name: "Johari Bazaar",
        image:
          "https://images.unsplash.com/photo-1606293926249-ed6e7f305f5b?auto=format&fit=crop&w=700&q=85",
        description:
          "A colourful market famous for jewellery, textiles and handicrafts.",
      },
    ],

    bestTime: "October – March",
    duration: "4 Days / 3 Nights",
    budget: "₹22,999",
    category: "Domestic",
  },

  /* =========================================================
     KERALA
  ========================================================= */

  kerala: {
    id: "kerala",
    name: "Kerala",
    country: "India",
    location: "Kerala, India",

    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",

    video: kerala,

    description:
      "Relax among peaceful backwaters, lush tea gardens, tropical beaches, beautiful hills and Kerala's rich culture.",

    places: [
      {
        name: "Munnar",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful hill station surrounded by tea plantations and misty mountains.",
      },
      {
        name: "Alleppey Backwaters",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=85",
        description:
          "Experience Kerala's famous waterways on a traditional houseboat.",
      },
      {
        name: "Varkala Beach",
        image:
          "https://images.unsplash.com/photo-1602302525820-2b5c5c4d8e5f?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful cliffside beach perfect for relaxing and watching sunsets.",
      },
      {
        name: "Tea Gardens",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=700&q=85",
        description:
          "Walk through lush green tea plantations and enjoy scenic mountain views.",
      },
      {
        name: "Kathakali Show",
        image:
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=85",
        description:
          "Experience Kerala's traditional dance and dramatic storytelling.",
      },
    ],

    bestTime: "October – March",
    duration: "5 Days / 4 Nights",
    budget: "₹32,999",
    category: "Domestic",
  },

  /* =========================================================
     RISHIKESH
  ========================================================= */

  rishikesh: {
    id: "rishikesh",
    name: "Rishikesh",
    country: "India",
    location: "Rishikesh, Uttarakhand",

    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=90",

    video: rishikesh,

    description:
      "Experience river adventures, peaceful yoga, spiritual moments, mountain views and exciting outdoor activities.",

    places: [
      {
        name: "Laxman Jhula Area",
        image:
          "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=700&q=85",
        description:
          "A popular riverside area surrounded by cafés, temples and mountain views.",
      },
      {
        name: "Ganga Ghat",
        image:
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful place to sit beside the Ganges and enjoy the local atmosphere.",
      },
      {
        name: "Neer Garh Waterfall",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful natural waterfall surrounded by lush greenery.",
      },
      {
        name: "Beatles Ashram",
        image:
          "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=700&q=85",
        description:
          "A unique artistic and spiritual place with colourful murals and history.",
      },
    ],

    bestTime: "September – November",
    duration: "3 Days / 2 Nights",
    budget: "₹16,999",
    category: "Domestic",
  },

  /* =========================================================
     DELHI
  ========================================================= */

  delhi: {
    id: "delhi",
    name: "Delhi",
    country: "India",
    location: "Delhi, India",

    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=90",

    video: delhi,

    description:
      "Discover Delhi's historic monuments, colourful markets, famous street food and vibrant city culture.",

    places: [
      {
        name: "India Gate",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=85",
        description:
          "An iconic Delhi landmark surrounded by beautiful lawns and a lively evening atmosphere.",
      },
      {
        name: "Red Fort",
        image:
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=85",
        description:
          "A historic Mughal fort known for its impressive red sandstone architecture.",
      },
      {
        name: "Qutub Minar",
        image:
          "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=85",
        description:
          "A magnificent historic monument surrounded by beautiful architectural ruins.",
      },
      {
        name: "Lotus Temple",
        image:
          "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful architectural landmark famous for its lotus-shaped design.",
      },
      {
        name: "Humayun's Tomb",
        image:
          "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful Mughal-era tomb surrounded by landscaped gardens.",
      },
      {
        name: "Chandni Chowk",
        image:
          "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=85",
        description:
          "A famous old Delhi market known for street food, shopping and traditional bazaars.",
      },
      {
        name: "Akshardham Temple",
        image:
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=85",
        description:
          "A grand temple complex showcasing Indian architecture and craftsmanship.",
      },
      {
        name: "Connaught Place",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=85",
        description:
          "A popular city centre filled with restaurants, cafés, shops and entertainment.",
      },
    ],

    bestTime: "October – March",
    duration: "4 Days / 3 Nights",
    budget: "₹19,999",
    category: "Domestic",
  },

  /* =========================================================
     MUMBAI
  ========================================================= */

  mumbai: {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    location: "Mumbai, Maharashtra",

    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=90",

    video: Mumbai,

    description:
      "Explore Mumbai's iconic coastline, historic landmarks, colourful markets, street food and vibrant city life.",

    places: [
      {
        name: "Gateway of India",
        image:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=85",
        description:
          "Mumbai's iconic waterfront landmark overlooking the Arabian Sea.",
      },
      {
        name: "Marine Drive",
        image:
          "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful seaside promenade famous for sunset views and the city skyline.",
      },
      {
        name: "Juhu Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
        description:
          "A lively Mumbai beach known for street food, evening walks and sunsets.",
      },
      {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        image:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=85",
        description:
          "A magnificent historic railway station known for its impressive architecture.",
      },
      {
        name: "Elephanta Caves",
        image:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=85",
        description:
          "Historic rock-cut caves featuring remarkable sculptures and ancient artwork.",
      },
      {
        name: "Colaba Causeway",
        image:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=85",
        description:
          "A popular shopping street filled with fashion, accessories, souvenirs and cafés.",
      },
    ],

    bestTime: "October – February",
    duration: "4 Days / 3 Nights",
    budget: "₹23,999",
    category: "Domestic",
  },

  /* =========================================================
     AGRA
  ========================================================= */

  agra: {
    id: "agra",
    name: "Agra",
    country: "India",
    location: "Agra, Uttar Pradesh",

    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=90",

    video: agra,

    description:
      "Explore the magnificent Taj Mahal, historic Mughal monuments, beautiful gardens and the rich heritage of Agra.",

    places: [
      {
        name: "Taj Mahal",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85",
        description:
          "A magnificent monument known around the world for its beautiful Mughal architecture.",
      },
      {
        name: "Agra Fort",
        image:
          "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=700&q=85",
        description:
          "A grand historic fort showcasing impressive Mughal architecture and history.",
      },
      {
        name: "Mehtab Bagh",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful garden offering scenic views of the Taj Mahal.",
      },
      {
        name: "Itmad-ud-Daulah",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful Mughal-era tomb famous for its detailed marble decoration.",
      },
      {
        name: "Akbar's Tomb",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85",
        description:
          "A historic tomb surrounded by beautiful landscaped gardens.",
      },
      {
        name: "Sadar Bazaar",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85",
        description:
          "A lively market famous for handicrafts, souvenirs, leather goods and local food.",
      },
    ],

    bestTime: "October – March",
    duration: "3 Days / 2 Nights",
    budget: "₹17,999",
    category: "Domestic",
  },

  /* =========================================================
     UTTARAKHAND
  ========================================================= */

  uttarakhand: {
    id: "uttarakhand",
    name: "Uttarakhand",
    country: "India",
    location: "Uttarakhand, India",

    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=90",

    video: uttarakhand,

    description:
      "Discover the beauty of the Himalayas with peaceful hill stations, rivers, temples, adventure and breathtaking mountain views.",

    places: [
      {
        name: "Mussoorie",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful hill station known for scenic mountain views and peaceful surroundings.",
      },
      {
        name: "Nainital",
        image:
          "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=85",
        description:
          "A charming lake city surrounded by beautiful green Himalayan hills.",
      },
      {
        name: "Rishikesh",
        image:
          "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=700&q=85",
        description:
          "A riverside destination famous for adventure, yoga and spiritual experiences.",
      },
      {
        name: "Haridwar",
        image:
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=85",
        description:
          "A spiritual destination on the banks of the Ganges, famous for Ganga Aarti.",
      },
      {
        name: "Auli",
        image:
          "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=700&q=85",
        description:
          "A spectacular Himalayan destination known for snow, skiing and mountain views.",
      },
      {
        name: "Jim Corbett National Park",
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=700&q=85",
        description:
          "A famous wildlife destination offering forests, nature and safari experiences.",
      },
    ],

    bestTime: "March – June",
    duration: "6 Days / 5 Nights",
    budget: "₹34,999",
    category: "Domestic",
  },

  /* =========================================================
     UDAIPUR
  ========================================================= */

  udaipur: {
    id: "udaipur",
    name: "Udaipur",
    country: "India",
    location: "Udaipur, Rajasthan",

    image:
      "https://images.unsplash.com/photo-1602643163986-6d7b7b5b4b6e?auto=format&fit=crop&w=1200&q=90",

    video: udaipur,

    description:
      "Experience the romantic charm of Udaipur with beautiful lakes, royal palaces, heritage streets and stunning sunset views.",

    places: [
      {
        name: "Lake Pichola",
        image:
          "https://images.unsplash.com/photo-1602643163986-6d7b7b5b4b6e?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful lake surrounded by palaces, hills and scenic views.",
      },
      {
        name: "City Palace",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "A magnificent palace complex showcasing Udaipur's royal heritage.",
      },
      {
        name: "Jag Mandir",
        image:
          "https://images.unsplash.com/photo-1602643163986-6d7b7b5b4b6e?auto=format&fit=crop&w=700&q=85",
        description:
          "A beautiful island palace located in the middle of Lake Pichola.",
      },
      {
        name: "Sajjangarh Palace",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "A hilltop palace offering spectacular views of Udaipur and its lakes.",
      },
      {
        name: "Fateh Sagar Lake",
        image:
          "https://images.unsplash.com/photo-1602643163986-6d7b7b5b4b6e?auto=format&fit=crop&w=700&q=85",
        description:
          "A peaceful lake surrounded by hills and beautiful city scenery.",
      },
      {
        name: "Bagore Ki Haveli",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
        description:
          "A historic haveli showcasing traditional Rajasthani culture and architecture.",
      },
    ],

    bestTime: "October – March",
    duration: "4 Days / 3 Nights",
    budget: "₹24,999",
    category: "Domestic",
  },
};

export default destinations;

