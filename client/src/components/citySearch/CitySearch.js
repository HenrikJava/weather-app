import React from "react";
import { AppContext } from "../../shared/global/provider/Provider";
import { WeatherContext } from "../../shared/global/provider/Provider";
import "./CitySearch.css";
import { useContext, useState } from "react";
import {searchCity} from "../../shared/api/service/WeatherService";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

export const CitySearch = () => {
  const app = useContext(AppContext);
  const [city, setCity] = useState("");
  const weather = useContext(WeatherContext);
  const searchWeather = async () => {
    const response = await searchCity({
      city: city,
      fahrenheitOn: app.fahrenheitOn,
    });
    if (response.status === 200) {
      app.setCity(response.data.weather.city.name);
      setCity("");
      app.setnoCityText("");
      weather.setWeather(response.data.weather);
    } else if (response.data.message.msgBody === "city not found") {
      app.setnoCityText(
        `No city with name "${city}" in the database, please try again.`
      );
    } else {
      app.setnoCityText(response.data.message.msgBody);
    }
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
          placeholder="Enter city..."
          id="search-icon-wrapper"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon id="search-icon" />
            </InputAdornment>
          }
        />

        <Button disabled={city.length < 1} type="submit" id="city-button">
          Search
        </Button>
      </form>
    </div>
  );
};
