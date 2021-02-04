import React from "react";
import { AppContext } from "../../shared/global/provider/Provider";
import { WeatherContext } from "../../shared/global/provider/Provider";
import "./CitySearch.css";
import { useContext, useState } from "react";
import { searchCity } from "../../shared/api/service/WeatherService";
import SearchIcon from "@material-ui/icons/Search";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

export const CitySearch = () => {
  const app = useContext(AppContext);
  const [city, setCity] = useState("");
  const weather = useContext(WeatherContext);
  const placeHolder = app.swedish ? "Skriv in stad..." : "Enter city..."

  const searchWeather = async (coords) => {
    let response;
    if (!coords) {
      response = await searchCity({
        city: city,
        fahrenheitOn: app.fahrenheitOn,
        swedish: app.swedish
      });
    } else {
      response = await searchCity({
        lat: coords.lat,
        lon: coords.lon,
        fahrenheitOn: app.fahrenheitOn,
        swedish: app.swedish

      });
    }

    if (response.status === 200) {
      app.setCity(response.data.weather.city.name);
      setCity("");
      app.setNoCityText("");
      weather.setWeather(response.data.weather);
    } else if (response.data.message.msgBody === "city not found") {
      {
        app.swedish
          ? app.setNoCityText(
              `Det finns ingen stad "${city}" i databasen, var vänlig försök igen.`
            )
          : app.setNoCityText(
              `No city with name "${city}" in the database, please try again.`
            );
      }
    } else {
      app.swedish ? app.setNoCityText("Någonting är fel på servern, var vänlig och försök senare.") : app.setNoCityText(response.data.message.msgBody)
      ;
    }
  };

  const prepareSearchByGeo = () => {
    const options = {
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        app.setDisplayCurrent(true);
        searchWeather({
          lat: pos.coords.latitude.toFixed(5),
          lon: pos.coords.longitude.toFixed(5),
        });
      },
      (err) => {
        console.log(err);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            {
              app.swedish
                ? app.setNoCityText(
                    "Var vänlig tillåt positionering i webläsaren."
                  )
                : app.setNoCityText(
                    "Please allow positioning in your browser settings."
                  );
            }

            break;
          case err.POSITION_UNAVAILABLE:
            {
              app.swedish
                ? app.setNoCityText("Lokalisering är inte möjligt just nu.")
                : app.setNoCityText("Location information is unavailable.");
            }

            break;
          case err.TIMEOUT:
            {
              app.swedish
                ? app.setNoCityText(
                    "Det tog för lång tid, var vänlig försök igen."
                  )
                : app.setNoCityText(
                    "The request to get user location timed out."
                  );
            }

            break;
          case err.UNKNOWN_ERROR:
            {
              app.swedish
                ? app.setNoCityText("Ett okänt fel inträffade.")
                : app.setNoCityText("An unknown error occurred.");
            }

            break;
          default:
        }
      },
      options
    );
  };
  return (
    <div className="city-search-wrapper">
      <form
        className="city-input-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          app.setDisplayCurrent(true);
          searchWeather();
          e.target.reset();
        }}
      >
        <Input
          type="text"
          onChange={(event) => setCity(event.target.value)}
          placeholder={placeHolder}
          
          id="search-icon-wrapper"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon id="search-icon" />
            </InputAdornment>
          }
        />

        <Button disabled={city.length < 1} type="submit" id="city-button">
         {app.swedish ? 'Sök' : 'Search'} 
        </Button>
      </form>
      <GpsFixedIcon
        classes={{ root: "gps-icon" }}
        onClick={() => prepareSearchByGeo()}
      ></GpsFixedIcon>
    </div>
  );
};
