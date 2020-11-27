import React, {useState, createContext} from 'react'

export const ShowDetailsContext = createContext()
export const ShowDetailsProvider = (props) =>{
    const [showDetails, setShowDetails] = useState();
    const [showDetailsDate, setShowDetailsDate] = useState();


    return(
        <ShowDetailsContext.Provider value={[showDetails, setShowDetails,showDetailsDate, setShowDetailsDate]}>
            {props.children}
        </ShowDetailsContext.Provider>
    )}