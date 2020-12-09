import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/AppProvider";
import "./Links.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import {Link} from 'react-router-dom'
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { SignInDialogContext } from "../../shared/global/provider/AppProvider";
import { SignInDialog } from "../signInDialog/SignInDialog";
import { RegisterDialog } from "../registerDialog/RegisterDialog";
export const Links = () => {
  const user = useContext(UserContext);
  const [setSignInDialog, setSignInDialogOpen] = useContext(
    SignInDialogContext
  );
  const history = useHistory();
  const logout = () => {

    user.setAuthenticatedUser();
    localStorage.removeItem("token");
    history.push(RoutingPath.homeView);
    
  };
  const getLinks = () => {
    return user.authenticatedUser ? (
      <div className="links-wrapper">
        <div className="username-image">
          <span className="username">
            <p>Todo</p>
          </span>
          <img
            src="https://www.thispersondoesnotexist.com/image"
            alt="picture"
            className="links-image"
          />
        </div>

        <div className="links-icons">
          <Link to={RoutingPath.profileView}>
            <PersonIcon id="icons" />
          </Link>
          <Link to={RoutingPath.settingsView}>
            <SettingsIcon id="icons" />
          </Link>

          <span onClick={() => logout()}>
            <ExitToAppIcon id="icons" />
          </span>
        </div>
      </div>
    ) : (
      <div className="links-wrapper">
        <div className="icons-not-logged-in">
          <span onClick={() => setSignInDialogOpen(true)}>
            <MeetingRoomIcon id="not-logged-in-icons" />
          </span>

          <Link to={RoutingPath.settingsView}>
            <SettingsIcon id="not-logged-in-icons" />
          </Link>
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
