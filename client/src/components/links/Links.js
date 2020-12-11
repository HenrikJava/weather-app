import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/Provider";
import "./Links.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import {Link} from 'react-router-dom'
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { AppContext } from "../../shared/global/provider/Provider";
import { SignInDialog } from "../signInDialog/SignInDialog";
import { RegisterDialog } from "../registerDialog/RegisterDialog";
import { setAuthToken } from "../../shared/global/functions";
export const Links = () => {
  const user = useContext(UserContext);
  const app = useContext(
    AppContext
  );
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken()
    user.setFirstname()
    user.setLastname()
    user.setEmail()
    user.setFavouriteCity()
    user.setAvatar()
    user.setAuthenticatedUser()
    
    history.push(RoutingPath.homeView);
    
  };
  const getLinks = () => {
    return user.authenticatedUser ? (
      <div className="links-wrapper">
        <div className="username-image">
          <span className="username">
    <p>{user.firstname}</p>
          </span>
          <img
            src={user.avatar}
            alt="profile"
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
          <span onClick={() => app.setSignInDialogOpen(true)}>
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
