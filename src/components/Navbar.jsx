
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const {
    wishlist,
    openWishlist,
  } = useWishlist();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ================= SCROLL NAVBAR ================= */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Page ke bilkul top par navbar visible
      if (currentScrollY <= 20) {
        setShowNavbar(true);
      }

      // Neeche scroll → navbar hide
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      }

      // Upar scroll → navbar show
      else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`trip-navbar-wrap ${
        showNavbar
          ? "navbar-visible"
          : "navbar-hidden"
      }`}
    >
      <nav className="trip-navbar">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="trip-logo"
          onClick={closeMenu}
        >
          <span className="trip-logo-icon">
            <svg
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="
                  M32 5
                  L38 26
                  L57 34
                  L57 40
                  L38 36
                  L38 53
                  L47 59
                  L47 62
                  L32 55
                  L17 62
                  L17 59
                  L26 53
                  L26 36
                  L7 40
                  L7 34
                  L26 26
                  Z
                "
                fill="currentColor"
              />
            </svg>
          </span>

          <span className="trip-logo-text">
            <strong>AI</strong> TRIP
          </span>
        </Link>


        {/* ================= DESKTOP NAV ================= */}

        <div className="trip-nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `trip-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `trip-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Explore
          </NavLink>


         

          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `trip-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Destinations
          </NavLink>


          <NavLink
            to="/trip-plan"
            className={({ isActive }) =>
              `trip-nav-link plan-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Plan Trip
          </NavLink>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="trip-nav-actions">

  



          {/* ================= WISHLIST ================= */}

          <button
            type="button"
            className="trip-icon-button wishlist-nav-button"
            onClick={openWishlist}
            aria-label="Open wishlist"
          >
            <FiHeart />

            {wishlist.length > 0 && (
              <span className="wishlist-count">
                {wishlist.length}
              </span>
            )}
          </button>


          {/* ================= PROFILE ================= */}

          <Link
            to="/signup"
            className="trip-profile-button"
            aria-label="Profile"
            onClick={closeMenu}
          >
            <FiUser />
          </Link>

        </div>


        {/* ================= MOBILE BUTTON ================= */}

        <button
          type="button"
          className="trip-mobile-toggle"
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FiX />
          ) : (
            <FiMenu />
          )}
        </button>

      </nav>


      {/* ================= MOBILE MENU ================= */}

      <div
        className={`trip-mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Home
        </NavLink>


        <NavLink
          to="/explore"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Explore
        </NavLink>


        <NavLink
          to="/destinations"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Destinations
        </NavLink>


       


        <NavLink
          to="/my-trips"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          My Trips
        </NavLink>


        {/* MOBILE WISHLIST */}

        <button
          type="button"
          onClick={() => {
            closeMenu();
            openWishlist();
          }}
          className="mobile-nav-link mobile-wishlist-button"
        >
          <FiHeart />

          <span>Wishlist</span>

          {wishlist.length > 0 && (
            <span className="mobile-wishlist-count">
              {wishlist.length}
            </span>
          )}
        </button>


        {/* PROFILE */}

        <NavLink
          to="/signup"
          onClick={closeMenu}
          className="mobile-profile-link"
        >
          <FiUser />
          My Profile
        </NavLink>

      </div>

    </header>
  );
};

export default Navbar;

