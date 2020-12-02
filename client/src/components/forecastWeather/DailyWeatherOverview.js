import React,{useContext} from "react";
import "./DailyWeatherOverview.css";
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
export const DailyWeatherOverview = (props) => {
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(DisplayCurrentContext)

  const getDay = (dayLength) => { 
    if (dayLength==='long') {return new Date(props.day.dt * 1000).toLocaleString("en-us", {
      weekday: "long",
    })} else {return new Date(props.day.dt * 1000).toLocaleString("en-us", {
      weekday: "short",
    })}
    ;
  };

  return (
    <div className="daily-weather" onClick={() => setWeekday(getDay('long'), setDisplayCurrent(false))}>
      <h1 className="weekday">{getDay('short')}</h1>
      <div className="image-and-temp">
        <img
          src={`http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          id="daily-icon"
        ></img>
        <h1 id="degree">
          {Math.round(props.day.main.temp) + `°`}
        </h1>
      </div>
    </div>
  );
};
