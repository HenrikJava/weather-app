import weatherApi from "../WeatherApi";
import axios from "axios";
const weatherInstance = axios.create();
const adjustTimeZone = (response) => {
  response.data.list.forEach(timestamp => {

    timestamp.dt_txt = new Date((timestamp.dt+response.data.city.timezone)*1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')
});

  return response
}

const searchCity = async (city, fahrenheitOn) => {
  let scale;
  fahrenheitOn
    ? (scale = weatherApi.fahrenheit)
    : (scale = weatherApi.celcius);

  try {
    const response = await weatherInstance
      .get(weatherApi.apiUrl + city + scale + weatherApi.apiKey);
    if (response.status === 200) {

      return adjustTimeZone(response)
    }
  } catch (error) {
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

export default  searchCity ;
