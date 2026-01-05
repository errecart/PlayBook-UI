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

const PlayBook = () => {
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
    const cat = searchParams?.get("categoria");
    if (cat) {
      setActiveFilters({
        animacion: new Set(),
        style: new Set(),
        categoria: new Set([cat]),
      });
    }
  }, [searchParams]);

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

  const toggleFilter = (section, value) => {
    setActiveFilters((prev) => {
      const next = {
        animacion: new Set(prev.animacion),
        style: new Set(prev.style),
        categoria: new Set(prev.categoria),
      };
      if (next[section].has(value)) {
        next[section].delete(value);
      } else {
        next[section].add(value);
      }
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
    if (!items || items.length === 0) return [];
    const hasAnyFilter =
      activeFilters.animacion.size ||
      activeFilters.style.size ||
      activeFilters.categoria.size;
    if (!hasAnyFilter) return items;

    return items.filter((item) => {
      // Normalize fields - adjust keys if your firestore uses different names
      const anim = (item.animacion ?? "").toString().toLowerCase();
      const style = (item.style ?? item.estilo ?? "").toString();
      const cat = (item.categoria ?? "").toString();

      // animacion
      if (activeFilters.animacion.size) {
        const match = Array.from(activeFilters.animacion).some((val) => {
          const v = val.toString().toLowerCase();
          if (v === "true" || v === "false") return anim === v;
          return false;
        });
        if (!match) return false;
      }

      // style
      if (activeFilters.style.size) {
        const match = Array.from(activeFilters.style).some((val) =>
          style.toLowerCase().includes(val.toString().toLowerCase())
        );
        if (!match) return false;
      }

      // categoria
      if (activeFilters.categoria.size) {
        const match = Array.from(activeFilters.categoria).some((val) =>
          cat.toLowerCase().includes(val.toString().toLowerCase())
        );
        if (!match) return false;
      }

      return true;
    });
  }, [items, activeFilters]);

  const handleCardClick = (id) => {
    router.push(`/${encodeURIComponent(id)}`);
  };

  return (
    <>
      <NavBar />
      <div className="playBook_page container">
        <Filter
          className="filter"
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />
        <div className="playBook_container">
          {loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <p className="no_items">No Elements available.</p>
              ) : (
                <Cards
                  items={filteredItems}
                  onCardClick={handleCardClick}
                  className="card_container"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayBook;
