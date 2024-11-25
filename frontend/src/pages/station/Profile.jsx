import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/profile.css";
import Layout from "../../components/Layout";

const Profile = (props) => {
  const [station, setStation] = useState(null);
  //get Station detatis
  const params = useParams();
  const getStationInfo = async () => {
    try {
      const res = await axios.post(
        `/api/v1/${props.path}`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStation(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while fetching station detatils");
    }
  };
  useEffect(() => {
    getStationInfo();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged Out Successfully");
    navigate("/login");
  };
  return (
    <>
      {station && (
        <Layout>
          <div className="details">
            <h2>Profile Details</h2>
            {props.owner === "stationMaster" ? (
              <>
                <p>
                  <strong>Station Master name :</strong>{" "}
                  {station.fName + " " + station.lName}
                </p>
                <p>
                  <strong>Charging StationName : </strong>
                  {station.stationName}
                </p>
                <p>
                  <strong>Email : </strong>
                  {station.email}
                </p>
                <p>
                  <strong>Phone : </strong>
                  {station.phone}
                </p>
                <p>
                  <strong>Address : </strong>
                  {station.address}
                </p>
                <p>
                  <strong>ZipCode : </strong>
                  {station.zipCode}
                </p>
                <p>
                  <strong>Fess per ten minits : </strong>
                  {station.feesPerTenMinits}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>User name : </strong>
                  {station.name}
                </p>
                <p>
                  <strong>Email : </strong>
                  {station.email}
                </p>
                <p>
                  <strong>Password : </strong>*****
                </p>
              </>
            )}

            <Link className="btn btn-success p-2 mt-3 mb-2" to="update-profile">
              <i className="fa-solid fa-pen-to-square p-1" />
              Edit Profile
            </Link>
            <Link
              className="btn btn-danger p-2 mt-3 mb-2"
              onClick={handleLogout}
              to="/login"
            >
              <i className="fa-solid fa-right-from-bracket p-1"></i>Logout
            </Link>
          </div>
        </Layout>
      )}
      {/* {station && <ApplyMaster data={station} heading="Manage profile" />} */}
    </>
  );
};

export default Profile;
