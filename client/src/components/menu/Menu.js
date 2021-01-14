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
import InfoIcon from "@material-ui/icons/Info";
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
    user.setPhoto();
    user.setEmail();
    user.setFavouriteCity();
    user.setAvatar();
    user.setAuthenticatedUser();
    history.push(RoutingPath.homeView);
  };
  //If screensize is smaller than 960 the slide-in menu will show
  const showMenu = () => {
    if (window.innerWidth >= 960) {
      app.setMenuOpen(false);
    }
  };
  // A listener which calls the function showMenu everytime user resizes screen
  window.addEventListener("resize", showMenu);

  return (
    <>
      {user.authenticatedUser ? (
        <div className="menu-wrapper">
          <div className="menu-profile">
            <span className="menu-firstname">
              <p>{user.firstname}</p>
            </span>
            {/* If user has uploaded photo show this. Else use the generated gravatar */}
            <img
              src={user.photo ? user.photo : user.avatar}
              alt="profile"
              className="menu-image"
            />
          </div>
          <div
            onClick={() => app.setMenuOpen(!app.menuOpen)}
            className="menu-symbol-icon-wrapper"
          >
            {app.menuOpen ? (
              <CloseIcon id="menu-symbol-icon" />
            ) : (
              <MenuIcon id="menu-symbol-icon" />
            )}
          </div>

          <div
            className={
              app.menuOpen ? "menu-links-wrapper active" : "menu-links-wrapper"
            }
          >
            <Link
              to={RoutingPath.profileView}
              className="menu-link"
              onClick={() => {
                app.setMenuOpen(false);
              }}
            >
              {app.menuOpen ? (
                <p>Profile</p>
              ) : (
                <PersonIcon id="logged-in-icon" />
              )}
            </Link>
            <Link
              to={RoutingPath.settingsView}
              className="menu-link"
              onClick={() => {
                app.setMenuOpen(false);
              }}
            >
              {app.menuOpen ? (
                <p>Settings</p>
              ) : (
                <SettingsIcon id="logged-in-icon" />
              )}
            </Link>
            <Link
              to={RoutingPath.aboutView}
              className="menu-link"
              onClick={() => {
                app.setMenuOpen(false);
              }}
            >
              {app.menuOpen ? <p>About</p> : <InfoIcon id="logged-in-icon" />}
            </Link>
            <span
              onClick={() => {
                logout();
                app.setMenuOpen(false);
                app.setnoCityText("");
              }}
              className="menu-link"
            >
              {app.menuOpen ? (
                <p>Log out</p>
              ) : (
                <ExitToAppIcon id="logged-in-icon" />
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="menu-wrapper">
          <div
            onClick={() => app.setMenuOpen(!app.menuOpen)}
            className="menu-symbol-icon-wrapper"
          >
            {app.menuOpen ? (
              <CloseIcon id="menu-symbol-icon" />
            ) : (
              <MenuIcon id="menu-symbol-icon" />
            )}
          </div>
          <div
            className={
              app.menuOpen ? "menu-links-wrapper active" : "menu-links-wrapper"
            }
          >
            <span
              onClick={() => {
                app.setSignInDialogOpen(true);
                app.setMenuOpen(false);
                app.setnoCityText("");
              }}
              className="menu-link"
            >
              {app.menuOpen ? (
                <p>Log in</p>
              ) : (
                <MeetingRoomIcon id="not-logged-in-icon" />
              )}
            </span>

            <Link
              to={RoutingPath.settingsView}
              className="menu-link"
              onClick={() => {
                app.setMenuOpen(false);
              }}
            >
              {app.menuOpen ? (
                <p>Settings</p>
              ) : (
                <SettingsIcon id="not-logged-in-icon" />
              )}
            </Link>
            <Link
              to={RoutingPath.aboutView}
              className="menu-link"
              onClick={() => {
                app.setMenuOpen(false);
              }}
            >
              {app.menuOpen ? (
                <p>About</p>
              ) : (
                <InfoIcon id="not-logged-in-icon" />
              )}
            </Link>
          </div>
        </div>
      )}
      <SignInDialog></SignInDialog>
      <RegisterDialog></RegisterDialog>
    </>
  );
};
