"use client";
import React, { useState, useEffect, useRef } from "react";
import "./css/cards.css";

const Cards = ({ items, onCardClick, variant }) => {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);
  const modalRef = useRef(null);

  const buildDoc = (item, height = "155px") => {
    const tw = /class=["'][^"']*(flex|grid|bg-|text-|p-|m-)/.test(item.codigoHTML || "");
    return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">${tw ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}<style>*{box-sizing:border-box;}body{margin:0;height:${height};display:flex;justify-content:center;align-items:center;overflow:hidden;background:transparent;}</style>${item.codigoCSS ? `<style>${item.codigoCSS}</style>` : ""}</head><body>${item.codigoHTML || ""}</body></html>`;
  };

  const copyCode = async (e, item) => {
    e.stopPropagation();
    const parts = [];
    if (item.codigoHTML) parts.push(`<!-- HTML -->\n${item.codigoHTML}`);
    if (item.codigoCSS) parts.push(`/* CSS */\n${item.codigoCSS}`);
    try {
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setCopied(item.id);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const openExpand = (e, item) => {
    e.stopPropagation();
    setExpanded(item);
  };

  const closeExpand = () => setExpanded(null);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e) => { if (e.key === "Escape") closeExpand(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    if (modalRef.current) modalRef.current.focus();
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const cardClass = `card${variant === "light" ? " card_light" : ""}`;

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={cardClass}
          role="button"
          tabIndex={0}
          aria-label={`Open ${item.nombre}`}
          onClick={() => onCardClick(item.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onCardClick(item.id);
            }
          }}
        >
          <div className="card_tags">
            {item.categoria && <span className="card_tag">{item.categoria}</span>}
            {item.style && <span className="card_style_tag">{item.style.toUpperCase()}</span>}
          </div>
          <button
            className="card_expand"
            type="button"
            aria-label={`Expand preview of ${item.nombre}`}
            onClick={(e) => openExpand(e, item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M16 4l4 0l0 4"/>
              <path d="M14 10l6 -6"/>
              <path d="M8 20l-4 0l0 -4"/>
              <path d="M4 20l6 -6"/>
            </svg>
          </button>
          <iframe
            className="card_preview"
            title={`preview-${item.id}`}
            srcDoc={buildDoc(item)}
            sandbox="allow-scripts"
            aria-hidden="true"
          />
          <div className="card_footer">
            <div className="card_info">
              <h3>{item.nombre}</h3>
              {item.autor?.[0]?.nombre && (
                <span className="card_author">By {item.autor[0].nombre}</span>
              )}
            </div>
            <button
              className="card_copy_btn"
              type="button"
              aria-label={`Copy code for ${item.nombre}`}
              onClick={(e) => copyCode(e, item)}
            >
              {copied === item.id ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"/><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"/></svg>
                  Copy code
                </>
              )}
            </button>
          </div>
        </div>
      ))}

      {expanded && (
        <div
          className="modal_overlay"
          onClick={closeExpand}
          role="presentation"
        >
          <div
            ref={modalRef}
            className="modal_content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Full preview of ${expanded.nombre}`}
            tabIndex={-1}
          >
            <div className="modal_header">
              <div>
                <h2 className="modal_title">{expanded.nombre}</h2>
                <div className="modal_tags">
                  {expanded.categoria && <span className="card_tag">{expanded.categoria}</span>}
                  {expanded.style && <span className="card_style_tag">{expanded.style.toUpperCase()}</span>}
                  {expanded.animacion === "animacion" && <span className="card_anim_tag">Animated</span>}
                </div>
              </div>
              <button
                className="modal_close"
                type="button"
                aria-label="Close preview"
                onClick={closeExpand}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 6l-12 12"/><path d="M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <iframe
              className="modal_preview"
              title={`expanded-${expanded.id}`}
              srcDoc={buildDoc(expanded, "320px")}
              sandbox="allow-scripts"
            />
            <div className="modal_footer">
              {expanded.autor?.[0]?.nombre && (
                <span className="card_author">By {expanded.autor[0].nombre}</span>
              )}
              <div className="modal_actions">
                <button
                  className="card_copy_btn"
                  type="button"
                  onClick={(e) => copyCode(e, expanded)}
                >
                  {copied === expanded.id ? "Copied!" : "Copy code"}
                </button>
                <button
                  className="modal_detail_btn"
                  type="button"
                  onClick={() => { closeExpand(); onCardClick(expanded.id); }}
                >
                  View detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
