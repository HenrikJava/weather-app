import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { calcTime, scale } from "../shared/global/functions";
import { AppContext, WeatherContext } from "../shared/global/provider/Provider";
export const ChartsView = () => {
  const weather = useContext(WeatherContext);
  const app = useContext(AppContext);
  const noonArray = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "12 PM",
    "1 PM",
    "2 PM",
  ];
  const weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  const swedishWeekday = [];
  swedishWeekday[0] = "Söndag";
  swedishWeekday[1] = "Måndag";
  swedishWeekday[2] = "Tisdag";
  swedishWeekday[3] = "Onsdag";
  swedishWeekday[4] = "Torsdag";
  swedishWeekday[5] = "Fredag";
  swedishWeekday[6] = "Lördag";
  let tempLabel = app.swedish ? "Temperatur" : "Temperature";
  let precipitationLabel = app.swedish ? "Nederbörd" : "Precipitation";
  let feelsLikeLabel = app.swedish
    ? "Upplevd temperatur"
    : "Feels like temperature";
  let tempData = [];
  let feelsLikeData = [];
  let weekdayLabel = [];
  let precipitation = [];
  weather.weather.list.forEach((timestamp) => {
    tempData.push(Math.round(timestamp.main.temp));
    feelsLikeData.push(Math.round(timestamp.main.feels_like));
    if (timestamp.snow) {
      precipitation.push(timestamp.snow["3h"]);
    } else if (timestamp.rain) {
      precipitation.push(timestamp.rain["3h"]);
    } else {
      precipitation.push(0);
    }
    let weekdayNumber = new Date(
      (timestamp.dt + weather.weather.city.timezone) * 1000
    ).getUTCDay();
    app.swedish
      ? weekdayLabel.push(
          swedishWeekday[weekdayNumber] + timestamp.dt_txt.slice(10, 16)
        )
      : weekdayLabel.push(
          weekday[weekdayNumber] +
            " " +
            calcTime(
              weather.weather.city.timezone,
              timestamp.dt
            ).toLocaleString("en-US", { hour: "numeric", hour12: true })
        );
  });
  console.log(weekdayLabel);
  const chartData = {
    datasets: [
      {
        label: precipitationLabel,
        data: precipitation,
        type: "bar",
        yAxisID: "y-axis-2",
        backgroundColor: "rgb(30,144,255)",
      },
      {
        label: tempLabel,
        data: tempData,
        borderColor: "rgb(240, 255, 0)",
        type: "line",
        yAxisID: "y-axis-1",
      },
      {
        label: feelsLikeLabel,
        data: feelsLikeData,
        borderColor: "rgb(240, 255, 240)",
        type: "line",
        yAxisID: "y-axis-1",
        hidden: true,
      },
    ],
  };
  const buffer = 2;
  let maxTemp = Math.max(...tempData);
  let minTemp = Math.min(...tempData);
  const maxFeelsLike = Math.max(...feelsLikeData);
  const minFeelsLike = Math.min(...feelsLikeData);
  if (maxFeelsLike > maxTemp) {
    maxTemp = maxFeelsLike;
  }
  if (minFeelsLike < minTemp) {
    minTemp = minFeelsLike;
  }
  if (minTemp % 2 === 1 || minTemp % 2 === -1) {
    minTemp--;
  }
  if (maxTemp % 2 === 1) {
    maxTemp++;
  }
  const options = {
    title: {
      display: true,
      text: weather.weather.city.name,
      fontSize: 60,
      fontColor: "honeydew",
    },
    legend: {
      labels: {
        fontSize: 25,

        fontColor: "honeydew",
      },
    },
    tooltips: {
      backgroundColor: "#FFF",
      titleFontSize: 18,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 20,
      displayColors: true,
      /* callbacks: {
            label: (tooltipItems, data) => { 
                return tooltipItems.yLabel + ' mm';
            }
        } */
      callbacks: {
        label: function (tooltipItems, data) {
          if (tooltipItems.datasetIndex === 0) {
            return data.datasets[0].data[tooltipItems.index] + "mm";
          } else if (tooltipItems.datasetIndex === 1) {
            return (
              data.datasets[1].data[tooltipItems.index] +
              scale(app.fahrenheitOn)
            );
          } else if (tooltipItems.datasetIndex === 2) {
            return (
              data.datasets[2].data[tooltipItems.index] +
              scale(app.fahrenheitOn)
            );
          }
        },
      },
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          scaleLabel: {
            display: true,
            labelString: tempLabel,
            fontSize: 35,
          },
          ticks: {
            callback: (label) => {
              return label + scale(app.fahrenheitOn);
            },
            fontSize: 30,
            min: minTemp - buffer,
            max: maxTemp + buffer,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          scaleLabel: {
            display: true,
            labelString: precipitationLabel,
            fontSize: 35,
          },
          ticks: {
            callback: (label) => {
              return label + "mm";
            },
            min: 0,
            max: 30,
            fontSize: 30,
          },
        },
      ],
      xAxes: [
        {
          labels: weekdayLabel,
          ticks: {
            display: true,
            maxRotation: 70,
            fontSize: 25,
            callback: (label) => {
              for (let j = 0; j < noonArray.length; j++) {
                if (label.includes(noonArray[j])) {
                  return label.slice(0, label.length - 5);
                }
              }
            },
          },
        },
      ],
    },
  };
  useEffect(() => {});
  return (
    <div className="chart">
      <Bar data={chartData} options={options}></Bar>
    </div>
  );
};
