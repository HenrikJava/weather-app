import ApiConstants from "../WeatherApi";
import axios from "axios";
const weatherInstance = axios.create();

const searchCity = async (city, fahrenheitOn) => {
  let scale;
  fahrenheitOn
    ? (scale = ApiConstants.fahrenheit)
    : (scale = ApiConstants.celcius);

  try {
    const response = await weatherInstance
      .get(ApiConstants.weatherApi + city + scale + ApiConstants.apiKey);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === "city not found") {
      return {
        data: {
          message: {
            msgBody: "No city with that name in the database, please try again.",
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
