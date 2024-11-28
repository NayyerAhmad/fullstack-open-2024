const CountryList = ({ countries, onShowDetails }) => {
    if (countries.length > 10) {
      return <div>Too many matches, please refine your search.</div>;
    }
  
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => onShowDetails(country)}>show</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default CountryList;