import React from "react";
import { CityContext } from "../../shared/global/provider/AppProvider";
import { WeatherContext } from "../../shared/global/provider/AppProvider";
import "./CityInput.css";
import { useContext } from "react";
import WeatherService from "../../shared/api/service/WeatherService";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../shared/global/provider/AppProvider";

export const CityInput = () => {
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
  const [city, setCity] = useContext(CityContext);
  const [weather, setWeather] = useContext(WeatherContext);
  const fetchDataFromExternalApi = () => {
    WeatherService.searchCity(city, celciusOn)
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="city-input-wrapper">
      <form
        id="city-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchDataFromExternalApi();
          e.target.reset();
        }}
      >
        <Input
          className="city-input"
          type="text"
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search city..."
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          }
        />

        <Button type="submit" variant="contained" id="city-button">
          Search
        </Button>
      </form>
    </div>
  );
};
