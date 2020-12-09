import WeatherService from '../WeatherApi'  
import axios from 'axios'
const weatherInstance = axios.create();

const searchCity = (city,celciusOn) => {
  if  (celciusOn)  return weatherInstance.get(WeatherService.weatherApi+city+WeatherService.celcius+WeatherService.apiKey)
  else return axios.get(WeatherService.weatherApi+city+WeatherService.fahrenheit+WeatherService.apiKey)
    
}

export default {searchCity}