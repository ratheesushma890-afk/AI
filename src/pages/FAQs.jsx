
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiCompass,
  FiHelpCircle,
  FiSearch,
} from "react-icons/fi";

import "./FAQs.css";

const faqData = [
  {
    category: "Planning",
    question: "How can I create a trip?",
    answer:
      "You can create your trip by going to the Create Trip page. Select your destination, travel dates, number of travellers and preferences, then build your personalised journey.",
  },
  {
    category: "Planning",
    question: "Can I customise my itinerary?",
    answer:
      "Yes. Your itinerary can be customised according to your interests, travel style, available time and budget. You can adjust the places and experiences you want to include.",
  },
  {
    category: "Planning",
    question: "Can I plan a trip for multiple destinations?",
    answer:
      "Yes. You can create a journey around multiple destinations and organise the itinerary according to your travel route and available days.",
  },
  {
    category: "Booking",
    question: "Does the website book hotels and flights?",
    answer:
      "Our platform is primarily designed to help you discover destinations and plan your journey. Booking availability depends on the travel service or partner connected to a particular experience.",
  },
  {
    category: "Booking",
    question: "Can I change my trip after creating it?",
    answer:
      "Yes. You can revisit your trip and update details such as dates, travellers, destinations and itinerary preferences whenever your plans change.",
  },
  {
    category: "Account",
    question: "Do I need an account to plan a trip?",
    answer:
      "You can explore destinations without an account. Creating an account is useful when you want to save trips, manage your plans and keep your travel details organised.",
  },
  {
    category: "Account",
    question: "Can I save my favourite destinations?",
    answer:
      "Yes. Use the heart icon on destinations you love to add them to your wishlist. You can access your saved destinations later from the wishlist.",
  },
  {
    category: "AI Trip Planner",
    question: "How does the AI Trip Planner work?",
    answer:
      "The AI Trip Planner uses your destination, travel dates, interests and preferences to help create a personalised travel plan with suggestions for places, activities and experiences.",
  },
  {
    category: "AI Trip Planner",
    question: "Can AI plan a trip according to my budget?",
    answer:
      "Yes. You can provide your preferred budget while creating your trip. The planner can then focus its suggestions around your selected travel style and spending range.",
  },
  {
    category: "Support",
    question: "How can I contact the travel team?",
    answer:
      "You can reach us through the Contact page. Send us your question through the contact form and our team can assist you with your travel-related queries.",
  },
];

const categories = [
  "All",
  "Planning",
  "Booking",
  "Account",
  "AI Trip Planner",
  "Support",
];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" ||
      faq.category === activeCategory;

    const searchText = search.toLowerCase();

    const matchesSearch =
      faq.question.toLowerCase().includes(searchText) ||
      faq.answer.toLowerCase().includes(searchText) ||
      faq.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="faq-hero">

        <div className="faq-hero-content">

          <span className="faq-eyebrow">
            <FiHelpCircle />
            HELP CENTER
          </span>

          <h1>
            Questions?
            <br />
            We've got
            <br />
            <em>answers.</em>
          </h1>

          <p>
            Everything you need to know about planning,
            discovering and creating your next unforgettable
            journey.
          </p>

        </div>

        <div className="faq-hero-visual">

          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=90"
            alt="Travel destination"
          />

          <div className="faq-floating-card">
            <FiCompass />

            <div>
              <strong>Travel made simple</strong>
              <span>Find answers. Plan better.</span>
            </div>
          </div>

        </div>

      </section>


      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="faq-search-section">

        <div className="faq-search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search your question..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(null);
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}

        </div>

      </section>


      {/* =================================================
          FAQ CONTENT
      ================================================= */}

      <section className="faq-content">

        {/* CATEGORY SIDEBAR */}

        <aside className="faq-categories">

          <span>EXPLORE TOPICS</span>

          <div className="faq-category-list">

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
              >
                {category}

                {activeCategory === category && (
                  <FiArrowUpRight />
                )}
              </button>
            ))}

          </div>

        </aside>


        {/* QUESTIONS */}

        <div className="faq-list-area">

          <div className="faq-list-heading">

            <div>
              <span>
                {activeCategory === "All"
                  ? "FREQUENTLY ASKED QUESTIONS"
                  : activeCategory.toUpperCase()}
              </span>

              <h2>
                What would you
                <br />
                like to <em>know?</em>
              </h2>
            </div>

            <small>
              {filteredFAQs.length} questions
            </small>

          </div>


          <div className="faq-list">

            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (

                <div
                  className={`faq-item ${
                    openIndex === index ? "open" : ""
                  }`}
                  key={`${faq.question}-${index}`}
                >

                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >

                    <div className="faq-question-left">

                      <span className="faq-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <small>{faq.category}</small>
                        <h3>{faq.question}</h3>
                      </div>

                    </div>

                    <span className="faq-toggle">
                      <FiChevronDown />
                    </span>

                  </button>


                  <div className="faq-answer">

                    <div>
                      <p>{faq.answer}</p>
                    </div>

                  </div>

                </div>

              ))
            ) : (

              <div className="faq-empty">

                <FiSearch />

                <h3>No questions found</h3>

                <p>
                  Try searching with another keyword.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Show All Questions
                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          CONTACT HELP
      ================================================= */}

      <section className="faq-contact">

        <div className="faq-contact-icon">
          <FiHelpCircle />
        </div>

        <div className="faq-contact-text">

          <span>STILL HAVE QUESTIONS?</span>

          <h2>
            Can't find what
            <br />
            you're looking for?
          </h2>

          <p>
            Don't worry. Our team is always happy to help
            you with your travel questions.
          </p>

        </div>

        <Link
          to="/contact"
          className="faq-contact-btn"
        >
          Contact Us
          <FiArrowUpRight />
        </Link>

      </section>


    </main>
  );
};

export default FAQs;

