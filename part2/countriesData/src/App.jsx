import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';
import CountryDetails from './CountryDetails';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Search</h1>
      <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for a country" />
      <CountryList countries={countries} onShowDetails={handleShowDetails} />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
