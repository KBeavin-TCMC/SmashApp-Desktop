import React from "react";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import Colors from "../../constants/Colors";
const LeftHeader = () => {
  return (
    <Link to="/settings">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "1vw",
          marginRight: "1vw",
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
          <label style={{ fontSize: 12, color: "white" }}>Settings</label>
        </div>
      </div>
    </Link>
  );
};

export default LeftHeader;
