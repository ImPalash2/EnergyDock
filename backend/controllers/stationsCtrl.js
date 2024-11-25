import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";
import stationMasterModel from "../models/stationMasterModel.js";

const getStationInfoCtrl = async (req, res) => {
  try {
    const station = await stationMasterModel.findOne({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Station Fetched successfully",
      data: station,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const updateProfileCtrl = async (req, res) => {
  try {
    const station = await stationMasterModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res
      .status(201)
      .send({ success: true, message: "Profile Updated", data: station });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const getStationByIdCtrl = async (req, res) => {
  try {
    const station = await stationMasterModel.findOne({
      userId: req.body.stationId,
    });
    res.status(200).send({
      success: true,
      message: "Successfully fetched info",
      data: station,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const stationBookingCtrl = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ stationId: req.body.stationId });
    res.status(200).send({
      success: true,
      message: "Slot bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something wrong in fetching!", error });
  }
};

const updateStatusCtrl = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await bookingModel.findByIdAndUpdate(bookingId, { status });
    const user = await userModel.findOne({ _id: booking.userId });
    user?.notification.push({
      type: "status-update",
      message: `Your slot booking request is ${status}`,
      onClickPath: "/station-bookings",
    });
    await user?.save();
    res
      .status(200)
      .send({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Erorr in status updating!", error });
  }
};

export {
  getStationInfoCtrl,
  updateProfileCtrl,
  getStationByIdCtrl,
  stationBookingCtrl,
  updateStatusCtrl,
};
