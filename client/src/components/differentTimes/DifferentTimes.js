import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { calcTime, scale } from "../../shared/global/functions";
import { Wind } from "../wind/Wind";

import "./DifferentTimes.css";

import Grid from "@material-ui/core/Grid";
export const DifferentTimes = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  /* Because the weatherdata brings timestamps every third hour 
  this array narrows it down to every sixth hour. And because of
  the timezones it contains more timestamps than the four (01,07,13,19)
  displayed on the page. To get for example (01) timestamp the array 
  includes the timestamps (00.00, 00.30, 01.00, 01.30, 02.00, 02.30) to 
  approximate get the (01) timestamp in specific city.*/
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
  //Array needed because the "getUTCDay" returns a day number.
  const weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  const swedishWeekday = [];
  swedishWeekday[0] = "Söndag";
  swedishWeekday[1] = "Måndag";
  swedishWeekday[2] = "Tisdag";
  swedishWeekday[3] = "Onsdag";
  swedishWeekday[4] = "Torsdag";
  swedishWeekday[5] = "Fredag";
  swedishWeekday[6] = "Lördag";

  
  //This function is a filter function using the long timesarray
  const getTimesToDisplay = (time) => {
    let condition = false;
    timesArray.forEach((element) => {
      if (time.includes(element)) {
        condition = true;
      }
    });
    return condition;
  };
  /*variable is a result of filtering the weather data to only contain
the day the component will show*/
  const weatherAtCurrentDay = weather.weather.list.filter(
    (fragment) => new Date((fragment.dt + weather.weather.city.timezone) * 1000).getUTCDay() === app.weekday
  );
  /*variable to keep track if the day to display actually is current day */
  const isToday =
    new Date(
      (weatherAtCurrentDay[0].dt + weather.weather.city.timezone) * 1000
    ).getUTCDay() ===
    new Date(Date.now() + weather.weather.city.timezone * 1000).getUTCDay();

  let timesToDisplay = [];
  /* Because the component only displays every sixth hour this loop
  adding the outfiltered timestamps precipitation and then adds it
  to the display array*/
  let stampAdded = false;
  weatherAtCurrentDay.forEach((timestamp) => {
    if (stampAdded && timestamp.snow) {
      timesToDisplay[timesToDisplay.length - 1].precipitation += Number(
        timestamp.snow["3h"]
      );
    }
    if (stampAdded && timestamp.rain) {
      timesToDisplay[timesToDisplay.length - 1].precipitation += Number(
        timestamp.rain["3h"]
      );
    }
    if (getTimesToDisplay(timestamp.dt_txt) === true) {
      if (timestamp.snow) {
        timestamp.precipitation = Number(timestamp.snow["3h"]);
      } else if (timestamp.rain) {
        timestamp.precipitation = Number(timestamp.rain["3h"]);
      } else {
        timestamp.precipitation = 0;
      }
      timesToDisplay.push(timestamp);
      stampAdded = true;
    } else {
      stampAdded = false;
    }
  });
  /* If the user search late at night(after 18-21) there is no todays
weather and this if statement adds the next timestamp(last of the day)
of the weatherdata and the user will be able to see this with 
associated precipitation.*/
  if (timesToDisplay.length === 0) {
    timesToDisplay.push(weatherAtCurrentDay[0]);
    if (timesToDisplay[0].snow) {
      timesToDisplay[0].precipitation = Number(timesToDisplay[0].snow["3h"]);
    } else if (timesToDisplay[0].rain) {
      timesToDisplay[0].precipitation = Number(timesToDisplay[0].rain["3h"]);
    } else {
      timesToDisplay[0].precipitation = 0;
    }
  }

  const capitalizeFirstLetter = (weatherDescription) => {
    return (
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
    );
  };
  const generateDifferentTimes = () => {
    const array = [];
    for (let index = 0; index < timesToDisplay.length; index++) {
      array.push(
        <Grid
          item
          xs={12}
          key={timesToDisplay[index].dt}
          className="different-times"
        >
          <Grid item xs={2}>
            <p> {app.swedish ? timesToDisplay[index].dt_txt.slice(11, 16) : calcTime(weather.weather.city.timezone, timesToDisplay[index].dt)
              .toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })}</p>
          </Grid>
          <Grid item xs={1}>
            <p>
              {Math.round(timesToDisplay[index].main.temp) +
                scale(app.fahrenheitOn)}
            </p>
          </Grid>
          <Grid item xs={2}>
            <img
              className="details-weather-icon"
              src={`/icons/${timesToDisplay[index].weather[0].icon}.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={1}>
            <p>{Math.ceil(timesToDisplay[index].precipitation) + " mm"}</p>
          </Grid>
          <Grid item xs={5}>
            <p>
              {capitalizeFirstLetter(
                timesToDisplay[index].weather[0].description
              )}
            </p>
          </Grid>
          <Grid item xs={2}>
            <Wind
              speed={timesToDisplay[index].wind.speed}
              deg={timesToDisplay[index].wind.deg}
              fahrenheitOn={app.fahrenheitOn}
              id="different-wind"
            ></Wind>
          </Grid>
        </Grid>
      );
    }
    return array;
  };

  return (
    <div className="day-details">
      <p className="day-to-display">{app.swedish ? isToday ? "Idag" : swedishWeekday[app.weekday] : isToday ? "Today" : weekday[app.weekday]}</p>

      <div className="weather-at-differents-time-grid">
        {generateDifferentTimes()}
      </div>
    </div>
  );
};
