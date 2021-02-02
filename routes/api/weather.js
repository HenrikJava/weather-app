const express = require("express");
const router = express.Router();
const axios = require("axios");
const utf8 = require("utf8");

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
  let response
  req.body.fahrenheitOn
    ? (scale = "&units=imperial")
    : (scale = "&units=metric");
  // Encode it to utf8 string that make sure swedish(and other) characters work.
  try {
    if (req.body.city) {
      req.body.city = utf8.encode(req.body.city);

       response = await axios.get(
        process.env.WEATHER_API_URL +
          "forecast?q=" +
          req.body.city +
          scale +
          process.env.WEATHER_API_KEY
      );
    } else {
       response = await axios.get(
        process.env.WEATHER_API_URL +
          "forecast?lat=" +
          req.body.lat +
          "&lon=" +
          req.body.lon +
          scale +
          process.env.WEATHER_API_KEY
      );
    }

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
    if (error.response && error.response.data.message === "city not found") {
      res.status(400).json({
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
