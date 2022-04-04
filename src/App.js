import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("Hanoi");
  const [search, setSearch] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  function changeData(response) {
    setWeatherData({
      city: response.data.name,
      date: "Friday 17:00",
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearch(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d800d7a77d154e7030aa4c43d236a01f&units=metric`;
    axios.get(url).then(changeData);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  function defaultCity(city1) {
    let urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=d800d7a77d154e7030aa4c43d236a01f&units=metric`;
    axios.get(urlDefault).then(changeData);
  }

  let displayInfo = (
    <div>
      <div className="App">
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
            <li>Last updated: {weatherData.date}</li>
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
              <span>
                <strong className="Temperature">
                  {weatherData.temperature}
                </strong>
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
      <div className="footer">
        <a href="https://github.com/YenNhi96/weatherapp-react">
          Open-source code
        </a>{" "}
        by Nhi Nguyen
      </div>
    </div>
  );

  if (search) {
    return displayInfo;
  } else {
    defaultCity("Hanoi");
    return displayInfo;
  }
}

export default App;
