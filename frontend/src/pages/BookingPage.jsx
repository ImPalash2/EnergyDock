import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [stations, setStations] = useState();
  const [date, setDate] = useState();
  const [timings, setTiminings] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  // const isAvailable = useRef(false);
  const getStations = async () => {
    try {
      const res = await axios.post(
        "/api/v1/station/getStationById",
        { stationId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    try {
      if (!date || !timings) {
        return alert("Date and time is required!");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-slot",
        {
          stationId: params.id,
          userId: user._id,
          stationInfo: stations,
          userInfo: user,
          date: date,
          startTime: timings[0],
          endTime: timings[1],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
      navigate("/");
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const handleAvailability = async () => {
    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/check-availability",
        {
          date: date,
          startTime: timings[0],
          endTime: timings[1],
          stationId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getStations();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // console.log(isAvailable);
  }, [isAvailable]);
  return (
    <Layout>
      <div className="container">
        {stations && (
          <div>
            <h4
              className="text-center"
              style={{ fontSize: "2rem", padding: "1rem" }}
            >
              Booking Page
            </h4>
            <div style={{ paddingTop: "1rem", paddingLeft: "3rem" }}>
              <div className="mb-2">
                <b>Station Name:</b> {stations.stationName}
              </div>
              <div className="mb-2">
                <b>Phone no:</b> +91{stations.phone}
              </div>
              <div className="mb-2">
                <b>Address:</b> {stations.address}
              </div>
              <div className="mb-2">
                <b>Zip-Code:</b> {stations.zipCode}
              </div>
              <div className="mb-2">
                <b>Fees Per Ten minits:</b>{" "}
                <i className="fa-solid fa-indian-rupee-sign" />
                {stations.feesPerTenMinits}Rs.
              </div>
              <div className="mb-2">
                <b>Select Date:</b>
                <br />
                <DatePicker
                  format={"DD-MM-YYYY"}
                  style={{
                    width: "90%",
                    outline: "1px solid grey",
                  }}
                  onChange={(value) => {
                    setDate(moment(value.$d).format("DD-MM-YYYY"));
                  }}
                />
              </div>
              <div className="mb-2">
                <b>Selcet Time:</b>
                <br />
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  style={{
                    width: "90%",
                    outline: "1px solid grey",
                  }}
                  onChange={(values) => {
                    setTiminings([
                      moment(values[0].$d).format("HH:mm"),
                      moment(values[1].$d).format("HH:mm"),
                    ]);
                  }}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{
                  width: "90%",
                  padding: "0.6rem",
                  fontSize: "1.1rem",
                  borderRadius: "0.8rem",
                }}
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              {isAvailable && (
                <button
                  className="btn btn-success"
                  style={{
                    width: "90%",
                    padding: "0.6rem",
                    fontSize: "1.1rem",
                    borderRadius: "0.8rem",
                  }}
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default BookingPage;
