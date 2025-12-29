import React from "react";
import "./css/cards.css";

const Cards = ({ items, onCardClick }) => {
  return (
    <>
      {items.map((i) => {
        const previewContent = `
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        height: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .preview-scale {
        transform: scale(0.85);
        transform-origin: center;
        max-width: 100%;
        max-height: 100%;
      }
    </style>
              ${i.codigoCSS ? `<style>${i.codigoCSS}</style>` : ''}
            </head>
            <body style="height:100px;overflow:hidden;display:flex;justify-content:center;align-items:center;" class="preview-scale">
              ${i.codigoHTML || ""}
            </body>
          </html>
        `;
        return (
          <div key={i.id} className="card">
            <iframe
              className="card_preview"
              title={`preview-${i.id}`}
              srcDoc={previewContent}
              aria-label={`open-${i.id}`}
            />
            <div className="card_overlay">
              <h3>{i.nombre}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-bar-to-right"
                onClick={() => onCardClick(i.id)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 12l-10 0" />
                <path d="M14 12l-4 4" />
                <path d="M14 12l-4 -4" />
                <path d="M20 4l0 16" />
              </svg>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cards;
