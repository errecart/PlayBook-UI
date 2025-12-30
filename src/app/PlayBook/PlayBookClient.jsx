"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

import "@/common/fonts.css";
import "@/common/spacing.css";
import "@/common/buttons.css";
import "@/common/radius.css";
import "./playbook.css";

import Loader from "@/common/Loaders/Loader";
import Cards from "@/components/cards/Cards";
import NavBar from "@/components/NavBar";
import { Filter } from "@/components/Filter";

export default function PlayBookClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    animacion: new Set(),
    style: new Set(),
    categoria: new Set(),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) {
      setActiveFilters({
        animacion: new Set(),
        style: new Set(),
        categoria: new Set([cat]),
      });
    }
  }, [searchParams]);


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const q = collection(db, "Elementos");
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const toggleFilter = (section, value) => {
    setActiveFilters((prev) => {
      const next = {
        animacion: new Set(prev.animacion),
        style: new Set(prev.style),
        categoria: new Set(prev.categoria),
      };

      next[section].has(value)
        ? next[section].delete(value)
        : next[section].add(value);

      return next;
    });
  };

  const removeFilter = (section, value) => {
    setActiveFilters((prev) => {
      const next = {
        animacion: new Set(prev.animacion),
        style: new Set(prev.style),
        categoria: new Set(prev.categoria),
      };
      next[section].delete(value);
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      animacion: new Set(),
      style: new Set(),
      categoria: new Set(),
    });
  };


  const filteredItems = useMemo(() => {
    if (!items.length) return [];

    return items.filter((item) => {
      const anim = String(item.animacion ?? "").toLowerCase();
      const style = String(item.style ?? "").toLowerCase();
      const cat = String(item.categoria ?? "").toLowerCase();

      if (
        activeFilters.animacion.size &&
        !activeFilters.animacion.has(anim)
      )
        return false;

      if (
        activeFilters.style.size &&
        !Array.from(activeFilters.style).some((v) =>
          style.includes(v.toLowerCase())
        )
      )
        return false;

      if (
        activeFilters.categoria.size &&
        !Array.from(activeFilters.categoria).some((v) =>
          cat.includes(v.toLowerCase())
        )
      )
        return false;

      return true;
    });
  }, [items, activeFilters]);


  return (
    <>
      <NavBar />

      <div className="playBook_page container">
        <Filter
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />

        {loading ? (
          <Loader />
        ) : filteredItems.length === 0 ? (
          <p className="no_items">No elements available.</p>
        ) : (
            <article className="playBook_container">
                <Cards
                  items={filteredItems}
                  onCardClick={(id) => router.push(`/element?id=${id}`)}
                />
            </article>
        )}
      </div>
    </>
  );
}
