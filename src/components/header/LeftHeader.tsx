import { Row, Col } from "react-bootstrap";
import AppToast from "../layout/AppToast";


const LeftHeader = () => {
  return (
    <Row>
      <Col>
        <div className='header-image'></div>
      </Col>
      <Col style={{position: 'relative', top: '4px'}}>
        <AppToast/>
      </Col>
    </Row>
  );
};

export default LeftHeader;
