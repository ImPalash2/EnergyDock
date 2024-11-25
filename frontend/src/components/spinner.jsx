import React from "react";
import { RiseLoader } from "react-spinners";
function Spinner() {
  return (
    <div>
      <RiseLoader
        color="#36d7b7"
        cssOverride={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}

export default Spinner;
