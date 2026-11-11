import React from "react";
import "./css/filter.css";
import {
  animationOptions,
  elementCategories,
  styleOptions,
} from "@/common/elementOptions";

export const Filter = ({ activeFilters, onToggle, onRemove, onClearAll }) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const isActive = (section, val) =>
    activeFilters && activeFilters[section] && activeFilters[section].has(val);

  return (
    <aside className="filter_container">
      <h2 className="filter_heading">
        Filter Elements
        <button
          className="filter_toggle"
          type="button"
          aria-label={isFilterOpen ? "Collapse filters" : "Expand filters"}
          aria-expanded={isFilterOpen}
          aria-controls="filter_content"
          onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3 6 5 5 5-5" />
          </svg>
        </button>
      </h2>
      <div
        className={`filter_content${isFilterOpen ? "" : " is_collapsed"}`}
        id="filter_content"
      >
        <div className="panel">
          <section className="filter_section">
            <h4>Animation</h4>
            <div className="options">
              {animationOptions.map((option) => (
                <button
                  key={option.value}
                  className={isActive("animacion", option.value) ? "chip active" : "chip"}
                  onClick={() => onToggle("animacion", option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="filter_section">
            <h4>Styles</h4>
            <div className="options">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  className={isActive("style", option.value) ? "chip active" : "chip"}
                  onClick={() => onToggle("style", option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="filter_section">
            <h4>Categories</h4>
            <div className="options">
              {elementCategories.map((option) => (
                <button
                  key={option.value}
                  className={isActive("categoria", option.value) ? "chip active" : "chip"}
                  onClick={() => onToggle("categoria", option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="active_filters">
          <div className="active_header">
            <strong>Active Filters: </strong>
            <div className="active_list">
              {["animacion", "style", "categoria"].map((sec) =>
                Array.from((activeFilters[sec]) || []).map((val) => (
                  <div key={`${sec}-${val}`} className="active_tag">
                    <span className="tag_label">
                      <b style={{color: "var(--accent-100)"}}>{sec}:</b> {val}
                    </span>
                    <button
                      className="remove_tag"
                      onClick={() => onRemove(sec, val)}
                      type="button"
                      aria-label={`Remover filtro ${sec} ${val}`}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
              {(!activeFilters ||
                (!activeFilters.animacion.size &&
                  !activeFilters.style.size &&
                  !activeFilters.categoria.size)) && (
                <p className="no_active">None</p>
              )}
            </div>
          </div>
          <button className="clear_all" onClick={onClearAll} type="button">
            Clear all
          </button>
        </div>
      </div>
    </aside>
  );
};
