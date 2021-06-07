import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import "../../content/styles/App.css";
import AppContext from "../../providers/AppContext";
import CenterHeader from "./CenterHeader";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const AppHeader = () => {
  const { isAuth } = useContext(AppContext);

  return (
    <header style={{ backgroundColor: Colors.SMT_Primary_2 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: ".5vh",
            paddingBottom: ".5vh",
          }}
        >
          <LeftHeader />
          <CenterHeader />
          <RightHeader />
        </div>
    </header>
  );
};

export default AppHeader;
