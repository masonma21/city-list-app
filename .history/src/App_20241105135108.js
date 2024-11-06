import React, { useState, useEffect } from 'react';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://roots.thecompernolles.com/cities.json')
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
        setLoading(false);
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
    if (sortConfig !== null) {
      sortableCities.sort((a, b) => {
        const aKey = a[sortConfig.key].toLowerCase();
        const bKey = b[sortConfig.key].toLowerCase();
        if (aKey < bKey) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCities;
  }, [filteredCities, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading cities...</div>;
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

        <div className="sorting-buttons">
          <button onClick={() => requestSort('name')}>
            Sort by Name ({sortConfig.key === 'name' ? sortConfig.direction : 'ascending'})
          </button>
          <button onClick={() => requestSort('state')}>
            Sort by State ({sortConfig.key === 'state' ? sortConfig.direction : 'ascending'})
          </button>
        </div>
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
