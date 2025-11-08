export default function CityList({ countryId, stateId, cities, onDeleteCity }) {
  if (!cities || cities.length === 0) {
    return <div className="empty">No cities yet. Click "+ City" to add.</div>;
  }

  return (
    <ul className="city-list">
      {cities.map((city) => (
        <li key={city.id} className="city-row">
          <span>{city.name}</span>
          <div>
            <button
              className="btn danger tiny"
              onClick={() => onDeleteCity(countryId, stateId, city.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
