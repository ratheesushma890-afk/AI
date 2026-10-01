import React, { useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";

import goa from "../assets/goa image.jpg";
import goa1 from "../assets/goa image1.jpg";
import goa2 from "../assets/goa image2.jpg";
import goa3 from "../assets/goa image3.jpg";

import manali from "../assets/manali image.jpg";
import manali1 from "../assets/manali image1.jpg";
import manali2 from "../assets/manali image2.jpg";
import manali3 from "../assets/manali image3.jpg";

import jaipur from "../assets/jaipur image.jpg";
import jaipur1 from "../assets/jaipur image1.jpg";
import jaipur2 from "../assets/jaipur image2.jpg";
import jaipur3 from "../assets/jaipur image3.jpg";

import kerala from "../assets/keral image.jpg";
import kerala1 from "../assets/keral image1.jpg";
import kerala2 from "../assets/keral image2.jpg";
import kerala3 from "../assets/keral image3.jpg";

import rishikesh from "../assets/rishikesh image.jpg";
import rishikesh1 from "../assets/rishikesh image1.jpg";
import rishikesh2 from "../assets/rishikesh image2.jpg";
import rishikesh3 from "../assets/rishikesh image3.jpg";

import "./PlaceGallery.css";

const galleryImages = [
  { id: 1, image: goa, alt: "Goa beach" },
  { id: 2, image: manali, alt: "Manali mountains" },
  { id: 3, image: jaipur, alt: "Jaipur" },
  { id: 4, image: kerala, alt: "Kerala" },
  { id: 5, image: rishikesh, alt: "Rishikesh" },

  { id: 6, image: goa1, alt: "Goa sunset" },
  { id: 7, image: manali1, alt: "Manali snow" },
  { id: 8, image: jaipur1, alt: "Jaipur heritage" },
  { id: 9, image: kerala1, alt: "Kerala backwaters" },
  { id: 10, image: rishikesh1, alt: "Rishikesh river" },

  { id: 11, image: goa2, alt: "Goa fort" },
  { id: 12, image: manali2, alt: "Manali valley" },
  { id: 13, image: jaipur2, alt: "Jaipur palace" },
  { id: 14, image: kerala2, alt: "Kerala nature" },
  { id: 15, image: rishikesh2, alt: "Rishikesh waterfall" },

  { id: 16, image: goa3, alt: "Goa coast" },
  { id: 17, image: manali3, alt: "Manali view" },
  { id: 18, image: jaipur3, alt: "Jaipur architecture" },
  { id: 19, image: kerala3, alt: "Kerala landscape" },
  { id: 20, image: rishikesh3, alt: "Rishikesh adventure" },
];

const PlaceGallery = () => {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <section className="creative-gallery">
        {/* BACKGROUND DECORATION */}
        <div className="cg-blob cg-blob-one" />
        <div className="cg-blob cg-blob-two" />

        <div className="cg-dots cg-dots-one">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="cg-dots cg-dots-two">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="cg-container">
          {/* HEADING */}
          <div className="cg-heading">
            <div className="cg-small-title">
              <span />
              TRAVEL GALLERY
              <span />
            </div>

            <h2>
              Discover India&apos;s{" "}
              <em>Beauty</em>
            </h2>

            <p>
              From serene mountains to golden beaches,
              royal cities to peaceful escapes — a
              collection of unforgettable journeys.
            </p>
          </div>

          {/* CAMERA BADGE */}
          <div className="cg-camera-badge">
            <FiCamera />

            <span>
              TRAVEL
              <br />
              EXPLORE
              <br />
              REPEAT
            </span>
          </div>

          {/* COLLAGE */}
          <div className="cg-collage">
            {galleryImages.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`cg-photo cg-photo-${index + 1}`}
                onClick={() => setPreviewImage(item)}
                aria-label={`Open ${item.alt}`}
              >
                <img src={item.image} alt={item.alt} />

                <span className="cg-photo-shine" />
              </button>
            ))}
          </div>

          {/* BOTTOM DECORATION */}
          <div className="cg-bottom-mark">
            <span />
            <i />
            <i className="active" />
            <i />
            <span />
          </div>
        </div>
      </section>

      {/* FULL IMAGE PREVIEW */}
      {previewImage && (
        <div
          className="cg-modal"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            className="cg-modal-close"
            onClick={() => setPreviewImage(null)}
            aria-label="Close image"
          >
            <FiX />
          </button>

          <div
            className="cg-modal-image"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={previewImage.image}
              alt={previewImage.alt}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceGallery;