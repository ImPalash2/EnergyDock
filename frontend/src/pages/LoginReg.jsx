import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleOAuth from "../components/Authentication/GoogleOAuth";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/loginReg.css";

console.log("Inside LoginReg.jsx");

function LoginReg(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function finishHandler(value) {
    // console.log(value);
    console.log("Inside finishHandler");
    try {
      const endPoint = props.action === "Login" ? "login" : "register";
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/user/${endPoint}`, value);
      dispatch(hideLoading());
      if (res.data.success) {
        if (props.action === "Register") {
          message.success("Register Successfully.");
          navigate("/login");
        } else if (props.action === "Login") {
          localStorage.setItem("token", res.data.token);
          message.success("Logged in successfully.");
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  }
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" className="form" onFinish={finishHandler}>
          <h3>{props.action}</h3>
          <Form.Item className="items1">
            <GoogleOAuth />
          </Form.Item>
          <Form.Item className="items1">
            <p>or</p>
          </Form.Item>
          {props.action === "Register" && (
            <Form.Item className="items" label="Name" name="name">
              <Input type="text" placeholder="Enter your name " required />
            </Form.Item>
          )}
          <Form.Item className="items" label="Email" name="email">
            <Input type="email" placeholder="Enter your Email " required />
          </Form.Item>
          <Form.Item className="items" label="Password" name="password">
            <Input
              type="password"
              placeholder="Enter your Password "
              required
            />
          </Form.Item>
          {props.action === "Register" && (
            <Form.Item
              className="items"
              label="Confirm Password"
              name="confirmPassword"
            >
              <Input
                type="password"
                placeholder="Enter your Password again"
                required
              />
            </Form.Item>
          )}
          <Form.Item>
            <button className="btn btn-primary">{props.action}</button>
          </Form.Item>
          <Link to={props.action === "Login" ? "/register" : "/login"}>
            {props.action === "Register"
              ? "Already registerd? Login here"
              : "Not Register yet? Register here"}
          </Link>
        </Form>
      </div>
    </>
  );
}
export default LoginReg;

console.log("After LoginReg.jsx");
