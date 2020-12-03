import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { UserContext } from "../../shared/global/provider/AppProvider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";
import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const [weather] = useContext(WeatherContext);
  console.log(weather);
  const [
    authenticatedUser,
    setAuthenticatedUser,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
    mail,
    setMail,
    favoriteCity,
    setFavoriteCity,
    celciusOn,
    setcelciusOn,
  ] = useContext(UserContext);
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
        <div>
          <p className="temp">
            {Math.round(weather.list[0].main.temp) + scale(celciusOn)}
          </p>
          <Wind
            speed={weather.list[0].wind.speed}
            deg={weather.list[0].wind.deg}
            celciusOn={celciusOn}
          ></Wind>
        </div>
      </div>
    </div>
  );
};
