import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { calcTime, scale } from "../shared/global/functions";
import { AppContext, WeatherContext } from "../shared/global/provider/Provider";
import "./ChartsView.css";
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
    " 1 PM",
    " 2 PM",
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
  let windLabel = app.swedish ? "Vind" : "Wind";
  let tempData = [];
  let feelsLikeData = [];
  let weekdayLabel = [];
  let precipitation = [];
  let windSpeedData = [];
  let windowWidth = window.innerWidth;
  weather.weather.list.forEach((timestamp) => {
    tempData.push(Math.round(timestamp.main.temp));
    feelsLikeData.push(Math.round(timestamp.main.feels_like));

    windSpeedData.push(Math.round(timestamp.wind.speed));
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
        fill: false,
        backgroundColor: "rgb(240, 255, 0)",

      },
      {
        label: feelsLikeLabel,
        data: feelsLikeData,
        borderColor: "rgb(240, 255, 240)",
        backgroundColor: "rgb(240, 255, 240)",
        type: "line",
        yAxisID: "y-axis-1",
        hidden: true,
        fill: false
      },
      {
        label: windLabel,
        data: windSpeedData,
        borderColor: "rgb(128,128,128)",
        backgroundColor: "rgb(128,128,128)",
        type: "line",
        yAxisID: "y-axis-3",
        hidden: true,
        fill: false
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
  if (maxTemp % 2 === 1 || maxTemp % 2 === -1) {
    maxTemp++;
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: weather.weather.city.name,
      fontSize: windowWidth / 35,
      fontColor: "honeydew",
    },
    legend: {
      labels: {
        fontSize: windowWidth / 55,
        padding: 40,
        fontColor: "honeydew",
        boxWidth: windowWidth / 55
      },
      onHover: function (e) {
        e.target.style.cursor = 'pointer'
      },
      onLeave: function (e) {
        e.target.style.cursor = 'default'
      }
    },
    
    tooltips: {
      backgroundColor: "#FFF",
      titleFontSize: 18,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 20,
      displayColors: true,
      
      callbacks: {
        label: function (tooltipItems, data) {
          if (tooltipItems.datasetIndex === 0) {
            return (
              Math.ceil(data.datasets[0].data[tooltipItems.index]) + "mm/3h"
            );
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
          } else if (tooltipItems.datasetIndex === 3) {
            return (
              data.datasets[3].data[tooltipItems.index] +
              (app.fahrenheitOn ? " mph" : " m/s")
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
            fontSize: windowWidth / 55,
            fontColor: "honeydew"
          },
          ticks: {
            callback: (label) => {
              return label + scale(app.fahrenheitOn);
            },
            fontSize: windowWidth / 70,
            fontColor: "honeydew",

            min: minTemp - buffer,
            max: maxTemp + buffer,
          },
        },
        {
          type: "linear",
          display: false,
          position: "right",
          id: "y-axis-2",
          scaleLabel: {
            display: true,
            labelString: precipitationLabel,
            fontSize: 35,
            fontColor: "honeydew"

          },
          ticks: {
            callback: (label) => {
              return label + "mm";
            },
            min: 0,
            max: 30,
            fontSize: 30,
            fontColor: "honeydew"

          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-3",
          scaleLabel: {
            display: true,
            labelString: windLabel,
            fontSize: windowWidth / 55,
            fontColor: "honeydew"

          },
          ticks: {
            callback: (label) => {
              return label + (app.fahrenheitOn ? " mph" : " m/s");
            },
            min: 0,
            max: 30,
            fontSize: windowWidth / 70,
            fontColor: "honeydew"

          },
        },
      ],
      xAxes: [
        {
          labels: weekdayLabel,
          ticks: {
            display: true,
            maxRotation: 80,
            fontSize: windowWidth / 62,
            fontColor: "honeydew",

            callback: (label) => {
              for (let j = 0; j < noonArray.length; j++) {
                if (
                  label.slice(label.length - 5, label.length) === noonArray[j]
                ) {
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
    <div className="charts-view">
      <Bar data={chartData} options={options}></Bar>
    </div>
  );
};
