import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { AppContext, UserContext } from "../shared/global/provider/Provider";
import { loadUser } from "../shared/api/service/UserService";
import { updateUserSettings } from "../shared/api/service/UserService";

import "./SettingsView.css";
export const SettingsView = () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState();

  const handleChange = async () => {
    if (!user.authenticatedUser) {
      app.setFahrenheitOn(!app.fahrenheitOn);
    } else {
      const updateResponse = await updateUserSettings({
        email: user.email,
        fahrenheitOn: !app.fahrenheitOn,
      });
      const loggedInUser = await loadUser();

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
      </Grid>
      <p
        className={
          responseMessage === "Account successfully updated."
            ? "update-success update"
            : "update-not-success update"
        }
      >
        {responseMessage}
      </p>
    </div>
  );
};
