import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../shared/global/provider/WeatherProvider";
import { CityContext } from "../shared/global/provider/CityProvider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import WeatherService from "../shared/api/service/WeatherService";
import "./HomeView.css";
export const HomeView = () => {
  const [weather, setWeather] = useContext(WeatherContext);
  const [city] = useContext(CityContext);

  useEffect(() => {
    fetchDataFromExternalApi();
  }, []);
const fetchDataFromExternalApi = () => {
    WeatherService.searchCity(city)
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  };
  const displayWeather = () => {
    if (weather) {
      return (
        <div className="home-container">
          <MainWeather></MainWeather>
          <ForeCastWeather></ForeCastWeather>
        </div>
      );
    }
    else return null
  };
  return ( displayWeather() )
};
