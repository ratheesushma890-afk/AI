import React from "react";
import { Link } from "react-router-dom";
import {
  FiX,
  FiHeart,
  FiTrash2,
  FiArrowUpRight,
  FiMapPin,
  FiStar,
  FiCompass,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";

import "./WishlistDrawer.css";

const WishlistDrawer = () => {
  const {
    wishlist,
    wishlistOpen,
    closeWishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`wishlist-backdrop ${
          wishlistOpen ? "show" : ""
        }`}
        onClick={closeWishlist}
      />

      {/* DRAWER */}
      <aside
        className={`wishlist-drawer ${
          wishlistOpen ? "open" : ""
        }`}
      >
        {/* HEADER */}
        <div className="wishlist-drawer-header">

          <div>
            <span className="wishlist-drawer-label">
              YOUR COLLECTION
            </span>

            <h2>
              Wishlist
              <span>{wishlist.length}</span>
            </h2>
          </div>

          <button
            className="wishlist-close"
            onClick={closeWishlist}
            aria-label="Close wishlist"
          >
            <FiX />
          </button>

        </div>

        {/* CONTENT */}
        <div className="wishlist-drawer-content">

          {wishlist.length === 0 ? (
            <div className="wishlist-drawer-empty">

              <div className="wishlist-empty-icon">
                <FiHeart />
              </div>

              <h3>
                Nothing saved
                <br />
                <em>yet.</em>
              </h3>

              <p>
                Save destinations you love and
                they'll appear here.
              </p>

              <Link
                to="/explore"
                onClick={closeWishlist}
                className="wishlist-explore-btn"
              >
                <FiCompass />
                Explore destinations
                <FiArrowUpRight />
              </Link>

            </div>
          ) : (
            <div className="wishlist-items">

              {wishlist.map((item) => (
                <div
                  className="wishlist-drawer-item"
                  key={item.id}
                >

                  {/* IMAGE */}
                  <Link
                    to={`/destination/${item.id}`}
                    onClick={closeWishlist}
                    className="wishlist-item-image"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>

                  {/* INFO */}
                  <div className="wishlist-item-info">

                    <div className="wishlist-item-top">

                      <div>
                        <span className="wishlist-item-category">
                          {item.category}
                        </span>

                        <Link
                          to={`/destination/${item.id}`}
                          onClick={closeWishlist}
                        >
                          <h3>{item.name}</h3>
                        </Link>
                      </div>

                      <button
                        className="wishlist-delete"
                        onClick={() =>
                          removeFromWishlist(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                    <div className="wishlist-item-location">
                      <FiMapPin />
                      {item.state}
                    </div>

                    <div className="wishlist-item-bottom">

                      <span className="wishlist-item-rating">
                        <FiStar />
                        {item.rating}
                      </span>

                      <Link
                        to={`/destination/${item.id}`}
                        onClick={closeWishlist}
                        className="wishlist-item-view"
                      >
                        View
                        <FiArrowUpRight />
                      </Link>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* FOOTER */}
        {wishlist.length > 0 && (
          <div className="wishlist-drawer-footer">

            <Link
              to="/explore"
              onClick={closeWishlist}
              className="drawer-explore-link"
            >
              <FiCompass />
              Discover more
            </Link>

            <Link
              to="/trip-plan"
              onClick={closeWishlist}
              className="drawer-plan-btn"
            >
              Plan my trip
              <FiArrowUpRight />
            </Link>

          </div>
        )}

      </aside>
    </>
  );
};

export default WishlistDrawer;