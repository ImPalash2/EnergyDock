import express from "express";
import auth from "../middlewares/auth.js";
import {
  accountStatusCtrl,
  getAllChargingStationsCtrl,
  getAllUsersCtrl,
  profileCtrl,
} from "../controllers/adminCtrl.js";
import { updateProfileCtrl } from "../controllers/userCtrl.js";

const adminRoute = express.Router();

//USERS || GET
adminRoute.get("/getAllUsers", auth, getAllUsersCtrl);

//Chargin Stations || GET
adminRoute.get("/getAllChargingStations", auth, getAllChargingStationsCtrl);

//account status || POST
adminRoute.post("/changeAccoutStatus", auth, accountStatusCtrl);

//profile details || post
adminRoute.post("/profile", auth, profileCtrl);

//update admin profile
adminRoute.post("/update-profile", auth, updateProfileCtrl);

export default adminRoute;
