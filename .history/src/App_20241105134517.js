import React, { useState, useEffect } from 'react';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

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

  const sortedCities = React.useMemo(() => {
    let sortableCities = [...cities];
    if (sortConfig !== null) {
      sortableCities.sort((a, b) => {
        if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCities;
  }, [cities, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading cities...</div>;
  }

  return (
    <div>
      <h1>List of Cities</h1>
      <button onClick={() => requestSort('name')}>
        Sort by Name ({sortConfig.direction})
      </button>
      <button onClick={() => requestSort('state')}>
        Sort by State ({sortConfig.direction})
      </button>
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
