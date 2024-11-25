import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import findOrCreate from "mongoose-findorcreate";
const googleAuthController = async (req, res) => {
  try {
    const decodedInfo = jwtDecode(req.body.credential);
    // console.log(decodedInfo);
    const isSuccess = await userModel.findOrCreate(
      { email: decodedInfo.email },
      { name: decodedInfo.name, email: decodedInfo.email }
    );
    if (!isSuccess) {
      return res
        .status(200)
        .send({ message: "User not found nor Created!", success: false });
    } else {
      const user = await userModel.findOne({ email: decodedInfo.email });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(`token:${token}`);
      return res
        .status(200)
        .send({ message: "Logged in successfully", success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Google Auth Error!", success: false, error });
  }
};
export default googleAuthController;
