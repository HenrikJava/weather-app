import React, {  useContext } from "react";
import {DataContext} from '../shared/global/provider/DataProvider'
import {CityInput} from '../components/cityInput/CityInput'
export const HomeView = () => {
  const [data, setData] = useContext(DataContext)

  
  const displayData = () => {
    if (data) {
      return (
        <div>
          <h1>{data.city.name}</h1>
          Today
          <h2>{data.list[0].weather[0].main}</h2>
      <h3>{data.list[0].main.temp}</h3>
      Forecast
          <h2>{data.list[39].weather[0].main}</h2>
      <h3>{data.list[39].main.temp}</h3>
        </div>
      );
    }
  };

  return (
    <div>
      
      <CityInput></CityInput>
  <span>{displayData()}</span>
    </div>
  );
};
