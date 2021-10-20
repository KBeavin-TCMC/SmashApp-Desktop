import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const CreateInvoiceForm = () => {
    return (
        <>
        <Card
          style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%' }}
          className='m-3'
        >
          <Card.Header as="h5">
            <Row>
              <Col sm='10'>
                Create Invoice
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{ height: '100%' }}>
            <div
              style={{ height: '100%', overflowY: 'auto' }}
            >
            </div>
          </Card.Body>
        </Card>
      </>
    )
}

export default CreateInvoiceForm;