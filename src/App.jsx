import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import sunnyIcon from '../src/assets/img/sun.png'; // Günəşli
import rainIcon from '../src/assets/img/rain.png'; // Tufanlı Yağış
import snowIcon from '../src/assets/img/snow.png'; // Qar
import mistIcon from '../src/assets/img/mist.png'; // Dumanlı
import windIcon from '../src/assets/img/wind.png'; // Külək
import windIcon2 from '../src/assets/img/wind 2.png'; // Külək
import humidityIcon from '../src/assets/img/humidity.png'; // Humidity Icon

const defaultWeather = {
  name: 'City Name',
  main: {
    temp: 0,
    humidity: 0
  },
  wind: {
    speed: 0
  },
  icon: sunnyIcon
};

const App = () => {
  const [searchCityName, setSearchCityName] = useState('');
  const [weatherData, setWeatherData] = useState(defaultWeather);

  const allIcons = {
    '01d': sunnyIcon, // Günəşli gündüz
    '01n': sunnyIcon, // Günəşli gecə
    '10d': rainIcon, // Tufanlı Yağış gündüz
    '10n': rainIcon, // Tufanlı Yağış gecə
    '13d': snowIcon, // Qar gündüz
    '13n': snowIcon, // Qar gecə
    '50d': mistIcon, // Dumanlı gündüz
    '50n': mistIcon, // Dumanlı gecə
    '02d': windIcon2, // Buludlu gündüz
    '02n': windIcon2, // Buludlu gecə
    '03d': windIcon, // Külək gündüz
    '03n': windIcon, // Külək gecə
    '04d': windIcon2, // Buludlu gündüz
    '04n': windIcon2, // Buludlu gecə
    'default': sunnyIcon
  };

  const searchCity = async (city_name) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${import.meta.env.VITE_WEATHER_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        setWeatherData('City not found');
        return;
      }

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || allIcons['default'];

      setWeatherData({
        ...data,
        icon: icon
      });
    } catch {
      setWeatherData('An error occurred while fetching the weather data.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchCityName) {
      searchCity(searchCityName);
      setSearchCityName('');
    } else {
      setWeatherData(defaultWeather);
    }
  };

  return (
    <div>
      <div className='all-div'>
        <div>
          <h1 className='text-center' style={{ color: 'white', fontSize: '80px' }}>Weather App</h1>
          <div className='container mt-4'>
            <div className='weather'>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={searchCityName}
                  onChange={(e) => setSearchCityName(e.target.value)}
                  placeholder="Enter city name"
                />
                <button type="submit"><CiSearch className='search-icon' /></button>
              </form>
            </div>

            <div className='city-weather-information mt-4'>
              <div className='content text-center'>
                <div className='text-center '>
                  <img src={weatherData.icon} alt="Weather Icon" className='image-png' />
                </div>
                <p className='temp'>{Math.round(weatherData.main.temp - 273.15)}°C</p>
                <h1 className='city-name text-center'>{weatherData.name}</h1>

                <div className='text-center speed-and-temp mt-3'>
                  <p>
                    <img src={windIcon} alt="Wind Icon" className='wind-icon me-2' />
                    <span>{weatherData.wind.speed} km/h</span>
                  </p>
                  <p className='d-flex align-items-center'>
                    <span className='d-flex align-items-center me-2'><img src={humidityIcon} alt="Humidity Icon" className='humidity-image' /></span>
                    <span>{weatherData.main.humidity} %</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
