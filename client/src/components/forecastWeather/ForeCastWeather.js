import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { DailyWeatherOverview } from "./DailyWeatherOverview";
import "./ForeCastWeather.css";
export const ForeCastWeather = () => {
  const weather = useContext(WeatherContext);
  let i = 0;
  const noonArray = ["12:00:00","12:30:00", "13:00:00","13:30:00", "14:00:00","14:30:00"];
  const midNightArray = ["22:00:00","22:30:00", "23:00:00","23:30:00", "00:00:00","00:30:00"];
  let isAfternoon = true
  let loopIfTrue = true;
  while (loopIfTrue) {
    for (let j = 0; j < noonArray.length; j++) {
      if (weather.weather.list[i].dt_txt.includes(noonArray[j])) {
isAfternoon = false      }
      for (let k = 0; k < midNightArray.length; k++) {
        if (weather.weather.list[i].dt_txt.includes(midNightArray[k])) {
          loopIfTrue = false;
        }
      }
    }
    i++;
  }
  let daysAdded = 0;
  let weatherAtMiddleOfDay = [];
  for (let j = 0; j < weather.weather.list.length; j++) {
    if (isAfternoon) {
      if (j === 0) {

        weatherAtMiddleOfDay.push(weather.weather.list[j]);
        daysAdded++;
      }
      for (let k = 0; k < noonArray.length; k++) {
        if (weather.weather.list[j].dt_txt.includes(noonArray[k])) {
          weatherAtMiddleOfDay.push(weather.weather.list[j]);
          daysAdded++;
        }
      }
      
    } else {
      for (let k = 0; k < noonArray.length; k++) {
        if (weather.weather.list[j].dt_txt.includes(noonArray[k])) {
          weatherAtMiddleOfDay.push(weather.weather.list[j]);
          daysAdded++;
        }
      }
    }
    if (daysAdded === 5) break;
  }

  return (
    <div className="fore-cast-wrapper">
      {weatherAtMiddleOfDay.map((day, index) => (
        <DailyWeatherOverview
          day={day}
          key={index}
          index={index}
          isAfternoon={isAfternoon}
        ></DailyWeatherOverview>
      ))}
      <Button
        type="submit"
        variant="contained"
        id="back-to-top-button"
        onClick={() => {
          document.documentElement.scrollTop = 0;
        }}
      >
        {" "}
        <KeyboardArrowUpIcon />
      </Button>
    </div>
  );
};
