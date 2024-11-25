import express from "express";
import auth from "../middlewares/auth.js";
import {
  getStationByIdCtrl,
  getStationInfoCtrl,
  stationBookingCtrl,
  updateProfileCtrl,
  updateStatusCtrl,
} from "../controllers/stationsCtrl.js";

const stationRoutes = express.Router();

//get station info
stationRoutes.post("/getStationInfo", auth, getStationInfoCtrl);

//update stationMaster's profile
stationRoutes.post("/update-profile", auth, updateProfileCtrl);

//get single station informations
stationRoutes.post("/getStationById", auth, getStationByIdCtrl);

//get all slot bookings
stationRoutes.post("/station-bookings", auth, stationBookingCtrl);

//update status
stationRoutes.post("/update-status", auth, updateStatusCtrl);

export default stationRoutes;
