import React from "react";
import axios from "axios";
import Layout from "../components/Layout";

import "../styles/pay.css";

const PaymentContainer = () => {
  const [amount, setAmount] = React.useState("");
  const [orderId, setOrderId] = React.useState("");

  const handleCreateOrder = async () => {
    try {
      var url = "/api/payment/order";
      var params = {
        amount,
        currency: "INR",
        receipt: "EnergyDock",
        payment_capture: "1",
      };
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function (res) {
        if (xmlHttp.readyState === 4) {
          res = JSON.parse(xmlHttp.responseText);
          setOrderId(res.sub.id);
        }
      };
      xmlHttp.open("POST", url, true);
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.send(JSON.stringify(params));
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleCheckout = async (e) => {
    const options = {
      key_id: process.env.KEY_ID,
      currency: "INR",
      name: "WTH Coding",
      description: "WtH Coding Transaction",
      order_id: document.getElementById("rzp-text").value,
      handler: function (response) {
        document.getElementById("order-pay-id").value =
          response.razorpay_payment_id;
        document.getElementById("order-id").value = response.razorpay_order_id;
        document.getElementById("order-sig").value =
          response.razorpay_signature;
      },
      theme: {
        color: "#0EB9F2",
      },
    };
    const rzp1 = await axios.post("/api/v1/payment/checkout", {
      options,
    });
    // rzp1.open();
    // e.preventDefault();
  };

  const handleVerify = async () => {
    // try {
    //   const response = await fetch("/api/payment/verify", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       razorpay_order_id: document.getElementById("order-id").value,
    //       razorpay_payment_id: document.getElementById("order-pay-id").value,
    //       razorpay_signature: document.getElementById("order-sig").value,
    //     }),
    //   });
    //   const message = await response.text();
    //   alert(message);
    // } catch (error) {
    //   console.error("Error verifying payment:", error);
    // }
  };

  return (
    <Layout>
      <div className="paycontainer">
        <h1>Pay effortlessly</h1>
        <label htmlFor="order-amt">Amount: </label>
        <input
          type="text"
          id="order-amt"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button id="order-button1" onClick={handleCreateOrder}>
          Create Order
        </button>
        <br />
        <hr />
        <label htmlFor="rzp-text">Order id: </label>
        <input type="text" id="rzp-text" value={orderId} disabled />
        <br />
        <button id="rzp-button1" disabled={!orderId} onClick={handleCheckout}>
          Checkout
        </button>
        <div id="paymentDetails"></div>

        <br />
        <hr />
        <label htmlFor="order-id">Order id :</label>
        <input type="text" id="order-id" />
        <br />
        <label htmlFor="order-pay-id">Payment id :</label>
        <input type="text" id="order-pay-id" />
        <br />
        <label htmlFor="order-sig">Order signature :</label>
        <input type="text" id="order-sig" />
        <br />
        <button id="verify-button1" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </Layout>
  );
};

export default PaymentContainer;
