import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/UserProvider";
import "./ProfileBar.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import { Typography } from "@material-ui/core";

export const ProfileBar = () => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    setAuthenticatedUser();
    localStorage.removeItem("username");
    history.push(RoutingPath.homeView);
  };
  return (
    
      <div className="profile-wrapper">
        <img
          src="https://www.thispersondoesnotexist.com/image"
          alt="picture"
          className="navbar-img"
        />
        <span className="username">
          <Typography variant="h5">{authenticatedUser}</Typography>
        </span>
        <div className="profile-subBar">
          <a onClick={() => history.push(RoutingPath.profileView)}>
            <Typography variant="h5">Profile</Typography>
          </a>
          <a onClick={() => history.push(RoutingPath.settingsView)}>
            <Typography variant="h5">Settings</Typography>
          </a>

          <a onClick={() => logout()}>
            <Typography variant="h5">Log out</Typography>
          </a>
        </div>
      </div>
   
  );
};
