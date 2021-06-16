import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Colors from "../../constants/Colors";
import AppToast from "../layout/AppToast";

const RightHeader = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end'
      }}
    >
      <div style={{ marginRight: '12vh', display: 'flex', alignSelf: 'stretch'}}>
        <AppToast />
      </div>

      <div
        style={{
          marginLeft: "1vw",
          marginRight: "1vw",
        }}
      >
        <Link to="/dashboard">
          <IoPersonCircleOutline
            style={{
              marginLeft: '10px',
              marginRight: 'auto',
              fontSize: 38,
              fontWeight: "bold",
              color: Colors.SMT_Primary_1_Light_1,
            }}
          />
          <div>
            <label style={{ fontSize: 12, color: "white" }}>Dashboard</label>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RightHeader;
