import WeatherService from '../WeatherApi'  
import Axios from 'axios'


const searchCity = (userSearch,celciusOn) => {
  if  (celciusOn)  return Axios.get(WeatherService.weatherApi+userSearch+WeatherService.celcius+WeatherService.apiKey)
  else return Axios.get(WeatherService.weatherApi+userSearch+WeatherService.fahrenheit+WeatherService.apiKey)
    
}

export default {searchCity}