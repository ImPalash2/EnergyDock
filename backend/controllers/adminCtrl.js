import userModel from "../models/userModel.js";
import stationMasterModel from "../models/stationMasterModel.js";

//get all users
const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while getting users" });
  }
};

//get all charging stations
const getAllChargingStationsCtrl = async (req, res) => {
  try {
    const stations = await stationMasterModel.find({});
    res.status(200).send({
      success: true,
      message: "Charging stations data",
      data: stations,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while getting the stations" });
  }
};

const accountStatusCtrl = async (req, res) => {
  try {
    const { stationId, status } = req.body;
    const stationMaster = await stationMasterModel.findByIdAndUpdate(
      stationId,
      { status }
    );
    const user = await userModel.findOne({ _id: stationMaster.userId });
    const notification = user.notification;
    notification.push({
      type: "station Master request updated",
      message: `Your request for add a station is ${status}`,
      data: {
        stationId: stationId,
        onClikPath: "/notification",
      },
    });
    user.isStationMaster = true;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account status updated.",
      data: stationMaster,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while changing the status!",
    });
  }
};

const profileCtrl = async (req, res) => {
  try {
    const admin = await userModel.findOne({
      _id: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Station Fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

export {
  getAllUsersCtrl,
  getAllChargingStationsCtrl,
  accountStatusCtrl,
  profileCtrl,
};
