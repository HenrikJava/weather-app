import React, { useContext } from "react";
import "./NavigationBar.css";
import { useHistory } from "react-router-dom";
import { Links } from "../links/Links";
import RoutingPath from "../../routes/RoutingPath";
import { AppContext } from "../../shared/global/provider/Provider";
import defaultSloth from '../../shared/images/DefaultSloth.png'

export const NavigationBar = () => {
  const history = useHistory();
  const app = useContext(AppContext);

  return (
    <div className="navigation-bar-wrapper">
     <img id="sloth" src={defaultSloth}></img>
      <h1
        className="app-name"
        onClick={() => {
          history.push(RoutingPath.homeView);
          app.setDisplayCurrent(true);
          app.setnoCityText('');

        }}
      >
        Sloth weather
      </h1>
      <span className="nav-links">
        <Links />
      </span>
    </div>
  );
};
