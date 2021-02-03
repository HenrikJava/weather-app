import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { ProfileView } from "../view/ProfileView";
import { EmptyView } from "../view/EmptyView";
import { SettingsView } from "../view/SettingsView";
import { AboutView } from "../view/AboutView";
import { ForgotView} from '../view/ForgotView'
import { ResetView} from '../view/ResetView'

import { useContext, useEffect } from "react";
import { UserContext, AppContext } from "../shared/global/provider/Provider";
import RoutingPath from "./RoutingPath";
import { loadUser } from "../shared/api/service/UserService";

export const Routing = (props) => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  //If the user are not logged in, the profile view will not display
  const blockRouteIfNotAuthenticated = (navigateToView) => {
    if (!user.authenticatedUser) {
      return EmptyView;
    } else return navigateToView;
  };
  //If the user are logged in, the forgot password and reset password views is not reachable
  const blockRouteIfAuthenticated = (navigateToView) => {
    if (user.authenticatedUser) {
      return HomeView;
    } else return navigateToView;
  };
  //Fetching the user data if there is some
  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await loadUser();
console.log(loggedInUser);
      if (loggedInUser.data.message.msgError === false) {
        app.setFahrenheitOn(
          loggedInUser.data.user.fahrenheit_on
            ? loggedInUser.data.user.fahrenheit_on
            : false
        );
        app.setSwedish(
          loggedInUser.data.user.swedish
            ? loggedInUser.data.user.swedish
            : false
        );
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        if (loggedInUser.data.user.photo) {
          const b64encoded = new Buffer.from(loggedInUser.data.user.photo.data).toString('base64')
          user.setPhoto(`data:image/png;base64,${b64encoded}`);  
          }
        user.setAvatar(loggedInUser.data.user.avatar);
        user.setFavouriteCity(
          loggedInUser.data.user.favourite_city
            ? loggedInUser.data.user.favourite_city
            : ""
        );

        user.setAuthenticatedUser(true);
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
        <Route path={RoutingPath.aboutView} component={AboutView}></Route>
        <Route path={RoutingPath.forgotView} component={blockRouteIfAuthenticated(ForgotView)}></Route>
        <Route path={RoutingPath.resetView} component={blockRouteIfAuthenticated(ResetView)}></Route>

        <Route component={HomeView}></Route>
      </Switch>
    </Router>
  );
};
