import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/WeatherProvider";
import { Typography } from "@material-ui/core";

import './CurrentWeather.css'

export const CurrentWeather = () => {
  const [weather] = useContext(WeatherContext);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <Typography variant='h5' className='current-header'>Current weather</Typography>
      <Typography variant="h3">
        {capitalizeFirstLetter(weather.list[0].weather[0].description)}
      </Typography>
      <div>
      <img className="weather-icon"
        src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="Weather Icon"
      ></img>
      <Typography variant="h1">{Math.round(weather.list[0].main.temp)+`°`}</Typography>
      </div>
    </div>
  );
};
