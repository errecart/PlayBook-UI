"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "./css/categoryCard.css";
import "./css/categoryAnimations.css"

const CategoryCard = () => {
  const router = useRouter();

  const [flip, setFlip] = useState({
    botones: false,
    cards: false,
    dropdowns: false,
    loader: false,
    others: false,
  });

  const toggle = (key) => {
    setFlip((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goToCategory = (categoria) => {
    router.push(`/PlayBook?categoria=${encodeURIComponent(categoria)}`);
  };
  return (
    <div className="cards_container container">
      {/* Botones */}
      <section
        className={`flip-card ${flip.botones ? "flipped" : ""}`}
        onClick={() => !flip.botones && toggle("botones")}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
          <h3>Category</h3>
        </div>
        <div className="back" onClick={() => goToCategory("Botones")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-bolt bolt"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
          </svg>
          <h3>Botones</h3>
        </div>
      </section>

      {/* Cards */}
      <section
        className={`flip-card ${flip.cards ? "flipped" : ""}`}
        onClick={() => !flip.cards && toggle("cards")}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
          <h3>Category</h3>
        </div>
        <div className="back" onClick={() => goToCategory("Cards")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-cards hand_card"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
            <path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
            <path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
          </svg>
          <h3>Cards</h3>
        </div>
      </section>

      {/* Dropdowns */}
      <section
        className={`flip-card ${flip.dropdowns ? "flipped" : ""}`}
        onClick={() => !flip.dropdowns && toggle("dropdowns")}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
          <h3>Category</h3>
        </div>
        <div className="back" onClick={() => goToCategory("Dropdowns")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-down dropdown"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
          </svg>
          <h3>Dropdowns</h3>
        </div>
      </section>

      {/* Loaders */}
      <section
        className={`flip-card ${flip.loader ? "flipped" : ""}`}
        onClick={() => !flip.loader && toggle("loader")}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
          <h3>Category</h3>
        </div>
        <div className="back" onClick={() => goToCategory("Loader")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise loader"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>{" "}
          <h3>Loader</h3>
        </div>
      </section>

      {/* Others */}
      <section
        className={`flip-card ${flip.others ? "flipped" : ""}`}
        onClick={() => !flip.others && toggle("others")}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-question-mark"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <path d="M12 19l0 .01" />
          </svg>
          <h3>Category</h3>
        </div>
        <div className="back" onClick={() => goToCategory("Other")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-dots-circle-horizontal others"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M8 12l0 .01" />
            <path d="M12 12l0 .01" />
            <path d="M16 12l0 .01" />
          </svg>
          <h3>Others</h3>
        </div>
      </section>
    </div>
  );
};

export default CategoryCard;
