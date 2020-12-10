import React from "react";
import { AppContext } from "../../shared/global/provider/Provider";
import { WeatherContext } from "../../shared/global/provider/Provider";
import "./CityInput.css";
import { useContext } from "react";
import WeatherService from "../../shared/api/service/WeatherService";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../shared/global/provider/Provider";

export const CityInput = () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);
  const [weather, setWeather] = useContext(WeatherContext);
  const fetchDataFromExternalApi = () => {
    WeatherService.searchCity(app.city, user.celciusOn)
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
          onChange={(event) => app.setCity(event.target.value)}
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
