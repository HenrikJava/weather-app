import React, {useContext} from 'react'
import {WeatherContext} from '../../shared/global/provider/AppProvider'
import {DailyWeatherOverview} from './DailyWeatherOverview'
import './ForeCastWeather.css'
export const ForeCastWeather = () => {
    const [weather] = useContext(WeatherContext)
    const weatherAtMiddleOfDay =weather.list.filter(partOfDay => partOfDay.dt_txt.includes('12:00:00'))

    return(
        <div className="fore-cast-wrapper">
        {weatherAtMiddleOfDay.map(day =>  
            <DailyWeatherOverview day={day}  key={day.dt}></DailyWeatherOverview>
        )}
        </div> 

       
    )
}