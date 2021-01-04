import React, { useContext } from "react";
import { UserContext } from "../../shared/global/provider/Provider";
import "./Menu.css";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "../../shared/global/provider/Provider";
import { SignInDialog } from "../signInDialog/SignInDialog";
import { RegisterDialog } from "../registerDialog/RegisterDialog";
import { setAuthToken } from "../../shared/global/functions";
export const Menu = () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken();
    user.setFirstname();
    user.setLastname();
    user.setEmail();
    user.setFavouriteCity();
    user.setAvatar();
    user.setAuthenticatedUser();

    history.push(RoutingPath.homeView);
  };
  const showMenu = () => {
    if (window.innerWidth >= 960) {
      app.setMenuOpen(false)
    }
  }
  window.addEventListener('resize', showMenu)
  const getMenu = () => {
    return user.authenticatedUser ? (
      <div className="menu-container">
        <div className="username-image">
          <span className="username">
            <p>{user.firstname}</p>
          </span>
          <img src={user.avatar} alt="profile" className="menu-image" />
        </div>
<div  onClick={() => app.setMenuOpen(!app.menuOpen)} className="menu-icon-wrapper">
          {app.menuOpen ? <CloseIcon id="menu-icon"/> : <MenuIcon id="menu-icon"/>}
        </div>
        
        <div className={app.menuOpen ? "menu-wrapper active" : "menu-wrapper"}>
        

        <div className="menu">
          <Link to={RoutingPath.profileView} className="menu-item" onClick={() => {app.setMenuOpen(false)}}>
          {app.menuOpen ? (
              <p>Profile</p>
            ) : (
              <PersonIcon id="icon" />
            )}
          </Link>
          <Link to={RoutingPath.settingsView} className="menu-item" onClick={() => {app.setMenuOpen(false)}}>
          {app.menuOpen ? (
              <p>Settings</p>
            ) : (
              <SettingsIcon id="icon" />
              )}
          </Link>
          

          <span
            onClick={() => {
              logout();
              app.setMenuOpen(false)
              app.setnoCityText("");
            }} className="menu-item"
          >{app.menuOpen ? (
            <p>Log out</p>
          ) : (
            <ExitToAppIcon id="icon" />
            )}
          </span>
        </div>
      </div>
      </div>
    ) : (
      <div className="menu-container">
      <div  onClick={() => app.setMenuOpen(!app.menuOpen)} className="menu-icon-wrapper">
          {app.menuOpen ? <CloseIcon id="menu-icon"/> : <MenuIcon id="menu-icon"/>}
        </div>
      <div className={app.menuOpen ? "menu-wrapper active" : "menu-wrapper"}>
        

        <div className="not-logged-in-menu">
          <span
            onClick={() => {
              app.setSignInDialogOpen(true);
              app.setMenuOpen(false)
              app.setnoCityText("");
            }} className="menu-item"
          >
            {app.menuOpen ? (
              <p>Log in</p>
            ) : (
              <MeetingRoomIcon id="not-logged-in-icon" />
            )}
          </span>

          <Link to={RoutingPath.settingsView} className="menu-item" onClick={() => {app.setMenuOpen(false)}}>
            {app.menuOpen ? (
              <p>Settings</p>
            ) : (
              <SettingsIcon id="not-logged-in-icon" />
            )}
          </Link>
        </div>
      </div>
      </div>
    );
  };
  return (
    <>
      {getMenu()}
      <SignInDialog></SignInDialog>
      <RegisterDialog></RegisterDialog>
    </>
  );
};
