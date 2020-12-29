import React, { useContext, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";

import "./DifferentTimes.css";

import Grid from "@material-ui/core/Grid";
export const DifferentTimes = () => {
  const [weather] = useContext(WeatherContext);
  const app = useContext(AppContext);
  const timesArray = ["00:00:00", "06:00:00", "12:00:00", "18:00:00"];
  const getDayName = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };
  const getSpecificTimes = (time) => {
    let condition = false;
    timesArray.forEach((element) => {
      if (time.includes(element)) {
        condition = true;
      }
    });
    return condition;
  };
  
  
  const weatherAtCurrentDay = weather.list.filter(
    (fragment) => getDayName(fragment.dt) === app.weekday
  );
  
  const isToday =(new Date(weatherAtCurrentDay[0].dt * 1000).toLocaleDateString()===new Date().toLocaleDateString())
  let specificTimes = weatherAtCurrentDay.filter(
    (fragment) => getSpecificTimes(fragment.dt_txt) === true
  );
  if (specificTimes.length===0) {
    specificTimes.push(weatherAtCurrentDay[0])
  }
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generateDifferentTimes = () => {
    const array = [];
    for (let index = 0; index < specificTimes.length; index++) {
      array.push(
        <Grid
          item
          xs={12}
          key={specificTimes[index].dt}
          className="different-times"
        >
          <Grid item xs={2}>
            <p> {specificTimes[index].dt_txt.slice(11, 13)} </p>
          </Grid>
          <Grid item xs={1}>
            <p>
              {Math.round(specificTimes[index].main.temp) + scale(app.fahrenheitOn)}
            </p>
          </Grid>
          <Grid item xs={2}>
            <img
              className="details-weather-icon"
              src={`http://openweathermap.org/img/wn/${specificTimes[index].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={5}>
            <p>
              {capitalizeFirstLetter(
                specificTimes[index].weather[0].description
              )}
            </p>
          </Grid>
          <Grid item xs={2}>
            <Wind
              speed={specificTimes[index].wind.speed}
              deg={specificTimes[index].wind.deg}
              fahrenheitOn={app.fahrenheitOn}
              className="different-wind"
            ></Wind>
          </Grid>
        </Grid>
      );
    }
    return array;
  };

  return (
    <div className="day-details">
      <p className="day-to-display">{isToday? 'Today' :app.weekday}</p>

      <div className="weather-at-differents-time-grid">
        {generateDifferentTimes()}
      </div>
    </div>
  );
};
