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

  const handleChangeScale = async () => {
    setResponseMessage("");
    if (!user.authenticatedUser) {
      app.setFahrenheitOn(!app.fahrenheitOn);
      if (localStorage.getItem("fahrenheitOn")) {
        localStorage.removeItem("fahrenheitOn");
      } else {
        localStorage.setItem("fahrenheitOn", "true");
      }
    } else {
      setIsLoading(true);
      const updateResponse = await updateUserSettings({
        email: user.email,
        fahrenheitOn: !app.fahrenheitOn,
        swedish: app.swedish,
      });
      const loggedInUser = await loadUser();
      setIsLoading(false);
      if (updateResponse.data.message.msgError === false) {
        app.setFahrenheitOn(loggedInUser.data.user.fahrenheit_on);
      }
      if (
        updateResponse.data.message.msgBody ===
          "Account successfully updated." &&
        app.swedish
      ) {
        setResponseMessage("Kontot är nu uppdaterat");
      } else {
        setResponseMessage(updateResponse.data.message.msgBody);
      }
    }
  };
  const handleChangeLanguage = async () => {
    setResponseMessage("");
    if (!user.authenticatedUser) {
      app.setSwedish(!app.swedish);
      if (localStorage.getItem("swedishLanguage")) {
        localStorage.removeItem("swedishLanguage");
      } else {
        localStorage.setItem("swedishLanguage", "true");
      }
    } else {
      setIsLoading(true);
      const updateResponse = await updateUserSettings({
        email: user.email,
        fahrenheitOn: app.fahrenheitOn,
        swedish: !app.swedish,
      });
      const loggedInUser = await loadUser();
      setIsLoading(false);
      if (updateResponse.data.message.msgError === false) {
        app.setSwedish(loggedInUser.data.user.swedish);
      }
      if (
        updateResponse.data.message.msgBody ===
          "Account successfully updated." &&
        !app.swedish
      ) {
        setResponseMessage("Kontot är nu uppdaterat.");
      } else {
        setResponseMessage(updateResponse.data.message.msgBody);
      }
    }
  };
  return (
    <div className="settings-view">
      <Grid container id="settings-wrapper">
        <Grid item xs={12} id="settings-header">
          {app.swedish ? "Inställningar" : "Settings"}
        </Grid>

        <Grid item xs={6} id="settings-field">
          {app.swedish ? "Temperatur" : "Temperature:"}
        </Grid>
        <Grid item xs={6} id="switch">
          <p>Celcius</p>
          <Switch
            checked={app.fahrenheitOn}
            onChange={handleChangeScale}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Fahrenheit</p>
        </Grid>
        <Grid item xs={6} id="settings-field">
          {app.swedish ? "Språk:" : "Language:"}
        </Grid>
        <Grid item xs={6} id="switch">
          <p>English</p>
          <Switch
            checked={app.swedish}
            onChange={handleChangeLanguage}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Svenska</p>
        </Grid>
        {isLoading && (
          <Grid item xs={12} id="settings-progress-wrapper">
            <CircularProgress id="settings-progress-spinner"></CircularProgress>
          </Grid>
        )}
        <p
          className={
            responseMessage === "Account successfully updated." ||
            "Kontot är nu uppdaterat."
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
