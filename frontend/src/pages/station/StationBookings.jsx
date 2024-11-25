import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const StationBookings = () => {
  const { user } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState();

  const getBookings = async () => {
    try {
      const res = await axios.post(
        "/api/v1/station/station-bookings",
        {
          stationId: user?._id,
        },
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

  const handleStatus = async (record, status) => {
    try {
      console.log(record);
      const res = await axios.post(
        "/api/v1/station/update-status",
        {
          bookingId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getBookings();
      }
    } catch (error) {
      console.log(error);
      message.error("Something happend wrong while updating status!");
    }
  };
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
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "3",
      render: (text, record) => <span>{record.userInfo.email}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "4",
      render: (text, record) => (
        <span>{moment(record.date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "8",
      render: (text, record) => (
        <span>
          {moment(record.startTime).format("HH:mm")}-
          {moment(record.endTime).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
    },
    {
      title: "Payment",
      key: "6",
      dataIndex: "payment",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "7",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "Approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-3"
                onClick={() => handleStatus(record, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2 className="text-center mt-4">Slot Booking requests</h2>
      <Table
        columns={columns}
        dataSource={bookings}
        bordered
        className="m-5 mt-3"
      />
    </Layout>
  );
};

export default StationBookings;
