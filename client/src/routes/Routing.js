import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { ProfileView } from "../view/ProfileView";
import { EmptyView } from "../view/EmptyView";
import { SettingsView } from "../view/SettingsView";
import {  useContext, useEffect } from "react";
import { UserContext, AppContext } from "../shared/global/provider/Provider";
import RoutingPath from "./RoutingPath";
import {  loadUser } from "../shared/api/service/UserService";


export const Routing = (props) => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  const blockRouteIfNotAuthenticated = (navigateToView) => {
    if (!user.authenticatedUser) {
      return EmptyView;
    } else return navigateToView;
  };
  useEffect(() => {
   
    const fetchData = async () => {
      const loggedInUser = await loadUser();

      if (loggedInUser.data.message.msgError===false) {
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setAvatar(loggedInUser.data.user.avatar);
        user.setAuthenticatedUser(true);
        user.setFavouriteCity(
          loggedInUser.data.user.favourite_city
            ? loggedInUser.data.user.favourite_city
            : ""
        );
        app.setFahrenheitOn(
          loggedInUser.data.user.fahrenheit_on
            ? loggedInUser.data.user.fahrenheit_on
            : false
        );
      } else {
        user.setAuthenticatedUser(false);

      }
    };
    
    fetchData();
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
        <Route path={RoutingPath.settingsView} component={SettingsView}></Route>

        <Route component={HomeView}></Route>
      </Switch>
    </Router>
  );
};
