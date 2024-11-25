import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const ChargingStations = () => {
  const [stations, setStations] = useState();
  const getStations = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllChargingStations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setStations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStations();
  }, []);
  const approveHandler = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccoutStatus",
        {
          stationId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const columns = [
    {
      title: "Charging station's Name",
      dataIndex: "stationName",
    },
    {
      title: "Station Master",
      dataIndex: "name",
      render: (text, record) => (
        <span>{record.fName + " " + record.lName}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => approveHandler(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger" key="300">
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h2 className="text-center m-4">Charging Stations</h2>
      <Table
        columns={columns}
        dataSource={stations}
        bordered
        style={{ marginLeft: 60, marginRight: 60 }}
        // tableLayout="auto"
      />
    </Layout>
  );
};

export default ChargingStations;
