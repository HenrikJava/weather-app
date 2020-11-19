import React, { useContext } from 'react'
import './NavigationBar.css'
import  homeImage from '../../shared/images/home.svg'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {Profile} from '../profile/Profile'
import RoutingPath from '../../routes/RoutingPath'
export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
 
    return(
        <div className="navigationBarWrapper">
        <img onClick={() => history.push(RoutingPath.homeView)} src={homeImage} alt="home" className="homeImage"/>
        <h1 className="appName">Väderprognosen</h1>
        <span  className="myProfile">{authenticatedUser? <Profile/> : <p onClick={() => history.push(RoutingPath.signinView)}>Sign in</p> }</span>
        </div>
    )
}