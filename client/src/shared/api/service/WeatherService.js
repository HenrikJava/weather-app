import WeatherService from '../WeatherApi'  
import Axios from 'axios'


const searchCity = (city,celciusOn) => {
  if  (celciusOn)  return Axios.get(WeatherService.weatherApi+city+WeatherService.celcius+WeatherService.apiKey)
  else return Axios.get(WeatherService.weatherApi+city+WeatherService.fahrenheit+WeatherService.apiKey)
    
}

export default {searchCity}