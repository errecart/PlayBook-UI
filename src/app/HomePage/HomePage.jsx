"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import CategoryCards from "@/components/cards/CategoryCard";
import Link from "next/link";
import Cards from "@/components/cards/Cards";
import Loader from "@/common/Loaders/Loader";

import "./HomePage.css";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchItems = async () => {
    setLoading(true);
    try {
      let q = collection(db, "Elementos");
      const view = await getDocs(q);
      const data = view.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/${encodeURIComponent(id)}`);
  };

  return (
    <div className="homePage">
      <section className="home_intro container">
        <h1>
          Welcome to <i>PlayBook UI</i>
        </h1>
        <p>
          Quando ambulabat agendis admonere te qualis actio. Si ad corpus, quae
          plerumque Imaginare tecum in balineo quidam aquam fundes aliquod
          discrimen vituperiis usum alii furantur.
        </p>
        <button>
          <Link href="/PlayBook">Get Started</Link>
        </button>
      </section>
      <section className="home_categories container">
        <h2>What you can find</h2>
        <span>See what type of elements we have and their categories</span>
        <div className="category_container">
          <CategoryCards />
        </div>
      </section>
      <section className="home_info container">
        <div>
          <h3>Why to use it</h3>
          <p>
            Quando ambulabat agendis admonere te qualis actio. Si ad corpus,
            quae plerumque Imaginare tecum in balineo quidam aquam fundes
            aliquod discrimen vituperiis usum alii furantur.
          </p>
        </div>
        <div>
          <h3>Always in updates</h3>
          <p>
            Quando ambulabat agendis admonere te qualis actio. Si ad corpus,
            quae plerumque Imaginare tecum in balineo quidam aquam fundes
            aliquod discrimen vituperiis usum alii furantur.
          </p>
        </div>
      </section>
      <section className="home_elements container">
        <h2>Some elements to review</h2>
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <div className="element_preview container">
            <Cards
              items={items.slice(0, 4)}
              onCardClick={handleCardClick}
              className="card_container"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
