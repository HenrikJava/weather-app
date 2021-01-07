import React, { useContext, useEffect } from "react";
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
  const [open, setOpen] = React.useState(false);
  const noonArray = [
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
  ];

  let sloth;

  const getDayName = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };

  const weatherAtCurrentDay = weather.weather.list.filter(
    (fragment) => getDayName(fragment.dt) === app.weekday
  );
  let isToday;
  if (weatherAtCurrentDay[0]) {
    isToday =
      new Date(weatherAtCurrentDay[0].dt * 1000).toLocaleDateString() ===
      new Date().toLocaleDateString();
  }
  const getWeatherAtNoon = () => {
    let feelsLike;
    if (!app.displayCurrent) {
      if (isToday) {
        feelsLike = weatherAtCurrentDay[0];
      }
      weatherAtCurrentDay.forEach((fragment) => {
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
    } else {
      return (
        Math.round(weather.weather.list[0].main.feels_like) + scale(app.fahrenheitOn)
      );
    }
  };
  const getDayMax = () => {
    let max = -100;
    if (!app.displayCurrent) {
      weatherAtCurrentDay.forEach((fragment) => {
        if (fragment.main.temp_max > max) {
          max = fragment.main.temp_max;
        }
      });
    }
    return Math.round(max) + scale(app.fahrenheitOn);
  };
  const getDayMin = () => {
    let min = 100;
    if (!app.displayCurrent) {
      weatherAtCurrentDay.forEach((fragment) => {
        if (fragment.main.temp_min < min) {
          min = fragment.main.temp_min;
        }
      });
    }
    return Math.round(min) + scale(app.fahrenheitOn);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const generateSloths = () => {
    sloth = mildSloth;
    let outsideHours = [];
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
    weatherAtCurrentDay.forEach((fragment) => {
      let isOutsideHour = outsideTimeStamps.some((time) =>
        fragment.dt_txt.includes(time)
      );
      isOutsideHour && outsideHours.push(fragment);
    });
    if (outsideHours.length === 0) {
      outsideHours.push(weather.weather.list[0]);
    }

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
      if (outsideHours[i].weather[0].description.includes("rain")) {
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
    <Grid item xs={12} id="clothes-max-min">
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <img src={generateSloths()} className="clothes-image" alt="clothes" />
      </Grid>
      <Grid item xs={6}>
        <div className="temperatures">
          <div id="header-and-tooltip">
            <p className="temp-headers">
              {!app.displayCurrent && !(isToday && app.isAfternoon)
                ? "Feels like at noon"
                : "Feels like now"}
            </p>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  id="tooltip"
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <p id="tooltip-text">
                      This is calculated by severals conditions such as pressure
                      and wind and shows the temperature what it feels like for
                      a human.
                    </p>
                  }
                >
                  <HelpIcon id="tooltip-icon" onClick={handleTooltipOpen}></HelpIcon>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </div>

          <p className="temp-degrees">{getWeatherAtNoon()}</p>
          {!app.displayCurrent && (
            <div>
              <p className="temp-headers">Day max:</p>
              <p className="temp-degrees">{getDayMax()}</p>
              <p className="temp-headers">Day min:</p>
              <p className="temp-degrees">{getDayMin()}</p>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
