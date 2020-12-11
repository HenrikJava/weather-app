import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { AppContext,WeatherContext } from "../shared/global/provider/Provider";
import WeatherService from "../shared/api/service/WeatherService";
import "./SettingsView.css";
export const SettingsView = () => {
  const [weather, setWeather] = useContext(WeatherContext);

  const app = useContext(AppContext);

  const updateWeather = () => {
    WeatherService.searchCity(
      app.city,
     !app.fahrenheitOn
   )
     .then((response) => {setWeather(response.data)})
     .catch((error) => {
       console.log(error);
     });
  }
  const handleChange = () => {
    updateWeather()
    app.setFahrenheitOn(!app.fahrenheitOn);
    
    
  };

  return (
    <div className="settings-view">
      <Grid container id="settings-box">
        <Grid item xs={12} id="settings-header">
          Settings
        </Grid>

        <Grid item xs={6} id="temp-name">
          Temperature:
        </Grid>
        <Grid item xs={6} id="switch">
          <p>Celcius</p>
          <Switch
            checked={app.fahrenheitOn}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Fahrenheit</p>
        </Grid>
      </Grid>
    </div>
  );
};
