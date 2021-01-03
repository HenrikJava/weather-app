import React, { useContext } from "react";
import "./DailyWeatherOverview.css";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { AppContext } from "../../shared/global/provider/Provider";
import { Wind } from "../wind/Wind";
export const DailyWeatherOverview = (props) => {
  const app = useContext(
    AppContext
  );
  const weather = useContext(
    WeatherContext
  );
  let dailyPrecipitation = 0
  const weekday = []
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
  const getDay = (timestamp) => {
    if (timestamp) {
      return new Date((timestamp+weather.weather.city.timezone )* 1000).toUTCString().slice(0,3)

    }
      return new Date((props.day.dt+weather.weather.city.timezone )* 1000).toUTCString().slice(0,3)
      
   
  };
  weather.weather.list.forEach(element => {
  
  if (element.rain && getDay(element.dt)===getDay()) {
    dailyPrecipitation += (Number(element.rain['3h']))
  }
  if (element.snow && getDay(element.dt)===getDay()) {
    dailyPrecipitation += (Number(element.snow['3h']))
  }
});
  return (
    <div
      className={` daily-weather template${props.index}`}
      onClick={() => {app.setWeekday(weekday[new Date((props.day.dt+weather.weather.city.timezone )* 1000).getUTCDay()]); app.setIsAfternoon(props.isAfternoon); app.setDisplayCurrent(false); 
      document.documentElement.scrollTop = 0;}}
    >
      <p className="weekday">{getDay()}</p>
      <div className="image-and-details">
        <img
                  src={`/icons/${props.day.weather[0].icon}.png`}

          alt="Weather Icon"
          id="daily-icon"
        ></img>
        <div>
          <p id="degree">
            {Math.round(props.day.main.temp) + scale(app.fahrenheitOn)}
          </p>
          <Wind
            speed={props.day.wind.speed}
            deg={props.day.wind.deg}
            fahrenheitOn={app.fahrenheitOn}
            className="daily-overview-wind"
          ></Wind>
          <p id="dailyPrecipitation">{Math.ceil(dailyPrecipitation)+' mm'}</p>
        </div>
      </div>
    </div>
  );
};
