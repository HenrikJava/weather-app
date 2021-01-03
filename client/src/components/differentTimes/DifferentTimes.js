import React, { useContext, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";

import "./DifferentTimes.css";

import Grid from "@material-ui/core/Grid";
export const DifferentTimes = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const timesArray = [
    "00:00:00",
    "00:30:00",
    "01:00:00",
    "01:30:00",
    "02:00:00",
    "02:30:00",
    "06:00:00",
    "06:30:00",
    "07:00:00",
    "07:30:00",
    "08:00:00",
    "08:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "18:00:00",
    "18:30:00",
    "19:00:00",
    "19:30:00",
    "20:00:00",
    "20:30:00",
  ];
  const weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const getDayName = (fragment) => {
    return weekday[
      new Date((fragment.dt + weather.weather.city.timezone) * 1000).getUTCDay()
    ];
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

  const weatherAtCurrentDay = weather.weather.list.filter(
    (fragment) => getDayName(fragment) === app.weekday
  );
  const isToday =
    new Date(
      (weatherAtCurrentDay[0].dt + weather.weather.city.timezone) * 1000
    ).getUTCDay() ===
    new Date(Date.now() + weather.weather.city.timezone * 1000).getUTCDay();

  let specificTimes = [];
  let stampAdded = false;
  weatherAtCurrentDay.forEach((timestamp) => {
    if (stampAdded && timestamp.snow) {
      
      specificTimes[specificTimes.length - 1].precipitation += Number(
        timestamp.snow["3h"]
      );

    } 
    if (stampAdded && timestamp.rain) {
      
      specificTimes[specificTimes.length - 1].precipitation += Number(
        timestamp.rain["3h"]
      );

    } 
      if (getSpecificTimes(timestamp.dt_txt) === true) {
        if (timestamp.snow) {
          timestamp.precipitation = Number(timestamp.snow["3h"]);

        } else if (timestamp.rain) {

          timestamp.precipitation = Number(timestamp.rain["3h"]);
        } else {

          timestamp.precipitation = 0;
          
        }
        specificTimes.push(timestamp);
        stampAdded = true;

      } else {
        stampAdded = false;
      }

   
  });

  if (specificTimes.length === 0) {
    specificTimes.push(weatherAtCurrentDay[0]);
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
              {Math.round(specificTimes[index].main.temp) +
                scale(app.fahrenheitOn)}
            </p>
          </Grid>
          <Grid item xs={2}>
            <img
              className="details-weather-icon"
              src={`/icons/${specificTimes[index].weather[0].icon}.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={1}>
            <p>{Math.ceil(specificTimes[index].precipitation) + " mm"}</p>
          </Grid>
          <Grid item xs={4}>
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
      <p className="day-to-display">{isToday ? "Today" : app.weekday}</p>

      <div className="weather-at-differents-time-grid">
        {generateDifferentTimes()}
      </div>
    </div>
  );
};
