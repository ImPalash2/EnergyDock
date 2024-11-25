import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import "./images/icon2.png"; // Import your marker icon

import "mapbox-gl/dist/mapbox-gl.css";

import "../styles/map.css"; // Add your CSS styles

const Map = () => {
  const [stations, setStations] = useState();
  const getStations = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllChargingStations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setStations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStations();
    // eslint-disable-next-line
  }, []);

  const boroughs1 = [];
  stations?.forEach((station) => {
    boroughs1.push({
      name: station.stationName,
      lnglat: [station.longitued, station.latitued],
    });
  });

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3VyeWExMi0zNCIsImEiOiJjbDJuaHRldDIwYXdoM2dtZmhwOWY5dmgwIn0.ElJo8eDE87OClbeteZDC-Q";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.080078, 22.350076],
      zoom: 4,
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      "top-left"
    );

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    const boroughs = [
      {
        name: "Charging station 1 contact no:- 8100028494",
        lnglat: [88.23693, 22.509365],
      },
      {
        name: "Charging station 2 contact no:- 1233433434",
        lnglat: [88.212426, 22.500485],
      },
      {
        name: "Charging station 3 contact no:- 7548392912",
        lnglat: [88.235128, 22.492555],
      },
      {
        name: "Charging station 4 contact no:- 7529362912",
        lnglat: [88.22080,22.47561],
      },
    ];

    boroughs.forEach(({ name, lnglat }) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);
      const el = document.createElement("div");
      el.id = "map-marker";
      const marker = new mapboxgl.Marker(el)
        .setLngLat(lnglat)
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove(); // Cleanup on unmount
    // eslint-disable-next-line
  }, []); // Run only once when component mounts

  return (
    <div
      id="map"
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    ></div>
  );
};

export default Map;
