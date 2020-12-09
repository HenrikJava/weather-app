import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
import { UserContext } from "../../shared/global/provider/AppProvider";
import { scale } from "../../shared/global/functions";
import "./MaxMin.css";

import winter from "../../shared/images/winter.jpg";

import Grid from "@material-ui/core/Grid";
export const MaxMin = () => {
  const user = useContext(UserContext);
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
        return Math.round(noon[0].main.feels_like) + scale(user.celciusOn);
      } else {
        return "N/A";
      }
    } else {
      return Math.round(weather.list[0].main.feels_like) + scale(user.celciusOn);
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
    }
    return Math.round(max) + scale(user.celciusOn);
  };
  const getDayMin = () => {
    let min = 100;
    if (!displayCurrent) {
      weatherAtCurrentDay.forEach((fragment) => {
        if (fragment.main.temp_min < min) {
          min = fragment.main.temp_min;
        }
      });
    }
    return Math.round(min) + scale(user.celciusOn);
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
            <p className="temp-headers">
              {!displayCurrent ? "Feels like at 12" : "Feels like now"}
            </p>
            <p className="temp-degrees">{getWeatherAtNoon()}</p>
            {!displayCurrent && (
              <div>
                <p className="temp-headers">Day max:</p>
                <p className="temp-degrees">{getDayMax()}</p>
                <p className="temp-headers">Day min:</p>
                <p className="temp-degrees">{getDayMin()}</p>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  };

  return generateSuggestedClothes();
};
