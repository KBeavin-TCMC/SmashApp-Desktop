import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Colors from "../../constants/Colors";

const RightHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        marginLeft: "1vw",
        marginRight: "1vw",
      }}
    >
      <Link to="/">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IoPersonCircleOutline
            style={{
              fontSize: 38,
              fontWeight: "bold",
              color: Colors.SMT_Primary_1_Light_1,
            }}
          />
          <div>
            <label style={{ fontSize: 12, color: "white" }}>Dashboard</label>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RightHeader;
