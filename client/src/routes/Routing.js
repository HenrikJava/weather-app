import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { ProfileView } from "../view/ProfileView";
import { EmptyView } from "../view/EmptyView";
import { SettingsView } from "../view/SettingsView";
import { useEffect, useContext } from "react";
import { UserContext } from "../shared/global/provider/AppProvider";
import RoutingPath from "./RoutingPath";

export const Routing = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

  const blockRouteIfNotAuthenticated = (navigateToView) => {
    if (!authenticatedUser) {
      return EmptyView;
    } else return navigateToView;
  };
  useEffect(() => {
    setAuthenticatedUser(localStorage.getItem("username"));
  }, []);
  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path={RoutingPath.homeView} component={HomeView}></Route>
        <Route
          path={RoutingPath.profileView}
          component={blockRouteIfNotAuthenticated(ProfileView)}
        ></Route>
        <Route
          path={RoutingPath.settingsView}
          component={blockRouteIfNotAuthenticated(SettingsView)}
        ></Route>

        <Route component={HomeView}></Route>
      </Switch>
    </Router>
  );
};
