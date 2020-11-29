import React,{useContext} from "react";
import { CityInfo } from "../cityInfo/CityInfo";
import { CityInput } from "../cityInput/CityInput";
import { CurrentWeather} from './CurrentWeather'
import { WeatherDetails} from './WeatherDetails'

import { ShowDetailsContext } from "../../shared/global/provider/ShowDetailsProvider";

import './MainWeather.css'
export const MainWeather = () => {
  const [showDetails, setShowDetails,showDetailsDate, setShowDetailsDate] = useContext(ShowDetailsContext)

  const mainContent = () => {
    return (
      showDetailsDate? <WeatherDetails/> : <CurrentWeather/>    )
  }

  return (
    <div className='main-weather-wrapper'>
      <CityInput></CityInput>
      <CityInfo></CityInfo>
      
      {mainContent()}
    </div>
  );
};
