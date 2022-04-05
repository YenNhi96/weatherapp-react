import React from "react";
import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="container">
      <Weather />
      <div className="footer">
        <a
          href="https://github.com/YenNhi96/weatherapp-react"
          target="_blank"
          rel="noreferrer"
        >
          Open-source code
        </a>{" "}
        by Nhi Nguyen
      </div>
    </div>
  );
}

export default App;
