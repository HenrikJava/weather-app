import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";
import "./CurrentWeather.css";
//This component only displaying the closest "timestamp" in the the weatherdata. 
export const CurrentWeather = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="current-wrapper">
      <p className="current-header">{app.swedish ? 'Vädret just nu' : 'Current weather'}</p>
      <p className="weather-description">
        {capitalizeFirstLetter(weather.weather.list[0].weather[0].description)}
      </p>
      <div className="current-image-and-details">
        <img
          className="current-weather-icon"
          src={`/icons/${weather.weather.list[0].weather[0].icon}.png`}
          alt="Weather Icon"
        ></img>
        <div className="current-temp-wind">
          <p className="current-temp">
            {Math.round(weather.weather.list[0].main.temp) +
              scale(app.fahrenheitOn)}
          </p>
          <Wind
            speed={weather.weather.list[0].wind.speed}
            deg={weather.weather.list[0].wind.deg}
            fahrenheitOn={app.fahrenheitOn}
            id="current-wind"
          ></Wind>
        </div>
      </div>
    </div>
  );
};
