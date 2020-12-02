import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { UserContext} from '../shared/global/provider/AppProvider'
import "./SettingsView.css";
export const SettingsView = () => {
  const [authenticatedUser, setAuthenticatedUser,firstname,
    setFirstname,
    lastname,
setLastname,username, setUsername,password, setPassword, mail, setMail,favoriteCity, setFavoriteCity,celciusOn, setcelciusOn] = useContext(UserContext);
  const handleChange = () => {
    setcelciusOn(!celciusOn);
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
          <p>Fahrenheit</p>
          <Switch
            checked={celciusOn}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Celcius</p>
        </Grid>
      </Grid>
    </div>
  );
};
