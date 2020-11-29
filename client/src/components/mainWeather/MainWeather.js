import React, { useContext } from "react";
import { CityInfo } from "../cityInfo/CityInfo";
import { CityInput } from "../cityInput/CityInput";
import { CurrentWeather } from "../currentWeather/CurrentWeather";
import { MaxMin } from "../maxMin/MaxMin";
import { SunTimes } from "../sunTimes/SunTimes";
import { DifferentTimes } from "../differentTimes/DifferentTimes";
import { DisplayCurrentContext } from "../../shared/global/provider/DisplayCurrentProvider";

import "./MainWeather.css";
import { Grid } from "@material-ui/core";
export const MainWeather = () => {
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(
    DisplayCurrentContext
  );

  return (
    <div className="main-weather-wrapper">
      <CityInput></CityInput>
      <CityInfo></CityInfo>
      <Grid container className="grid-cointainer">
      <Grid item xs={12}></Grid>
      <Grid item xs={4}>  <SunTimes></SunTimes></Grid>
      <Grid item xs={4}>  {displayCurrent ? <CurrentWeather /> : <DifferentTimes />}</Grid>
      <Grid item xs={4}> <MaxMin></MaxMin></Grid>
      </Grid>
    </div>
  );
};
