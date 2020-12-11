import WeatherService from '../WeatherApi'  
import axios from 'axios'
const weatherInstance = axios.create();

const searchCity = (city,fahrenheitOn) => {
  if  (fahrenheitOn) return weatherInstance.get(WeatherService.weatherApi+city+WeatherService.fahrenheit+WeatherService.apiKey)
  else  return weatherInstance.get(WeatherService.weatherApi+city+WeatherService.celcius+WeatherService.apiKey)
    
}

export default {searchCity}