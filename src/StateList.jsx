import React, { useState } from "react";
import CityList from "./CityList";

export default function StateList({
  countryId,
  states,
  onEditState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
}) {
  const [expandedState, setExpandedState] = useState(null);

  return (
    <div className="state-list">
      {states.length === 0 ? (
        <div className="empty">No states yet. Use "+ State" to add one.</div>
      ) : (
        states.map((state) => (
          <div key={state.id} className="state-card">
            <div className="state-row">
              <div className="state-info">
                <button
                  className="btn tiny"
                  onClick={() =>
                    setExpandedState((prev) =>
                      prev === state.id ? null : state.id
                    )
                  }
                >
                  {expandedState === state.id ? "v" : ">"}
                </button>
                <span className="state-name">{state.name}</span>
                <span className="meta">({state.cities.length} cities)</span>
              </div>

              <div className="actions">
                <button
                  className="btn"
                  onClick={() => onAddCity(countryId, state.id)}
                >
                  + City
                </button>
                <button
                  className="btn"
                  onClick={() => onEditState(countryId, state.id)}
                >
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => onDeleteState(countryId, state.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedState === state.id && (
              <div className="cities-area">
                <CityList
                  countryId={countryId}
                  stateId={state.id}
                  cities={state.cities}
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
