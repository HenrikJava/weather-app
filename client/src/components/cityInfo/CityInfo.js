import React, { useContext, useEffect, useState } from "react";
import {
  UserContext,
  WeatherContext,
} from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { calcTime } from "../../shared/global/functions";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./CityInfo.css";
import { loadUser, updateUser } from "../../shared/api/service/UserService";
export const CityInfo = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const user = useContext(UserContext);

  const [time, setTime] = useState("N/A");
  const [isFavourite, setIsFavourite] = useState();

  const update = async (city) => {
    await updateUser({
      firstname: user.firstname,
      email: user.email,
      favouriteCity: city,
    });
    const loggedInUser = await loadUser();
    user.setFavouriteCity(loggedInUser.data.user.favourite_city);
  };

  const handleFavourite = () => {
    if (isFavourite) {
      localStorage.setItem("favouriteCity", "");
      if (user.authenticatedUser) {
        update("");
      }
    } else {
      localStorage.setItem("favouriteCity", weather.weather.city.name);
      if (user.authenticatedUser) {
        update(weather.weather.city.name);
        app.setNoCityText('')
      }
    }
    setIsFavourite(!isFavourite);
  };
  useEffect(() => {
    if (localStorage.getItem("favouriteCity") === weather.weather.city.name) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
    const interval = setInterval(() => {
      setTime(calcTime(weather.weather.city.timezone).toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, [weather.weather, user.favouriteCity]);
  return (
    <div className="city-wrapper">
      {app.noCityText ? <p className="no-city-text">{app.noCityText}</p> : ""}
      <div className="city-info-wrapper">
        <p className="city-info">{`${weather.weather.city.name}, ${weather.weather.city.country}`}</p>
        <span onClick={handleFavourite}>
          {" "}
          {isFavourite ? (
            <StarIcon className="fav-star-icon"></StarIcon>
          ) : (
            <StarBorderIcon className="not-fav-star-icon"></StarBorderIcon>
          )}
        </span>
      </div>
      <p className="time">{`The local time in  ${
        weather.weather.city.name
      } is ${time.slice(0, 16)}`}</p>
    </div>
  );
};
