import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AppTitle from '../../components/layout/AppTitle';

const ReportsScreen = () => {
    return (
      <>
      <Card
        style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%' }}
        className='m-3'
      >
        <Card.Header as="h5">
          <Row>
            <Col sm='10'>
              Reports
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ height: '100%' }}>
          <div
            style={{ height: '100%', overflowY: 'auto' }}
          >
            {/* <Table
              ref={dataTable}
              id='table_id'
              style={{ fontSize: '12px' }}
              responsive
              hover
              size="sm"
            >
            </Table> */}
          </div>
        </Card.Body>
      </Card>
    </>
    );
}

export default ReportsScreen;