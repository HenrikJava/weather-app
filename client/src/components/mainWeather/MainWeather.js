import React, { useContext } from "react";
import { CityInfo } from "../cityInfo/CityInfo";
import { CitySearch } from "../citySearch/CitySearch";
import { CurrentWeather } from "../currentWeather/CurrentWeather";
import { MaxMin } from "../maxMin/MaxMin";
import { SunTimes } from "../sunTimes/SunTimes";
import { DifferentTimes } from "../differentTimes/DifferentTimes";
import { AppContext } from "../../shared/global/provider/Provider";

import "./MainWeather.css";
import { Grid } from "@material-ui/core";
export const MainWeather = () => {
  const app = useContext(AppContext);

  return (
    <div className="main-weather-wrapper">
      <CitySearch></CitySearch>
      <CityInfo></CityInfo>
     {/* This sloth only appear in the mobile version  */ }
      <img src={app.sloth} className="mobile-sloth" alt="clothes" />

      <Grid container id="middle-three-grids-wrapper">
        <Grid item xs={4} id="suns-wrapper">
          <SunTimes></SunTimes>
        </Grid>
        <Grid item xs={4} id="current-different-wrapper">
          {app.displayCurrent ? <CurrentWeather /> : <DifferentTimes />}
        </Grid>
        <Grid item xs={4} id="max-min-wrapper">
          <MaxMin></MaxMin>
        </Grid>
      </Grid>
           {/* This text only appear in the mobile version  */ }

      <p className="mobile-swipe-text">{app.swedish ? 'Svep nedåt för att se fler dagar' : 'Swipe down to see more days'}</p>
    </div>
  );
};
