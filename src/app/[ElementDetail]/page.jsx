"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "./elementDetail.css";
import "@/common/fonts.css";
import "@/common/spacing.css";
import "@/common/buttons.css";
import "@/common/radius.css";

import Loader from "@/common/Loaders/Loader";
import NavBar from "@/components/NavBar";
import hljs from "highlight.js";



const page = () => {
  const params = useParams();
  const id = params.ElementDetail;

  const [element, setElement] = useState(null);
  const [view, setView] = useState("html");
  const [loading, setLoading] = useState(true);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");



  // FETCH ELEMENT DATA
  useEffect(() => {
    if (!id) return;

    const fetchElement = async () => {
      try {
        const docRef = doc(db, "Elementos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setElement({ id: docSnap.id, ...docSnap.data() });
        } else {
          setElement(null);
        }
      } catch (err) {
        console.error("Error fetching element:", err);
        setElement(null);
      } finally {
        setLoading(false);
      }
    };
    fetchElement();
  }, [id]);

  useEffect(() => {
    if (element) {
      setHtmlCode(element.codigoHTML || "");
      setCssCode(element.codigoCSS || "");
    }
  }, [element]);



  // HIGHLIGHT.JS EFFECT
  const htmlRef = useRef(null);
  const cssRef = useRef(null);

useEffect(() => {
  if (view === "html" && htmlRef.current) {
    htmlRef.current.removeAttribute("data-highlighted");
    hljs.highlightElement(htmlRef.current);
  }

  if (view === "css" && cssRef.current) {
    cssRef.current.removeAttribute("data-highlighted");
    hljs.highlightElement(cssRef.current);
  }
}, [view, htmlCode, cssCode]);



  const previewContent = `
      <html>
        <head>
          <style>${cssCode}</style>
          
        </head>
        <body style="height:80dvh; overflow:none;display:flex;justify-content:center;align-items:center;">
            ${htmlCode}
        </body>
      </html>
    `;

  if (loading) return <Loader />;
  if (!element) return <div>No se encontró el elemento</div>;
  return (
    <>
      <NavBar />
      <div className="element_container container">
        <section className="element_left">
          <div className="element_header">
            <h2>{element.nombre} - </h2>
            <ul>
              <li>{element.style}</li>
              <li>{element.animacion ? "Animation" : "No-Animation"}</li>
              <li>{element.categoria}</li>
            </ul>
          </div>
          <iframe className="editor" title="preview" srcDoc={previewContent} />
          <div className="description">
            <h3>Description</h3>
            <p>{element.descripcion}</p>
          </div>

          <div className="author">
            <section>
              <p>Author:</p>
              <h4>{element.autor[0].nombre}</h4>
            </section>
            <section>
              <a href={element.autor[0].linkedin} target="_blanck">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
                </svg>
              </a>
              <a href={element.autor[0].portfolio} target="_blanck">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-logs"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 12h.01" />
                  <path d="M4 6h.01" />
                  <path d="M4 18h.01" />
                  <path d="M8 18h2" />
                  <path d="M8 12h2" />
                  <path d="M8 6h2" />
                  <path d="M14 6h6" />
                  <path d="M14 12h6" />
                  <path d="M14 18h6" />
                </svg>
              </a>
            </section>
          </div>
        </section>
        <section className="element_right">
          <section className="section_title">
            <span
              className={view === "html" ? "active" : ""}
              onClick={() => setView("html")}
              style={{ cursor: "pointer" }}
            >
              HTML
            </span>
            <span
              className={view === "css" ? "active" : ""}
              onClick={() => setView("css")}
              style={{
                cursor: element.codigoCSS ? "pointer" : "default",
                display: element.codigoCSS ? "block" : "none",
              }}
            >
              {element.codigoCSS ? "CSS" : ""}
            </span>{" "}
          </section>
          {view === "html" ? (
            <div
              onChange={(e) => setHtmlCode(e.target.value)}
              className="codigo"
            >
              <pre>
                <code ref={htmlRef} className="language-html">
                  {htmlCode}
                </code>
              </pre>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-copy"
                onClick={() => navigator.clipboard.writeText(htmlCode)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
              </svg>
            </div>
          ) : (
            <div
              onChange={(e) => setCssCode(e.target.value)}
              className="codigo"
            >
              <pre>
                <code ref={cssRef} className="language-css">
                  {cssCode}
                </code>
              </pre>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-copy"
                onClick={() => navigator.clipboard.writeText(cssCode)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
              </svg>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default page;
