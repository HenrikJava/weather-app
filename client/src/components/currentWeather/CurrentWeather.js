import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";

import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const [weather] = useContext(WeatherContext);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <h2 id="current-header">Current weather</h2>
      <h1 id="weather-description">{capitalizeFirstLetter(weather.list[0].weather[0].description)}</h1>
      <div className="image-and-temp">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          alt="Weather Icon"
        ></img>
        <h1 className="temp">{Math.round(weather.list[0].main.temp) + `°`}</h1>
      </div>
    </div>
  );
};
