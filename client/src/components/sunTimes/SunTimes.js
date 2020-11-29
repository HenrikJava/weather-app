import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/WeatherProvider";
import "./SunTimes.css";
import sunrise from "../../shared/images/sunrise.png";
import sunset from "../../shared/images/sunset.png";

import { calcTime } from "../../shared/global/functions";

import Grid from "@material-ui/core/Grid";
export const SunTimes = () => {
  const [weather] = useContext(WeatherContext);

  const generateSunTimes = () => {
    return (
      <Grid item xs={12} className="suns-inline">
        <Grid item xs={6}>
          <img src={sunrise} alt="sunrise" className="sunUpAndDown" />
          <p>
            {calcTime(weather.city.timezone, weather.city.sunrise)
              .toTimeString()
              .slice(0, 5)}
          </p>
        </Grid>
        <Grid item xs={6}>
          <img src={sunset} alt="sunset" className="sunUpAndDown" />
          <p>
            {calcTime(weather.city.timezone, weather.city.sunset)
              .toTimeString()
              .slice(0, 5)}
          </p>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {generateSunTimes()}
    </>
  );
};
