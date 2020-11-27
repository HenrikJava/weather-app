import React, {useContext} from 'react'
import {DataContext} from '../../shared/global/provider/DataProvider'
import {Typography} from '@material-ui/core'
import {calcTime} from '../../shared/global/functions'
export const CityInfo = () => {
    const [data, setData] = useContext(DataContext)

    
    return(
        <div><Typography variant="h3">
        {`${data.city.name}, ${data.city.country}`}
      </Typography><Typography variant="h6">
        {`The local time in  ${data.city.name} is ${calcTime(data.city.timezone).toLocaleString()}`}
      </Typography></div>

    )
}




