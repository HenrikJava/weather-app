import React, {useState, createContext} from 'react'

export const SignInDialogContext = createContext()
export const SignInDialogProvider = (props) =>{
    const [signInDialogOpen, setSignInDialogOpen] = useState(false);


    return(
        <SignInDialogContext.Provider value={[signInDialogOpen, setSignInDialogOpen]}>
            {props.children}
        </SignInDialogContext.Provider>
    )}