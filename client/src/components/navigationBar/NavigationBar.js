import React, { useContext } from 'react'
import './NavigationBar.css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {Profile} from '../profile/Profile'
import RoutingPath from '../../routes/RoutingPath'
import { Typography } from '@material-ui/core'
export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
 
    return(
        <div className="navigationBarWrapper" >
{/*         <img onClick={() => history.push(RoutingPath.homeView)} src={homeImage} alt="home" className="homeImage"/>
 */}        <h1 className="appName" onClick={() => history.push(RoutingPath.homeView)}>Weatherprovider</h1>
        <span  className="myProfile">{authenticatedUser? <Profile/> : <Typography variant="h4" onClick={() => history.push(RoutingPath.signinView)}>Sign in</Typography> }</span>
        </div>
    )
}