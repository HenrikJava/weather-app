import React, { useContext } from "react";
import "./NavigationBar.css";
import { useHistory } from "react-router-dom";
import { Links } from "../links/Links";
import RoutingPath from "../../routes/RoutingPath";
import { AppContext } from "../../shared/global/provider/Provider";

export const NavigationBar = () => {
  const history = useHistory();
  const app = useContext(AppContext);

  return (
    <div className="navigation-bar-wrapper">
      <h1
        className="app-name"
        onClick={() => {
          history.push(RoutingPath.homeView);
          app.setDisplayCurrent(true);
        }}
      >
        Zebra weather
      </h1>
      <span className="nav-links">
        <Links />
      </span>
    </div>
  );
};
