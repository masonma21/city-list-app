import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  useEffect(() => {
    // Fetch the data as before
    fetch('https://roots.thecompernolles.com/cities.json')
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        // Add a 0.5-second delay before hiding the loading screen
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
        setLoading(false); // Hide the loading screen immediately on error
      });
  }, []);

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
    <div className="container">
      <h1>List of Cities</h1>

      <div className="controls">
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

      <ul>
        {sortedCities.map((city) => (
          <li key={city.id}>
            {city.name}, {city.state}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
