import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'

import {UserContext} from '../shared/global/provider/UserProvider'
export const SignInView = () => {
    const history = useHistory()

    const [loggedInUser, setLoggedInUser] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
const login = () => {
    setAuthenticatedUser(loggedInUser)
    localStorage.setItem('username', loggedInUser)
    history.push('/')
}
    return (
        <div>
            UserName: <input onChange={event=> setLoggedInUser(event.target.value) }/> <br/>
            Password: <input type="password" onChange={event=> setPassword(event.target.value) }/> <br/>
<button onClick={() => login()} >Log in</button>
        </div>

    )
}