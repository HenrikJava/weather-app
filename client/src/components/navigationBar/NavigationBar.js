import React, { useContext } from "react";
import "./NavigationBar.css";
import { useHistory } from "react-router-dom";
import { Menu } from "../menu/Menu";
import RoutingPath from "../../routes/RoutingPath";
import { AppContext } from "../../shared/global/provider/Provider";
import defaultSloth from "../../shared/images/sloths/DefaultSloth.png";

export const NavigationBar = () => {
  const history = useHistory();
  const app = useContext(AppContext);

  return (
    <div className="navbar-wrapper">
      <div
        className="navbar-logo-wrapper"
        onClick={() => {
          history.push(RoutingPath.homeView);
          app.setDisplayCurrent(true);
          app.setMenuOpen(false);
          app.setNoCityText("");
          app.setWeekday()
        }}
      >
        <img className="navbar-logo-icon" src={defaultSloth} alt="LogoSloth"></img>
        <p className="navbar-logo-name">Sloth weather</p>
      </div>

      <span className="navbar-menu">
        <Menu />
      </span>
    </div>
  );
};
