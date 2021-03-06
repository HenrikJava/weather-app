import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import { searchCity } from "../shared/api/service/WeatherService";
import { UserContext } from "../shared/global/provider/Provider";
import { ErrorView } from "./ErrorView";
import { loadUser } from "../shared/api/service/UserService";

export const HomeView = () => {
  const user = useContext(UserContext);
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [error, setError] = useState();
  const defaultWeatherCall = async () => {
    const startCity = app.sessionInProgress
      ? null
      : localStorage.getItem("favouriteCity");
    await searchCity({
      city: startCity || app.city,
      fahrenheitOn: app.fahrenheitOn,
      swedish: app.swedish,
    }).then((response) => {
      if (response.status === 200) {
        weather.setWeather(response.data.weather);
        if (localStorage.getItem("favouriteCity") === response.data.city) {
          app.setIsFavourite(true);
        } else {
          app.setIsFavourite(false);
        }
        app.setSessionInProgress(true);
      } else {
        console.log(response.data.message.msgBody);
        setError(true);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError === false) {
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        user.setAvatar(loggedInUser.data.user.avatar);
        if (loggedInUser.data.user.photo) {
          const b64encoded = new Buffer.from(
            loggedInUser.data.user.photo.data
          ).toString("base64");
          user.setPhoto(`data:image/png;base64,${b64encoded}`);
        }
        user.setAuthenticatedUser(true);
        const startCity = app.sessionInProgress
          ? null
          : loggedInUser.data.user.favourite_city;
        searchCity({
          city: startCity ? startCity : app.city,
          fahrenheitOn: loggedInUser.data.user.fahrenheit_on
            ? loggedInUser.data.user.fahrenheit_on
            : app.fahrenheitOn,
          swedish: loggedInUser.data.user.swedish
            ? loggedInUser.data.user.swedish
            : app.swedish,
        }).then((response) => {
          if (response.status === 200) {
            app.setCity(response.data.weather.city.name);
            weather.setWeather(response.data.weather);
            app.setIsFavourite(false);

            if (
              loggedInUser.data.user.favourite_city &&
              !app.sessionInProgress
            ) {
              localStorage.setItem(
                "favouriteCity",
                response.data.weather.city.name
              );
              app.setIsFavourite(true);
            }
            app.setSessionInProgress(true);
          } else if (response.data.message.msgBody === "city not found") {
            defaultWeatherCall();
            app.setNoCityText(
              app.swedish
                ? "Din favoritstad existerar inte i databasen, var vänlig och ändra den."
                : "Your favourite city does not exist in the database, please change it."
            );
          } else {
            console.log(response.data.message.msgBody);
          }
        });
      } else {
        user.setAuthenticatedUser(false);

        defaultWeatherCall();
      }
    };

    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.favouriteCity]);

  const displayWeather = () => {
    if (weather.weather) {
      return (
        <div className="home-view">
          <MainWeather></MainWeather>
          <ForeCastWeather></ForeCastWeather>
        </div>
      );
    }
    if (error) return <ErrorView></ErrorView>;
    else return null;
  };
  return displayWeather();
};
