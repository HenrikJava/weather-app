import React, { useContext } from 'react'
import './NavigationBar.css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {ProfileBar} from '../profile/ProfileBar'
import RoutingPath from '../../routes/RoutingPath'
import { Typography } from '@material-ui/core'
import { ShowDetailsContext } from "../../shared/global/provider/ShowDetailsProvider";

import {SignInDialogContext} from '../../shared/global/provider/SignInDialogProvider'
import { SignInDialog } from '../signInDialog/SignInDialog'
import {RegisterDialogContext} from '../../shared/global/provider/RegisterDialogProvider'
import { RegisterDialog } from '../registerDialog/RegisterDialog'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext)
    const [registerDialogOpen, setRegisterDialogOpen] = useContext(RegisterDialogContext)
    const [showDetails, setShowDetails,showDetailsDate, setShowDetailsDate] = useContext(ShowDetailsContext)

    return(
        <div className="navigationBarWrapper" >
        <h1 className="appName" onClick={() => { return history.push(RoutingPath.homeView), setShowDetails(false)}}>Zebra weather</h1>
        <span  className="myProfile">{authenticatedUser? <ProfileBar/> : <MeetingRoomIcon id="sign-in" variant="h4" onClick={() => setSignInDialogOpen(true)}/> }</span>
        <SignInDialog></SignInDialog>
        <RegisterDialog></RegisterDialog>
        </div>
    )
}