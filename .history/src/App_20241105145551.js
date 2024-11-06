import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  const handleDisplayCities = () => {
    setLoading(true);
    setShowCities(false);
    fetch('https://roots.thecompernolles.com/cities.json')
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        setTimeout(() => {
          setLoading(false);
          setShowCities(true);
        }, 500);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
        setLoading(false);
      });
  };

  const filteredCities = React.useMemo(() => {
    return cities.filter((city) => {
      return (
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.state.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [cities, query]);

  const sortedCities = React.useMemo(() => {
    let sortableCities = [...filteredCities];
    sortableCities.sort((a, b) => {
      const aKey = a[sortKey].toLowerCase();
      const bKey = b[sortKey].toLowerCase();
      if (aKey < bKey) {
        return sortDirection === 'ascending' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortDirection === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableCities;
  }, [filteredCities, sortKey, sortDirection]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h2>Loading cities...</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!showCities && (
        <div className="intro-container">
          <h1 className="intro-title">List of Cities</h1>
          <button className="display-button" onClick={handleDisplayCities}>
            Display Cities
          </button>
        </div>
      )}

      {showCities && (
        <div className="content-container">
          <div className="controls">
            <h1>List of Cities</h1>
            <input
              type="text"
              placeholder="Filter cities"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="sort-key">
              <label>
                <input
                  type="radio"
                  value="name"
                  checked={sortKey === 'name'}
                  onChange={(e) => setSortKey(e.target.value)}
                />
                Name
              </label>
              <label>
                <input
                  type="radio"
                  value="state"
                  checked={sortKey === 'state'}
                  onChange={(e) => setSortKey(e.target.value)}
                />
                State
              </label>
            </div>

            <button onClick={() => setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')}>
              Sort {sortDirection === 'ascending' ? 'Descending' : 'Ascending'}
            </button>
          </div>

          <div className="city-table-container">
            <table className="city-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {sortedCities.map((city) => (
                  <tr key={city.id}>
                    <td>{city.name}</td>
                    <td>{city.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
