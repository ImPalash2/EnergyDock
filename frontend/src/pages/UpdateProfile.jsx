import { Form, Input, Row, Col, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Layout from "../components/Layout";
import "../styles/ApplyMaster.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateProfile = (props) => {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const [station, setStation] = useState(null);
  //get Station detatis
  const params = useParams();
  const getStationInfo = async () => {
    try {
      const res = await axios.post(
        `/api/v1/${props.path1}`,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `/api/v1/${props.path2}`,
        { ...value, userId: user._id },
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  return (
    <>
      <Layout>
        {station && (
          <Form
            layout="vertical"
            onFinish={finishHandler}
            className="stationForm"
            initialValues={station}
          >
            <h2 className="text-center">Manage Profile</h2>
            {props.owner === "stationMaster" ? (
              <>
                <Row gutter={30}>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="First Name" name="fName" required>
                      <Input
                        type="text"
                        placeholder="Enter your First name"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="Last Name" name="lName" required>
                      <Input
                        type="text"
                        placeholder="Enter your Last name"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Charging Station's Name"
                      name="stationName"
                      required
                    >
                      <Input
                        type="text"
                        placeholder="Enter your charging station's name"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="Email" name="email" required>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="Phone no" name="phone" required>
                      <Input
                        type="text"
                        placeholder="Enter your Phone number"
                        required
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="Website (if any)" name="website">
                      <Input
                        type="text"
                        placeholder="Enter the link of your website"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Fees per Ten minit Charge"
                      name="feesPerTenMinits"
                      required
                    >
                      <Input
                        type="text"
                        placeholder="Enter the fees for ten minit charging"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={16} lg={16}>
                    <Form.Item label="Address" name="address" required>
                      <Input
                        type="text"
                        placeholder="Enter station's Address"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item label="Zip code" name="zipCode" required>
                      <Input
                        type="text"
                        placeholder="Enter Zip code"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item label="Latitued" name="latitued" required>
                      <Input
                        type="text"
                        placeholder="Enter latitued"
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8} lg={8}>
                    <Form.Item label="Longitued" name="longitued" required>
                      <Input
                        type="text"
                        placeholder="Enter longitued "
                        required
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row gutter={30}>
                  <Col xs={24} md={24} lg={24}>
                    <Form.Item className="items" label="Name" name="name">
                      <Input
                        type="text"
                        placeholder="Enter your name "
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={24}>
                    <Form.Item className="items" label="Email" name="email">
                      <Input
                        type="email"
                        placeholder="Enter your Email "
                        required
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={24}>
                    <Form.Item
                      className="items"
                      label="Password"
                      name="password"
                    >
                      <Input
                        type="password"
                        placeholder="Enter your Password "
                        required
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            <Form.Item>
              <button className="btn btn-primary">Update</button>
            </Form.Item>
          </Form>
        )}
      </Layout>
    </>
  );
};
export default UpdateProfile;
