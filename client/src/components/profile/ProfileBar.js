import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/UserProvider";
import "./ProfileBar.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import { Icon, Typography } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
        <div className="username-image"><span className="username">
          <Typography variant="h5">{authenticatedUser}</Typography>
        </span><img
          src="https://www.thispersondoesnotexist.com/image"
          alt="picture"
          className="navbar-img"
        />
        </div>
        
        <div className="profile-subBar">
          <a onClick={() => history.push(RoutingPath.profileView)} className="links">
            <PersonIcon id="icons"/>
          </a>
          <a onClick={() => history.push(RoutingPath.settingsView)} className="links">
            <SettingsIcon id="icons"/>
          </a>

          <a onClick={() => logout()} className="links">
            <ExitToAppIcon id="icons"/>
          </a>
        </div>
      </div>
   
  );
};
