import React, {useState, createContext} from 'react'

export const UserContext = createContext()
export const UserProvider = (props) =>{
    const [authenticatedUser, setAuthenticatedUser] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [mail, setMail] = useState();
    const [favoriteCity, setFavoriteCity] = useState();



    return(
        <UserContext.Provider value={[authenticatedUser, setAuthenticatedUser,username, setUsername,password, setPassword, mail, setMail,favoriteCity, setFavoriteCity]}>
            {props.children}
        </UserContext.Provider>
    )
}