import { useState } from "react";
import "./AdminReviews.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      destination: "Dubai Escape",
      rating: 5,
      date: "05 Sep 2026",
      review:
        "Amazing experience! Hotel and sightseeing arrangements were excellent.",
      status: "Approved",
    },
    {
      id: 2,
      customer: "Priya Singh",
      destination: "Paris Tour",
      rating: 4,
      date: "03 Sep 2026",
      review:
        "Beautiful trip and very helpful support team. Had a great time.",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Aman Verma",
      destination: "Bali Adventure",
      rating: 5,
      date: "28 Aug 2026",
      review:
        "Bali was fantastic. Everything was well planned and comfortable.",
      status: "Approved",
    },
    {
      id: 4,
      customer: "Neha Kapoor",
      destination: "Maldives Escape",
      rating: 3,
      date: "20 Aug 2026",
      review:
        "The destination was beautiful but the hotel service could be better.",
      status: "Hidden",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  const updateStatus = (id, status) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { ...review, status }
          : review
      )
    );
  };

  const deleteReview = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      setReviews(
        reviews.filter((review) => review.id !== id)
      );
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      review.customer.toLowerCase().includes(searchText) ||
      review.destination.toLowerCase().includes(searchText) ||
      review.review.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      review.status === statusFilter;

    const matchesRating =
      ratingFilter === "All" ||
      review.rating === Number(ratingFilter);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRating
    );
  });

  return (
    <div className="admin-reviews-page">

      {/* HEADER */}
      <div className="admin-reviews-header">
        <div>
          <h1>Reviews</h1>
          <p>Manage customer reviews and ratings</p>
        </div>

        <div className="reviews-total">
          {filteredReviews.length} Reviews
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="reviews-toolbar">

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Hidden">Hidden</option>
        </select>

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

      {/* REVIEWS */}
      <div className="reviews-list">

        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              className="admin-review-card"
              key={review.id}
            >

              <div className="review-top">

                <div className="review-user">
                  <div className="review-avatar">
                    👤
                  </div>

                  <div>
                    <h3>{review.customer}</h3>
                    <span>
                      {review.destination}
                    </span>
                  </div>
                </div>

                <div className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

              </div>

              <div className="review-date">
                {review.date}
              </div>

              <p className="review-text">
                "{review.review}"
              </p>

              <div className="review-bottom">

                <span
                  className={`review-status ${review.status
                    .toLowerCase()}`}
                >
                  {review.status}
                </span>

                <div className="review-actions">

                  {review.status !== "Approved" && (
                    <button
                      className="review-approve"
                      onClick={() =>
                        updateStatus(
                          review.id,
                          "Approved"
                        )
                      }
                    >
                      ✓ Approve
                    </button>
                  )}

                  {review.status !== "Hidden" && (
                    <button
                      className="review-hide"
                      onClick={() =>
                        updateStatus(
                          review.id,
                          "Hidden"
                        )
                      }
                    >
                      Hide
                    </button>
                  )}

                  <button
                    className="review-delete"
                    onClick={() =>
                      deleteReview(review.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="no-reviews">
            No reviews found
          </div>
        )}

      </div>
    </div>
  );
}