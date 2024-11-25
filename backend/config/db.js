import mongoose from "mongoose";

console.log("Inside db.js");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected to ${mongoose.connection.host}`);
  } catch (err) {
    console.log(`There is something erorr while connecting database ${err}`);
  }
}
export default connectDB;

console.log("After db.js");
