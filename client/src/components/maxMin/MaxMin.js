import React, { useContext } from "react";
import { WeatherContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { UserContext } from "../../shared/global/provider/Provider";
import { scale } from "../../shared/global/functions";
import "./MaxMin.css";
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import HelpIcon from '@material-ui/icons/Help';
import winter from "../../shared/images/winter.jpg";

import Grid from "@material-ui/core/Grid";
export const MaxMin = () => {
  const [weather] = useContext(WeatherContext);
  const app = useContext(
    AppContext
  );
  const [open, setOpen] = React.useState(false);

  let isToday

  const getDayName = (fragment) => {
    return new Date(fragment * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
  };

  const weatherAtCurrentDay = weather.list.filter(
    (fragment) => getDayName(fragment.dt) === app.weekday
    
  );
  if(weatherAtCurrentDay[0]) { isToday = new Date(weatherAtCurrentDay[0].dt * 1000).toLocaleDateString()===new Date().toLocaleDateString()
  }
  const getWeatherAtNoon = () => {

    let feelsLike;
    if (!app.displayCurrent) {
      
      if (isToday) {
        feelsLike = weatherAtCurrentDay[0]
      }
      weatherAtCurrentDay.forEach(fragment => {
        if (fragment.dt_txt.includes("12:00:00")) {
          feelsLike = fragment
        }

      });
      if (feelsLike) {
        return Math.round(feelsLike.main.feels_like) + scale(app.fahrenheitOn);
      } else {
        return "N/A";
      }
    } else {
      return Math.round(weather.list[0].main.feels_like) + scale(app.fahrenheitOn);
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
   const generateSuggestedClothes = () => {
    return (
      <Grid item xs={12} id="clothes-max-min">
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <img src={winter} className="clothes-image" />
        </Grid>
        <Grid item xs={5}>
          <div className="temperatures">
            <div id="header-and-tooltip"><p className="temp-headers">
              {!app.displayCurrent && !(isToday && !app.isAfternoon) ? "Feels like at 12" : "Feels like now"}
            </p><ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={<p id='tooltip-text'>This is calculated by severals conditions such as pressure and wind and shows the temperature what it feels like for a human.</p>}
              >
                <HelpIcon id='tooltip' onClick={handleTooltipOpen}></HelpIcon>

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
        <Grid item xs={1}></Grid>
      </Grid>
    );
  };

  return generateSuggestedClothes();
};
