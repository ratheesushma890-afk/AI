

import BeforeYouGo from "../components/BeforeYouGo";
import Hero from "../components/Hero";
import LittleDetours from "../components/LittleDetours";


import StayHighlights from "../components/StayHighlights";
import TravelMood from "../components/TravelMood";
import TravelNotes from "../components/TravelNotes";
import TravelTape from "../components/TravelTape";
import PlaceReviews from "../components/PlaceReviews";
import PlaceGallery from "../components/PlaceGallery";

const Home = () => {
  return (
    <div>
      
      <Hero />
      <TravelMood />
    
    
      <TravelTape />
      <PlaceGallery />
      <LittleDetours />
      <StayHighlights />
      <TravelNotes />
      <BeforeYouGo />
      <PlaceReviews />
      
      
    </div>
  );
};

export default Home;