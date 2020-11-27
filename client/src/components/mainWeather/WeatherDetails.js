import React, { useContext } from "react";
import { DataContext } from "../../shared/global/provider/DataProvider";
import { Typography } from "@material-ui/core";
import "./WeatherDetails.css";
import { ShowDetailsContext } from "../../shared/global/provider/ShowDetailsProvider";
import sunrise from "../../shared/images/sunrise.png";
import sunset from "../../shared/images/sunset.png";
import {calcTime} from '../../shared/global/functions'

import Grid from "@material-ui/core/Grid";
export const WeatherDetails = () => {
  const [data] = useContext(DataContext);
  const [
    showDetails,
    setShowDetails,
    showDetailsDate,
    setShowDetailsDate,
  ] = useContext(ShowDetailsContext);
  console.log(data);

  const getDay = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "short",
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
  const weatherAtCurrentDay = data.list.filter(
    (fragment) => getDay(fragment.dt) === showDetailsDate
  );
  const specificTimes = weatherAtCurrentDay.filter(
    (fragment) => getSpecificTimes(fragment.dt_txt) === true
  );
const getSunTimes = (sunrise) => {
  return new Date(data.city.sunrise*1000).toTimeString().slice(0,6)
}
 console.log(data.city.sunrise*1000);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generateDifferentTimes = () => {

    const array = [];
    for (let index = 0; index < specificTimes.length; index++) {
      array.push(
        <div key={specificTimes[index].dt} className="different-times">
          <Grid item xs={3}>
            <Typography variant="h5">
              {" "}
              {specificTimes[index].dt_txt.slice(11, 13)}{" "}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img
              className="details-weather-icon"
              src={`http://openweathermap.org/img/wn/${specificTimes[index].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            ></img>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">
              {Math.round(specificTimes[index].main.temp) + `°`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <p>
              {capitalizeFirstLetter(
                specificTimes[index].weather[0].description
              )}
            </p>
          </Grid>
        </div>
      );
    }
    return array;
  };
  const generateDayStatistic = () => {
    return (
      <Grid item xs={12} className="suns-inline">
        <Grid item xs={6} >
          <img src={sunrise} alt="sunrise" className="sunUpAndDown" /> 
    <p>{calcTime(data.city.timezone, data.city.sunrise).toTimeString().slice(0,5)}</p>
        </Grid>
        <Grid item xs={6}>
          <img src={sunset} alt="sunset" className="sunUpAndDown"/> 
          <p>{calcTime(data.city.timezone, data.city.sunset).toTimeString().slice(0,5)}</p></Grid>
      </Grid>
    );
  };
  return (
    <div className="weather-details-wrapper">
      <Typography variant="h5" className="details-header">
        {showDetailsDate}
      </Typography>

      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={4}>
          {" "}
          {generateDayStatistic()}
        </Grid>

        <Grid item xs={4}>
          <div className="weather-at-differents-time-grid">
            {" "}
            {generateDifferentTimes()}
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};
