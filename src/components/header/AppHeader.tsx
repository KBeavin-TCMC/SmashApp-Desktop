import { Col, Container, Row } from "react-bootstrap";
import Colors from "../../constants/Colors";
import "../../content/styles/App.css";
import CenterHeader from "./CenterHeader";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const AppHeader = () => {

  return (
    <nav className='app-header'>
    <Container fluid>
    <Row>
      <Col>
        <LeftHeader />
      </Col>
      {/* <Col>
        <CenterHeader />
      </Col> */}
      <Col>
        <RightHeader />
      </Col>
    </Row>
    </Container>
    </nav>
  );
};

export default AppHeader;
