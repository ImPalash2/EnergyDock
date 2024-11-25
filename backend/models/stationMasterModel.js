import mongoose from "mongoose";

const stationMasterSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  stationName: {
    type: String,
    required: [true, "station name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is requierd."],
  },
  chargerType: {
    type: String,
    required: true,
  },
  feesPerTenMinits: {
    type: String,
    required: [true, "fees is required."],
  },
  latitued: {
    type: String,
    required: [true, "latitued is required"],
  },
  longitued: {
    type: String,
    required: [true, "longitued is required."],
  },
  status: {
    type: String,
    default: "pending",
  },
});

const stationMasterModel = mongoose.model("stations", stationMasterSchema);

export default stationMasterModel;
