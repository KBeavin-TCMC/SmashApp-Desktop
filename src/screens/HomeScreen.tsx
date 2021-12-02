import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AppTitle from '../components/layout/AppTitle';

const HomeScreen = () => {
  return (
    <Row>
      <Col lg={4}>
        <Card
          style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden' }}
          className='m-3'
        >
          <Card.Header as="h5">
            <Row>
              <Col sm='10'>
                Home
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{ height: '100%' }}>

          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card
          style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden' }}
          className='m-3'
        >
          <Card.Header as="h5">
            <Row>
              <Col sm='10'>
                Home
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{ height: '100%' }}>

          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card
          style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden' }}
          className='m-3'
        >
          <Card.Header as="h5">
            <Row>
              <Col sm='10'>
                Home
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{ height: '100%' }}>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default HomeScreen;