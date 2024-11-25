console.log("Inside server.js");

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import route from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import morgan from "morgan";
import stationRoutes from "./routes/stationRoutes.js";
import bodyParser from "body-parser";
import Razorpay from "razorpay";

dotenv.config();

//database connection
connectDB();

//Creating server
const app = express();
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes for user
app.use("/api/v1/user/", route);
// console.log("Route");

//routes for admin
app.use("/api/v1/admin/", adminRoute);

//routes for charging stations
app.use("/api/v1/station/", stationRoutes);

app.set("view engine", "ejs");

// app.get("/payments", (req, res) => {
//   res.render("payment", { key: process.env.KEY_ID });
// });
app.post("/api/payment/order", (req, res) => {
  const params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

app.post("/api/v1/payment/checkout", (req, res) => {
  req.body.options.key_id = process.env.KEY_ID;
  console.log(req.body);
  const rzp1 = new Razorpay(req.body.options);
  // rzp1.open();
  res.send({ rzp1 });
});

app.post("/api/payment/verify", (req, res) => {
  const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});

//starting server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

console.log("After server.js");
