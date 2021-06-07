import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import Colors from "../../constants/Colors";

const RightHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IoPersonCircleOutline
          style={{
            fontSize: 38,
            fontWeight: "bold",
            color: Colors.SMT_Primary_1_Light_1,
          }}
        />
        <div>
          <label style={{ color: "white" }}>Dashboard</label>
        </div>
      </div>
    </div>
  );
};

export default RightHeader;
