import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiImage,
  FiMapPin,
  FiPlus,
  FiSave,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaRupeeSign } from "react-icons/fa";

import "./AdminEditTrip.css";

const tripData = {
  "TRP-1001": {
    title: "Manali Adventure Escape",
    destination: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    category: "Adventure",
    duration: "5 Days / 4 Nights",
    days: "5",
    nights: "4",
    price: "18999",
    oldPrice: "22999",
    maxGuests: "12",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    status: "Published",
    description:
      "Experience the beautiful mountains of Manali with exciting adventure activities, scenic valleys, local sightseeing and comfortable stays.",
    highlights: [
      "Solang Valley",
      "Rohtang Pass",
      "River Rafting",
      "Local Manali Sightseeing",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Manali",
        description:
          "Arrive in Manali, hotel check-in and evening local market visit.",
      },
      {
        day: "Day 2",
        title: "Solang Valley Adventure",
        description:
          "Visit Solang Valley and enjoy adventure activities.",
      },
      {
        day: "Day 3",
        title: "Rohtang Pass",
        description:
          "Full-day excursion to Rohtang Pass and surrounding valleys.",
      },
      {
        day: "Day 4",
        title: "Local Sightseeing",
        description:
          "Explore Hidimba Temple, Vashisht Temple and Old Manali.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Breakfast and check-out followed by departure.",
      },
    ],
  },

  "TRP-1002": {
    title: "Goa Beach Holiday",
    destination: "Goa",
    state: "Goa",
    country: "India",
    category: "Beach",
    duration: "4 Days / 3 Nights",
    days: "4",
    nights: "3",
    price: "14999",
    oldPrice: "17999",
    maxGuests: "15",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    status: "Published",
    description:
      "Enjoy a relaxing Goa holiday with beautiful beaches, water activities, local sightseeing and memorable sunsets.",
    highlights: [
      "Baga Beach",
      "Calangute Beach",
      "Fort Aguada",
      "North Goa Sightseeing",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Goa Arrival",
        description:
          "Airport pickup and hotel check-in followed by beach evening.",
      },
      {
        day: "Day 2",
        title: "North Goa",
        description:
          "Visit Baga, Calangute and Fort Aguada.",
      },
      {
        day: "Day 3",
        title: "Beach & Leisure",
        description:
          "Enjoy water activities and spend a relaxing day at the beach.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description:
          "Breakfast, check-out and airport transfer.",
      },
    ],
  },

  "TRP-1003": {
    title: "Royal Rajasthan Tour",
    destination: "Jaipur",
    state: "Rajasthan",
    country: "India",
    category: "Heritage",
    duration: "6 Days / 5 Nights",
    days: "6",
    nights: "5",
    price: "24999",
    oldPrice: "28999",
    maxGuests: "14",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    status: "Published",
    description:
      "Discover the royal heritage of Rajasthan with magnificent forts, palaces, markets and traditional experiences.",
    highlights: [
      "Amber Fort",
      "City Palace",
      "Hawa Mahal",
      "Local Market",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Jaipur Arrival",
        description:
          "Arrival in Jaipur and hotel check-in.",
      },
      {
        day: "Day 2",
        title: "Amber Fort",
        description:
          "Explore Amber Fort, Jal Mahal and local attractions.",
      },
      {
        day: "Day 3",
        title: "Pink City",
        description:
          "Visit Hawa Mahal, City Palace and Jantar Mantar.",
      },
      {
        day: "Day 4",
        title: "Local Experiences",
        description:
          "Explore traditional markets and enjoy Rajasthani cuisine.",
      },
      {
        day: "Day 5",
        title: "Cultural Day",
        description:
          "Enjoy cultural activities and local sightseeing.",
      },
      {
        day: "Day 6",
        title: "Departure",
        description:
          "Breakfast, check-out and departure.",
      },
    ],
  },
};

const defaultTrip = {
  title: "",
  destination: "",
  state: "",
  country: "India",
  category: "Adventure",
  duration: "",
  days: "",
  nights: "",
  price: "",
  oldPrice: "",
  maxGuests: "",
  image: "",
  status: "Draft",
  description: "",
  highlights: [],
  itinerary: [],
};

const AdminEditTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const existingTrip = tripData[id] || defaultTrip;

  const [form, setForm] = useState({
    ...existingTrip,
    highlights: [...(existingTrip.highlights || [])],
    itinerary: [...(existingTrip.itinerary || [])],
  });

  const [newHighlight, setNewHighlight] = useState("");

  const [newDay, setNewDay] = useState({
    title: "",
    description: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // HIGHLIGHTS
  // ===============================

  const addHighlight = () => {
    const value = newHighlight.trim();

    if (!value) return;

    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, value],
    }));

    setNewHighlight("");
  };

  const removeHighlight = (index) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ===============================
  // ITINERARY
  // ===============================

  const addItinerary = () => {
    if (
      !newDay.title.trim() ||
      !newDay.description.trim()
    ) {
      alert(
        "Please enter itinerary title and description."
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: `Day ${prev.itinerary.length + 1}`,
          title: newDay.title.trim(),
          description: newDay.description.trim(),
        },
      ],
    }));

    setNewDay({
      title: "",
      description: "",
    });
  };

  const removeItinerary = (index) => {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ===============================
  // SAVE
  // ===============================

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="admin-edit-trip-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="edit-trip-header">

        <div className="edit-trip-header-left">

          <button
            type="button"
            className="edit-back-btn"
            onClick={() =>
              navigate(
                "/admin-secret/dashboard/trips"
              )
            }
          >
            <FiArrowLeft />
          </button>

          <div>

            <div className="edit-trip-breadcrumb">
              Admin
              <span>/</span>
              Trips
              <span>/</span>
              Edit
            </div>

            <h1>Edit Trip</h1>

            <p>
              Update trip information, pricing and itinerary.
            </p>

          </div>

        </div>

        <div className="edit-header-actions">

          <button
            type="button"
            className="edit-cancel-btn"
            onClick={() =>
              navigate(
                "/admin-secret/dashboard/trips"
              )
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-trip-form"
            className="edit-save-btn"
          >
            <FiSave />
            Save Changes
          </button>

        </div>

      </div>

      {/* =========================================
          SUCCESS
      ========================================= */}

      {saved && (
        <div className="edit-success-message">
          <FiCheckCircle />
          Trip changes saved successfully.
        </div>
      )}

      <form
        id="edit-trip-form"
        className="edit-trip-form"
        onSubmit={handleSubmit}
      >

        {/* =========================================
            LEFT
        ========================================= */}

        <div className="edit-trip-main">

          {/* =====================================
              BASIC INFORMATION
          ===================================== */}

          <section className="edit-section">

            <div className="edit-section-heading">

              <div>
                <h2>Basic Information</h2>

                <p>
                  Enter the main details of your travel
                  package.
                </p>
              </div>

            </div>

            <div className="edit-form-grid">

              <div className="edit-form-group full">

                <label>Trip Title</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter trip title"
                  required
                />

              </div>

              <div className="edit-form-group">

                <label>Destination</label>

                <div className="input-icon-wrapper">

                  <FiMapPin />

                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g. Manali"
                    required
                  />

                </div>

              </div>

              <div className="edit-form-group">

                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="e.g. Himachal Pradesh"
                />

              </div>

              <div className="edit-form-group">

                <label>Country</label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />

              </div>

              <div className="edit-form-group">

                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Adventure</option>
                  <option>Beach</option>
                  <option>Mountains</option>
                  <option>Heritage</option>
                  <option>Nature</option>
                  <option>Family</option>
                  <option>Honeymoon</option>
                  <option>Luxury</option>
                </select>

              </div>

            </div>

          </section>


          {/* =====================================
              DURATION & PRICING
          ===================================== */}

          <section className="edit-section">

            <div className="edit-section-heading">

              <div>
                <h2>Duration & Pricing</h2>

                <p>
                  Manage trip duration, price and guest
                  capacity.
                </p>
              </div>

            </div>

            <div className="edit-form-grid">

              <div className="edit-form-group">

                <label>Days</label>

                <div className="input-icon-wrapper">

                  <FiCalendar />

                  <input
                    type="number"
                    name="days"
                    min="1"
                    value={form.days}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="edit-form-group">

                <label>Nights</label>

                <div className="input-icon-wrapper">

                  <FiClock />

                  <input
                    type="number"
                    name="nights"
                    min="0"
                    value={form.nights}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="edit-form-group">

                <label>Duration Display</label>

                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="5 Days / 4 Nights"
                />

              </div>

              <div className="edit-form-group">

                <label>Maximum Guests</label>

                <div className="input-icon-wrapper">

                  <FiUsers />

                  <input
                    type="number"
                    name="maxGuests"
                    min="1"
                    value={form.maxGuests}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* CURRENT PRICE */}

              <div className="edit-form-group">

                <label>Current Price</label>

                <div className="input-icon-wrapper">

                  <FaRupeeSign />

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* ORIGINAL PRICE */}

              <div className="edit-form-group">

                <label>Original Price</label>

                <div className="input-icon-wrapper">

                  <FaRupeeSign />

                  <input
                    type="number"
                    name="oldPrice"
                    min="0"
                    value={form.oldPrice}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </section>


          {/* =====================================
              DESCRIPTION
          ===================================== */}

          <section className="edit-section">

            <div className="edit-section-heading">

              <div>
                <h2>Trip Description</h2>

                <p>
                  Describe the overall travel experience.
                </p>
              </div>

            </div>

            <div className="edit-form-group">

              <label>Description</label>

              <textarea
                name="description"
                rows="6"
                value={form.description}
                onChange={handleChange}
                placeholder="Write trip description..."
              />

              <span className="character-count">
                {form.description.length} characters
              </span>

            </div>

          </section>


          {/* =====================================
              HIGHLIGHTS
          ===================================== */}

          <section className="edit-section">

            <div className="edit-section-heading">

              <div>
                <h2>Trip Highlights</h2>

                <p>
                  Add the major experiences included in
                  the trip.
                </p>
              </div>

            </div>

            <div className="highlight-add-row">

              <input
                type="text"
                value={newHighlight}
                onChange={(e) =>
                  setNewHighlight(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addHighlight();
                  }
                }}
                placeholder="e.g. River Rafting"
              />

              <button
                type="button"
                onClick={addHighlight}
              >
                <FiPlus />
                Add
              </button>

            </div>

            <div className="highlight-list">

              {form.highlights.length > 0 ? (
                form.highlights.map(
                  (highlight, index) => (
                    <div
                      className="highlight-item"
                      key={`${highlight}-${index}`}
                    >

                      <FiCheckCircle />

                      <span>
                        {highlight}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeHighlight(index)
                        }
                      >
                        <FiX />
                      </button>

                    </div>
                  )
                )
              ) : (
                <div className="empty-highlights">
                  No highlights added yet.
                </div>
              )}

            </div>

          </section>


          {/* =====================================
              ITINERARY
          ===================================== */}

          <section className="edit-section">

            <div className="edit-section-heading">

              <div>
                <h2>Trip Itinerary</h2>

                <p>
                  Add and manage the day-by-day trip
                  schedule.
                </p>
              </div>

            </div>

            <div className="itinerary-list">

              {form.itinerary.length > 0 ? (
                form.itinerary.map((item, index) => (
                  <div
                    className="itinerary-edit-card"
                    key={`${item.day}-${index}`}
                  >

                    <div className="itinerary-day-number">
                      {index + 1}
                    </div>

                    <div className="itinerary-edit-content">

                      <div className="itinerary-edit-top">

                        <span>
                          {item.day}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeItinerary(index)
                          }
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                    </div>

                  </div>
                ))
              ) : (
                <div className="empty-itinerary">
                  No itinerary days added.
                </div>
              )}

            </div>


            {/* ADD NEW DAY */}

            <div className="add-itinerary-box">

              <h3>
                <FiPlus />
                Add New Day
              </h3>

              <div className="itinerary-input-grid">

                <div className="edit-form-group">

                  <label>Day</label>

                  <input
                    type="text"
                    value={`Day ${
                      form.itinerary.length + 1
                    }`}
                    disabled
                  />

                </div>

                <div className="edit-form-group">

                  <label>Day Title</label>

                  <input
                    type="text"
                    value={newDay.title}
                    onChange={(e) =>
                      setNewDay((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g. Arrival in Manali"
                  />

                </div>

              </div>

              <div className="edit-form-group">

                <label>Description</label>

                <textarea
                  rows="3"
                  value={newDay.description}
                  onChange={(e) =>
                    setNewDay((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe activities for this day..."
                />

              </div>

              <button
                type="button"
                className="add-day-btn"
                onClick={addItinerary}
              >
                <FiPlus />
                Add Day
              </button>

            </div>

          </section>

        </div>


        {/* =========================================
            RIGHT SIDEBAR
        ========================================= */}

        <aside className="edit-trip-sidebar">

          {/* =====================================
              PUBLISH
          ===================================== */}

          <div className="sidebar-card save-sidebar-card">

            <h3>Publish Trip</h3>

            <p>
              Choose whether this trip should be visible
              to customers.
            </p>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>

            <button
              type="submit"
              className="sidebar-save-btn"
            >
              <FiSave />
              Save Changes
            </button>

          </div>


          {/* =====================================
              IMAGE
          ===================================== */}

          <div className="sidebar-card">

            <div className="sidebar-card-heading">

              <div>

                <h3>Trip Cover Image</h3>

                <span>
                  Recommended 1200 × 800px
                </span>

              </div>

              <FiImage />

            </div>

            <div className="trip-image-preview">

              {form.image ? (
                <img
                  src={form.image}
                  alt={form.title || "Trip"}
                />
              ) : (
                <div className="empty-image-preview">

                  <FiImage />

                  <span>
                    No image
                  </span>

                </div>
              )}

            </div>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="image-url-input"
            />

          </div>


          {/* =====================================
              SUMMARY
          ===================================== */}

          <div className="sidebar-card">

            <div className="sidebar-card-heading">

              <div>

                <h3>Trip Summary</h3>

                <span>
                  Current package details
                </span>

              </div>

            </div>

            <div className="summary-row">

              <span>
                Destination
              </span>

              <strong>
                {form.destination || "—"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Duration
              </span>

              <strong>
                {form.duration || "—"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Guests
              </span>

              <strong>
                {form.maxGuests || "—"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Price
              </span>

              <strong>
                {form.price
                  ? `₹${Number(
                      form.price
                    ).toLocaleString("en-IN")}`
                  : "—"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Status
              </span>

              <span
                className={`summary-status ${
                  form.status.toLowerCase()
                }`}
              >
                {form.status}
              </span>

            </div>

          </div>

        </aside>

      </form>

    </div>
  );
};

export default AdminEditTrip;