import React, { useContext } from 'react'
import './NavigationBar.css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/AppProvider'
import {Links} from '../links/Links'
import RoutingPath from '../../routes/RoutingPath'
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
import {SignInDialogContext} from '../../shared/global/provider/AppProvider'
import { SignInDialog } from '../signInDialog/SignInDialog'
import { RegisterDialog } from '../registerDialog/RegisterDialog'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser] = useContext(UserContext)
    const [setSignInDialog, setSignInDialogOpen] = useContext(SignInDialogContext)
    const [displayCurrent, setDisplayCurrent] = useContext(DisplayCurrentContext)

    return(
        <div className="navigation-bar-wrapper" >

        <h1 className="app-name" onClick={() => { return history.push(RoutingPath.homeView), setDisplayCurrent(true)}}>Zebra weather</h1>
        <span className="links">{authenticatedUser? <Links/> : <MeetingRoomIcon id="sign-in-icon" onClick={() => setSignInDialogOpen(true)}/> }</span>
        <SignInDialog></SignInDialog>
        <RegisterDialog></RegisterDialog>
        </div>
    )
}