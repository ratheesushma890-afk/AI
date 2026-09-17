
import React from "react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiClock,
  FiHeart,
} from "react-icons/fi";

import "./TravelNotes.css";

import goa from "../assets/goa.jpg";
import manali from "../assets/manali.jpg";
import jaipur from "../assets/jaipur.jpg";

const notes = [
  {
    id: "01",
    place: "GOA",
    date: "08 JUN 2026",
    title: "Go before the beach wakes up.",
    text: "The quietest part of Goa isn't hidden. It's simply early. Catch the first light, walk slowly and let the morning stay yours.",
    author: "Maya",
    trip: "4 DAY ESCAPE",
    image: goa,
  },
  {
    id: "02",
    place: "MANALI",
    date: "21 MAY 2026",
    title: "Take the road less rushed.",
    text: "Skip the usual route once. The old mountain roads lead to little cafés, pine forests and views you'll remember longer.",
    author: "Arjun",
    trip: "5 DAY RETREAT",
    image: manali,
  },
  {
    id: "03",
    place: "JAIPUR",
    date: "14 APR 2026",
    title: "Don't rush the old city.",
    text: "The best Jaipur moments happen between the landmarks. Stop for chai, wander the blue doors and follow the sounds.",
    author: "Riya",
    trip: "3 DAY CITY BREAK",
    image: jaipur,
  },
];

const TravelNotes = () => {
  return (
    <section className="travel-notes">

      {/* Decorative background */}
      <div className="notes-orb notes-orb-one"></div>
      <div className="notes-orb notes-orb-two"></div>

      {/* HEADER */}
      <div className="notes-header">

        <div>
          <div className="notes-eyebrow">
            <span></span>
            TRIPPER JOURNAL
          </div>

          <h2>
            Notes from <em>the road.</em>
            
            
          </h2>
        </div>

        <div className="notes-intro">
         

         
        </div>

      </div>


      {/* NOTES WALL */}
      <div className="notes-wall">

        {/* SIDE LABEL */}
        <div className="notes-side-label">
          <span>TRAVEL</span>
          <strong>NOTES</strong>
        </div>


        {/* CARDS */}
        <div className="notes-grid">

          {notes.map((note, index) => (
            <article
              className={`travel-note note-${index + 1}`}
              key={note.id}
            >

              {/* IMAGE */}
              <div className="note-image">

                <img
                  src={note.image}
                  alt={note.place}
                />

                <div className="note-image-overlay"></div>

                <div className="note-number">
                  {note.id}
                </div>

                <div className="note-place">
                  <FiMapPin />
                  {note.place}
                </div>

              </div>


              {/* PAPER */}
              <div className="note-paper">

                <div className="note-top">

                  <span>{note.date}</span>

              

                </div>


                <h3>
                  {note.title}
                </h3>

                <p>
                  {note.text}
                </p>


                <div className="note-bottom">

                  <div className="note-author">

                    <div className="author-circle">
                      {note.author.charAt(0)}
                    </div>

                    <div>
                      <strong>{note.author}</strong>

                      <span>{note.trip}</span>
                    </div>

                  </div>


                  <div className="note-time">
                    <FiClock />
                    2 MIN
                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>


      {/* BOTTOM LINE */}
      <div className="notes-footer">

        <span>
          ✦
        </span>

        <p>
          Real places. Small discoveries. Stories worth carrying home.
        </p>

        <div className="notes-footer-line"></div>

        <strong>
          03 / 12
        </strong>

      </div>

    </section>
  );
};

export default TravelNotes;

