import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
        const tempInCelsius = response.data.main.temp - 273.15;  // Convert Kelvin to Celsius
        setWeatherData({
          ...response.data,
          main: {
            ...response.data.main,
            temp: tempInCelsius,
          }
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
