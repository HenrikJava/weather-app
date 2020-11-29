import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/UserProvider";
import "./Links.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export const Links = () => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    setAuthenticatedUser();
    localStorage.removeItem("username");
    history.push(RoutingPath.homeView);
  };
  return (
    
      <div className="links-wrapper">
        <div className="username-image"><span className="username">
          <h2>{authenticatedUser}</h2>
        </span><img
          src="https://www.thispersondoesnotexist.com/image"
          alt="picture"
          className="links-image"
        />
        </div>
        
        <div className="links-icons">
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
