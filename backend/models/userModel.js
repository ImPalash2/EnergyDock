import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

console.log("Inside userModel.js");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isStationMaster: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seenNotification: {
    type: Array,
    default: [],
  },
});
userSchema.plugin(findOrCreate);
const userModel = mongoose.model("User", userSchema);
export default userModel;

console.log("After userModel.js");
