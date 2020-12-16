import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import {
  AppContext,
  UserContext,
  WeatherContext,
} from "../shared/global/provider/Provider";
import WeatherService from "../shared/api/service/WeatherService";
import { loadUser } from "../shared/api/service/UserService";
import { updateApp } from "../shared/api/service/AppService";

import "./SettingsView.css";
export const SettingsView = () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  const handleChange = async () => {
    if (!user.authenticatedUser) {
      app.setFahrenheitOn(!app.fahrenheitOn);
    } else {
      await updateApp({ email: user.email, fahrenheitOn: !app.fahrenheitOn });
      const loggedInUser = await loadUser();

      if (loggedInUser.data.message.msgError === false) {
        app.setFahrenheitOn(loggedInUser.data.user.fahrenheit_on);
      } else {
        user.setAuthenticatedUser(false);
      }
    }
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
