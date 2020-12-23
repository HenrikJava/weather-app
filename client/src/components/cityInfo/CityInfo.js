import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";

import { calcTime } from "../../shared/global/functions";
import "./CityInfo.css";
export const CityInfo = () => {
  const [weather] = useContext(WeatherContext);
  const app = useContext(AppContext);

  const [time, setTime] = useState("N/A");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calcTime(weather.city.timezone).toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, [weather]);
  return (
    <div className="city-wrapper">
      {app.noCityText? <p id="no-city-text">{app.noCityText}</p> :  ''}
      <p id="city-info">{`${weather.city.name}, ${weather.city.country}`}</p>
      <p id="time">{`The local time in  ${weather.city.name} is ${time}`}</p>
    </div>
  );
};
