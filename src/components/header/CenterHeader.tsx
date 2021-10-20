import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AppContext from "../../providers/AppContext";
import { ToastContext } from "../../providers/ToastProvider";
import { Group } from "../../types";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppToast from "../layout/AppToast";

const CenterHeader = () => {
  return (
    <Row>
      <Col>
        <AppToast />
      </Col>
    </Row>
  );
};

export default CenterHeader;
