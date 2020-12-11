import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { ProfileView } from "../view/ProfileView";
import { EmptyView } from "../view/EmptyView";
import { SettingsView } from "../view/SettingsView";
import { useEffect, useContext } from "react";
import { UserContext, AppContext } from "../shared/global/provider/Provider";
import { loadUser } from "../shared/api/service/UserService";
import RoutingPath from "./RoutingPath";

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

      if (loggedInUser) {
        user.setFirstname(loggedInUser.data.firstname);
        user.setLastname(loggedInUser.data.lastname);
        user.setEmail(loggedInUser.data.email);
        user.setAvatar(loggedInUser.data.avatar);
        user.setAuthenticatedUser(true);
        user.setFavouriteCity(
          loggedInUser.data.favourite_city
            ? loggedInUser.data.favourite_city
            : ""
        );
        app.setFahrenheitOn(
          loggedInUser.data.fahrenheit_on
            ? loggedInUser.data.fahrenheit_on
            : false
        );
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
