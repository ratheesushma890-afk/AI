import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PlaceDetail from "./pages/PlaceDetail";

import TravelFooter from "./components/TravelFooter";
import Explore from "./pages/Explore";
import TripPlan from "./pages/TripPlan";
import CreateTrip from "./pages/CreateTrip";
import DestinationDetail from "./pages/DestinationDetail";

import WishlistDrawer from "./components/WishlistDrawer";
import { WishlistProvider } from "./context/WishlistContext";

import Destinations from "./pages/Destinations";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Guides from "./pages/Guides";
import Booking from "./pages/Booking";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTrips from "./pages/AdminTrips";
import AdminDestinations from "./pages/AdminDestinations";
import AdminBookings from "./pages/AdminBookings";
import AdminCustomers from "./pages/AdminCustomers";
import AdminReviews from "./pages/AdminReviews";
import AdminMessages from "./pages/AdminMessages";
import AdminSettings from "./pages/AdminSettings";
import AdminEditTrip from "./pages/AdminEditTrip";
import AdminAddTrip from "./pages/AdminAddTrip";
import AdminLayout from "./pages/AdminLayout";
import AdminAddDestination from "./pages/AdminDestinationForm";
import AdminEditDestination from "./pages/AdminEditDestination";
import BookingSummary from "./pages/BookingSummary";
// =====================================================
// SCROLL TO TOP ON NEW PAGE
// =====================================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};


// =====================================================
// APP
// =====================================================
const App = () => {
  const location = useLocation();

  const isAdminPage =
  location.pathname.startsWith("/admin-secret");
  

const hideFooter =
  location.pathname === "/signup" ||
  location.pathname === "/login" ||
  isAdminPage;


  // =====================================================
  // MAIN APP
  // =====================================================
  return (
    <WishlistProvider>

      <ScrollToTop />

       {!isAdminPage && <Navbar />}

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* EXPLORE */}
        <Route
          path="/explore"
          element={<Explore />}
        />

        {/* TRIP PLAN */}
        <Route
          path="/trip-plan"
          element={<TripPlan />}
        />

        {/* CREATE TRIP */}
        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />

        {/* DESTINATION DETAIL */}
        <Route
          path="/destination/:id"
          element={<DestinationDetail />}
        />

        {/* DESTINATIONS */}
        <Route
          path="/destinations"
          element={<Destinations />}
        />

       

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ABOUT */}
        <Route
          path="/about-us"
          element={<AboutUs />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* FAQS */}
        <Route
          path="/faqs"
          element={<FAQs />}
        />

        {/* GUIDES */}
        <Route
          path="/guides"
          element={<Guides />}
        />

        {/* BOOKING */}
        <Route
          path="/booking"
          element={<Booking />}
        />
           {/* =================================================
    ADMIN LOGIN
================================================= */}

<Route
  path="/admin-secret"
  element={<AdminLogin />}
/>


{/* =================================================
    ADMIN PANEL
================================================= */}

<Route
  path="/admin-secret"
  element={<AdminLayout />}
>
  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="trips"
    element={<AdminTrips />}
  />

  <Route
    path="destinations"
    element={<AdminDestinations />}
  />

  <Route
    path="bookings"
    element={<AdminBookings />}
  />

  <Route
    path="customers"
    element={<AdminCustomers />}
  />

  <Route
    path="reviews"
    element={<AdminReviews />}
  />

  <Route
    path="messages"
    element={<AdminMessages />}
  />

  <Route
    path="settings"
    element={<AdminSettings />}
  />

  <Route
    path="trips/edit/:id"
    element={<AdminEditTrip />}
  />

  <Route
    path="trips/new"
    element={<AdminAddTrip />}
  />
</Route>
<Route
  path="/admin-secret/destinations/new"
  element={<AdminAddDestination />}
/>
 <Route
    path="/admin-secret/destinations/edit/:id"
    element={<AdminEditDestination />}
  />
  <Route
  path="/booking-summary"
  element={<BookingSummary />}
/>
<Route
  path="/place/:destinationId/:placeId"
  element={<PlaceDetail />}
/>
      </Routes>


      {/* =================================================
          FOOTER
          Signup + Login par hide rahega
      ================================================= */}
      {!hideFooter && <TravelFooter />}


      {/* WISHLIST */}
      <WishlistDrawer />

    </WishlistProvider>
  );
};

export default App;