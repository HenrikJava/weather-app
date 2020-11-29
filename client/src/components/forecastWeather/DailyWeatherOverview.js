import React,{useContext} from "react";
import { Typography } from "@material-ui/core";
import "./DailyWeatherOverview.css";
import { DisplayCurrentContext } from "../../shared/global/provider/DisplayCurrentProvider";
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
          style={{ width: "15vh" }}
        ></img>
        <Typography variant="h2">
          {Math.round(props.day.main.temp) + `°`}
        </Typography>
      </div>
    </div>
  );
};
