import React from "react";
import { Typography } from "@material-ui/core";
import "./DailyWeather.css";
export const DailyWeather = (props) => {
  console.log(props);

  const getDay = (date) => {
    return new Date(props.day.dt * 1000).toLocaleString("en-us", {
      weekday: "short",
    });
  };

  return (
    <div className="daily-weather">
      <h1 className="weekday">{getDay()}</h1>
<div className="image-and-temp"><img
        src={`http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        style={{ width: "15vh" }}
      ></img>
      <Typography variant="h2">{Math.round(props.day.main.temp)+`°`}</Typography></div>
      
    </div>
  );
};
