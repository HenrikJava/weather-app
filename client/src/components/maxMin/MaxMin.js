import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import "./MaxMin.css";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import HelpIcon from "@material-ui/icons/Help";
import wetSloth from "../../shared/images/sloths/WetSloth.png";
import mildSloth from "../../shared/images/sloths/MildSloth.png";
import coldSloth from "../../shared/images/sloths/ColdSloth.png";
import hotSloth from "../../shared/images/sloths/HotSloth.png";

import Grid from "@material-ui/core/Grid";
export const MaxMin = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const [feelsLikeTooltipOpen, setFeelsLikeTooltipOpen] = useState(false);
  const [slothTooltipOpen, setSlothTooltipOpen] = useState(false);

  let isToday;
  let sloth;
  const noonArray = [
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
  ];

  /* this function returns the arguments dayname */
  const getDayName = (timestamp) => {
    return new Date(
      (timestamp + weather.weather.city.timezone) * 1000
    ).getUTCDay();
  };
  /* Filtering out the actual days timestamps*/
  const weatherAtActualDay = weather.weather.list.filter(
    (fragment) => getDayName(fragment.dt) === app.weekday
  );
  if (weatherAtActualDay.length > 0) {
    /* Assigning true if its today */
    isToday =
      new Date(weatherAtActualDay[0].dt * 1000).toLocaleDateString() ===
      new Date().toLocaleDateString();
  }
  /* Function returning string what the weather feels like temp*/
  const getWeatherAtNoon = () => {
    let feelsLike;
    // If app displaying current weather it will only return current feels like temp
    if (app.displayCurrent) {
      return (
        Math.round(weather.weather.list[0].main.feels_like) +
        scale(app.fahrenheitOn)
      );
    } else {
      //If its today this make sure that feelslike gets an assignment
      if (isToday) {
        feelsLike = weatherAtActualDay[0];
      }
      // Assigning a value(or a new value) to feelslike if its in the noon array
      weatherAtActualDay.forEach((fragment) => {
        for (let j = 0; j < noonArray.length; j++) {
          if (fragment.dt_txt.includes(noonArray[j])) {
            feelsLike = fragment;
          }
        }
      });
      if (feelsLike) {
        return Math.round(feelsLike.main.feels_like) + scale(app.fahrenheitOn);
      } else {
        return "N/A";
      }
    }
  };
  /* Function loops the actual day and return the max temp. */
  const getDayMax = () => {
    let max = -100;
    if (!app.displayCurrent) {
      weatherAtActualDay.forEach((fragment) => {
        if (fragment.main.temp_max > max) {
          max = fragment.main.temp_max;
        }
      });
    }
    return Math.round(max) + scale(app.fahrenheitOn);
  };
  /* Function loops the actual day and return the min temp. */

  const getDayMin = () => {
    let min = 100;
    if (!app.displayCurrent) {
      weatherAtActualDay.forEach((fragment) => {
        if (fragment.main.temp_min < min) {
          min = fragment.main.temp_min;
        }
      });
    }
    return Math.round(min) + scale(app.fahrenheitOn);
  };

  const handleFeelsLikeTooltipClose = () => {
    setFeelsLikeTooltipOpen(false);
  };

  const handleFeelsLikeTooltipOpen = () => {
    setFeelsLikeTooltipOpen(true);
  };
  const handleSlothTooltipClose = () => {
    setSlothTooltipOpen(false);
  };

  const handleSlothTooltipOpen = () => {
    setSlothTooltipOpen(true);
  };

  /* Function generate the sloths clothes depending on the weather.  */
  const generateSloths = () => {
    //default are sloth with ordinary clothes
    sloth = mildSloth;
    //array to collect the temperatures
    let outsideHours = [];
    //array with all the possible timestamps. A human is often outside these hours and not at night.
    const outsideTimeStamps = [
      "12:00:00",
      "12:30:00",
      "13:00:00",
      "13:30:00",
      "14:00:00",
      "14:30:00",
      "18:00:00",
      "18:30:00",
      "19:00:00",
      "19:30:00",
      "20:00:00",
      "20:30:00",
    ];
    //Filling the selection temp array
    weatherAtActualDay.forEach((fragment) => {
      let isOutsideHour = outsideTimeStamps.some((time) =>
        fragment.dt_txt.includes(time)
      );
      isOutsideHour && outsideHours.push(fragment);
    });
    //If the search are late at night current slot will be that timestamp
    if (outsideHours.length === 0) {
      outsideHours.push(weather.weather.list[0]);
    }
    /* Making the sloth cold or hot depending on the timestamps temps. If one timestamp
    are colder than +5C° the sloth became cold and hotter than +23C°. And if one timestamp includes
    rain the sloth will be a wet sloth.*/
    for (let i = 0; i < outsideHours.length; i++) {
      if (app.fahrenheitOn) {
        if (outsideHours[i].main.feels_like <= 41) {
          sloth = coldSloth;
        }
        if (outsideHours[i].main.feels_like >= 73) {
          sloth = hotSloth;
        }
      } else {
        if (outsideHours[i].main.feels_like <= 5) {
          sloth = coldSloth;
        }
        if (outsideHours[i].main.feels_like >= 23) {
          sloth = hotSloth;
        }
      }
      if (
        outsideHours[i].weather[0].description.includes("rain") ||
        outsideHours[i].weather[0].description.includes("regn")
      ) {
        sloth = wetSloth;
        break;
      }
    }

    return sloth;
  };
  useEffect(() => {
    app.setSloth(generateSloths());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app, sloth, weather]);

  return (
    <Grid item xs={12} id="max-min-inner-wrapper">
      <Grid item xs={5}>
        <ClickAwayListener onClickAway={handleSlothTooltipClose}>
          <div>
            <Tooltip
              placement="top-end"
              PopperProps={{
                disablePortal: true,
              }}
              id="tooltip"
              onClose={handleSlothTooltipClose}
              open={slothTooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <p id="tooltip-text">
                  {" "}
                  {app.swedish
                    ? "Sengångarens klädsel är baserat på den aktuella dagens väder mellan 10-18 och rekommenderar hur man ska klä sig."
                    : "The sloth's attire is based on the current day's weather between 10-18 and recommends how to dress."}
                </p>
              }
            >
              <img
                src={generateSloths()}
                className="max-min-sloth"
                alt="clothes"
                onClick={handleSlothTooltipOpen}
              />
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Grid>
      <Grid item xs={6}>
        <div className="max-min-temperatures">
          <div id="header-and-tooltip">
            <p className="max-min-temp-headers">
              {!app.displayCurrent && !(isToday && app.isAfternoon)
                ? app.swedish
                  ? "Känns som vid lunch"
                  : "Feels like at noon"
                : app.swedish
                ? "Känns som just nu"
                : "Feels like now"}
            </p>
            <ClickAwayListener onClickAway={handleFeelsLikeTooltipClose}>
              <div>
                <Tooltip
                  placement="top-start"
                  PopperProps={{
                    disablePortal: true,
                  }}
                  id="tooltip"
                  onClose={handleFeelsLikeTooltipClose}
                  open={feelsLikeTooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <p id="tooltip-text">
                      {" "}
                      {app.swedish
                        ? "Detta är baserat på många faktorer, bland annat lufttryck och vind och visar den upplevda temperaturen."
                        : "This is based on many factors, including air pressure and wind and shows the perceived temperature."}
                    </p>
                  }
                >
                  <HelpIcon
                    id="tooltip-icon"
                    onClick={handleFeelsLikeTooltipOpen}
                  ></HelpIcon>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </div>

          <p className="max-min-temp-degrees">{getWeatherAtNoon()}</p>
          {!app.displayCurrent && (
            <div>
              <p className="max-min-temp-headers">
                {" "}
                {app.swedish ? "Dagens max" : "Day max"}
              </p>
              <p className="max-min-temp-degrees">{getDayMax()}</p>
              <p className="max-min-temp-headers">
                {app.swedish ? "Dagens min" : "Day min"}
              </p>
              <p className="max-min-temp-degrees">{getDayMin()}</p>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
