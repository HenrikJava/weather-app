import React, { useContext } from 'react'
import './NavigationBar.css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {ProfileBar} from '../profile/ProfileBar'
import RoutingPath from '../../routes/RoutingPath'
import { Typography } from '@material-ui/core'
import {SignInDialogContext} from '../../shared/global/provider/SignInDialogProvider'
import { SignInDialog } from '../signInDialog/SignInDialog'
import {RegisterDialogContext} from '../../shared/global/provider/RegisterDialogProvider'
import { RegisterDialog } from '../registerDialog/RegisterDialog'
export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext)
    const [registerDialogOpen, setRegisterDialogOpen] = useContext(RegisterDialogContext)
    return(
        <div className="navigationBarWrapper" >
        <h1 className="appName" onClick={() => history.push(RoutingPath.homeView)}>Weatherprovider</h1>
        <span  className="myProfile">{authenticatedUser? <ProfileBar/> : <Typography className="sign-in" variant="h4" onClick={() => setSignInDialogOpen(true)}>Sign in</Typography> }</span>
        <SignInDialog></SignInDialog>
        <RegisterDialog></RegisterDialog>
        </div>
    )
}