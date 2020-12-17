import WeatherService from "../WeatherApi";
import axios from "axios";
const weatherInstance = axios.create();

const searchCity = (city, fahrenheitOn) => {
  let scale;
  fahrenheitOn
    ? (scale = WeatherService.fahrenheit)
    : (scale = WeatherService.celcius);

  return weatherInstance
    .get(WeatherService.weatherApi + city + scale + WeatherService.apiKey)
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.message === "city not found") {
        return {
          data: {
            message: {
              msgBody:
                "No city with that name in the database.",
              msgError: true,
            },
          },
        };
      } else {
        return {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
      }
    });
};

export default { searchCity };
