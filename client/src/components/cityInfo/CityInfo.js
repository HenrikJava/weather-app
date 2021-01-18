import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { calcTime } from "../../shared/global/functions";
import "./CityInfo.css";
export const CityInfo = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);

  const [time, setTime] = useState("N/A");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calcTime(weather.weather.city.timezone).toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, [weather.weather]);
  return (
    <div className="city-wrapper">
      {app.noCityText? <p className="no-city-text">{app.noCityText}</p> :  ''}
      <p className="city-info">{`${weather.weather.city.name}, ${weather.weather.city.country}`}</p>
      <p className="time">{`The local time in  ${weather.weather.city.name} is ${time.slice(0,16)}`}</p>
    </div>
  );
};
