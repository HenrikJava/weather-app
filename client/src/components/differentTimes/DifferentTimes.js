import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
import { UserContext } from "../../shared/global/provider/AppProvider";
import {scale} from '../../shared/global/functions'
import "./DifferentTimes.css";

import Grid from "@material-ui/core/Grid";
export const DifferentTimes = () => {
  const [authenticatedUser, setAuthenticatedUser,firstname,
    setFirstname,
    lastname,
setLastname,username, setUsername,password, setPassword, mail, setMail,favoriteCity, setFavoriteCity,celciusOn, setcelciusOn] = useContext(UserContext);
  const [weather] = useContext(WeatherContext);
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(
    DisplayCurrentContext
  );
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
    (fragment) => getDayName(fragment.dt) === weekday
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
            <h3> {specificTimes[index].dt_txt.slice(11, 13)} </h3>
          </Grid>
          <Grid item xs={3}>
            <img
              className="details-weather-icon"
              src={`http://openweathermap.org/img/wn/${specificTimes[index].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={3}>
            <h3>
              {Math.round(specificTimes[index].main.temp) + scale(celciusOn)}
            </h3>
          </Grid>
          <Grid item xs={3}>
            <h4>
              {capitalizeFirstLetter(
                specificTimes[index].weather[0].description
              )}
            </h4>
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
