import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { UserContext, AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";
import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const [weather] = useContext(WeatherContext);
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <p id="current-header">Current weather</p>
      <p id="weather-description">
        {capitalizeFirstLetter(weather.list[0].weather[0].description)}
      </p>
      <div className="image-and-details">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          alt="Weather Icon"
        ></img>
        <div id="temp-wind">
          <p className="temp">
            {Math.round(weather.list[0].main.temp) + scale(app.fahrenheitOn)}
          </p>
          <Wind
            speed={weather.list[0].wind.speed}
            deg={weather.list[0].wind.deg}
            fahrenheitOn={app.fahrenheitOn}
          ></Wind>
        </div>
      </div>
    </div>
  );
};
