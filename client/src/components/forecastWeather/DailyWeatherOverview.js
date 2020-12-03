import React, { useContext } from "react";
import "./DailyWeatherOverview.css";
import { UserContext } from "../../shared/global/provider/AppProvider";
import { scale } from "../../shared/global/functions";
import { DisplayCurrentContext } from "../../shared/global/provider/AppProvider";
import { Wind } from "../wind/Wind";
export const DailyWeatherOverview = (props) => {
  const [displayCurrent, setDisplayCurrent, weekday, setWeekday] = useContext(
    DisplayCurrentContext
  );
  const [
    authenticatedUser,
    setAuthenticatedUser,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
    mail,
    setMail,
    favoriteCity,
    setFavoriteCity,
    celciusOn,
    setcelciusOn,
  ] = useContext(UserContext);
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
      onClick={() => setWeekday(getDay("long"), setDisplayCurrent(false))}
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
            {Math.round(props.day.main.temp) + scale(celciusOn)}
          </p>
          <Wind
            speed={props.day.wind.speed}
            deg={props.day.wind.deg}
            celciusOn={celciusOn}
          ></Wind>
        </div>
      </div>
    </div>
  );
};
