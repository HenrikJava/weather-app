import React, {useState, createContext} from 'react'

export const DataContext = createContext()
export const DataProvider = (props) =>{
    const [data, setData] = useState();


    return(
        <DataContext.Provider value={[data, setData]}>
            {props.children}
        </DataContext.Provider>
    )}