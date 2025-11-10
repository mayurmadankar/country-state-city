import React, { useState, useEffect } from "react";
import { uid, saveToStorage, loadFromStorage } from "./utils";
import CountryList from "./CountryList";

function App() {
  const [countries, setCountries] = useState(() => {
    const stored = loadFromStorage();
    if (stored) return stored;
    return [
      {
        id: uid("c_"),
        name: "India",
        states: [
          {
            id: uid("s_"),
            name: "Maharashtra",
            cities: [
              { id: uid("ct_"), name: "Mumbai" },
              { id: uid("ct_"), name: "Pune" },
            ],
          },
        ],
      },
    ];
  });

  useEffect(() => {
    saveToStorage(countries);
  }, [countries]);

  function addCountry() {
    const name = prompt("Enter new country name:");
    if (!name) return;
    const newCountry = { id: uid("c_"), name: name.trim(), states: [] };
    setCountries((prev) => [newCountry, ...prev]);
  }

  function editCountry(countryId) {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    const newName = prompt("Edit country name:", country.name);
    if (newName === null) return;
    if (!newName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    if (
      !window.confirm(
        `Update country "${country.name}" to "${newName.trim()}"?`
      )
    )
      return;

    setCountries((prev) =>
      prev.map((c) => (c.id === countryId ? { ...c, name: newName.trim() } : c))
    );
  }

  function deleteCountry(countryId) {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    if (
      !window.confirm(
        `Delete country "${country.name}" and all its states & cities?`
      )
    )
      return;
    setCountries((prev) => prev.filter((c) => c.id !== countryId));
  }
  function addState(countryId) {
    const stateName = prompt("Enter state name:");
    if (!stateName) return;
    const addNow = window.confirm(
      "Do you want to add cities to this state now?"
    );
    const newState = { id: uid("s_"), name: stateName.trim(), cities: [] };

    if (addNow) {
      while (true) {
        const cityName = prompt(
          "Enter city name (leave blank or Cancel to stop):"
        );
        if (!cityName) break;
        newState.cities.push({ id: uid("ct_"), name: cityName.trim() });
      }
    }
    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId ? { ...c, states: [newState, ...c.states] } : c
      )
    );
  }
  function editState(countryId, stateId) {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    const state = country.states.find((s) => s.id === stateId);
    if (!state) return;
    const newName = prompt("Edit state name:", state.name);
    if (newName === null) return;
    if (!newName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    if (!window.confirm(`Update state "${state.name}" to "${newName.trim()}"?`))
      return;

    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === stateId ? { ...s, name: newName.trim() } : s
              ),
            }
          : c
      )
    );
  }

  function deleteState(countryId, stateId) {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    const state = country.states.find((s) => s.id === stateId);
    if (!state) return;
    if (!window.confirm(`Delete state "${state.name}" and all its cities?`))
      return;

    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId
          ? { ...c, states: c.states.filter((s) => s.id !== stateId) }
          : c
      )
    );
  }

  function addCity(countryId, stateId) {
    const name = prompt("Enter city name:");
    if (!name) return;
    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === stateId
                  ? {
                      ...s,
                      cities: [
                        { id: uid("ct_"), name: name.trim() },
                        ...s.cities,
                      ],
                    }
                  : s
              ),
            }
          : c
      )
    );
  }

  function deleteCity(countryId, stateId, cityId) {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    const state = country.states.find((s) => s.id === stateId);
    if (!state) return;
    const city = state.cities.find((ct) => ct.id === cityId);
    if (!city) return;
    if (!window.confirm(`Delete city "${city.name}"?`)) return;

    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === stateId
                  ? { ...s, cities: s.cities.filter((ct) => ct.id !== cityId) }
                  : s
              ),
            }
          : c
      )
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>Country-State-City Manager</h1>
        <p className="subtitle">
          Add / Edit / Delete countries, states and cities.
        </p>
      </header>

      <main>
        <div className="controls">
          <button className="btn primary" onClick={addCountry}>
            + Add Country
          </button>
          <button
            className="btn secondary"
            onClick={() => {
              if (
                window.confirm("Reset demo data? This clears all saved data.")
              ) {
                setCountries([]);
                localStorage.removeItem("csc_app_v1");
              }
            }}
          >
            Reset / Clear All
          </button>
        </div>

        <CountryList
          countries={countries}
          onEditCountry={editCountry}
          onDeleteCountry={deleteCountry}
          onAddState={addState}
          onEditState={editState}
          onDeleteState={deleteState}
          onAddCity={addCity}
          onDeleteCity={deleteCity}
        />
      </main>
    </div>
  );
}

export default App;
