import React, { useContext } from "react";
import { DataContext } from "../../shared/global/provider/DataProvider";
import { Typography } from "@material-ui/core";
import "./WeatherDetails.css";
import { ShowDetailsContext } from "../../shared/global/provider/ShowDetailsProvider";
import sunrise from "../../shared/images/sunrise.png";
import sunset from "../../shared/images/sunset.png";
import winter from "../../shared/images/winter.jpg"

import { calcTime } from "../../shared/global/functions";

import Grid from "@material-ui/core/Grid";
export const WeatherDetails = () => {
  const [data] = useContext(DataContext);
  const [
    showDetails,
    setShowDetails,
    showDetailsDate,
    setShowDetailsDate,
  ] = useContext(ShowDetailsContext);

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
  const weatherAtCurrentDay = data.list.filter(
    (fragment) => getDay(fragment.dt) === showDetailsDate
  );
  const specificTimes = weatherAtCurrentDay.filter(
    (fragment) => getSpecificTimes(fragment.dt_txt) === true
  );
  const getSunTimes = (sunrise) => {
    return new Date(data.city.sunrise * 1000).toTimeString().slice(0, 6);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generateDifferentTimes = () => {
    const array = [];
    for (let index = 0; index < specificTimes.length; index++) {
      array.push(
        <Grid item xs={12} key={specificTimes[index].dt} className="different-times">
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
        </Grid>
      );
    }
    return array;
  };
  const generateDayStatistic = () => {
    return (
      <Grid item xs={12} className="suns-inline">
        <Grid item xs={6}>
          <img src={sunrise} alt="sunrise" className="sunUpAndDown" />
          <p>
            {calcTime(data.city.timezone, data.city.sunrise)
              .toTimeString()
              .slice(0, 5)}
          </p>
        </Grid>
        <Grid item xs={6}>
          <img src={sunset} alt="sunset" className="sunUpAndDown" />
          <p>
            {calcTime(data.city.timezone, data.city.sunset)
              .toTimeString()
              .slice(0, 5)}
          </p>
        </Grid>
      </Grid>
    );
  };
  const getWeatherAtNoon = () => {
    let noon
    if (showDetails) {
       noon = weatherAtCurrentDay.filter((fragment) =>
        fragment.dt_txt.includes('12:00:00')
      )
      return Math.round(noon[0].main.feels_like) + `°`
     
    }
    else {
      return Math.round(data.list[0].main.feels_like) + `°`
    }
  }
const getDayMax = () => {
  let max = -100
  if (showDetails) {
    weatherAtCurrentDay.forEach((fragment) => {
      if (fragment.main.temp_max > max) {
        max = fragment.main.temp_max
      }
    }
    )
    
  } else { //TODO
  }
  return Math.round(max) + `°`
}
const getDayMin = () => {
  let min = 100
  if (showDetails) {
    weatherAtCurrentDay.forEach((fragment) => {
      if (fragment.main.temp_min < min) {
        min = fragment.main.temp_min
      }
    }
    )
    
  } else {//TODO
  }
  return Math.round(min) + `°`
}
const generateSuggestedClothes = () => {
  return (
  <Grid item xs={12} className="main-container">
    <Grid item xs={3}></Grid>
  <Grid item xs={6} className="clothesAndTemp"><img src={winter} className="clothes-image"/><div className="temperatures"><h3>{showDetails? 'Feels like at 12': 'Feels like now'}</h3>
    <h5>{getWeatherAtNoon()}</h5><h3>Day max:</h3>
    <h5>{getDayMax()}</h5><h3>Day min:</h3>
    <h5>{getDayMin()}</h5></div></Grid>
    <Grid item xs={3}></Grid>
    
  </Grid>)
}

  return (
    <div className="weather-details-wrapper">
      <Typography variant="h5" className="details-header">
        {showDetailsDate}
      </Typography>

      <Grid container>
        <Grid item xs={4} className="details-containers">
          {generateDayStatistic()}
        </Grid>

        <Grid item xs={4} className="details-containers">
          <div className="weather-at-differents-time-grid">
            {generateDifferentTimes()}
          </div>
        </Grid>
        <Grid item xs={4} className="details-containers">
          {generateSuggestedClothes()}
        </Grid>
      </Grid>
    </div>
  );
};
