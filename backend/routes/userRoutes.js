import express from "express";
import {
  authController,
  loginController,
  registerController,
  smCtrl,
  notificationCtrl,
  notificationDeleteCtrl,
  updateProfileCtrl,
  bookSlotCtrl,
  checkAvailabilityCtrl,
  userBookingCtrl,
} from "../controllers/userCtrl.js";
import auth from "../middlewares/auth.js";
import googleAuthController from "../controllers/googleAuthCtrl.js";
import { profileCtrl } from "../controllers/adminCtrl.js";
const route = express.Router();

console.log("Inside userRoute.js");

//LOGIN || POST
route.post("/login", loginController);

//REGISTER || POST
route.post("/register", registerController);

//GoogleAuth || post
route.post("/googleAuth", googleAuthController);

//Auth || post
route.post("/getUserData", auth, authController);

//Register for station Master || POST
route.post("/apply-for-station-master", auth, smCtrl);

//Get all notifications || POST
route.post("/get-all-notification", auth, notificationCtrl);

//delete all read notifications || POST
route.post("/delete-all-read-notification", auth, notificationDeleteCtrl);

//get profile info (post as auth token is send from jsx file)
route.post("/profile", auth, profileCtrl);

//update user profile
route.post("/update-profile", auth, updateProfileCtrl);

//slot booking
route.post("/book-slot", auth, bookSlotCtrl);

//check availability of slot booking
route.post("/check-availability", auth, checkAvailabilityCtrl);

//booking slot lists
route.post("/user-bookings", auth, userBookingCtrl);

export default route;

console.log("After userRoute.js");
