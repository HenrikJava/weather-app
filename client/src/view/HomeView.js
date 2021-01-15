import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { MainWeather } from "../components/mainWeather/MainWeather";
import { ForeCastWeather } from "../components/forecastWeather/ForeCastWeather";
import searchCity from "../shared/api/service/WeatherService";
import { UserContext } from "../shared/global/provider/Provider";
import { ErrorView } from "./ErrorView";
import { loadUser } from "../shared/api/service/UserService";

export const HomeView = () => {
  const user = useContext(UserContext);
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [error, setError] = useState();

  const defaultWeatherCall = () => {
    searchCity(app.city, app.fahrenheitOn).then(
      (response) => {
        console.log(response);

        if (response.status === 200) {
          weather.setWeather(response.data);
        } else {
          console.log(response.data.message.msgBody);
          setError(true)
        }
      }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError===false) {
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        user.setAvatar(loggedInUser.data.user.avatar);
        if (loggedInUser.data.user.photo) {
          const b64encoded = new Buffer.from(loggedInUser.data.user.photo.data).toString('base64')
          user.setPhoto(`data:image/png;base64,${b64encoded}`);   
        }
        user.setAuthenticatedUser(true);      
        searchCity(
          loggedInUser.data.user.favourite_city
            ? loggedInUser.data.user.favourite_city
            : app.city,
          loggedInUser.data.user.fahrenheit_on
        ).then((response) => {
          if (response.status === 200) {
            weather.setWeather(response.data);
          }
          else if (
            response.data.message.msgBody ===
            "No city with that name in the database, please try again."
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
