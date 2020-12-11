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

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await loadUser();
      if (loggedInUser) {
        user.setFirstname(loggedInUser.data.firstname);
        user.setLastname(loggedInUser.data.lastname);
        user.setEmail(loggedInUser.data.email);
        user.setAvatar(loggedInUser.data.avatar);
        user.setAuthenticatedUser(true);
        user.setFavouriteCity(
          loggedInUser.data.favourite_city
            
        );
        app.setFahrenheitOn(
          loggedInUser.data.fahrenheit_on
            
        );
        WeatherService.searchCity(
          loggedInUser.data.favourite_city
            ? loggedInUser.data.favourite_city
            : app.city,
          loggedInUser.data.fahrenheit_on
        )
          .then((response) => setWeather(response.data))
          .catch((error) => {
            console.log(error);
            setError(true);
          });
      } else {
        WeatherService.searchCity(
           app.city,
          app.fahrenheitOn
        )
          .then((response) => setWeather(response.data))
          .catch((error) => {
            console.log(error);
            setError(true);
          });
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
