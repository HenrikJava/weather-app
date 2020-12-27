import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { DailyWeatherOverview } from "./DailyWeatherOverview";
import "./ForeCastWeather.css";
export const ForeCastWeather = () => {
  const [weather] = useContext(WeatherContext);
  const app = useContext(AppContext);
  let i = 0;

  while (weather.list[i]) {
    if (weather.list[i].dt_txt.includes("12:00:00")) {
      app.isAfternoon = false;
    }
    if (weather.list[i].dt_txt.includes("0:00:00")) break;
    i++;
  }

  let daysAdded = 0;
  let weatherAtMiddleOfDay = [];
  for (let j = 0; j < weather.list.length; j++) {
    if (app.isAfternoon) {
      if (j === 0 || weather.list[j].dt_txt.includes("12:00:00")) {
        weatherAtMiddleOfDay.push(weather.list[j]);
        daysAdded++;
      }
    } else {
      if (weather.list[j].dt_txt.includes("12:00:00")) {
        weatherAtMiddleOfDay.push(weather.list[j]);
        daysAdded++;
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
        ></DailyWeatherOverview>
      ))}
      <Button type="submit" variant="primary" id="back-to-top-button" onClick={() => {
        document.documentElement.scrollTop = 0;
      }}>  <KeyboardArrowUpIcon /></Button>
      
    </div>
  );
};
