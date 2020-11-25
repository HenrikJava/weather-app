import React from "react";
import { CityContext } from "../../shared/global/provider/CityProvider";
import { DataContext } from "../../shared/global/provider/DataProvider";
import "./CityInput.css";
import { useContext } from "react";
import WeatherService from "../../shared/api/service/WeatherService";

export const CityInput = () => {
  const [city, setCity] = useContext(CityContext);
  const [data, setData] = useContext(DataContext);
  const fetchDataFromExternalApi = () => {
    WeatherService.searchCity(city)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="city-input-wrapper">
      <form id="cityForm"
        onSubmit={(e) => {
          e.preventDefault();
          fetchDataFromExternalApi();
          e.target.reset()
        }}
      >
        <input
          className="city-input"
          type="text"
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search city..."
        />
        <input type="submit" value="Search"></input>
      </form>
    </div>
  );
};
