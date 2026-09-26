const tripData = {
  /* =========================================================
     GOA
  ========================================================= */

  goa: {
    name: "Goa",
    state: "Goa",

    bestFor: [
      "Couple",
      "Friends",
      "Solo",
      "Family",
    ],

    tags: [
      "Beach",
      "Food",
      "Nightlife",
      "Relaxation",
    ],

    places: [
      {
        name: "Baga Beach",
        type: "Beach",
        description:
          "A lively beach known for water sports, cafés and beautiful sunsets.",
      },
      {
        name: "Candolim Beach",
        type: "Beach",
        description:
          "A peaceful beach perfect for relaxing, swimming and sunset walks.",
      },
      {
        name: "Fort Aguada",
        type: "Culture",
        description:
          "A historic Portuguese fort with beautiful sea views.",
      },
    ],

    hotels: [
      {
        name: "Goa Comfort Stay",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,500/night",
        priceValue: 2500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay with easy access to popular beaches.",
      },
      {
        name: "Palm Breeze Resort",
        type: "Resort",
        rating: "4.4",
        price: "₹3,500/night",
        priceValue: 3500,
        image:
          "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80",
        description:
          "A relaxing resort surrounded by tropical greenery.",
      },
      {
        name: "Coconut Grove Retreat",
        type: "Resort",
        rating: "4.5",
        price: "₹4,500/night",
        priceValue: 4500,
        image:
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80",
        description:
          "Peaceful retreat ideal for couples and families.",
      },
      {
        name: "Luxury Bay Resort",
        type: "Resort",
        rating: "4.7",
        price: "₹7,500/night",
        priceValue: 7500,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium resort with beautiful sea views and luxury amenities.",
      },
      {
        name: "Sea Pearl Boutique Resort",
        type: "Resort",
        rating: "4.8",
        price: "₹9,000/night",
        priceValue: 9000,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        description:
          "Boutique luxury stay designed for a memorable Goa experience.",
      },
    ],

    activities: [
      {
        name: "Sunset Beach Walk",
        type: "Relaxation",
        description:
          "Enjoy a peaceful walk along the beach while watching the sunset.",
      },
      {
        name: "Goa Food Trail",
        type: "Food",
        description:
          "Explore local Goan flavours, seafood and traditional dishes.",
      },
      {
        name: "Water Sports",
        type: "Adventure",
        description:
          "Try exciting activities like parasailing, jet skiing and banana rides.",
      },
      {
        name: "Romantic Dinner",
        type: "Relaxation",
        description:
          "Enjoy a beautiful dinner experience by the sea.",
      },
      {
        name: "Sunset Cruise",
        type: "Relaxation",
        description:
          "Relax on a cruise while enjoying Goa's coastline at sunset.",
      },
      {
        name: "Night Market",
        type: "Shopping",
        description:
          "Shop for souvenirs, fashion, handicrafts and local products.",
      },
    ],

    transport: {
      budget: {
        name: "Scooter / Local Bus",
        daily: 700,
      },
      standard: {
        name: "Rental Car / Cab",
        daily: 1800,
      },
      premium: {
        name: "Private Cab",
        daily: 3000,
      },
    },
  },

  /* =========================================================
     MANALI
  ========================================================= */

  manali: {
    name: "Manali",
    state: "Himachal Pradesh",

    bestFor: [
      "Couple",
      "Family",
      "Friends",
      "Solo",
    ],

    tags: [
      "Mountains",
      "Nature",
      "Adventure",
      "Snow",
    ],

    places: [
      {
        name: "Solang Valley",
        type: "Adventure",
        description:
          "A beautiful mountain valley famous for snow activities and adventure sports.",
      },
      {
        name: "Mall Road",
        type: "Shopping",
        description:
          "The heart of Manali for shopping, cafés and local food.",
      },
      {
        name: "Hadimba Temple",
        type: "Culture",
        description:
          "A unique wooden temple surrounded by tall cedar trees.",
      },
    ],

    hotels: [
      {
        name: "Mountain View Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,200/night",
        priceValue: 2200,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable hotel with beautiful views of the mountains.",
      },
      {
        name: "Snow Valley Resort",
        type: "Resort",
        rating: "4.4",
        price: "₹3,500/night",
        priceValue: 3500,
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
        description:
          "A cosy resort perfect for families and friends.",
      },
      {
        name: "Himalayan Retreat",
        type: "Resort",
        rating: "4.5",
        price: "₹4,500/night",
        priceValue: 4500,
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
        description:
          "Peaceful mountain stay surrounded by nature.",
      },
      {
        name: "Luxury Mountain Resort",
        type: "Resort",
        rating: "4.7",
        price: "₹7,000/night",
        priceValue: 7000,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium resort with modern amenities and mountain views.",
      },
      {
        name: "Pine Valley Retreat",
        type: "Resort",
        rating: "4.8",
        price: "₹8,500/night",
        priceValue: 8500,
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80",
        description:
          "Luxury retreat surrounded by pine forests.",
      },
    ],

    activities: [
      {
        name: "Snow Adventure",
        type: "Adventure",
        description:
          "Enjoy snow activities and adventure experiences in the mountains.",
      },
      {
        name: "Mountain Café Experience",
        type: "Food",
        description:
          "Relax at a cosy café while enjoying spectacular Himalayan views.",
      },
      {
        name: "River Side Walk",
        type: "Nature",
        description:
          "Take a peaceful walk beside the Beas River.",
      },
      {
        name: "Couple Mountain Dinner",
        type: "Relaxation",
        description:
          "Enjoy a romantic dinner surrounded by mountain scenery.",
      },
      {
        name: "Local Shopping",
        type: "Shopping",
        description:
          "Shop for woollens, handicrafts and local Himalayan products.",
      },
    ],

    transport: {
      budget: {
        name: "Local Bus / Shared Cab",
        daily: 700,
      },
      standard: {
        name: "Rental Car / Shared Cab",
        daily: 1600,
      },
      premium: {
        name: "Private Cab",
        daily: 2800,
      },
    },
  },

  /* =========================================================
     JAIPUR
  ========================================================= */

  jaipur: {
    name: "Jaipur",
    state: "Rajasthan",

    bestFor: [
      "Couple",
      "Family",
      "Friends",
      "Solo",
    ],

    tags: [
      "Culture",
      "History",
      "Food",
      "Shopping",
    ],

    places: [
      {
        name: "Amber Fort",
        type: "Culture",
        description:
          "A magnificent hilltop fort showcasing Rajasthan's royal architecture.",
      },
      {
        name: "Hawa Mahal",
        type: "Sightseeing",
        description:
          "Jaipur's iconic palace famous for its beautiful honeycomb windows.",
      },
      {
        name: "City Palace",
        type: "Culture",
        description:
          "A grand royal complex featuring museums, courtyards and palaces.",
      },
    ],

    hotels: [
      {
        name: "Pink City Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,000/night",
        priceValue: 2000,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay close to Jaipur's major attractions.",
      },
      {
        name: "Royal Heritage Stay",
        type: "Hotel",
        rating: "4.4",
        price: "₹3,200/night",
        priceValue: 3200,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Traditional stay inspired by Rajasthan's royal heritage.",
      },
      {
        name: "Rajputana Palace",
        type: "Hotel",
        rating: "4.5",
        price: "₹4,500/night",
        priceValue: 4500,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        description:
          "Elegant hotel combining modern comfort with royal design.",
      },
      {
        name: "Royal Luxury Haveli",
        type: "Resort",
        rating: "4.7",
        price: "₹6,500/night",
        priceValue: 6500,
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80",
        description:
          "Luxury haveli experience with traditional architecture.",
      },
      {
        name: "Royal Pink Palace",
        type: "Resort",
        rating: "4.8",
        price: "₹8,000/night",
        priceValue: 8000,
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium heritage stay offering an authentic royal experience.",
      },
    ],

    activities: [
      {
        name: "Rajasthani Food Tour",
        type: "Food",
        description:
          "Taste authentic Dal Baati Churma, Ghevar and other local favourites.",
      },
      {
        name: "Heritage Walk",
        type: "Culture",
        description:
          "Explore Jaipur's historic streets and traditional architecture.",
      },
      {
        name: "Traditional Dinner",
        type: "Food",
        description:
          "Enjoy a traditional Rajasthani dinner with cultural performances.",
      },
      {
        name: "Local Handicraft Shopping",
        type: "Shopping",
        description:
          "Shop for jewellery, textiles, pottery and traditional handicrafts.",
      },
    ],

    transport: {
      budget: {
        name: "Auto / Local Bus",
        daily: 600,
      },
      standard: {
        name: "Cab",
        daily: 1500,
      },
      premium: {
        name: "Private Premium Cab",
        daily: 2500,
      },
    },
  },

  /* =========================================================
     KERALA
  ========================================================= */

  kerala: {
    name: "Kerala",
    state: "Kerala",

    bestFor: [
      "Couple",
      "Family",
      "Solo",
    ],

    tags: [
      "Nature",
      "Beach",
      "Relaxation",
      "Food",
    ],

    places: [
      {
        name: "Munnar",
        type: "Nature",
        description:
          "A peaceful hill station surrounded by tea plantations and misty mountains.",
      },
      {
        name: "Alleppey Backwaters",
        type: "Nature",
        description:
          "Experience Kerala's famous waterways on a traditional houseboat.",
      },
      {
        name: "Varkala Beach",
        type: "Beach",
        description:
          "A beautiful cliffside beach perfect for relaxing and watching sunsets.",
      },
    ],

    hotels: [
      {
        name: "Kerala Comfort Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,200/night",
        priceValue: 2200,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable hotel with easy access to local attractions.",
      },
      {
        name: "Backwater Retreat",
        type: "Resort",
        rating: "4.5",
        price: "₹3,800/night",
        priceValue: 3800,
        image:
          "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80",
        description:
          "Peaceful retreat overlooking Kerala's beautiful backwaters.",
      },
      {
        name: "Palm Lake Resort",
        type: "Resort",
        rating: "4.6",
        price: "₹4,800/night",
        priceValue: 4800,
        image:
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80",
        description:
          "Relaxing resort surrounded by tropical greenery.",
      },
      {
        name: "Luxury Backwater Villa",
        type: "Villa",
        rating: "4.8",
        price: "₹7,500/night",
        priceValue: 7500,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Luxury villa offering a private backwater experience.",
      },
      {
        name: "Emerald Backwater Resort",
        type: "Resort",
        rating: "4.9",
        price: "₹9,000/night",
        priceValue: 9000,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium resort designed for a luxurious Kerala getaway.",
      },
    ],

    activities: [
      {
        name: "Backwater Cruise",
        type: "Nature",
        description:
          "Relax on a traditional houseboat while exploring Kerala's backwaters.",
      },
      {
        name: "Kerala Food Experience",
        type: "Food",
        description:
          "Taste authentic Kerala cuisine and traditional seafood dishes.",
      },
      {
        name: "Tea Garden Walk",
        type: "Nature",
        description:
          "Walk through beautiful tea plantations in the hills of Munnar.",
      },
      {
        name: "Ayurvedic Relaxation",
        type: "Relaxation",
        description:
          "Enjoy a traditional wellness and relaxation experience.",
      },
    ],

    transport: {
      budget: {
        name: "Local Bus",
        daily: 600,
      },
      standard: {
        name: "Cab",
        daily: 1700,
      },
      premium: {
        name: "Private Cab",
        daily: 3000,
      },
    },
  },

  /* =========================================================
     RISHIKESH
  ========================================================= */

  rishikesh: {
    name: "Rishikesh",
    state: "Uttarakhand",

    bestFor: [
      "Friends",
      "Solo",
      "Couple",
      "Family",
    ],

    tags: [
      "Adventure",
      "Nature",
      "Spiritual",
      "River",
    ],

    places: [
      {
        name: "Laxman Jhula Area",
        type: "Sightseeing",
        description:
          "A popular riverside area surrounded by cafés, temples and mountain views.",
      },
      {
        name: "Ganga Ghat",
        type: "Relaxation",
        description:
          "A peaceful place to sit beside the holy Ganges and experience the local atmosphere.",
      },
      {
        name: "Neer Garh Waterfall",
        type: "Nature",
        description:
          "A beautiful natural waterfall surrounded by lush greenery.",
      },
    ],

    hotels: [
      {
        name: "Riverside Hostel",
        type: "Hotel",
        rating: "4.2",
        price: "₹1,200/night",
        priceValue: 1200,
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",
        description:
          "Budget-friendly stay popular with solo travellers and friends.",
      },
      {
        name: "Ganga View Hotel",
        type: "Hotel",
        rating: "4.4",
        price: "₹2,500/night",
        priceValue: 2500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable hotel with beautiful views of the Ganges.",
      },
      {
        name: "Riverfront Resort",
        type: "Resort",
        rating: "4.6",
        price: "₹4,000/night",
        priceValue: 4000,
        image:
          "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80",
        description:
          "Relaxing resort with a peaceful riverside setting.",
      },
      {
        name: "Ganga Serenity Resort",
        type: "Resort",
        rating: "4.8",
        price: "₹6,500/night",
        priceValue: 6500,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium stay focused on comfort, nature and relaxation.",
      },
    ],

    activities: [
      {
        name: "River Rafting",
        type: "Adventure",
        description:
          "Experience an exciting rafting adventure through the Ganges.",
      },
      {
        name: "Ganga Aarti",
        type: "Culture",
        description:
          "Witness the beautiful evening spiritual ceremony beside the Ganges.",
      },
      {
        name: "Yoga Session",
        type: "Relaxation",
        description:
          "Start your morning with a peaceful yoga and meditation session.",
      },
    ],

    transport: {
      budget: {
        name: "Auto / Local Bus",
        daily: 500,
      },
      standard: {
        name: "Cab",
        daily: 1200,
      },
      premium: {
        name: "Private Cab",
        daily: 2200,
      },
    },
  },

  /* =========================================================
     DELHI
  ========================================================= */

  delhi: {
    name: "Delhi",
    state: "Delhi",

    bestFor: [
      "Family",
      "Friends",
      "Solo",
      "Couple",
    ],

    tags: [
      "History",
      "Food",
      "Shopping",
      "Culture",
    ],

    places: [
      {
        name: "India Gate",
        type: "Sightseeing",
        description:
          "An iconic Delhi landmark surrounded by beautiful lawns and a lively evening atmosphere.",
      },
      {
        name: "Red Fort",
        type: "Culture",
        description:
          "A historic Mughal fort known for its impressive red sandstone architecture.",
      },
      {
        name: "Qutub Minar",
        type: "History",
        description:
          "A magnificent historic monument surrounded by beautiful architectural ruins.",
      },
    ],

    hotels: [
      {
        name: "Delhi Comfort Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,000/night",
        priceValue: 2000,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable hotel with convenient access to major attractions and markets.",
      },
      {
        name: "Central Delhi Stay",
        type: "Hotel",
        rating: "4.4",
        price: "₹3,000/night",
        priceValue: 3000,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Modern stay located close to shopping areas, restaurants and city attractions.",
      },
      {
        name: "Heritage Delhi Hotel",
        type: "Hotel",
        rating: "4.5",
        price: "₹4,200/night",
        priceValue: 4200,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        description:
          "Elegant hotel combining traditional Delhi charm with modern comfort.",
      },
      {
        name: "Royal Delhi Resort",
        type: "Resort",
        rating: "4.7",
        price: "₹6,500/night",
        priceValue: 6500,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium stay offering spacious rooms, modern facilities and a relaxing atmosphere.",
      },
      {
        name: "Luxury Capital Retreat",
        type: "Hotel",
        rating: "4.8",
        price: "₹8,500/night",
        priceValue: 8500,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        description:
          "Luxury stay designed for travellers looking for premium comfort in Delhi.",
      },
    ],

    activities: [
      {
        name: "Delhi Food Walk",
        type: "Food",
        description:
          "Explore famous Delhi street food and traditional flavours around Old Delhi.",
      },
      {
        name: "Heritage Walk",
        type: "Culture",
        description:
          "Discover Delhi's historic monuments, old streets and fascinating architecture.",
      },
      {
        name: "Old Delhi Rickshaw Ride",
        type: "Sightseeing",
        description:
          "Explore the busy lanes and colourful markets of Old Delhi by cycle rickshaw.",
      },
      {
        name: "Shopping Experience",
        type: "Shopping",
        description:
          "Shop for clothes, handicrafts, jewellery and local products in Delhi's famous markets.",
      },
      {
        name: "Delhi Street Food Tour",
        type: "Food",
        description:
          "Taste popular local dishes including chaat, parathas, kebabs and sweets.",
      },
      {
        name: "Evening City Tour",
        type: "Sightseeing",
        description:
          "Enjoy an evening drive through Delhi's illuminated landmarks and popular areas.",
      },
    ],

    transport: {
      budget: {
        name: "Metro / Local Bus",
        daily: 400,
      },
      standard: {
        name: "Cab / Metro",
        daily: 1200,
      },
      premium: {
        name: "Private Cab",
        daily: 2500,
      },
    },
  },

  /* =========================================================
     MUMBAI
  ========================================================= */

  mumbai: {
    name: "Mumbai",
    state: "Maharashtra",

    bestFor: [
      "Friends",
      "Couple",
      "Family",
      "Solo",
    ],

    tags: [
      "City",
      "Beach",
      "Food",
      "Shopping",
    ],

    places: [
      {
        name: "Gateway of India",
        type: "Sightseeing",
        description:
          "Mumbai's iconic waterfront landmark overlooking the Arabian Sea.",
      },
      {
        name: "Marine Drive",
        type: "Beach",
        description:
          "A beautiful seaside promenade famous for sunset views and the city skyline.",
      },
      {
        name: "Juhu Beach",
        type: "Beach",
        description:
          "A lively Mumbai beach known for street food, evening walks and sunsets.",
      },
    ],

    hotels: [
      {
        name: "Mumbai Comfort Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,500/night",
        priceValue: 2500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay with convenient access to Mumbai's major attractions.",
      },
      {
        name: "Marine View Stay",
        type: "Hotel",
        rating: "4.4",
        price: "₹3,500/night",
        priceValue: 3500,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Modern hotel with easy access to the city's popular areas.",
      },
      {
        name: "City Lights Resort",
        type: "Resort",
        rating: "4.6",
        price: "₹5,000/night",
        priceValue: 5000,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        description:
          "Stylish stay offering modern rooms and comfortable facilities.",
      },
      {
        name: "Luxury Mumbai Retreat",
        type: "Hotel",
        rating: "4.8",
        price: "₹8,000/night",
        priceValue: 8000,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium stay designed for travellers looking for luxury and comfort.",
      },
    ],

    activities: [
      {
        name: "Marine Drive Sunset",
        type: "Relaxation",
        description:
          "Enjoy a peaceful evening walk along Marine Drive while watching the sunset.",
      },
      {
        name: "Mumbai Food Tour",
        type: "Food",
        description:
          "Taste famous Mumbai street food and local favourites.",
      },
      {
        name: "Bollywood Experience",
        type: "Entertainment",
        description:
          "Explore Mumbai's famous film and entertainment culture.",
      },
      {
        name: "Colaba Shopping",
        type: "Shopping",
        description:
          "Shop for fashion, accessories, souvenirs and local products.",
      },
    ],

    transport: {
      budget: {
        name: "Metro / Local Train",
        daily: 400,
      },
      standard: {
        name: "Cab / Metro",
        daily: 1200,
      },
      premium: {
        name: "Private Cab",
        daily: 2500,
      },
    },
  },

  /* =========================================================
     AGRA
  ========================================================= */

  agra: {
    name: "Agra",
    state: "Uttar Pradesh",

    bestFor: [
      "Couple",
      "Family",
      "Friends",
      "Solo",
    ],

    tags: [
      "History",
      "Culture",
      "Heritage",
      "Food",
    ],

    places: [
      {
        name: "Taj Mahal",
        type: "History",
        description:
          "One of India's most famous monuments and a magnificent symbol of Mughal architecture.",
      },
      {
        name: "Agra Fort",
        type: "Culture",
        description:
          "A grand historic fort showcasing impressive Mughal architecture and history.",
      },
      {
        name: "Mehtab Bagh",
        type: "Nature",
        description:
          "A beautiful garden offering scenic views of the Taj Mahal across the Yamuna River.",
      },
    ],

    hotels: [
      {
        name: "Agra Comfort Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹1,800/night",
        priceValue: 1800,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay located close to Agra's major attractions.",
      },
      {
        name: "Taj View Hotel",
        type: "Hotel",
        rating: "4.5",
        price: "₹3,000/night",
        priceValue: 3000,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable hotel offering easy access to the Taj Mahal area.",
      },
      {
        name: "Mughal Heritage Stay",
        type: "Hotel",
        rating: "4.6",
        price: "₹4,500/night",
        priceValue: 4500,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        description:
          "Elegant stay inspired by Agra's rich Mughal heritage.",
      },
      {
        name: "Royal Agra Retreat",
        type: "Resort",
        rating: "4.8",
        price: "₹7,000/night",
        priceValue: 7000,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium stay offering spacious rooms and modern facilities.",
      },
    ],

    activities: [
      {
        name: "Taj Mahal Sunrise",
        type: "Sightseeing",
        description:
          "Experience the Taj Mahal in the beautiful morning light.",
      },
      {
        name: "Mughal Heritage Walk",
        type: "Culture",
        description:
          "Explore Agra's historic monuments and Mughal-era architecture.",
      },
      {
        name: "Agra Food Tour",
        type: "Food",
        description:
          "Taste famous local dishes and traditional sweets of Agra.",
      },
      {
        name: "Local Handicraft Shopping",
        type: "Shopping",
        description:
          "Shop for marble crafts, souvenirs and traditional handicrafts.",
      },
    ],

    transport: {
      budget: {
        name: "Auto / Local Bus",
        daily: 500,
      },
      standard: {
        name: "Cab",
        daily: 1200,
      },
      premium: {
        name: "Private Cab",
        daily: 2200,
      },
    },
  },

  /* =========================================================
     UTTARAKHAND
  ========================================================= */

  uttarakhand: {
    name: "Uttarakhand",
    state: "Uttarakhand",

    bestFor: [
      "Couple",
      "Family",
      "Friends",
      "Solo",
    ],

    tags: [
      "Mountains",
      "Nature",
      "Adventure",
      "Spiritual",
    ],

    places: [
      {
        name: "Rishikesh",
        type: "Adventure",
        description:
          "A beautiful riverside destination famous for yoga, spirituality and adventure activities.",
      },
      {
        name: "Mussoorie",
        type: "Nature",
        description:
          "A scenic hill station known for mountain views, pleasant weather and beautiful landscapes.",
      },
      {
        name: "Nainital",
        type: "Nature",
        description:
          "A charming lake city surrounded by green Himalayan hills.",
      },
    ],

    hotels: [
      {
        name: "Himalayan Comfort Stay",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,000/night",
        priceValue: 2000,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay surrounded by beautiful Himalayan scenery.",
      },
      {
        name: "Mountain Breeze Resort",
        type: "Resort",
        rating: "4.4",
        price: "₹3,500/night",
        priceValue: 3500,
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
        description:
          "Peaceful resort offering relaxing mountain views.",
      },
      {
        name: "Valley View Retreat",
        type: "Resort",
        rating: "4.6",
        price: "₹5,000/night",
        priceValue: 5000,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Beautiful retreat surrounded by nature and peaceful landscapes.",
      },
      {
        name: "Luxury Himalayan Resort",
        type: "Resort",
        rating: "4.8",
        price: "₹8,000/night",
        priceValue: 8000,
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium mountain resort designed for a relaxing getaway.",
      },
    ],

    activities: [
      {
        name: "River Rafting",
        type: "Adventure",
        description:
          "Enjoy an exciting rafting experience on the Ganges.",
      },
      {
        name: "Mountain Trek",
        type: "Adventure",
        description:
          "Explore scenic Himalayan trails surrounded by beautiful landscapes.",
      },
      {
        name: "Ganga Aarti",
        type: "Spiritual",
        description:
          "Experience the peaceful evening Ganga Aarti beside the holy river.",
      },
      {
        name: "Cable Car Ride",
        type: "Sightseeing",
        description:
          "Enjoy panoramic mountain views from a scenic cable car ride.",
      },
      {
        name: "Wildlife Safari",
        type: "Wildlife",
        description:
          "Explore forest landscapes and discover wildlife on a safari.",
      },
    ],

    transport: {
      budget: {
        name: "Local Bus / Shared Cab",
        daily: 700,
      },
      standard: {
        name: "Cab",
        daily: 1600,
      },
      premium: {
        name: "Private Cab",
        daily: 3000,
      },
    },
  },

  /* =========================================================
     UDAIPUR
  ========================================================= */

  udaipur: {
    name: "Udaipur",
    state: "Rajasthan",

    bestFor: [
      "Couple",
      "Family",
      "Friends",
      "Solo",
    ],

    tags: [
      "Royal",
      "Lakes",
      "Culture",
      "Romantic",
      "Heritage",
    ],

    places: [
      {
        name: "Lake Pichola",
        type: "Nature",
        description:
          "A beautiful lake surrounded by royal palaces, hills and scenic views.",
      },
      {
        name: "City Palace",
        type: "Culture",
        description:
          "A magnificent palace complex showcasing Udaipur's royal heritage and architecture.",
      },
      {
        name: "Jag Mandir",
        type: "Heritage",
        description:
          "A beautiful island palace located in the middle of Lake Pichola.",
      },
    ],

    hotels: [
      {
        name: "Udaipur Comfort Hotel",
        type: "Hotel",
        rating: "4.2",
        price: "₹2,200/night",
        priceValue: 2200,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        description:
          "Comfortable stay with convenient access to Udaipur's major attractions.",
      },
      {
        name: "Lake View Stay",
        type: "Hotel",
        rating: "4.5",
        price: "₹3,500/night",
        priceValue: 3500,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        description:
          "Beautiful stay offering scenic views and easy access to Lake Pichola.",
      },
      {
        name: "Royal Heritage Haveli",
        type: "Hotel",
        rating: "4.6",
        price: "₹5,000/night",
        priceValue: 5000,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        description:
          "Elegant heritage stay inspired by Udaipur's royal architecture.",
      },
      {
        name: "Lake Palace Retreat",
        type: "Resort",
        rating: "4.8",
        price: "₹8,000/night",
        priceValue: 8000,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
        description:
          "Premium stay offering luxury comfort and beautiful lake surroundings.",
      },
      {
        name: "Royal Udaipur Palace",
        type: "Resort",
        rating: "4.9",
        price: "₹10,000/night",
        priceValue: 10000,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        description:
          "Luxury heritage-inspired stay for a memorable Udaipur experience.",
      },
    ],

    activities: [
      {
        name: "Lake Pichola Boat Ride",
        type: "Nature",
        description:
          "Enjoy a peaceful boat ride while admiring Udaipur's palaces and beautiful lake views.",
      },
      {
        name: "Royal Heritage Walk",
        type: "Culture",
        description:
          "Explore historic streets, royal architecture and traditional Udaipur heritage.",
      },
      {
        name: "Sunset Lake Experience",
        type: "Relaxation",
        description:
          "Enjoy a beautiful sunset beside the peaceful waters of Udaipur's lakes.",
      },
      {
        name: "Rajasthani Food Tour",
        type: "Food",
        description:
          "Taste authentic Rajasthani dishes and traditional local flavours.",
      },
      {
        name: "Traditional Shopping",
        type: "Shopping",
        description:
          "Shop for handicrafts, jewellery, textiles and traditional Rajasthani products.",
      },
      {
        name: "Romantic Palace Dinner",
        type: "Relaxation",
        description:
          "Enjoy a memorable dinner surrounded by royal architecture and beautiful views.",
      },
    ],

    transport: {
      budget: {
        name: "Auto / Local Bus",
        daily: 600,
      },
      standard: {
        name: "Cab",
        daily: 1500,
      },
      premium: {
        name: "Private Premium Cab",
        daily: 2800,
      },
    },
  },
};

export default tripData;