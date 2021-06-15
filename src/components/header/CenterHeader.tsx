import React from "react";
import { Link } from "react-router-dom";
import Colors from "../../constants/Colors";
import AppButton from "../layout/AppButton";

const CenterHeader = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "3vw", marginRight: "3vw" }}>
        <AppButton
          label={"Franchise Name"}
          onClick={() => null}
          backgroundColor={Colors.SMT_Primary_1_Dark_1}
        />
      </div>
      <div
        style={{ alignSelf: "center", marginLeft: "1vw", marginRight: "1vw" }}
      >
        <Link to="/crm">
          <AppButton size={"sm"} label="CRM" onClick={() => null} />
        </Link>
        <Link to="/orders">
          <AppButton size={"sm"} label="Orders" onClick={() => null} />
        </Link>
        <Link to="/routes">
          <AppButton size={"sm"} label="Routes" onClick={() => null} />
        </Link>
        <Link to="/invoices">
          <AppButton size={"sm"} label="Invoices" onClick={() => null} />
        </Link>
      </div>
    </div>
  );
};

export default CenterHeader;
