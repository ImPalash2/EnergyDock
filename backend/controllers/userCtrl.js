import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import stationMasterModel from "../models/stationMasterModel.js";
import bcrypt from "bcryptjs";
import bookingModel from "../models/bookingModel.js";
import moment from "moment";

console.log("Inside userCtrl.js");

//register callback function
const registerController = async (req, res) => {
  console.log("Inside registerController");
  try {
    const { email, password, confirmPassword } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    if (password !== confirmPassword) {
      return res
        .status(200)
        .send({ message: "Confirm Password doesn't match", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found.", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Password.", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login` });
  }
};
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(200).send({
        message: "User not found.",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isStationMaster: user.isStationMaster,
          _id: user._id,
          notification: user.notification,
          seenNotification: user.seenNotification,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

const smCtrl = async (req, res) => {
  try {
    const existing = await stationMasterModel.find({ userId: req.body.userId });
    if (existing.length) {
      return res.status(200).send({
        message: "Already exists.",
        success: false,
      });
    }
    const newStation = await stationMasterModel({
      ...req.body,
      status: "pending",
    });
    await newStation.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (adminUser) {
      const notification = adminUser.notification;
      notification.push({
        type: "apply-for-add-new-station",
        message: `${newStation.fName} ${newStation.lName} has applied for adding a new charging station named ${newStation.stationName}`,
        onClickPath: "/admin/stations",
        data: {
          stationId: newStation._id,
          name: newStation.fName + " " + newStation.lName,
          stationName: newStation.stationName,
        },
      });
      await userModel.findByIdAndUpdate(adminUser._id, { notification });
    }
    res.status(201).send({
      message: "Details captured successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while apply for add a new charging station",
      error,
    });
  }
};

const notificationCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const notification = user.notification;
    const seenNotification = user.seenNotification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = seenNotification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications mark as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting notifications",
      error,
    });
  }
};

const notificationDeleteCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.seenNotification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All read notifications are deleted.",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting the notifications",
      error,
    });
  }
};

const updateProfileCtrl = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res
      .status(201)
      .send({ success: true, message: "Profile Updated", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const bookSlotCtrl = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.startTime = moment(req.body.startTime, "HH:mm").toISOString();
    req.body.endTime = moment(req.body.endTime, "HH:mm").toISOString();
    req.body.status = "pending";
    req.body.payment = "pending";
    const newBooking = new bookingModel(req.body);
    await newBooking.save();
    const user = await userModel.findOne({ _id: req.body.stationInfo.userId });
    user.notification.push({
      type: "New-booking-request",
      message: `A new booking request from ${req.body.userInfo.name}`,
      onClickPath: "/user/bookings",
    });
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "Successfully slot booked" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Erorr in booking slot!", error });
  }
};

const checkAvailabilityCtrl = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.startTime, "HH:mm").toISOString();
    const toTime = moment(req.body.endTime, "HH:mm").toISOString();
    const stationId = req.body.stationId;
    const bookings = await bookingModel.find({
      stationId,
      date,
      startTime: { $gte: fromTime },
      endTime: { $lte: toTime },
    });
    console.log(bookings.length);
    if (bookings.length) {
      return res.status(200).send({
        success: false,
        message: "Slot is not Available at this time!",
      });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "This slot is Available" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const userBookingCtrl = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

export {
  loginController,
  registerController,
  authController,
  smCtrl,
  notificationCtrl,
  notificationDeleteCtrl,
  updateProfileCtrl,
  bookSlotCtrl,
  checkAvailabilityCtrl,
  userBookingCtrl,
};

console.log("After userCtrl.js");
