import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import WeatherService from "../shared/api/service/WeatherService";
import { UserContext } from "../shared/global/provider/Provider";
import {Error} from "../components/error/Error"
import "./HomeView.css";
export const HomeView = () => {
  const user = useContext(UserContext);
  const [weather, setWeather] = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [error, setError] = useState()

  useEffect(() => {
    WeatherService.searchCity(app.city, user.celciusOn)
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
