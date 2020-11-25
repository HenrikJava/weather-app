import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../view/HomeView";
import { SignInDialogContext } from "../shared/global/provider/SignInDialogProvider";
import { ProfileView } from "../view/ProfileView";
import { SettingsView } from "../view/SettingsView";
import { RegisterView } from "../view/RegisterView";
import { EmptyView} from "../view/EmptyView"
import { useEffect, useContext } from "react";
import { UserContext } from "../shared/global/provider/UserProvider";
import RoutingPath from "./RoutingPath";

export const Routing = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext);

  const blockRouteIfAuthenticated = (navigateToView) => {
    return authenticatedUser ? HomeView : navigateToView;
  };
  const blockRouteIfNotAuthenticated = (navigateToView) => {
    if (!authenticatedUser) {
      return EmptyView 
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
        {/* <Route
          path={RoutingPath.settingsView}
          component={blockRouteIfNotAuthenticated(SettingsView)}
        ></Route>
        <Route
          path={RoutingPath.registerView}
          component={blockRouteIfAuthenticated(RegisterView)}
        ></Route> */}

        <Route component={HomeView}></Route>
      </Switch>
    </Router>
  );
};
