import React from 'react'
import {CityContext} from '../../shared/global/provider/CityProvider'
import {DataContext} from '../../shared/global/provider/DataProvider'
import './CityInput.css'
import { useContext, useEffect } from 'react'
import WeatherService from '../../shared/api/service/WeatherService'

export  const CityInput = () => {
    const [city, setCity] = useContext(CityContext)
    const [data, setData] = useContext(DataContext)
    useEffect(() =>{ fetchDataFromExternalApi()}, []);

  const fetchDataFromExternalApi = (event) => {
    
    WeatherService.searchCity(city)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
    return(
<div className="cityInputWrapper"><form onSubmit={(e) => {e.preventDefault(); fetchDataFromExternalApi()}}><input className="input" type="text" onChange={(event) => setCity(event.target.value)} placeholder="Search city..."/>
      <input type="submit" value="Search"></input></form>
      </div>
    )
}