import React, {useContext} from 'react'
import {UserContext} from '../../shared/global/provider/UserProvider'
import './Profile.css'
import {useHistory} from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'

export const Profile =() => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()

    const logout = () =>{
        setAuthenticatedUser()
        localStorage.removeItem('username')
        history.push(RoutingPath.homeView)
    }
    return(
<div>
    <div className="profile-wrapper"><img src="https://www.thispersondoesnotexist.com/image" alt="picture"/>
    <span className="username">{authenticatedUser}</span>
    <div className='profile-dropdown'>
        <a onClick={() => history.push(RoutingPath.profileView)}>
            Profile
        </a>
        <a>Settings</a>
        <a onClick={() => logout()}>Log out</a>
    </div></div>
    
    
</div>
    )
}