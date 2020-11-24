import React, {useContext} from 'react'
import {DataContext} from '../../shared/global/provider/DataProvider'
import {DailyWeather} from './DailyWeather'
import './ForeCastWeather.css'
export const ForeCastWeather = () => {
    const [data, setData] = useContext(DataContext)
    const weatherAtMiddleOfDay =data.list.filter(partOfDay => partOfDay.dt_txt.includes('12:00:00'))

    return(
        <div className="fore-cast-wrapper">
        {weatherAtMiddleOfDay.map(day =>  
            <DailyWeather day={day}></DailyWeather>
        )}
        </div> 

       
    )
}