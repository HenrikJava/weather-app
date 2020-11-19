import WeatherService from '../WeatherApi'  
import Axios from 'axios'


const searchCity = (userSearch) => {
    return Axios.get(WeatherService.weatherApi+userSearch+WeatherService.apiKey)
}

export default {searchCity}