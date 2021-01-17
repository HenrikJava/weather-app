import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import {
 
  WeatherContext,
} from "../../shared/global/provider/Provider";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { DailyWeatherOverview } from "./DailyWeatherOverview";
import "./ForeCastWeather.css";
export const ForeCastWeather = () => {
  const weather = useContext(WeatherContext);

  let i = 0;
  /* array used for determine which timestamp is the noon timestamp */
  const noonArray = [
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
  ];
  /* array used for determine which timestamp is the midnight timestamp */

  const midNightArray = [
    "22:00:00",
    "22:30:00",
    "23:00:00",
    "23:30:00",
    "00:00:00",
    "00:30:00",
  ];
  /* while looping the weather data it also specify if its afternoon
  used in maxmin component. */
  let isAfternoon = true;
  let beforeMidnight = true;
  while (beforeMidnight) {
    for (let j = 0; j < noonArray.length; j++) {
      // If noon array is found it is not afternoon
      if (weather.weather.list[i].dt_txt.includes(noonArray[j])) {
        isAfternoon = false;
      }
    }
    for (let k = 0; k < midNightArray.length; k++) {
      // If midnight array is found it is afternoon and the loop breaks
      if (weather.weather.list[i].dt_txt.includes(midNightArray[k])) {
        beforeMidnight = false;
      }
    }

    i++;
  }
  /* used in the max min component */
  /* looping to add only the noon timestamp into the array,
  if its afternnon it add the next available timestamp to present
  actual day */
  let weatherAtMiddleOfDay = [];
  for (let j = 0; j < weather.weather.list.length; j++) {
    if (isAfternoon) {
      if (j === 0) {
        weatherAtMiddleOfDay.push(weather.weather.list[j]);
      }
      for (let k = 0; k < noonArray.length; k++) {
        if (weather.weather.list[j].dt_txt.includes(noonArray[k])) {
          weatherAtMiddleOfDay.push(weather.weather.list[j]);
        }
      }
    } else {
      for (let k = 0; k < noonArray.length; k++) {
        if (weather.weather.list[j].dt_txt.includes(noonArray[k])) {
          weatherAtMiddleOfDay.push(weather.weather.list[j]);
        }
      }
    }
    if (weatherAtMiddleOfDay.length === 5) break;
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
        id="back-to-top-icon-wrapper"
        onClick={() => {
          document.documentElement.scrollTop = 0;
        }}
      >
        {" "}
        <KeyboardArrowUpIcon id="back-to-top-icon" />
      </Button>
    </div>
  );
};
