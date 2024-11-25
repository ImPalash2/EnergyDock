import React from "react";
import "../styles/NextContent.css";
import { useNavigate } from "react-router-dom";

function NextContent() {
  const navigate = useNavigate();
  return (
    <div className="nextContents">
      <div
        className="container1"
        onClick={() => {
          navigate("/map");
        }}
      >
        <div className="containerimg1"></div>
        <div className="container1Text">
          <h1>Locating stations using map:</h1>
          <p>
          Many map apps can help you find electric car charging stations! Simply open our preferred mapping app and search for "EV charging stations" or similar terms. Filter results by charger type (Level 2 or DC Fast) and real-time availability to find the perfect pit stop. Power up your ride and get back on the road in no time!
          </p>
        </div>
      </div>
      <div className="container2">
        <div className="containerimg2"></div>
        <div className="container2Text">
          <h1>Station Details:</h1>
          <p>
          Need the lowdown on a charging station? Most station listings on maps or dedicated EV apps offer key details. See addresses, check charger types (Level 2 or DC Fast) and their availability. Reviews from fellow EV drivers can offer insights on functionality and amenities. Some stations even show pricing per kWh, so you can estimate charging costs. Plan your perfect charging stop and get back on the road with confidence!
          </p>
        </div>
      </div>
      <div className="container3">
        <div className="containerimg3"></div>
        <div className="container3Text">
          <h1>Charging Education:</h1>
          <p>
          Electric vehicles (EVs) are revolutionizing transportation, but keeping them charged requires a new kind of infrastructure: electric vehicle charging stations. These stations come equipped with various charger types, each offering different speeds and catering to specific needs. Here's a breakdown to help you navigate the world of EV charging:
          </p>
        </div>
      </div>
    </div>
  );
}

export default NextContent;
