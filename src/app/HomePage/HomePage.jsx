"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import Link from "next/link";
import Cards from "@/components/cards/Cards";
import Loader from "@/common/Loaders/Loader";
import "./HomePage.css";

const faqs = [
  {
    q: "How do I add my own element?",
    a: "Go to the Add Element page, fill in your HTML and CSS, choose a category and style, add your author info, and submit. It appears in the library right away.",
  },
  {
    q: "Do I keep the credit for my work?",
    a: "Yes. Every element in PlayBook UI includes the author's name, LinkedIn and portfolio link. The credit is embedded in the card and travels with every copy.",
  },
  {
    q: "Can I use the elements in my own projects?",
    a: "Absolutely. Copy the HTML and CSS, drop it into your project, and you're done. No attribution required in your own code, though it's always appreciated.",
  },
  {
    q: "Which styles can I submit?",
    a: "Plain CSS or Tailwind CSS. Each element belongs to one style category. Mixed styles aren't accepted yet, but that may change as the library grows.",
  },
  {
    q: "What gets removed?",
    a: "Anything that could offend, mislead, or harm. Broken elements, placeholder content, and duplicates may also be removed to keep the library useful.",
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq_item${open ? " open" : ""}`}>
      <button
        type="button"
        className="faq_question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`faq_chevron${open ? " rotated" : ""}`}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </button>
      {open && <p className="faq_answer">{a}</p>}
    </div>
  );
};

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const featuresRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = collection(db, "Elementos");
        const view = await getDocs(q);
        setItems(view.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const section = featuresRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id) => router.push(`/${encodeURIComponent(id)}`);

  const heroPreview = (item) => {
    const tw = /class=["'][^"']*(flex|grid|bg-|text-|p-|m-)/.test(item.codigoHTML || "");
    return `<!doctype html><html><head>${tw ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}<style>*{box-sizing:border-box;}body{margin:0;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;transform:scale(0.8);transform-origin:center;}</style>${item.codigoCSS ? `<style>${item.codigoCSS}</style>` : ""}</head><body>${item.codigoHTML || ""}</body></html>`;
  };

  return (
    <main className="homePage">

      {/* ===== HERO ===== */}
      <section className="hero_section">
        <div className="hero_inner">
          <div className="hero_text">
            <h1>Welcome to PlayBook UI</h1>
            <span>Copy & Keep the credit.</span>
            <p>
              PlayBook UI is a community library of buttons, cards, dropdowns
              and loaders, written in plain CSS or Tailwind. Preview each one
              live, copy the code, or add your own with your name on it.
            </p>
            <div className="hero_ctas">
              <Link href="/PlayBook" className="btn_primary">Browse the library</Link>
              <Link href="/AddElement" className="btn_outline">Add your element</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ===== LIBRARY PREVIEW ===== */}
      <section className="library_section" id="library">
        <div className="library_inner">
          <h2 style={{color: "#0f172a"}}>The library</h2>
          <p>Filter by category, style and motion. Preview each element live, or switch to its code.</p>

          <div className="filter_chips_demo">
            <div className="chips_row">
              {["All", "Buttons", "Cards", "Dropdowns", "Loaders", "Others"].map((c) => (
                <span key={c} className={`chip_demo${c === "All" ? " chip_active" : ""}`}>{c}</span>
              ))}
            </div>
            <div className="chips_row">
              {["Any", "CSS", "Tailwind"].map((s) => (
                <span key={s} className={`chip_demo${s === "Any" ? " chip_active" : ""}`}>{s}</span>
              ))}
              {["Any", "Animated", "Still"].map((s) => (
                <span key={`m-${s}`} className={`chip_demo${s === "Any" ? " chip_active" : ""}`}>{s}</span>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="library_loader"><Loader /></div>
          ) : (
            <>
              <p className="library_count">Showing {Math.min(items.length, 4)} of {items.length} elements</p>
              <div className="library_grid">
                <Cards
                  items={items.slice(0, 4)}
                  onCardClick={handleCardClick}
                  variant="light"
                />
              </div>
            </>
          )}

          <div className="library_cta">
            <Link href="/PlayBook" className="btn_primary">Browse all elements</Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES DARK ===== */}
      <section
        ref={featuresRef}
        className={`features_section${featuresVisible ? " is-visible" : ""}`}
      >
        <div className="features_inner">
          <div className="features_heading">
            <h2>What every<br />element comes with</h2>
            <p>Small, finished pieces you can drop into a project without reading a manual.</p>
          </div>
          <div className="features_grid">
            <div className="feature_item">
              <div className="feature_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="feature_svg_a">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"/>
                </svg>
              </div>
              <div>
                <h3>A live preview</h3>
                <p>See each element move before you copy it. Hover it, click it, toggle it, right on the page.</p>
              </div>
            </div>
            <div className="feature_item">
              <div className="feature_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="feature_svg_b">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 8l-4 4l4 4" className="s1"/>
                  <path d="M17 8l4 4l-4 4" className="s3"/>
                  <path d="M14 4l-4 16"  className="s2"/>
                </svg>
              </div>
              <div>
                <h3>Plain CSS or Tailwind</h3>
                <p>Every element comes in one style and one style only. Filter by style and find the right one for your project.</p>
              </div>
            </div>
            <div className="feature_item">
              <div className="feature_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="feature_svg_c">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
                </svg>
              </div>
              <div>
                <h3>The author&apos;s name</h3>
                <p>Each element lists its author with their LinkedIn and portfolio link, so the credit travels with the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADD ELEMENT ===== */}
      <section className="add_section" id="add">
        <div className="add_inner">
          <div className="add_text">
            <h2>Add yours, with<br />your name on it.</h2>
            <p>Anyone can add a button, card, dropdown or loader. It takes four steps.</p>
            <ol className="add_steps">
              <li>
                <span className="step_num">1</span>
                <div>
                  <strong>Write it</strong>
                  <p>Plain HTML with CSS or Tailwind classes. Test it for errors first.</p>
                </div>
              </li>
              <li>
                <span className="step_num">2</span>
                <div>
                  <strong>Tag it</strong>
                  <p>Pick a category and a style, and say whether it animates.</p>
                </div>
              </li>
              <li>
                <span className="step_num">3</span>
                <div>
                  <strong>Credit it</strong>
                  <p>Add your name, LinkedIn and portfolio so people can find you.</p>
                </div>
              </li>
              <li>
                <span className="step_num">4</span>
                <div>
                  <strong>Share it</strong>
                  <p>Add the element and it joins the library for everyone to use.</p>
                </div>
              </li>
            </ol>
            <Link href="/AddElement" className="btn_dark" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
              Add your element
            </Link>
          </div>

          <div className="add_preview_card">
            <div className="pv_header">
              <span className="card_tag">Preview</span>
              <span className="pv_note">This is how it will look</span>
            </div>
            <div className="pv_iframe_area">
              <span className="pv_placeholder_text">Your element appears here</span>
            </div>
            <div className="pv_footer">
              <div>
                <div className="pv_name">Your element name</div>
                <div className="pv_author">By your name</div>
              </div>
              <button className="card_copy_btn" disabled type="button">Copy code</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq_section" id="faq">
        <div className="faq_inner">
          <div className="faq_header_row">
            <h2>Questions</h2>
            <p>
              Still stuck?{" "}
              <a
                href="https://www.linkedin.com/in/juan-ignacio-errecart"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message me on LinkedIn.
              </a>
            </p>
          </div>
          <div className="faq_list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUTHOR ===== */}
      <section className="author_section" id="about">
        <div className="author_inner">
          <div className="author_text">
            <h2>Built by Juan<br />Ignacio Errecart</h2>
            <p>
              I&apos;m a Frontend developer. I work with React, Next.js, TypeScript
              and Tailwind CSS, and I can take a design from Figma to production
              without a hand-off in the way. PlayBook UI is where I put that work
              in one place.
            </p>
            <ul className="author_features">
              <li>Filtering and search across a growing catalog</li>
              <li>A form that validates and previews as you type</li>
              <li>Community submissions that keep their author credit</li>
              <li>A layout that works at phone width and from the keyboard</li>
            </ul>
            <div className="author_ctas">
              <a
                href="https://www.linkedin.com/in/juan-ignacio-errecart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn_primary"
              >
                Contact me on LinkedIn
              </a>
              <a
                href="https://github.com/errecart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn_ghost"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="author_card">
            <div className="author_card_top">
              <span className="open_badge">Open to work</span>
            </div>
            <div className="author_card_body">
              <div className="author_row">
                <span className="author_label">Role</span>
                <span className="author_value">Frontend developer</span>
              </div>
              <div className="author_row">
                <span className="author_label">Design</span>
                <span className="author_value">UI/UX in Figma</span>
              </div>
              <div className="author_row">
                <span className="author_label">Technologies</span>
                <span className="author_value">React, Next.js, TypeScript, Tailwind CSS</span>
              </div>
              <div className="author_row">
                <span className="author_label">Languages</span>
                <span className="author_value">Spanish, English (B2)</span>
              </div>
              <div className="author_row">
                <span className="author_label">Based in</span>
                <span className="author_value">Argentina GMT-3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
