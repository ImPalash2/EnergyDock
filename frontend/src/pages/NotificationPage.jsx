import Layout from "../components/Layout";
import React from "react";
import "../styles/notifications.css";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const NotificationPage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-read-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const items = [
    {
      key: "1",
      label: "All",
      children: (
        <>
          {user?.notification.map((msg) => {
            return (
              <div className="card notiCard">
                <div className="card-text">{msg.message}</div>
              </div>
            );
          })}
          {user?.seenNotification.map((msg) => {
            return (
              <div className="card notiCard">
                <div className="card-text">{msg.message}</div>
              </div>
            );
          })}
        </>
      ),
    },
    {
      key: "2",
      label: "Unread",
      children: user?.notification.map((msg) => {
        return (
          <div className="card notiCard">
            <div className="card-text">{msg.message}</div>
          </div>
        );
      }),
    },
    {
      key: "3",
      label: "Read",
      children: user?.seenNotification.map((msg) => {
        return (
          <div className="card notiCard">
            <div className="card-text">{msg.message}</div>
          </div>
        );
      }),
    },
  ];
  // let btnText = "Mark all as read";
  // const setBtnText = (itemNo) => {
  //   if (itemNo === "3") {
  //     btnText = "Delete all read";
  //   }
  // };
  // useEffect(() => {
  //   setBtnText();
  // }, [btnText, setBtnText]);
  return (
    <Layout>
      <div className="container d-flex flex-column">
        <h4 className="p-3 text-center sticky-top">Notifications Page</h4>

        <div className="noti">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
        <div className="bc d-flex justify-content-center">
          <button
            className="btn mybtn btn-primary "
            onClick={handleMarkAllRead}
          >
            Mark all as read
          </button>
          <button
            className="btn mybtn btn-primary "
            onClick={handleDeleteAllRead}
          >
            Delete all read
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
