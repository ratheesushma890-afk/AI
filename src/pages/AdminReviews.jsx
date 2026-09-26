import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiEye,
  FiCheck,
  FiX,
  FiTrash2,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";

import "./AdminReviews.css";

const AdminReviews = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([
    {
      id: "REV-1001",
      customer: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      avatar: "RS",
      destination: "Manali",
      trip: "Manali Adventure Escape",
      rating: 5,
      title: "Amazing experience!",
      comment:
        "Everything was perfectly planned. The hotel, sightseeing and activities were excellent. We really enjoyed our Manali trip.",
      date: "18 Sep 2026",
      status: "Published",
    },
    {
      id: "REV-1002",
      customer: "Priya Verma",
      email: "priya.verma@gmail.com",
      avatar: "PV",
      destination: "Goa",
      trip: "Goa Beach Holiday",
      rating: 4,
      title: "Beautiful trip",
      comment:
        "The trip was very comfortable and well organised. The beach experience was amazing. Overall we had a great time.",
      date: "15 Sep 2026",
      status: "Published",
    },
    {
      id: "REV-1003",
      customer: "Arjun Mehta",
      email: "arjun.mehta@gmail.com",
      avatar: "AM",
      destination: "Kashmir",
      trip: "Kashmir Paradise Tour",
      rating: 5,
      title: "Kashmir was beautiful",
      comment:
        "The views were breathtaking and the entire itinerary was easy to follow. Highly memorable experience.",
      date: "12 Sep 2026",
      status: "Published",
    },
    {
      id: "REV-1004",
      customer: "Sneha Kapoor",
      email: "sneha.kapoor@gmail.com",
      avatar: "SK",
      destination: "Jaipur",
      trip: "Royal Jaipur Experience",
      rating: 3,
      title: "Good but can improve",
      comment:
        "The destinations were beautiful but the hotel experience could have been better.",
      date: "09 Sep 2026",
      status: "Pending",
    },
    {
      id: "REV-1005",
      customer: "Vikram Singh",
      email: "vikram.singh@gmail.com",
      avatar: "VS",
      destination: "Dubai",
      trip: "Dubai Luxury Escape",
      rating: 5,
      title: "Absolutely fantastic",
      comment:
        "Amazing service from beginning to end. Dubai itinerary was perfect and all arrangements were smooth.",
      date: "06 Sep 2026",
      status: "Published",
    },
    {
      id: "REV-1006",
      customer: "Ananya Gupta",
      email: "ananya.gupta@gmail.com",
      avatar: "AG",
      destination: "Kerala",
      trip: "Kerala Backwater Retreat",
      rating: 4,
      title: "Peaceful holiday",
      comment:
        "Kerala was beautiful and peaceful. The backwater experience was definitely the highlight of our trip.",
      date: "02 Sep 2026",
      status: "Pending",
    },
    {
      id: "REV-1007",
      customer: "Karan Malhotra",
      email: "karan.malhotra@gmail.com",
      avatar: "KM",
      destination: "Rajasthan",
      trip: "Rajasthan Heritage Tour",
      rating: 2,
      title: "Needs improvement",
      comment:
        "The destination was good but there were delays during transportation and some communication issues.",
      date: "28 Aug 2026",
      status: "Hidden",
    },
    {
      id: "REV-1008",
      customer: "Meera Joshi",
      email: "meera.joshi@gmail.com",
      avatar: "MJ",
      destination: "Singapore",
      trip: "Singapore City Escape",
      rating: 5,
      title: "Wonderful journey",
      comment:
        "A wonderful family trip. Everything was organised nicely and the support team was very helpful.",
      date: "25 Aug 2026",
      status: "Published",
    },
  ]);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  // ==========================================
  // FILTER REVIEWS
  // ==========================================

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        review.customer.toLowerCase().includes(text) ||
        review.destination.toLowerCase().includes(text) ||
        review.trip.toLowerCase().includes(text) ||
        review.title.toLowerCase().includes(text) ||
        review.comment.toLowerCase().includes(text) ||
        review.id.toLowerCase().includes(text);

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      const matchesStatus =
        statusFilter === "All" ||
        review.status === statusFilter;

      return (
        matchesSearch &&
        matchesRating &&
        matchesStatus
      );
    });
  }, [reviews, search, ratingFilter, statusFilter]);

  // ==========================================
  // STATS
  // ==========================================

  const totalReviews = reviews.length;

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  // ==========================================
  // RATING COUNT
  // ==========================================

  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  // ==========================================
  // STATUS UPDATE
  // ==========================================

  const updateReviewStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status,
            }
          : review
      )
    );

    setSelectedReview((prev) =>
      prev?.id === id
        ? {
            ...prev,
            status,
          }
        : prev
    );
  };

  // ==========================================
  // DELETE REVIEW
  // ==========================================

  const deleteReview = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    setReviews((prev) =>
      prev.filter((review) => review.id !== id)
    );

    setSelectedReview(null);
  };

  // ==========================================
  // STARS
  // ==========================================

  const renderStars = (rating) => {
    return (
      <div className="admin-review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={
              star <= rating
                ? "review-star filled"
                : "review-star"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="admin-reviews-page">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="admin-reviews-header">

        <div>
          <button
            className="reviews-back-btn"
            onClick={() =>
              navigate("/admin-secret/dashboard")
            }
          >
            <FiArrowLeft />
            Dashboard
          </button>

          <h1>Reviews</h1>

          <p>
            Manage customer reviews and feedback from
            your travellers.
          </p>
        </div>

        <div className="reviews-header-icon">
          <FiMessageSquare />
        </div>

      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className="reviews-stats">

        <div className="review-stat-card">

          <div className="review-stat-icon purple">
            <FiMessageSquare />
          </div>

          <div>
            <span>Total Reviews</span>
            <strong>{totalReviews}</strong>
          </div>

        </div>

        <div className="review-stat-card">

          <div className="review-stat-icon yellow">
            <FiStar />
          </div>

          <div>
            <span>Average Rating</span>

            <strong>
              {averageRating}
              <small>/5</small>
            </strong>
          </div>

        </div>

        <div className="review-stat-card">

          <div className="review-stat-icon green">
            <FiCheck />
          </div>

          <div>
            <span>Published</span>
            <strong>{publishedReviews}</strong>
          </div>

        </div>

        <div className="review-stat-card">

          <div className="review-stat-icon orange">
            <FiAlertCircle />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingReviews}</strong>
          </div>

        </div>

      </div>

      {/* ==========================================
          RATING OVERVIEW
      ========================================== */}

      <div className="review-overview">

        <div className="rating-summary">

          <div className="rating-big">
            <strong>{averageRating}</strong>

            <div>
              {renderStars(
                Math.round(Number(averageRating))
              )}

              <span>
                Based on {totalReviews} reviews
              </span>
            </div>
          </div>

        </div>

        <div className="rating-breakdown">

          {[5, 4, 3, 2, 1].map((rating) => {

            const percentage =
              totalReviews > 0
                ? (ratingCounts[rating] /
                    totalReviews) *
                  100
                : 0;

            return (
              <div
                className="rating-breakdown-row"
                key={rating}
              >

                <span>{rating}</span>

                <FiStar className="breakdown-star" />

                <div className="rating-progress">
                  <div
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <strong>
                  {ratingCounts[rating]}
                </strong>

              </div>
            );
          })}

        </div>

      </div>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="reviews-filter-bar">

        <div className="reviews-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search reviews, customers, trips..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              <FiX />
            </button>
          )}

        </div>

        <div className="reviews-filter">

          <label>Rating</label>

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

        </div>

        <div className="reviews-filter">

          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Hidden">Hidden</option>
          </select>

        </div>

      </div>

      {/* ==========================================
          REVIEWS TABLE
      ========================================== */}

      <div className="reviews-table-card">

        <div className="reviews-table-header">

          <div>
            <h2>Customer Reviews</h2>

            <p>
              Showing {filteredReviews.length} of{" "}
              {reviews.length} reviews
            </p>
          </div>

          <span>
            {filteredReviews.length} Results
          </span>

        </div>

        <div className="reviews-table-wrapper">

          <table className="reviews-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Trip</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (

                  <tr key={review.id}>

                    {/* CUSTOMER */}

                    <td>

                      <div className="review-customer">

                        <div className="review-avatar">
                          {review.avatar}
                        </div>

                        <div>
                          <strong>
                            {review.customer}
                          </strong>

                          <span>
                            {review.id}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* TRIP */}

                    <td>

                      <div className="review-trip">

                        <strong>
                          {review.trip}
                        </strong>

                        <span>
                          <FiMapPin />
                          {review.destination}
                        </span>

                      </div>

                    </td>

                    {/* RATING */}

                    <td>

                      <div className="table-rating">

                        {renderStars(review.rating)}

                        <strong>
                          {review.rating}.0
                        </strong>

                      </div>

                    </td>

                    {/* REVIEW */}

                    <td>

                      <div className="review-preview">

                        <strong>
                          {review.title}
                        </strong>

                        <p>
                          {review.comment}
                        </p>

                      </div>

                    </td>

                    {/* DATE */}

                    <td>

                      <span className="review-date">
                        <FiCalendar />
                        {review.date}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`review-status ${review.status.toLowerCase()}`}
                      >
                        <span />
                        {review.status}
                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="review-actions">

                        <button
                          className="review-view-btn"
                          onClick={() =>
                            setSelectedReview(review)
                          }
                          title="View Review"
                        >
                          <FiEye />
                        </button>

                        {review.status ===
                          "Pending" && (
                          <button
                            className="review-approve-btn"
                            onClick={() =>
                              updateReviewStatus(
                                review.id,
                                "Published"
                              )
                            }
                            title="Approve"
                          >
                            <FiCheck />
                          </button>
                        )}

                        {review.status ===
                          "Published" && (
                          <button
                            className="review-hide-btn"
                            onClick={() =>
                              updateReviewStatus(
                                review.id,
                                "Hidden"
                              )
                            }
                            title="Hide"
                          >
                            <FiX />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="reviews-empty"
                  >

                    <FiMessageSquare />

                    <h3>No reviews found</h3>

                    <p>
                      Try changing your filters or
                      search.
                    </p>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================
          REVIEW DETAILS MODAL
      ========================================== */}

      {selectedReview && (

        <div
          className="review-modal-overlay"
          onClick={() =>
            setSelectedReview(null)
          }
        >

          <div
            className="review-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="review-modal-header">

              <div>
                <span>Review Details</span>

                <h2>
                  {selectedReview.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedReview(null)
                }
              >
                <FiX />
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="review-modal-customer">

              <div className="review-modal-avatar">
                {selectedReview.avatar}
              </div>

              <div>

                <h3>
                  {selectedReview.customer}
                </h3>

                <p>
                  {selectedReview.email}
                </p>

              </div>

            </div>

            {/* TRIP INFO */}

            <div className="review-modal-info">

              <div>
                <span>
                  <FiMapPin />
                  Destination
                </span>

                <strong>
                  {selectedReview.destination}
                </strong>
              </div>

              <div>
                <span>
                  <FiCalendar />
                  Date
                </span>

                <strong>
                  {selectedReview.date}
                </strong>
              </div>

              <div>
                <span>
                  <FiMessageSquare />
                  Review ID
                </span>

                <strong>
                  {selectedReview.id}
                </strong>
              </div>

            </div>

            {/* RATING */}

            <div className="review-modal-rating">

              <span>Customer Rating</span>

              <div>

                {renderStars(
                  selectedReview.rating
                )}

                <strong>
                  {selectedReview.rating}.0 / 5
                </strong>

              </div>

            </div>

            {/* COMMENT */}

            <div className="review-modal-comment">

              <span>Customer Feedback</span>

              <p>
                "{selectedReview.comment}"
              </p>

            </div>

            {/* STATUS */}

            <div className="review-modal-current-status">

              <span>Current Status</span>

              <span
                className={`review-status ${selectedReview.status.toLowerCase()}`}
              >
                <span />
                {selectedReview.status}
              </span>

            </div>

            {/* ACTIONS */}

            <div className="review-modal-actions">

              {selectedReview.status ===
                "Pending" && (
                <button
                  className="modal-approve-btn"
                  onClick={() =>
                    updateReviewStatus(
                      selectedReview.id,
                      "Published"
                    )
                  }
                >
                  <FiCheck />
                  Approve Review
                </button>
              )}

              {selectedReview.status ===
                "Published" && (
                <button
                  className="modal-hide-btn"
                  onClick={() =>
                    updateReviewStatus(
                      selectedReview.id,
                      "Hidden"
                    )
                  }
                >
                  <FiX />
                  Hide Review
                </button>
              )}

              {selectedReview.status ===
                "Hidden" && (
                <button
                  className="modal-approve-btn"
                  onClick={() =>
                    updateReviewStatus(
                      selectedReview.id,
                      "Published"
                    )
                  }
                >
                  <FiCheck />
                  Publish Again
                </button>
              )}

              <button
                className="modal-delete-btn"
                onClick={() =>
                  deleteReview(selectedReview.id)
                }
              >
                <FiTrash2 />
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminReviews;