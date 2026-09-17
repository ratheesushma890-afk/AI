

import BeforeYouGo from "../components/BeforeYouGo";
import Hero from "../components/Hero";
import LittleDetours from "../components/LittleDetours";


import PopularDestinations from "../components/PopularDestinations";
import StayHighlights from "../components/StayHighlights";
import TravelMood from "../components/TravelMood";
import TravelNotes from "../components/TravelNotes";
import TravelTape from "../components/TravelTape";

const Home = () => {
  return (
    <div>
      
      <Hero />
      <TravelMood />
      <PopularDestinations />
    
      <TravelTape />
      <LittleDetours />
      <StayHighlights />
      <TravelNotes />
      <BeforeYouGo />
      
      
    </div>
  );
};

export default Home;