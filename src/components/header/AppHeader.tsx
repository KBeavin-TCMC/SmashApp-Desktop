import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import "../../content/styles/App.css";
import AppContext from "../../providers/AppContext";
import AppButton from "../layout/AppButton";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const AppHeader = () => {
 const {isAuth} = useContext(AppContext);

  return (
    <header style={{ backgroundColor: "black" }}>
      <div style={{display: 'flex', flexDirection: 'row',  alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
        {isAuth && (
          <>
            <LeftHeader />
            <div style={{marginLeft: 10, marginRight: 10}}>
              <AppButton label={"Franchise Name"} onClick={() => null} backgroundColor={Colors.SMT_Primary_1_Dark_1} />
            </div>
            <div style={{marginLeft: 10, marginRight: 10}}>
              <AppButton label="CRM" onClick={() => null} />
              <AppButton label="Orders" onClick={() => null} />
              <AppButton label="Routes" onClick={() => null} />
              <AppButton label="Invoices" onClick={() => null} />
            </div>
            <RightHeader />
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
