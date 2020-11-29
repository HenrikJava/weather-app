import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/WeatherProvider";
import { DisplayCurrentContext } from "../../shared/global/provider/DisplayCurrentProvider";
import "./MaxMin.css";

import winter from "../../shared/images/winter.jpg";

import Grid from "@material-ui/core/Grid";
export const MaxMin = () => {
  const [weather] = useContext(WeatherContext);
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(
    DisplayCurrentContext
  );
  const getDay = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };

  const weatherAtCurrentDay = weather.list.filter(
    (fragment) => getDay(fragment.dt) === weekday
  );

  const getWeatherAtNoon = () => {
    let noon;
    if (!displayCurrent) {
      noon = weatherAtCurrentDay.filter((fragment) =>
        fragment.dt_txt.includes("12:00:00")
      );
      return Math.round(noon[0].main.feels_like) + `°`;
    } else {
      return Math.round(weather.list[0].main.feels_like) + `°`;
    }
  };
  const getDayMax = () => {
    let max = -100;
    if (!displayCurrent) {
      weatherAtCurrentDay.forEach((fragment) => {
        if (fragment.main.temp_max > max) {
          max = fragment.main.temp_max;
        }
      });
    } else {
      //TODO
    }
    return Math.round(max) + `°`;
  };
  const getDayMin = () => {
    let min = 100;
    if (!displayCurrent) {
      weatherAtCurrentDay.forEach((fragment) => {
        if (fragment.main.temp_min < min) {
          min = fragment.main.temp_min;
        }
      });
    } else {
      //TODO
    }
    return Math.round(min) + `°`;
  };
  const generateSuggestedClothes = () => {
    return (
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <img src={winter} className="clothes-image" />
        </Grid>
        <Grid item xs={3}>
          <div className="temperatures">
            <h3>{!displayCurrent ? "Feels like at 12" : "Feels like now"}</h3>
            <h5>{getWeatherAtNoon()}</h5>
            <h3>Day max:</h3>
            <h5>{getDayMax()}</h5>
            <h3>Day min:</h3>
            <h5>{getDayMin()}</h5>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  };

  return <>{generateSuggestedClothes()}</>;
};
