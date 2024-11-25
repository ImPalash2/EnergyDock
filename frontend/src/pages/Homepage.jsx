import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Homepage1 from "./Homepage1";
import Footer from "./Footer";

console.log("Inside Homepage.jsx");

function Homepage() {
  const getUserData = async () => {
    try {
      await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("inside getUserData");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Layout>
        <div className="main">
          <Homepage1 />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
export default Homepage;

console.log("After Homepage.jsx");
