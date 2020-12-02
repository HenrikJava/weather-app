import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
import "./MaxMin.css";

import winter from "../../shared/images/winter.jpg";

import Grid from "@material-ui/core/Grid";
export const MaxMin = () => {
  const [weather] = useContext(WeatherContext);
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(
    DisplayCurrentContext
  );
  const getDayName = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };

  const weatherAtCurrentDay = weather.list.filter(
    (fragment) => getDayName(fragment.dt) === weekday
  );

  const getWeatherAtNoon = () => {
    let noon;
    if (!displayCurrent) {
      noon = weatherAtCurrentDay.filter((fragment) =>
        fragment.dt_txt.includes("12:00:00")
      );
      if (noon) {
        return Math.round(noon[0].main.feels_like) + `°`;
      } else {
        return "N/A";
      }
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
      <Grid item xs={12} id="clothes-max-min">
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <img src={winter} className="clothes-image" />
        </Grid>
        <Grid item xs={3}>
          <div className="temperatures">
            <h3 className="temp-headers">{!displayCurrent ? "Feels like at 12" : "Feels like now"}</h3>
            <h5 className="temp-degrees">{getWeatherAtNoon()}</h5>
             {!displayCurrent && <div><h3 className="temp-headers">Day max:</h3>
            <h5 className="temp-degrees">{getDayMax()}</h5>
            <h3 className="temp-headers">Day min:</h3>
            <h5 className="temp-degrees">{getDayMin()}</h5></div>}
            
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
        </Grid>
    );
  };

  return generateSuggestedClothes();
};
