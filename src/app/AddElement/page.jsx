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
      setMessage({ status: 200, text: "Element add: " + docRef.id });
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
      <div className="addElement_container">
        <section className="addElement_info container">
          <h2>Add elements to the Playbook</h2>
          <p>
            Here you can add your designs so anyone can use them. always
            remember that this is for everyone to use, and as an author you will
            be recognized.
          </p>
          <ol>
            <li>
              Always remember to check them for errors before uploading them.
            </li>
            <li>Avoid uploading anything that might offend others.</li>
            <li>Any unsuitable content will be removed.</li>
            <li>Remeber that the base of HTML is vanilla</li>
          </ol>
        </section>
        <form onSubmit={handleSubmit} className="container addElement_form">
          <section>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </section>

          <section>
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              minLength={100}
              maxLength={150}
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
                required
              />
            </div>
            <div>
              <label htmlFor="author-portfolio">Portfolio *</label>
              <input
                id="author-portfolio"
                type="text"
                value={autorPortfolio}
                onChange={(e) => setAutorPortfolio(e.target.value)}
                required
              />
            </div>
          </fieldset>

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
            <label htmlFor="style">Style(CSS) *</label>
            <select
              id="style"
              value={styleSelector}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "tailwind") {
                  setCodigoCSS("");
                }
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

          <div className="code">
            <section>
              <label htmlFor="html-code">HTML *</label>
              <textarea
                id="html-code"
                value={codigoHTML}
                onChange={(e) => setCodigoHTML(e.target.value)}
              />
            </section>

            <section>
              <label htmlFor="css-code">CSS {styleSelector === "css" && "*"}</label>
              <textarea
                id="css-code"
                value={codigoCSS}
                onChange={(e) => setCodigoCSS(e.target.value)}
                disabled={styleSelector === "tailwind"}
                placeholder={
                  styleSelector === "tailwind" ? "Tailwind Applied" : ""
                }
                required={styleSelector === "css"}
              />
            </section>
          </div>

          <button
            type="button"
            disabled={loading}
            style={{ margin: "0px 10px",borderRadius: "var(--radius-200)" }}
            onClick={resetForm}
          >
            Delete All
          </button>
          <button type="submit" disabled={loading} style={{borderRadius: "var(--radius-200)"}}>
            {loading ? "Guardando..." : "Add Element"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default AddElement;
