import React, {useContext} from 'react'
import {WeatherContext} from '../../shared/global/provider/WeatherProvider'
import {Typography} from '@material-ui/core'
import {calcTime} from '../../shared/global/functions'
export const CityInfo = () => {
    const [weather] = useContext(WeatherContext)

    
    return(
        <div><Typography variant="h3">
        {`${weather.city.name}, ${weather.city.country}`}
      </Typography><Typography variant="h6">
        {`The local time in  ${weather.city.name} is ${calcTime(weather.city.timezone).toLocaleString()}`}
      </Typography></div>

    )
}




