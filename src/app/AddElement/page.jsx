"use client";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import React, { useState } from "react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "@/common/fonts.css";
import "@/common/spacing.css";
import "@/common/buttons.css";
import "@/common/radius.css";
import {
  animationOptions,
  elementCategories,
  styleOptions,
} from "@/common/elementOptions";
import "./addElement.css";

const buildPreviewDoc = (html, css, style) => {
  const tw = style === "tailwind" || /class=["'][^"']*(flex|grid|bg-|text-|p-|m-)/.test(html || "");
  return `<!doctype html><html><head>${tw ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}<style>*{box-sizing:border-box;}body{margin:0;height:120px;display:flex;justify-content:center;align-items:center;overflow:hidden;background:transparent;}</style>${css ? `<style>${css}</style>` : ""}</head><body>${html || ""}</body></html>`;
};

const AddElement = () => {
  const [nombre, setNombre] = useState("");
  const [animacion, setAnimacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autorNombre, setAutorNombre] = useState("");
  const [autorLinkedin, setAutorLinkedin] = useState("");
  const [autorPortfolio, setAutorPortfolio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [codigoCSS, setCodigoCSS] = useState("");
  const [codigoHTML, setCodigoHTML] = useState("");
  const [styleSelector, setStyleSelector] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setNombre("");
    setAnimacion("");
    setDescripcion("");
    setAutorNombre("");
    setAutorLinkedin("");
    setAutorPortfolio("");
    setCategoria("");
    setCodigoCSS("");
    setCodigoHTML("");
    setStyleSelector("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const docRef = await addDoc(collection(db, "Elementos"), {
        nombre,
        animacion,
        descripcion,
        autor: [
          {
            nombre: autorNombre,
            linkedin: autorLinkedin,
            portfolio: autorPortfolio,
          },
        ],
        categoria,
        codigoCSS: styleSelector === "tailwind" ? null : codigoCSS,
        codigoHTML: codigoHTML || null,
        style: styleSelector,
        createdAt: serverTimestamp(),
      });
      setMessage({ status: 200, text: "Element added: " + docRef.id });
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage({ status: 400, text: "Error adding element: " + (err.message || err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Messages message={message} onClose={() => setMessage(null)} />

      <div className="addElement_page">
        {/* Info banner */}
        <section className="addElement_hero container">
          <h1>Add yours, with<br />your name on it.</h1>
          <p>
            Here you can add your designs so anyone can use them. As an author
            you will always be recognized - the credit stays with your work.
          </p>
          <ol className="ae_rules">
            <li>Check for errors before uploading.</li>
            <li>Avoid uploading anything that might offend others.</li>
            <li>Any unsuitable content will be removed.</li>
            <li>The base HTML should be vanilla.</li>
          </ol>
        </section>

        {/* Form + Live Preview */}
        <div className="addElement_body">
          <form onSubmit={handleSubmit} className="addElement_form container">
            <section>
              <label htmlFor="name">Element Name *</label>
              <input
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="e.g. Pulse button"
                required
              />
            </section>

            <section>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                minLength={100}
                maxLength={150}
                placeholder="Describe what this element does and when to use it (100–150 characters)"
              />
            </section>

            <fieldset className="author">
              <legend>Author *</legend>
              <div>
                <label htmlFor="author-name">Name *</label>
                <input
                  id="author-name"
                  value={autorNombre}
                  onChange={(e) => setAutorNombre(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="author-linkedin">LinkedIn *</label>
                <input
                  id="author-linkedin"
                  type="text"
                  value={autorLinkedin}
                  onChange={(e) => setAutorLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/your-profile"
                  required
                />
              </div>
              <div>
                <label htmlFor="author-portfolio">Portfolio</label>
                <input
                  id="author-portfolio"
                  type="text"
                  value={autorPortfolio}
                  onChange={(e) => setAutorPortfolio(e.target.value)}
                  placeholder="your-portfolio.com"
                />
              </div>
            </fieldset>

            <div className="ae_selects">
              <section>
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="">-- Select --</option>
                  {elementCategories.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </section>

              <section>
                <label htmlFor="animation">Animation *</label>
                <select
                  id="animation"
                  value={animacion}
                  onChange={(e) => setAnimacion(e.target.value)}
                  required
                >
                  <option value="">-- Select --</option>
                  {animationOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </section>

              <section>
                <label htmlFor="style">Style *</label>
                <select
                  id="style"
                  value={styleSelector}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "tailwind") setCodigoCSS("");
                    setStyleSelector(val);
                  }}
                  required
                >
                  <option value="">-- Select --</option>
                  {styleOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </section>
            </div>

            <div className="code">
              <section>
                <label htmlFor="html-code">HTML *</label>
                <textarea
                  id="html-code"
                  value={codigoHTML}
                  onChange={(e) => setCodigoHTML(e.target.value)}
                  placeholder="<button class=...>Click me</button>"
                />
              </section>

              <section>
                <label htmlFor="css-code">
                  CSS {styleSelector === "css" && "*"}
                </label>
                <textarea
                  id="css-code"
                  value={codigoCSS}
                  onChange={(e) => setCodigoCSS(e.target.value)}
                  disabled={styleSelector === "tailwind"}
                  placeholder={
                    styleSelector === "tailwind"
                      ? "Tailwind Applied — no CSS needed"
                      : "button { ... }"
                  }
                  required={styleSelector === "css"}
                />
              </section>
            </div>

            <div className="ae_actions">
              <button
                type="button"
                disabled={loading}
                className="ae_btn_secondary"
                style={{ borderRadius: "var(--radius-200)" }}
                onClick={resetForm}
              >
                Clear form
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{ borderRadius: "var(--radius-200)" }}
              >
                {loading ? "Saving..." : "Add Element"}
              </button>
            </div>
          </form>

          {/* Live Preview Sidebar */}
          <aside className="addElement_preview_panel">
            <span className="preview_panel_label">How it will appear</span>

            <div className="pv_card_mock">
              {/* Tags */}
              <div className="pv_card_tags">
                {categoria && (
                  <span className="card_tag">{categoria}</span>
                )}
                {styleSelector && (
                  <span className="card_style_tag">{styleSelector.toUpperCase()}</span>
                )}
                {animacion === "animacion" && (
                  <span className="card_anim_tag">Animated</span>
                )}
              </div>

              {/* Preview iframe */}
              <div className="pv_card_iframe_wrapper">
                {codigoHTML ? (
                  <iframe
                    srcDoc={buildPreviewDoc(codigoHTML, codigoCSS, styleSelector)}
                    sandbox="allow-scripts"
                    className="pv_card_iframe"
                    title="live preview"
                    aria-label="Live preview of element"
                  />
                ) : (
                  <span className="pv_card_placeholder">
                    Your element appears here
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="pv_card_footer">
                <div>
                  <div className="pv_card_name">{nombre || "Your element name"}</div>
                  <div className="pv_card_author">
                    By {autorNombre || "your name"}
                  </div>
                </div>
                <button className="card_copy_btn"  type="button">
                  Copy code
                </button>
              </div>
            </div>

            <p className="preview_panel_note">
              This card updates as you fill the form. The preview shows an approximation — the final result may differ.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddElement;
