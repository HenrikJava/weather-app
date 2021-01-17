import React, { useContext } from "react";
import "./DailyWeatherOverview.css";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { AppContext } from "../../shared/global/provider/Provider";
import { Wind } from "../wind/Wind";
export const DailyWeatherOverview = (props) => {
  const app = useContext(AppContext);
  const weather = useContext(WeatherContext);
  let dailyPrecipitation = 0;
  const weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  /* Function adjust for the timezones and returns the actual day name
  for two reasons. One reason to calculate the precipitation for the 
  actual day and in the other case show the day name.  */
  const getDay = (timestamp) => {
    if (timestamp) {
      return new Date((timestamp + weather.weather.city.timezone) * 1000)
        .toUTCString()
        .slice(0, 3);
    }
    return new Date((props.day.dt + weather.weather.city.timezone) * 1000)
      .toUTCString()
      .slice(0, 3);
  };
  /* sum the days precipitation */
  weather.weather.list.forEach((element) => {
    if (element.rain && getDay(element.dt) === getDay()) {
      dailyPrecipitation += Number(element.rain["3h"]);
    }
    if (element.snow && getDay(element.dt) === getDay()) {
      dailyPrecipitation += Number(element.snow["3h"]);
    }
  });
  return (
    <div
      /* adding separate classnames to exclude last template
      on different screens */
      className={` daily-overview-wrapper template${props.index}`}
      onClick={() => {
        /*update the app state which day
        is displaying(it is used in other components) */
        app.setWeekday(
          weekday[
            new Date(
              (props.day.dt + weather.weather.city.timezone) * 1000
            ).getUTCDay()
          ]
        );
                /* used in different places in the app  */
        app.setDisplayCurrent(false);
        app.setIsAfternoon(props.isAfternoon);

        /* scroll to top if using mobile */
        document.documentElement.scrollTop = 0;
      }}
    >
      <p className="daily-overview-weekday">{getDay()}</p>
      <div className="daily-overview-weather">
        <img
          src={`/icons/${props.day.weather[0].icon}.png`}
          alt="Weather Icon"
          id="daily-overview-icon"
        ></img>
        <div>
          <p id="daily-overview-degree">
            {Math.round(props.day.main.temp) + scale(app.fahrenheitOn)}
          </p>
          <p id="daily-overview-precipitation">
            {Math.ceil(dailyPrecipitation) + " mm"}
          </p>
          <Wind
            speed={props.day.wind.speed}
            deg={props.day.wind.deg}
            fahrenheitOn={app.fahrenheitOn}
            className="daily-overview-wind"
          ></Wind>
        </div>
      </div>
    </div>
  );
};
