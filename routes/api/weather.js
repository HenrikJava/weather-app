const express = require("express");
const router = express.Router();
const weatherApi = require("../WeatherApi");
const axios = require("axios");
const utf8 = require('utf8');

//Adjusting the timezones to get locale time at every timestamp
const adjustTimeZone = (weather) => {
  weather.list.forEach((timestamp) => {
    timestamp.dt_txt = new Date((timestamp.dt + weather.city.timezone) * 1000)
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
  });

  return weather;
};
// Load weather
router.post("/", async (req, res) => {
  let scale;
  req.body.fahrenheitOn
    ? (scale = weatherApi.fahrenheit)
    : (scale = weatherApi.celcius);
  req.body.city = utf8.encode(req.body.city);

  try {
    const response = await axios.get(
      weatherApi.apiUrl + req.body.city + scale + weatherApi.apiKey
    );

    if (response.status === 200) {
      res.status(200).json({
        weather: adjustTimeZone(response.data),
        message: {
          msgBody: "Weather successfully grabbed.",
          msgError: false,
        },
      });
    }
  } catch (error) {
    if (error.response.data.message === "city not found") {
      res.status(500).json({
        message: {
          msgBody: "city not found",
          msgError: true,
        },
      });
    } else {
      res.status(500).json({
        message: {
          msgBody: "Something wrong at server, please try again later.",
          msgError: true,
        },
      });
    }
  }
});

module.exports = router;
