import React, { useMemo, useState } from "react";
import {
  FiStar,
  FiSearch,
  FiMapPin,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";

import "./ClientReviews.css";

const ClientReviews = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Aarav Sharma",
      destination: "Goa",
      rating: 5,
      date: "24 Sep 2026",
      review:
        "Amazing Goa trip. Hotel and itinerary were very well planned.",
      status: "Published",
    },
    {
      id: 2,
      customer: "Priya Verma",
      destination: "Manali",
      rating: 4,
      date: "22 Sep 2026",
      review:
        "Beautiful experience and the stay was very comfortable.",
      status: "Published",
    },
    {
      id: 3,
      customer: "Rahul Mehta",
      destination: "Jaipur",
      rating: 5,
      date: "19 Sep 2026",
      review:
        "The destination plan was excellent. We enjoyed the heritage places.",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Ananya Singh",
      destination: "Kerala",
      rating: 4,
      date: "15 Sep 2026",
      review:
        "Loved the backwaters and hotel recommendations.",
      status: "Pending",
    },
  ]);

  const filteredReviews = useMemo(() => {
    const value = search.toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        review.customer.toLowerCase().includes(value) ||
        review.destination.toLowerCase().includes(value);

      const matchesFilter =
        filter === "All" || review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  const publishReview = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? { ...review, status: "Published" }
          : review
      )
    );

    setSelectedReview((prev) =>
      prev?.id === id
        ? { ...prev, status: "Published" }
        : prev
    );
  };

  return (
    <div className="client-reviews-page">

      <section className="client-review-hero">
        <div>
          <span>REVIEW MANAGEMENT</span>
          <h1>Customer Reviews</h1>
          <p>
            Read traveller feedback and manage pending reviews.
          </p>
        </div>

        <div className="client-review-score">
          <FiStar />
          <div>
            <strong>4.8</strong>
            <span>Average Rating</span>
          </div>
        </div>
      </section>

      <section className="client-review-toolbar">

        <div className="client-review-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search customer or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Reviews</option>
          <option value="Published">Published</option>
          <option value="Pending">Pending</option>
        </select>

      </section>

      <section className="client-review-grid">

        {filteredReviews.map((review) => (
          <article className="client-review-card" key={review.id}>

            <div className="client-review-card-top">
              <div className="client-review-avatar">
                {review.customer
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div>
                <h3>{review.customer}</h3>

                <span>
                  <FiMapPin />
                  {review.destination}
                </span>
              </div>

              <span
                className={`client-review-status ${review.status.toLowerCase()}`}
              >
                {review.status}
              </span>
            </div>

            <div className="client-review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={
                    star <= review.rating ? "filled" : ""
                  }
                />
              ))}
            </div>

            <p>{review.review}</p>

            <div className="client-review-bottom">
              <span>{review.date}</span>

              <div>
                <button
                  onClick={() => setSelectedReview(review)}
                >
                  <FiEye />
                  View
                </button>

                {review.status === "Pending" && (
                  <button
                    className="client-publish-review"
                    onClick={() => publishReview(review.id)}
                  >
                    <FiCheckCircle />
                    Publish
                  </button>
                )}
              </div>
            </div>

          </article>
        ))}

      </section>

      {selectedReview && (
        <div
          className="client-review-modal-backdrop"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="client-review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="client-review-modal-close"
              onClick={() => setSelectedReview(null)}
            >
              <FiX />
            </button>

            <span>TRAVELLER REVIEW</span>

            <h2>{selectedReview.customer}</h2>

            <p className="client-review-modal-place">
              <FiMapPin />
              {selectedReview.destination}
            </p>

            <div className="client-review-modal-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={
                    star <= selectedReview.rating
                      ? "filled"
                      : ""
                  }
                />
              ))}
            </div>

            <blockquote>
              “{selectedReview.review}”
            </blockquote>

            <div className="client-review-modal-status">
              {selectedReview.status === "Published" ? (
                <FiCheckCircle />
              ) : (
                <FiClock />
              )}

              {selectedReview.status}
            </div>

            {selectedReview.status === "Pending" && (
              <button
                className="client-review-publish-main"
                onClick={() =>
                  publishReview(selectedReview.id)
                }
              >
                <FiCheckCircle />
                Publish Review
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientReviews;