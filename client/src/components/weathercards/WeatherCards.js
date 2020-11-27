import React, { useContext, useEffect } from "react";
import { DataContext } from "../../shared/global/provider/DataProvider";
import { CityContext } from "../../shared/global/provider/CityProvider";

import { Card } from "@material-ui/core";
import { MainWeather } from "../mainWeather/MainWeather";
import { ForeCastWeather } from "../forecastWeather/ForeCastWeather";
import WeatherService from "../../shared/api/service/WeatherService";
import "./WeatherCards.css";
export const WeatherCards = () => {
  const [data, setData] = useContext(DataContext);
  const [city, setCity] = useContext(CityContext);

  useEffect(() => {
    fetchDataFromExternalApi();
  }, []);

  const fetchDataFromExternalApi = () => {
    WeatherService.searchCity(city)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  const displayData = () => {
    if (data) {
      return (
        <div className="weather-cards">
          <MainWeather></MainWeather>
          <ForeCastWeather></ForeCastWeather>
        </div>
      );
    }
    else return null
  };
  return ( displayData() )
};
