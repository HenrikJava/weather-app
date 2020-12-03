import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../shared/global/provider/AppProvider";
import { CityContext } from "../shared/global/provider/AppProvider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import WeatherService from "../shared/api/service/WeatherService";
import { UserContext } from "../shared/global/provider/AppProvider";
import {Error} from "../components/error/Error"
import "./HomeView.css";
export const HomeView = () => {
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
  const [weather, setWeather] = useContext(WeatherContext);
  const [city] = useContext(CityContext);
  const [error, setError] = useState()

  useEffect(() => {
    WeatherService.searchCity(city, celciusOn)
      .then((response) => setWeather(response.data))
      .catch((error) => {console.log(error); setError(true)});
  }, []);

  const displayWeather = () => {
    if (weather) {
      return (
        <div className="home-container">
          <MainWeather></MainWeather>
          <ForeCastWeather></ForeCastWeather>
        </div>
      );
    } 
    if (error) return <Error></Error>;
    else return null
  
  };
  return displayWeather();
};
