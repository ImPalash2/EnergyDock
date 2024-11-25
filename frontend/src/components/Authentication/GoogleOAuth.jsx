import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GoogleOAuth = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      // console.log(credentialResponse);
      const res = await axios.post(
        "api/v1/user/googleAuth",
        credentialResponse
      );
      //   console.log(res);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        // width={"325px"}
        theme="filled_blue"
        shape="circle"
        text="continue_with"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;
