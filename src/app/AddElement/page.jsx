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
      setMessage({ status: 200, text: "Elemento agregado. ID: " + docRef.id });
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage({ status: 400, text: "Error al guardar: " + (err.message || err) });
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
          </ol>
        </section>
        <form onSubmit={handleSubmit} className="container addElement_form">
          <section>
            <label>Name *</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </section>

          <section>
            <label>Descripción *</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              minLength={75}
              maxLength={100}
            />
          </section>

          <fieldset className="author">
            <legend>Author *</legend>
            <div>
              <label>Name *</label>
              <input
                value={autorNombre}
                onChange={(e) => setAutorNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label>LinkedIn *</label>
              <input
                type="text"
                value={autorLinkedin}
                onChange={(e) => setAutorLinkedin(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Portfolio *</label>
              <input
                type="text"
                value={autorPortfolio}
                onChange={(e) => setAutorPortfolio(e.target.value)}
                required
              />
            </div>
          </fieldset>

          <section>
            <label>Category *</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="Buttons">Buttons</option>
              <option value="Dropdowns">Dropdowns</option>
              <option value="Modal">Modal</option>
              <option value="Cards">Cards</option>
              <option value="List">List</option>
              <option value="Loaders">Loaders</option>
              <option value="Title">Title</option>
              <option value="Other">Other</option>
            </select>
          </section>

          <section>
            <label>Animation *</label>
            <select
              value={animacion}
              onChange={(e) => setAnimacion(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="animacion">Animation</option>
              <option value="no-animacion">No-Animation</option>
            </select>
          </section>

          <section>
            <label>Style(CSS) *</label>
            <select
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
              <option value="css">CSS</option>
              <option value="tailwind">Tailwind</option>
            </select>
          </section>

          <div className="code">
            <section>
              <label>HTML *</label>
              <textarea
                value={codigoHTML}
                onChange={(e) => setCodigoHTML(e.target.value)}
              />
            </section>

            <section>
              <label>CSS (code)</label>
              <textarea
                value={codigoCSS}
                onChange={(e) => setCodigoCSS(e.target.value)}
                disabled={styleSelector === "tailwind"}
                placeholder={
                  styleSelector === "tailwind" ? "Tailwind Applied" : ""
                }
              />
            </section>
          </div>

          <button
            type="button"
            disabled={loading}
            style={{ margin: "0px 10px" }}
            onClick={resetForm}
          >
            Delete All
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Add Element"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default AddElement;
