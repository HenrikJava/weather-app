import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import {  AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";
import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="current-wrapper">
      <p id="current-header">Current weather</p>
      <p id="weather-description">
        {capitalizeFirstLetter(weather.weather.list[0].weather[0].description)}
      </p>
      <div className="current-image-and-details">
        <img
          className="weather-icon"
          src={`/icons/${weather.weather.list[0].weather[0].icon}.png`}

          alt="Weather Icon"
        ></img>
        <div className="temp-wind">
          <p className="temp">
            {Math.round(weather.weather.list[0].main.temp) + scale(app.fahrenheitOn)}
          </p>
          <Wind
            speed={weather.weather.list[0].wind.speed}
            deg={weather.weather.list[0].wind.deg}
            fahrenheitOn={app.fahrenheitOn}
            className="current-wind"
          ></Wind>
        </div>
      </div>
    </div>
  );
};
