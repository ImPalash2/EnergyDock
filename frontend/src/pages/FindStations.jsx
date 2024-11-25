import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const FindStations = () => {
  const navigate = useNavigate();
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
    // eslint-disable-next-line
  }, []);
  // const booking = (record) => {
  //   console.log(record);
  // };
  const columns = [
    {
      title: "Charging station's Name",
      dataIndex: "stationName",
      key: "1",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "2",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "3",
    },
    {
      title: "Fees per ten minits",
      dataIndex: "feesPerTenMinits",
      key: "4",
    },
    {
      title: "Distance",
      dataIndex: "name",
      key: "5",
      render: (record) => <div>1.6km</div>,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "6",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-danger">Not approved</button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => navigate(`/station/slot-booking/${record.userId}`)}
              // onClick={() => booking(record)}
            >
              Book Now
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
      />
    </Layout>
  );
};

export default FindStations;
