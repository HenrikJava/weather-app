import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { AppContext, UserContext } from "../shared/global/provider/Provider";
import { loadUser } from "../shared/api/service/UserService";
import { updateUserSettings } from "../shared/api/service/UserService";

import "./SettingsView.css";
import { CircularProgress } from "@material-ui/core";
export const SettingsView = () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const handleChange = async () => {
    setResponseMessage('');
    if (!user.authenticatedUser) {
      app.setFahrenheitOn(!app.fahrenheitOn);
    } else {
      setIsLoading(true)
      const updateResponse = await updateUserSettings({
        email: user.email,
        fahrenheitOn: !app.fahrenheitOn,
      });
      const loggedInUser = await loadUser();
      setIsLoading(false)
      if (updateResponse.data.message.msgError === false) {
        app.setFahrenheitOn(loggedInUser.data.user.fahrenheit_on);
      }
      setResponseMessage(updateResponse.data.message.msgBody);
    }
  };

  return (
    <div className="settings-view">
      <Grid container id="settings-wrapper">
        <Grid item xs={12} id="settings-header">
          Settings
        </Grid>

        <Grid item xs={6} id="settings-field">
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
        {isLoading &&
        <Grid item xs={12} id="settings-progress-wrapper">
                 <CircularProgress id="settings-progress-spinner"></CircularProgress>

      </Grid>
        }
        <p
        className={
          responseMessage === "Account successfully updated."
            ? "settings-update-success settings-update"
            : "settings-update-not-success settings-update"
        }
      >
        {responseMessage}
      </p>
      </Grid>
      
      
    </div>
  );
};
