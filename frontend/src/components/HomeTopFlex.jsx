import React from "react";
import "../styles/HomeTopFlex.css";

function HomeTopFlex() {
  return (
    <div className="inside">
      <div className="homeTopFlex">
        <div className="flexcontents">
          <div className="HomeFlexImage1"></div>
          <h2 className="headingInsideFlextop">Level 1 Charger (Slowest):</h2>
          <p>
          This is the slowest option, typically using a standard 120-volt household outlet. It's ideal for overnight charging at home, adding about 3-5 miles of range per hour.
          </p>
        </div>
        <div className="flexcontents">
          <div className="HomeFlexImage2"></div>
          <h2 className="headingInsideFlextop">Level 2 Charger (Faster):</h2>
          <p>
          A common choice for homes and public stations, Level 2 chargers utilize a 240-volt outlet (similar to a dryer) and provide a significant speed boost, adding about 25-50 miles of range per hour.
          </p>
        </div>
        <div className="flexcontents">
          <div className="HomeFlexImage3"></div>
          <h2 className="headingInsideFlextop">DC Fast Charger (Fastest):</h2>
          <p>
            LThese chargers deliver the quickest charging speeds, using high-voltage direct current (DC) output, typically 480 volts or higher. They can add hundreds of miles of range within 30-60 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeTopFlex;
