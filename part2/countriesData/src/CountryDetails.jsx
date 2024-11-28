import Weather from './Weather';

const CountryDetails = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} width="100" />
      <Weather city={country.capital} />
    </div>
  );
};

export default CountryDetails;