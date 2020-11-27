import React, { useContext } from "react";
import { DataContext } from "../../shared/global/provider/DataProvider";
import { Typography } from "@material-ui/core";

import './CurrentWeather.css'

export const CurrentWeather = () => {
  const [data] = useContext(DataContext);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="current-weather-wrapper">
      <Typography variant='h5' className='current-header'>Current weather</Typography>
      <Typography variant="h3">
        {capitalizeFirstLetter(data.list[0].weather[0].description)}
      </Typography>
      <div className="image-and-temp">
      <img className="weather-icon"
        src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="Weather Icon"
      ></img>
      <Typography variant="h1">{Math.round(data.list[0].main.temp)+`°`}</Typography>
      </div>
    </div>
  );
};
