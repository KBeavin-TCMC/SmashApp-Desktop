import React, { useContext, useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { Card, Row, Col } from 'react-bootstrap';
import AppTitle from '../components/layout/AppTitle';
import Colors from '../constants/Colors';
import useDates from '../hooks/useDates';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { VOrder } from '../types/orders';
import { VRoute } from '../types/routes';
import { isSuccessStatusCode } from '../utils/Helpers';

const SchedulesScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const { addDays, getSelectedDateRange } = useDates();
  const [date, setDate] = useState<Date>(new Date());
  const [vroutes, setVRoutes] = useState<VRoute[]>([]);
  const [vorders, setVOrders] = useState<VOrder[]>([]);

  useEffect(() => {
    getVRoutes();
  }, []);

  useEffect(() => {
    getVOrders();
  }, [date]);

  const getVRoutes = () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/vroutesBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setVRoutes(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getVOrders = () => {
    let dateObj = getSelectedDateRange(date);
    console.log(dateObj)
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/vordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, status: {$nin: ["Cancelled", "Cancelled - Recurrence"]}, scheduledOn: {$gt: dateObj.gte, $lt: dateObj.lt} }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setVOrders(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        console.log('err: ', err);
        show({ message: err.message });
      });
  };

  const handleChangeDay = (action: string) => {
    if (action === 'prev') {
      setDate(addDays(date, -1));
    } else {
      setDate(addDays(date, 1));
    }
  }

  return (
    <>
      <Card
        style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%' }}
        className='m-3'
      >
        <Card.Header as="h5">
          <Row>
            <Col sm='10'>
              Schedule
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ height: '100%' }}>
          <Row>
            <Col
              sm='12'
              style={{ backgroundColor: Colors.SMT_Secondary_1_Light_1, padding: '10px', fontSize: 20 }}
            >
              <BiChevronLeftCircle style={{marginLeft: '15px'}} size={25} onClick={() => handleChangeDay('prev')}/>
              <BiChevronRightCircle style={{marginLeft: '15px'}} size={25} onClick={() => handleChangeDay('next')}/>
              <span style={{fontSize: 20, position: 'relative', top: 2, marginLeft: '15px'}}>{date.toLocaleDateString()}</span>
            </Col>
            <Col sm='12'>
              <Row>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">Trucks</Col>
                    {vroutes.map(u => {
                      return (
                        <Col key={u._id} xs={12}>{u.abbreviation}</Col>
                      )
                    })}
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>6</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    {/* <Col xs={12}>
                    
                    </Col> */}
                    {vorders.map(u => {
                      return (
                        <Col key={u._id} xs={12}>{u.order_id}</Col>
                      )
                    })}
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>7</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>8</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>9</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>10</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>11</span>
                      <span className="schedule-sm-span">AM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>12</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>1</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>2</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>3</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>4</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>5</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>6</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>7</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>8</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>9</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
                <Col className="schedule-col">
                  <Row>
                    <Col xs={12} className="schedule-header">
                      <span>10</span>
                      <span className="schedule-sm-span">PM</span>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                </Col>
              </Row>
              <Row>

              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default SchedulesScreen;