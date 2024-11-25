import React from "react";
import {
  adminLeftNav,
  adminRightNav,
  stationMasterLeftNav,
  stationMasterRightNav,
  userLeftNav,
  userRightNav,
} from "../components/data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const leftNav = user?.isAdmin
    ? adminLeftNav
    : user?.isStationMaster
    ? stationMasterLeftNav
    : userLeftNav;
  const rightNav = user?.isAdmin
    ? adminRightNav
    : user?.isStationMaster
    ? stationMasterRightNav
    : userRightNav;

  rightNav === stationMasterRightNav &&
    (rightNav[0].path = `/station/profile/${user?._id}`);

  rightNav === userRightNav &&
    (rightNav[0].path = `/user/profile/${user?._id}`);

  rightNav === adminRightNav &&
    (rightNav[0].path = `/admin/profile/${user?._id}`);

  return (
    <>
      <nav
        className="navbar"
        data-bs-theme="dark"
        style={{ background: "linear-gradient(to bottom, #0f969c, #6da5c0)" }}
      >
        <div className="left">
          <div className="nameLogo" onClick={() => navigate("/")}>
            <i className="fa-2xl fa-solid fa-bolt" />
            <h5>Charge</h5>
          </div>
          {leftNav.map((item) => {
            return (
              <div className="listItemContainer" key={item.id}>
                <Link to={item.path}>
                  <i className={item.icon} />
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="right">
          <div className="listItemContainer">
            <Link to="/notifications">
              <Badge
                count={user && user.notification.length}
                // count={5}
                offset={[-3, 1]}
                size="small"
              >
                <i className="fa-solid fa-bell" />
              </Badge>
            </Link>
          </div>
          {rightNav.map((item) => {
            return (
              <div className="listItemContainer" key={item.id}>
                <Link to={item.path}>
                  <i className={item.icon} />
                  {item.name === "Profile"
                    ? user?.name
                      ? user.name
                      : "Profile"
                    : item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
