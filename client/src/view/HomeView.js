import React from "react";
import { CityInput } from "../components/cityInput/CityInput";
import { WeatherCard } from "../components/weathercard/WeatherCard";

export const HomeView = () => {
  return (
    <div>
      <CityInput></CityInput>
      <WeatherCard></WeatherCard>
    </div>
  );
};
