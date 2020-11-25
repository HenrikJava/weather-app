import React, {useState, createContext} from 'react'

export const RegisterDialogContext = createContext()
export const RegisterDialogProvider = (props) =>{
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);


    return(
        <RegisterDialogContext.Provider value={[registerDialogOpen, setRegisterDialogOpen]}>
            {props.children}
        </RegisterDialogContext.Provider>
    )}