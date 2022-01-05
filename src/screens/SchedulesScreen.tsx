import { useContext, useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import useDates from '../hooks/useDates';
import Colors from '../constants/Colors';
import { VOrder } from '../types/orders';
import { VRoute } from '../types/routes';
import { isSuccessStatusCode } from '../utils/Helpers';
import RouteDetailsScreen from './routes/RouteDetailsScreen';

const availabilityTemplate = [
  'ABBR',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
]

const SchedulesScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show, setLoading, toast } = useContext(ToastContext);
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
          let pnd: VRoute = {
            _id: 'n/a',
            group_id: 'n/a',
            vonigo_route_id: 0,
            type: 'n/a',
            status: 'n/a',
            name: 'Pending Daily (PND)',
            abbreviation: 'PND',
            description: 'n/a',
            office: 'n/a',
            internalDispatchEmail: 'n/a',
            internalDispatchPhone: 'n/a',
            dateCreated: 0,
            dateLastEdited: 0,
            isActive: true
          }
          json.data.push(pnd);
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
    setLoading(true);
    let dateObj = getSelectedDateRange(date);
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/vordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, status: { $nin: ["Cancelled", "Cancelled - Recurrence"] }, scheduledOn: { $gt: dateObj.gte, $lt: dateObj.lt } }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setVOrders(json.data);
          setLoading(false);
        } else {
          show({ message: json.message });
          setLoading(false);
        }
      })
      .catch((err) => {
        show({ message: err.message });
        setLoading(false);
      });
  };

  const updateScheduledOn = async (id: string, routeId: string, time: string) => {
    let timeArr = time.split(':');
    let scheduledOn = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      parseInt(timeArr[0]),
      parseInt(timeArr[1]),
      0
    );

    fetch(`${process.env.REACT_APP_TCMC_URI}/api/updateScheduledOn`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ order_id: id,route_id: routeId, scheduledOn: (scheduledOn / 1000) }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          getVOrders();
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const handleChangeDay = (action: string) => {
    if (action === 'prev') {
      setDate(addDays(date, -1));
    } else {
      setDate(addDays(date, 1));
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragStart = (e: any, orderId: string) => {
    e.dataTransfer.setData("id", orderId);
  };

  const handleDrop = async (e: any) => {
    let id = e.dataTransfer.getData("id");
    let vOrder = document.getElementById(id);
    
    if (vOrder && id !== e.target.id && e.target.className === "schedule-tb-td-divider") {
      setLoading(true);
      let route = e.target.getAttribute("data-route");
      let time = e.target.getAttribute("data-time");
      updateScheduledOn(id, route, time);
    }
  };

  const renderVOrder = (route: VRoute, cell: string, half: boolean) => {
    return vorders.map(vo => {
      if (route.abbreviation === vo.route_id.substring(vo.route_id.lastIndexOf("(") + 1, vo.route_id.length - 1)) {
        let vCell = getVOrderCell(vo.scheduledOn);
        
        if (half) {
          if (cell.split(':')[0] === vCell.split(':')[0] && vCell.slice(-2) === "30") {
            return (
              <div key={vo.order_id}
                id={vo.order_id}
                className="schedule-vorder"
                onDragStart={(e) => handleDragStart(e, vo.order_id)}
                draggable={true}
              >
                {vo.order_id}
              </div>
            )
          }
        } else {
          if (cell === vCell) {
            return (
              <div key={vo.order_id}
                id={vo.order_id}
                className="schedule-vorder"
                onDragStart={(e) => handleDragStart(e, vo.order_id)}
                draggable={true}
              >
                {vo.order_id}
              </div>
            )
          }
        }
      }
    });
  };

  const getVOrderCell = (time: number): string => {
    let cell = '';

    const dt = new Date(time * 1000);
    const hr = dt.getUTCHours();
    const m = "0" + dt.getUTCMinutes();
    cell = hr + ':' + m.substr(-2);

    return cell;
  };

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
            <Col style={{ userSelect: 'none' }}>
              <BiChevronLeftCircle style={{ marginLeft: '15px' }} size={25} onClick={() => handleChangeDay('prev')} />
              <BiChevronRightCircle style={{ marginLeft: '15px' }} size={25} onClick={() => handleChangeDay('next')} />
              <span style={{ fontSize: 20, position: 'relative', top: 2, marginLeft: '15px' }}>{date.toLocaleDateString()}</span>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ position: 'relative', height: '100%' }}>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="schedule-table" >
              <thead className="schedule-th">
                <tr className="schedule-th-tr">
                  <th className="schedule-th-th">Trucks</th>
                  <th className="schedule-th-th">7<span className="schedule-th-span">AM</span></th>
                  <th className="schedule-th-th">8<span className="schedule-th-span">AM</span></th>
                  <th className="schedule-th-th">9<span className="schedule-th-span">AM</span></th>
                  <th className="schedule-th-th">10<span className="schedule-th-span">AM</span></th>
                  <th className="schedule-th-th">11<span className="schedule-th-span">AM</span></th>
                  <th className="schedule-th-th">12<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">1<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">2<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">3<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">4<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">5<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">6<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">7<span className="schedule-th-span">PM</span></th>
                  <th className="schedule-th-th">8<span className="schedule-th-span">PM</span></th>
                </tr>
              </thead>
              <tbody className="schedule-tb" onDragOver={handleDragOver} onDrop={handleDrop}>
                {vroutes.map(u => {
                  return (
                    <tr key={u._id} className="schedule-tb-tr">

                      {availabilityTemplate.map((td, i) => {
                        if (i === 0) {
                          return (
                            <td key={td}>
                              <HiOutlineLocationMarker
                                color={Colors.SMT_Secondary_1_Light_1}
                                // size={35}
                                style={{ position: 'relative', top: '-3px' }}
                              />
                              {u.abbreviation}
                            </td>
                          );
                        }
                        return (
                          <td key={td} className="schedule-tb-td">
                            <div className="schedule-tb-td-divider" data-route={`${u.name} (${u.abbreviation})`} data-time={td}>{renderVOrder(u, td, false)}</div>
                            <div className="schedule-tb-td-divider" data-route={`${u.name} (${u.abbreviation})`} data-time={td.split(':')[0] + ':30'}>{renderVOrder(u, td, true)}</div>
                          </td>
                        )
                      })
                      }
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default SchedulesScreen;