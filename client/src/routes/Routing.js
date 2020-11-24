import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {HomeView} from '../view/HomeView'
import { SignInView  } from '../view/SignInView'
import { ProfileView} from '../view/ProfileView'
import { SettingsView} from '../view/SettingsView'
import { RegisterView} from '../view/RegisterView'

import {useEffect, useContext} from 'react'
import {UserContext} from '../shared/global/provider/UserProvider'
import RoutingPath from './RoutingPath'

export const Routing = (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const blockRouteIfAuthenticated = (navigateToView) => {
        return authenticatedUser? HomeView:navigateToView
    }
    const blockRouteIfNotAuthenticated = (navigateToView) => {
        return !authenticatedUser? SignInView: navigateToView
    }
     useEffect(() => {
        setAuthenticatedUser(localStorage.getItem('username'))
    }, [])
    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path={RoutingPath.signinView}  component={blockRouteIfAuthenticated(SignInView)}></Route>
                <Route exact path={RoutingPath.profileView} component={blockRouteIfNotAuthenticated(ProfileView)}></Route>
                <Route exact path={RoutingPath.settingsView} component={blockRouteIfNotAuthenticated(SettingsView)}></Route>
                <Route exact path={RoutingPath.registerView} component={blockRouteIfNotAuthenticated(RegisterView)}></Route>

                <Route component={HomeView}></Route>
            </Switch>
            </Router>
    )
}