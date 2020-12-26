import React, { useContext } from "react";
import "./NavigationBar.css";
import { useHistory } from "react-router-dom";
import { Menu } from "../menu/Menu";
import RoutingPath from "../../routes/RoutingPath";
import { AppContext } from "../../shared/global/provider/Provider";
import defaultSloth from '../../shared/images/DefaultSloth.png'

export const NavigationBar = () => {
  const history = useHistory();
  const app = useContext(AppContext);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-logo" onClick={() => {
          history.push(RoutingPath.homeView);
          app.setDisplayCurrent(true);
          app.setMenuOpen(false)
          app.setnoCityText('');

        }}><img className="navbar-icon" src={defaultSloth}></img>
      <p
        className="navbar-name"
        
      >
        Sloth weather
      </p></div>
     
      <span className="navbar-menu">
        <Menu />
      </span>
    </div>
  );
};
