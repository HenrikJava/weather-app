import React, { useContext } from "react";
import { DataContext } from "../../shared/global/provider/DataProvider";
import { Card, CardContent } from "@material-ui/core";
import { CityInfo } from "../../components/cityInfo/CityInfo";
import {CurrentWeather} from '../currentWeather/CurrentWeather'
import {ForeCastWeather} from '../forecastWeather/ForeCastWeather'
export const WeatherCard = () => {
  const [data, setData] = useContext(DataContext);

  
  const displayData = () => {
    if (data) {
      return (
        <Card>
          <CardContent>
            <CityInfo></CityInfo>
            <CurrentWeather></CurrentWeather>
            <ForeCastWeather></ForeCastWeather>
          </CardContent>
        </Card>
        
      );
    }
  };
  return (
    <div>
      <span>{displayData()}</span>
    </div>
  );
};
