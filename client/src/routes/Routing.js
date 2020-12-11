import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { ProfileView } from "../view/ProfileView";
import { EmptyView } from "../view/EmptyView";
import { SettingsView } from "../view/SettingsView";
import { useEffect, useContext } from "react";
import {
  UserContext,
  AppContext,
  WeatherContext,
} from "../shared/global/provider/Provider";
import RoutingPath from "./RoutingPath";
import WeatherService from "../shared/api/service/WeatherService";
import { loadUser } from "../shared/api/service/UserService";
import { Error } from "../components/error/Error";

export const Routing = (props) => {
  const user = useContext(UserContext);
  const [weather, setWeather] = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [error, setError] = useState();

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
        WeatherService.searchCity(
          loggedInUser.data.favourite_city
            ? loggedInUser.data.favourite_city
            : app.city,
          loggedInUser.data.fahrenheit_on ? true : false
        )
          .then((response) => setWeather(response.data))
          .catch((error) => {
            console.log(error);
            setError(true);
          });
      } else {
        WeatherService.searchCity(app.city, app.fahrenheitOn)
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            console.log(error);
            setError(true);
          });
      }
    };

    fetchData();
  }, []);

  const blockRouteIfNotAuthenticated = (navigateToView) => {
    if (!user.authenticatedUser) {
      return EmptyView;
    } else return navigateToView;
  };

  const displayRouter = () => {
    if (weather) {
      return (
        <Router>
          {props.children}
          <Switch>
            <Route
              exact
              path={RoutingPath.homeView}
              component={HomeView}
            ></Route>
            <Route
              path={RoutingPath.profileView}
              component={blockRouteIfNotAuthenticated(ProfileView)}
            ></Route>
            <Route
              path={RoutingPath.settingsView}
              component={SettingsView}
            ></Route>

            <Route component={HomeView}></Route>
          </Switch>
        </Router>
      );
    } else if (error) {
      return <Error></Error>;
    } else return null;
  };

  return displayRouter();
};
