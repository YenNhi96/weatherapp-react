import React from "react";
import { OpenWeatherMapCodes } from "react-animated-climacons";
import "./Weather.css";

export default function WeatherIcon(props) {
  const Night = OpenWeatherMapCodes.night[props.data];
  const Day = OpenWeatherMapCodes.day[props.data];

  let dateData = new Date(props.dateInfo);
  let hours = dateData.getHours();

  if (hours >= 17) {
    return (
      <div className="weather-icon">
        <Night fill="grey" stroke="black" />
      </div>
    );
  } else {
    return (
      <div className="weather-icon">
        <Day fill="grey" stroke="black" />
      </div>
    );
  }
}
