import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";



const Bookings = () => {
  const { user } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState();
  const navigate = useNavigate();
  const getBookings = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/user-bookings",
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "1",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      render: (text, record) => <span>{record.stationInfo.stationName}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "3",
      render: (text, record) => <span>+91{record.stationInfo.phone}</span>,
    },
    {
      title: "Date & time",
      dataIndex: "date",
      key: "4",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")},
          {moment(record.startTime).format("HH:mm")}-
          {moment(record.endTime).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Charger type",
      dataIndex: "chargerType",
      key: "5",
      render: (text, record) => (
        <span>
          {console.log(record)}
          {record.stationInfo.chargerType}
        </span>
      ),
      
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "6",
    },
    {
      title: "Make Payment",
      dataIndex: "payment",
      key: "7",
      render: (record) => (
        <div>
          {record === "pending" ? (
            <button className="btn btn-success" onClick = {()=> {navigate("/payments");console.log("hello")}}>Make Payment</button>
          ) : (
            <span>Done</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2 className="text-center mt-4">Slot Booking History</h2>
      <Table
        columns={columns}
        dataSource={bookings}
        bordered
        className="m-5 mt-3"
      />
    </Layout>
  );
};

export default Bookings;
