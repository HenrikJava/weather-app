import React, { useContext } from "react";
import {
  AppContext,
  WeatherContext,
} from "../../shared/global/provider/Provider";
import "./SunTimes.css";
import sunrise from "../../shared/images/sunrise.png";
import sunset from "../../shared/images/sunset.png";
import { calcTime } from "../../shared/global/functions";
import Grid from "@material-ui/core/Grid";
export const SunTimes = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const generateSunTimes = () => {
    return (
      <Grid item xs={12} className="suns-inner-wrapper">
        <Grid item xs={6}>
          <img src={sunrise} alt="sunrise" className="suns-images" />
          <p>
            {app.swedish
              ? calcTime(
                  weather.weather.city.timezone,
                  weather.weather.city.sunrise
                )
                  .toTimeString()
                  .slice(0, 5)
              : calcTime(
                  weather.weather.city.timezone,
                  weather.weather.city.sunrise
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
          </p>
        </Grid>
        <Grid item xs={6}>
          <img src={sunset} alt="sunset" className="suns-images" />
          <p>
            {app.swedish
              ? calcTime(
                  weather.weather.city.timezone,
                  weather.weather.city.sunset
                )
                  .toTimeString()
                  .slice(0, 5)
              : calcTime(
                  weather.weather.city.timezone,
                  weather.weather.city.sunset
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
          </p>
        </Grid>
      </Grid>
    );
  };

  return generateSunTimes();
};
