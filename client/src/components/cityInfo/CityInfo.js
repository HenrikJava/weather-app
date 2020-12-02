import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import { calcTime } from "../../shared/global/functions";
import './CityInfo.css'
export const CityInfo = () => {
  const [weather] = useContext(WeatherContext);
    const [time, setTime] = useState("N/A")
useEffect(() => {
  const interval = setInterval(() => {
         setTime(calcTime(
      weather.city.timezone
    ).toLocaleString())
  }, 1000);
  return () => clearInterval(interval);
}, [weather]);
  return (
    <div>
      <h1 id="city-info">{`${weather.city.name}, ${weather.city.country}`}</h1>
      <h3 id="time">
        {`The local time in  ${weather.city.name} is ${time}`}
      </h3>
    </div>
  );
};
