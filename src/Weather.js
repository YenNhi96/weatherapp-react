import React, { useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("Hanoi");
  const [weatherData, setWeatherData] = useState({});

  function changeData(response) {
    setWeatherData({
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });

    console.log(response.data.dt);
  }

  useEffect(() => {
    function defaultCity(city1) {
      let urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=96d9f7babe4d6523a7a489c7350b36fc&units=metric`;
      axios.get(urlDefault).then(changeData);
    }

    defaultCity("Hanoi");
    //handle Weather function after first render
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96d9f7babe4d6523a7a489c7350b36fc&units=metric`;
    axios.get(url).then(changeData);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Weather">
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Change your location"
              className="form-control"
              autoComplete="off"
              onChange={changeCity}
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>
      <div className="current-city">
        <h1>{weatherData.city}</h1>
        <ul>
          <li>
            <FormatDate date={weatherData.date} />
          </li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-7">
          <div className="d-flex align-end">
            <img
              src={weatherData.icon}
              alt={weatherData.description}
              className="float-left"
            />
            <span className="mh-100">
              <strong className="Temperature">{weatherData.temperature}</strong>
              <span className="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </span>
          </div>
        </div>
        <div className="col-5">
          <ul>
            <li>Humidity: {weatherData.humidity}%</li>
            <li>Wind: {weatherData.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Weather;
