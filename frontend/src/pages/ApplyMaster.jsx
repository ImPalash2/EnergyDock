import { Form, Input, Row, Col, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Layout from "../components/Layout";
import "../styles/ApplyMaster.css";
import { useNavigate } from "react-router-dom";

const ApplyMaster = (props) => {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-for-station-master",
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
        <Form
          layout="vertical"
          onFinish={finishHandler}
          className="stationForm"
          initialValues={props.data}
        >
          <h2 className="text-center">{props.heading}</h2>
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
                <Input type="email" placeholder="Enter your email" required />
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
              <Form.Item label="Charger type" name="chargerType" required>
                <Input
                  type="text"
                  placeholder="Enter your charger type"
                  required
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
                <Input type="text" placeholder="Enter Zip code" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <Form.Item label="Latitued" name="latitued" required>
                <Input type="text" placeholder="Enter latitued" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <Form.Item label="Longitued" name="longitued" required>
                <Input type="text" placeholder="Enter longitued " required />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <button className="btn btn-primary">Submit</button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};
export default ApplyMaster;
