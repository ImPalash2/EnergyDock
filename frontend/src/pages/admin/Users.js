import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState();
  //get all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  //antd table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Station Master",
      dataIndex: "isStationMaster",
      render: (text, record) => (
        <span>{record.isStationMaster ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h2 className="text-center m-3">Users List</h2>
      <Table
        columns={columns}
        dataSource={users}
        bordered
        size="large"
        style={{ marginLeft: 60, marginRight: 60 }}
      />
    </Layout>
  );
};

export default Users;
