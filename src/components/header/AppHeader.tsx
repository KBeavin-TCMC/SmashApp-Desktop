import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Colors from "../../constants/Colors";
import "../../content/styles/App.css";
import CenterHeader from "./CenterHeader";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const AppHeader = () => {

  return (
    // <nav className='app-header'>
    // <Container fluid>
    // <Row>
    //   <Col>
    //     <LeftHeader />
    //   </Col>
    //   {/* <Col>
    //     <CenterHeader />
    //   </Col> */}
    //   <Col>
    //     <RightHeader />
    //   </Col>
    // </Row>
    // </Container>
    // </nav>

    <Navbar
      style={{paddingTop: 0, paddingBottom: 0}}
      className="app-header"
      expand="sm"
    >
      <Container fluid>
        <LeftHeader />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <RightHeader />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
