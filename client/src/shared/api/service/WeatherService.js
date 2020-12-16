import WeatherService from "../WeatherApi";
import axios from "axios";
const weatherInstance = axios.create();

const searchCity = async (city, fahrenheitOn) => {
  let scale;
  fahrenheitOn
    ? (scale = WeatherService.fahrenheit)
    : (scale = WeatherService.celcius);

  try {
    const response = await weatherInstance
      .get(WeatherService.weatherApi + city + scale + WeatherService.apiKey);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.response.data.message === "city not found") {
      return {
        data: {
          message: {
            msgBody: "No city with that name, check favourite city and change it.",
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
  }
};

export default { searchCity };
