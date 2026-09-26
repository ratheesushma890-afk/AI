import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// =====================================================
// MAIN WEBSITE COMPONENTS
// =====================================================

import Navbar from "./components/Navbar";
import TravelFooter from "./components/TravelFooter";
import WishlistDrawer from "./components/WishlistDrawer";

// =====================================================
// CONTEXT
// =====================================================

import { WishlistProvider } from "./context/WishlistContext";

// =====================================================
// MAIN WEBSITE PAGES
// =====================================================

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import TripPlan from "./pages/TripPlan";
import CreateTrip from "./pages/CreateTrip";

import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Guides from "./pages/Guides";

// =====================================================
// BOOKING PAGES
// =====================================================

import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";
import BookingDetails from "./pages/BookingDetails";

// =====================================================
// ADMIN PAGES
// IMPORTANT:
// All files are inside src/pages/
// =====================================================

import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";

import AdminTrips from "./pages/AdminTrips";
import AdminAddTrip from "./pages/AdminAddTrip";
import AdminEditTrip from "./pages/AdminEditTrip";

import AdminDestinations from "./pages/AdminDestinations";
import AdminDestinationForm from "./pages/AdminDestinationForm";
import AdminEditDestination from "./pages/AdminEditDestination";

import AdminBookings from "./pages/AdminBookings";
import AdminBookingDetails from "./pages/AdminBookingDetails";

import AdminCustomers from "./pages/AdminCustomers";
import AdminReviews from "./pages/AdminReviews";
import AdminMessages from "./pages/AdminMessages";
import AdminStaff from "./pages/AdminStaff";

import AdminPayments from "./pages/AdminPayments";
import AdminActivities from "./pages/AdminActivities";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import SupportDashboard from "./pages/admin/SupportDashboard";
// =====================================================
// SCROLL TO TOP
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
// ADMIN PROTECTED ROUTE
// =====================================================

const AdminProtectedRoute = ({ children }) => {
  let adminUser = null;

  try {
    const storedAdmin = localStorage.getItem("adminUser");

    if (storedAdmin) {
      adminUser = JSON.parse(storedAdmin);
    }
  } catch (error) {
    console.error(
      "Admin authentication error:",
      error
    );

    adminUser = null;
  }

  if (!adminUser?.loggedIn) {
    return (
      <Navigate
        to="/admin-secret"
        replace
      />
    );
  }

  return children;
};

// =====================================================
// APP
// =====================================================

const App = () => {
  const location = useLocation();

  // Check whether current page is admin
  const isAdminPage =
    location.pathname.startsWith(
      "/admin-secret"
    );

  // Hide footer on auth + admin pages
  const hideFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    isAdminPage;

  return (
    <WishlistProvider>

      {/* =============================================
          GLOBAL SCROLL
      ============================================= */}

      <ScrollToTop />

      {/* =============================================
          MAIN WEBSITE NAVBAR
          Hidden on admin pages
      ============================================= */}

      {!isAdminPage && <Navbar />}

      {/* =============================================
          ROUTES
      ============================================= */}

      <Routes>

        {/* =================================================
            MAIN WEBSITE
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/trip-plan"
          element={<TripPlan />}
        />

        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/destination/:id"
          element={<DestinationDetail />}
        />

        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =================================================
            INFORMATION
        ================================================= */}

        <Route
          path="/about-us"
          element={<AboutUs />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faqs"
          element={<FAQs />}
        />

        <Route
          path="/guides"
          element={<Guides />}
        />

        {/* =================================================
            BOOKING
        ================================================= */}

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/booking-summary"
          element={<BookingSummary />}
        />

        <Route
          path="/booking-details"
          element={<BookingDetails />}
        />

        {/* =================================================
            ADMIN LOGIN
        ================================================= */}

        <Route
          path="/admin-secret"
          element={<AdminLogin />}
        />

        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin-secret/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >

          {/* ===============================================
              ADMIN DASHBOARD HOME
          =============================================== */}

          <Route
            index
            element={<AdminDashboard />}
          />

          {/* ===============================================
              TRIPS
          =============================================== */}

          <Route
            path="trips"
            element={<AdminTrips />}
          />

          <Route
            path="trips/new"
            element={<AdminAddTrip />}
          />

          <Route
            path="trips/edit/:id"
            element={<AdminEditTrip />}
          />

          {/* ===============================================
              DESTINATIONS
          =============================================== */}

          <Route
            path="destinations"
            element={<AdminDestinations />}
          />

          <Route
            path="destinations/new"
            element={<AdminDestinationForm />}
          />

          <Route
            path="destinations/edit/:id"
            element={<AdminEditDestination />}
          />
        <Route
  path="staff"
  element={<AdminStaff />}
/>

          {/* ===============================================
              BOOKINGS
          =============================================== */}

          <Route
            path="bookings"
            element={<AdminBookings />}
          />

          <Route
            path="booking-details"
            element={<AdminBookingDetails />}
          />

          {/* ===============================================
              CUSTOMERS
          =============================================== */}

          <Route
            path="customers"
            element={<AdminCustomers />}
          />

          {/* ===============================================
              REVIEWS
          =============================================== */}

          <Route
            path="reviews"
            element={<AdminReviews />}
          />

          {/* ===============================================
              MESSAGES
          =============================================== */}

          <Route
            path="messages"
            element={<AdminMessages />}
          />

          {/* ===============================================
              PAYMENTS
          =============================================== */}

          <Route
            path="payments"
            element={<AdminPayments />}
          />

          {/* ===============================================
              ACTIVITIES
          =============================================== */}

          <Route
            path="activities"
            element={<AdminActivities />}
          />

          {/* ===============================================
              REPORTS
          =============================================== */}

          <Route
            path="reports"
            element={<AdminReports />}
          />

          {/* ===============================================
              SETTINGS
          =============================================== */}

          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>
        <Route
  path="/support-admin/dashboard"
  element={<SupportDashboard />}
/>

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* =============================================
          FOOTER
      ============================================= */}

      {!hideFooter && <TravelFooter />}

      {/* =============================================
          WISHLIST DRAWER
      ============================================= */}

      <WishlistDrawer />

    </WishlistProvider>
  );
};

export default App;