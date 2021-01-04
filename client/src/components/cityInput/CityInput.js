import React from "react";
import { AppContext } from "../../shared/global/provider/Provider";
import { WeatherContext } from "../../shared/global/provider/Provider";
import "./CityInput.css";
import { useContext, useState } from "react";
import searchCity from "../../shared/api/service/WeatherService";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

export const CityInput = () => {
  const app = useContext(AppContext);
  const [city, setCity] = useState('');
  const weather = useContext(WeatherContext);
  const fetchDataFromExternalApi = async () => {
    const response = await searchCity(city, app.fahrenheitOn);
    if (response.status === 200) {
      app.setCity(response.data.city.name);
      setCity('')
      app.setnoCityText('');

      weather.setWeather(response.data);
    } else {
      app.setnoCityText(response.data.message.msgBody);
    }
  };
  return (
    <div id="city-input-wrapper">
      <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          app.setDisplayCurrent(true);

          fetchDataFromExternalApi();
          e.target.reset();
        }}
      >
        <Input
          type="text"
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter city..."
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon id="search-icon" />
            </InputAdornment>
          }
        />

        <Button disabled={city.length<1}type="submit" variant="contained" id="city-button">
          Search
        </Button>
      </form>
    </div>
  );
};
