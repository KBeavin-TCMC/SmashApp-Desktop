import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, ListGroup, Row, Tab } from 'react-bootstrap';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import AppTextInput from '../../components/layout/AppTextInput';

import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { VOrder } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';

const OrderDetailsScreen = (props: any) => {
  const { REACT_APP_TCMC_URI } = process.env;
  let route: any = useParams();
  let location: any = useLocation();
  let history: any = useHistory();
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [order, setOrder] = useState({
    _id: '',
    account_id: '',
    contact_id: '',
    group_id: '',
    job_id: '',
    location_id: '',
    route_id: '',
    document_id: [''],
    status: '',
    serviceType: '',
    scheduledOn: '',
    scheduledOnDuration: '',
    subtotal: '',
    summary: '',
    label: '',
    discountNotes: '',
    discount: '',
    tips: '',
    price: '',
    completedOn: '',
    total: '',
    newBusiness: false,
    smashOfTheWeek: false,
    avgPreSmashFullness: '',
    avgPostSmashFullness: '',
    dumpsterID: '',
    dumpstersSmashed: '',
    haul: false,
    smashNotes: '',
    wasSmashPerformed: false,
    notes: '',
  
    dateCreated: '',
    dateLastEdited: '',
    isActive: false,
    name: '',
    order_id: '',
    vonigo_order_id: '',
  });

  useEffect(() => {
    const getOrderDetails = async () => {
      fetch(`${REACT_APP_TCMC_URI}/api/vordersBy`, {
        method: "POST",
        headers: { "Content-type": "application/json", "x-access-token": token },
        body: JSON.stringify({ _id: route.id }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (isSuccessStatusCode(json.status)) {
            setOrder(json.data[0]);
          } else {
            show({ message: json.message });
          }
        })
        .catch((err) => {
          show({ message: err.message });
        });
    };
    getOrderDetails();
    console.log('order: ', order);
  }, [grpId, token, REACT_APP_TCMC_URI, route.id]);

  return (
    <>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#details">
        <Row>
          <Col
            style={{ marginRight: '-40px', marginLeft: '15px', marginTop: '40px' }}
            sm={1}
          >
            <ListGroup>
              <ListGroup.Item style={{ padding: 0, borderRadius: '.35rem 0 0 0', paddingLeft: '5px' }} action href="#details">
                Details
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#service">
                Service
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={11}>
            <Card
              style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%' }}
              className='m-3'
            >
              <Card.Header as="h5">
                <Row>
                  <Col sm='10'>
                    Order: {order?.order_id}
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Tab.Content>
                  <Tab.Pane eventKey="#details">
                    <Row>
                      <Col md={6}>
                        <AppTextInput
                          label='Client'
                          value={order.account_id}
                          onChange={() => null}
                          type='text'
                          disabled
                        />
                        <AppTextInput
                          label='Contact'
                          value={order.contact_id}
                          onChange={() => null}
                          type='text'
                          disabled
                        />
                      </Col>
                      <Col md={6}>

                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#service">
                    <Row>
                      <Col md={6}>
                        <AppTextInput
                          label='Pre Smash Fullness %'
                          value={order.avgPreSmashFullness}
                          onChange={(val: any) => setOrder({...order, avgPreSmashFullness: val})}
                          type='number'
                        />
                        <AppTextInput
                          label='Post Smash Fullness %'
                          value={order.avgPostSmashFullness}
                          onChange={(val: any) => setOrder({...order, avgPostSmashFullness: val})}
                          type='number'
                        />
                      </Col>
                      <Col md={6}>

                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default OrderDetailsScreen;