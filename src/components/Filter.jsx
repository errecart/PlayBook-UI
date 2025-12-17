import React from "react";
import "./css/filter.css";

export const Filter = ({ activeFilters, onToggle, onRemove, onClearAll }) => {
  const animOptions = ["Yes", "No"];
  const styleOptions = ["CSS", "Tailwind"];
  const categoriaOptions = [
    "Buttons",
    "Modal",
    "Cards",
    "Loaders",
    "Dropdown",
    "Other"
  ];

  const isActive = (section, val) =>
    activeFilters && activeFilters[section] && activeFilters[section].has(val);

  return (
    <aside className="filter_container">
      <h2>Filter Elements</h2>
      <div className="panel">
        <section className="filter_section">
          <h4>Animation</h4>
          <div className="options">
            {animOptions.map((o) => (
              <button
                key={o}
                className={isActive("animacion", o) ? "chip active" : "chip"}
                onClick={() => onToggle("animacion", o)}
                type="button"
              >
                {o}
              </button>
            ))}
          </div>
        </section>

        <section className="filter_section">
          <h4>Styles</h4>
          <div className="options">
            {styleOptions.map((o) => (
              <button
                key={o}
                className={isActive("style", o) ? "chip active" : "chip"}
                onClick={() => onToggle("style", o)}
                type="button"
              >
                {o}
              </button>
            ))}
          </div>
        </section>

        <section className="filter_section">
          <h4>Categories</h4>
          <div className="options categories_options">
            {categoriaOptions.map((o) => (
              <button
                key={o}
                className={isActive("categoria", o) ? "chip active" : "chip"}
                onClick={() => onToggle("categoria", o)}
                type="button"
              >
                {o}
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
    </aside>
  );
};
