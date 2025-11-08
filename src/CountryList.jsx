import React, { useState } from "react";
import StateList from "./StateList";

export default function CountryList({
  countries,
  onEditCountry,
  onDeleteCountry,
  onAddState,
  onEditState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
}) {
  const [expandedCountry, setExpandedCountry] = useState(null);

  return (
    <div className="country-list">
      {countries.length === 0 ? (
        <div className="empty">
          No countries yet. Click "Add Country" to begin.
        </div>
      ) : (
        countries.map((country) => (
          <div key={country.id} className="country-card">
            <div className="country-row">
              <div className="country-info">
                <button
                  className="btn tiny"
                  onClick={() =>
                    setExpandedCountry((prev) =>
                      prev === country.id ? null : country.id
                    )
                  }
                >
                  {expandedCountry === country.id ? "▾" : "▸"}
                </button>
                <strong className="country-name">{country.name}</strong>
                <span className="meta">({country.states.length} states)</span>
              </div>

              <div className="actions">
                <button className="btn" onClick={() => onAddState(country.id)}>
                  + State
                </button>
                <button
                  className="btn"
                  onClick={() => onEditCountry(country.id)}
                >
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => onDeleteCountry(country.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedCountry === country.id && (
              <div className="states-area">
                <StateList
                  countryId={country.id}
                  states={country.states}
                  onEditState={onEditState}
                  onDeleteState={onDeleteState}
                  onAddCity={onAddCity}
                  onDeleteCity={onDeleteCity}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
