import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/AppProvider";
import "./Links.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { SignInDialogContext } from "../../shared/global/provider/AppProvider";
import { SignInDialog } from "../signInDialog/SignInDialog";
import { RegisterDialog } from "../registerDialog/RegisterDialog";
export const Links = () => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const [setSignInDialog, setSignInDialogOpen] = useContext(
    SignInDialogContext
  );
  const history = useHistory();

  const logout = () => {
    setAuthenticatedUser();
    localStorage.removeItem("username");
    history.push(RoutingPath.homeView);
  };
  const getLinks = () => {
    return authenticatedUser ? (
      <div className="links-wrapper">
        <div className="username-image">
          <span className="username">
            <p>{authenticatedUser}</p>
          </span>
          <img
            src="https://www.thispersondoesnotexist.com/image"
            alt="picture"
            className="links-image"
          />
        </div>

        <div className="links-icons">
          <a onClick={() => history.push(RoutingPath.profileView)}>
            <PersonIcon id="icons" />
          </a>
          <a onClick={() => history.push(RoutingPath.settingsView)}>
            <SettingsIcon id="icons" />
          </a>

          <a onClick={() => logout()}>
            <ExitToAppIcon id="icons" />
          </a>
        </div>
      </div>
    ) : (
      <div className="links-wrapper">
        <div className="icons-not-logged-in">
          <a onClick={() => setSignInDialogOpen(true)}>
            <MeetingRoomIcon id="not-logged-in-icons" />
          </a>

          <a onClick={() => history.push(RoutingPath.settingsView)}>
            <SettingsIcon id="not-logged-in-icons" />
          </a>
        </div>
      </div>
    );
  };
  return (
    <>
      {getLinks()}
      <SignInDialog></SignInDialog>
      <RegisterDialog></RegisterDialog>
    </>
  );
};
