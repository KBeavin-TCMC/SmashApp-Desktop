import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Colors from "../../constants/Colors";
const LeftHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <IoSettingsOutline
        style={{
          fontSize: 38,
          fontWeight: "bold",
          color: Colors.SMT_Primary_1_Light_1,
        }}
      />
      <div>
        <label style={{ color: "white" }}>Settings</label>
      </div>
    </div>
  );
};

export default LeftHeader;
