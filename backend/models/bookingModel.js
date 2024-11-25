import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    stationId: {
      type: String,
      required: true,
    },
    stationInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Bookings", bookingSchema);

export default bookingModel;
