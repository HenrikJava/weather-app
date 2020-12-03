import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { UserContext } from "../../shared/global/provider/AppProvider";
import { scale } from "../../shared/global/functions";
import {Wind} from '../wind/Wind'
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
      <h2 id="current-header">Current weather</h2>
      <h1 id="weather-description">
        {capitalizeFirstLetter(weather.list[0].weather[0].description)}
      </h1>
      <div className="image-and-details">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          alt="Weather Icon"
        ></img>
        <div>
          <h1 className="temp">
            {Math.round(weather.list[0].main.temp) + scale(celciusOn)}
          </h1>
          <Wind speed={weather.list[0].wind.speed} deg={weather.list[0].wind.deg} celciusOn={celciusOn}></Wind>
        </div>
      </div>
    </div>
  );
};
