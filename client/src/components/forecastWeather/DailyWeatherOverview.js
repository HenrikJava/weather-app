import React, { useContext } from "react";
import "./DailyWeatherOverview.css";
import { UserContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import { AppContext } from "../../shared/global/provider/Provider";
import { Wind } from "../wind/Wind";
export const DailyWeatherOverview = (props) => {
  const app = useContext(
    AppContext
  );
  const user = useContext(UserContext);
  const getDay = (dayLength) => {
    if (dayLength === "long") {
      return new Date(props.day.dt * 1000).toLocaleString("en-us", {
        weekday: "long",
      });
    } else {
      return new Date(props.day.dt * 1000).toLocaleString("en-us", {
        weekday: "short",
      });
    }
  };

  return (
    <div
      className="daily-weather"
      onClick={() => app.setWeekday(getDay("long"), app.setDisplayCurrent(false))}
    >
      <p className="weekday">{getDay("short")}</p>
      <div className="image-and-details">
        <img
          src={`http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`}
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
            fahrenheit={app.fahrenheitOn}
          ></Wind>
        </div>
      </div>
    </div>
  );
};
