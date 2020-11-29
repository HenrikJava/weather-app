import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/WeatherProvider";
import { DisplayCurrentContext } from "../../shared/global/provider/DisplayCurrentProvider";
import "./DifferentTimes.css";

import Grid from "@material-ui/core/Grid";
export const DifferentTimes = () => {
  const [weather] = useContext(WeatherContext);
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(DisplayCurrentContext);
  const getDay = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };
  const timesArray = ["00:00:00", "06:00:00", "12:00:00", "18:00:00"];
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
    (fragment) => getDay(fragment.dt) === weekday
  );
  const specificTimes = weatherAtCurrentDay.filter(
    (fragment) => getSpecificTimes(fragment.dt_txt) === true
  );

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
          <Grid item xs={3}>
            <h5> {specificTimes[index].dt_txt.slice(11, 13)} </h5>
          </Grid>
          <Grid item xs={3}>
            <img
              className="details-weather-icon"
              src={`http://openweathermap.org/img/wn/${specificTimes[index].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={3}>
            <h5 variant="h4">
              {Math.round(specificTimes[index].main.temp) + `°`}
            </h5>
          </Grid>
          <Grid item xs={3}>
            <p>
              {capitalizeFirstLetter(
                specificTimes[index].weather[0].description
              )}
            </p>
          </Grid>
        </Grid>
      );
    }
    return array;
  };

  return (
    <>
      <h4 className="day-to-display">{weekday}</h4>

      <div className="weather-at-differents-time-grid">
        {generateDifferentTimes()}
      </div>
    </>
  );
};
