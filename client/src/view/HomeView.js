import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import WeatherService from "../shared/api/service/WeatherService";
import { UserContext } from "../shared/global/provider/Provider";
import { Error } from "../components/error/Error";
import { loadUser } from "../shared/api/service/UserService";

import "./HomeView.css";
export const HomeView = () => {
  const user = useContext(UserContext);
  const [weather, setWeather] = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [error, setError] = useState();

  const defaultWeatherCall = () => {
    WeatherService.searchCity(app.city, app.fahrenheitOn).then(
      (response) => {
        if (response.status === 200) {
          setWeather(response.data);
        } else {
          console.log(response.data.message.msgBody);
        }
      }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError===false) {
        
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        WeatherService.searchCity(
          loggedInUser.data.user.favourite_city
            ? loggedInUser.data.user.favourite_city
            : app.city,
          loggedInUser.data.user.fahrenheit_on
        ).then((response) => {
          if (response.status === 200) {
            setWeather(response.data);
          }
          else if (
            response.data.message.msgBody ===
            "No city with that name in the database."
          ) {
            console.log(response.data.message.msgBody);
            defaultWeatherCall()
            app.setnoCityText("Your favourite city does not exist in the database, please change it.");

          } else {
            console.log(response.data.message.msgBody);
          }
        });
      } else {
        user.setAuthenticatedUser(false);

        defaultWeatherCall()

      }
    };

    fetchData();
  }, [user.authenticatedUser]);

  const displayWeather = () => {
    if (weather) {
      return (
        <div className="home-container">
          <MainWeather></MainWeather>
          <ForeCastWeather></ForeCastWeather>
        </div>
      );
    }
    if (error) return <Error></Error>;
    else return null;
  };
  return displayWeather();
};
