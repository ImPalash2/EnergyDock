import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
// import Homepage1 from "../pages/Homepage1";
import LoginReg from "../pages/LoginReg";
import { useSelector } from "react-redux";
import Spinner from "./spinner";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ApplyMaster from "../pages/ApplyMaster";
import NotificationPage from "../pages/NotificationPage";
import Users from "../pages/admin/Users";
import ChargingStations from "../pages/admin/ChargingStations";
import Profile from "../pages/station/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import FindStations from "../pages/FindStations";
import BookingPage from "../pages/BookingPage";
import Bookings from "../pages/Bookings";
import StationBookings from "../pages/station/StationBookings";
import Map from "./Map";
import About from "../pages/About";
import PaymentContainer from "./PaymentContainer";

console.log("Inside App.jsx");

function App() {
  const { loading } = useSelector((state) => {
    return state.alerts;
  });
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Homepage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <LoginReg action="Login" />
                </PublicRoutes>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoutes>
                  <Map />
                </PrivateRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <LoginReg action="Register" />
                </PublicRoutes>
              }
            />
            <Route
              path="/apply-for-station-master"
              element={
                <PrivateRoutes>
                  <ApplyMaster heading="Apply for add new Charging Station" />
                </PrivateRoutes>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoutes>
                  <NotificationPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoutes>
                  <Users />
                </PrivateRoutes>
              }
            />
            <Route
              path="/admin/charging-stations"
              element={
                <PrivateRoutes>
                  <ChargingStations />
                </PrivateRoutes>
              }
            />
            <Route
              path="/find-all-stations"
              element={
                <PrivateRoutes>
                  <FindStations />
                </PrivateRoutes>
              }
            />
            <Route
              path="/station/slot-booking/:id"
              element={
                <PrivateRoutes>
                  <BookingPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/station/profile/:id"
              element={
                <PrivateRoutes>
                  <Profile
                    path="station/getStationInfo"
                    owner="stationMaster"
                  />
                </PrivateRoutes>
              }
            />
            <Route
              path="/station/profile/:id/update-profile"
              element={
                <PrivateRoutes>
                  <UpdateProfile
                    path1="station/getStationInfo"
                    path2="station/update-profile"
                    owner="stationMaster"
                  />
                </PrivateRoutes>
              }
            />
            <Route
              path="/admin/profile/:id"
              element={
                <PrivateRoutes>
                  <Profile path="admin/profile" />
                </PrivateRoutes>
              }
            />
            <Route
              path="/admin/profile/:id/update-profile"
              element={
                <PrivateRoutes>
                  <UpdateProfile
                    path1="admin/profile"
                    path2="admin/update-profile"
                  />
                </PrivateRoutes>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <PrivateRoutes>
                  <Profile path="user/profile" />
                </PrivateRoutes>
              }
            />

            <Route
              path="/slot-bookings"
              element={
                <PrivateRoutes>
                  <Bookings />
                </PrivateRoutes>
              }
            />
            <Route
              path="/station-bookings"
              element={
                <PrivateRoutes>
                  <StationBookings />
                </PrivateRoutes>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoutes>
                  <About />
                </PrivateRoutes>
              }
            />
            <Route
              path="/payments"
              element={
                <PrivateRoutes>
                  <PaymentContainer />
                </PrivateRoutes>
              }
            />
            <Route
              path="/user/profile/:id/update-profile"
              element={
                <PrivateRoutes>
                  <UpdateProfile
                    path1="user/profile"
                    path2="user/update-profile"
                  />
                </PrivateRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}
export default App;

console.log("After App.jsx");
