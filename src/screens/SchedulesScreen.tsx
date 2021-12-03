import { useContext, useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { Card, Row, Col } from 'react-bootstrap';
import Colors from '../constants/Colors';
import useDates from '../hooks/useDates';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { VOrder } from '../types/orders';
import { VRoute } from '../types/routes';
import { isSuccessStatusCode } from '../utils/Helpers';
import { HiOutlineLocationMarker } from 'react-icons/hi';

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
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/vordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, status: { $nin: ["Cancelled", "Cancelled - Recurrence"] }, scheduledOn: { $gt: dateObj.gte, $lt: dateObj.lt } }),
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
  };

  const renderVOrders = () => {
    if (vorders.length === 0) return;
    return vorders.map(u => {
      let abbr = u.route_id.split('(')[1].slice(0, -1);
      let rowId = vroutes.findIndex((r, i) => abbr === r.abbreviation);
      let left = getVOrderLeftStyle(u.scheduledOn);
      let top;
      if (rowId === 0) top = '59px';
      if (rowId === 1) top = '100px';

      return (
        <div
          key={u._id}
          style={{
            width: '25px',
            height: '30px',
            position: 'absolute',
            top: top,
            left: left + 'px',
            backgroundColor: 'green',
            wordWrap: 'normal',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        draggable={true}
        >
          {u.order_id}
        </div>
      )
    });
  };

  const getVOrderLeftStyle = (time: number): number => {
    let left = 0;

    const dt = new Date(time * 1000);
    const hr = dt.getUTCHours();
    const m = "0" + dt.getUTCMinutes();
    let t = hr + ':' + m.substr(-2);

    switch (t) {
      case '7:00':
        left = 144;
        break;
      case '7:30':
        left = 176;
        break;
      case '8:00':
        left = 207;
        break;
      case '8:30':
        left = 239;
        break;
      case '9:00':
        left = 269;
        break;
      case '9:30':
        left = 300;
        break;
      case '10:00':
        left = 332;
        break;
      case '10:30':
        left = 363;
        break;
      case '11:00':
        left = 395;
        break;
      case '11:30':
        left = 425;
        break;
      case '12:00':
        left = 456;
        break;
      case '12:30':
        left = 488;
        break;
      case '13:00':
        left = 520;
        break;
      case '13:30':
        left = 550;
        break;
      case '14:00':
        left = 581;
        break;
      case '14:30':
        left = 611;
        break;
      case '15:00':
        left = 641;
        break;
      case '15:30':
        left = 671;
        break;
      case '16:00':
        left = 701;
        break;
      case '16:30':
        left = 731;
        break;
      case '17:00':
        left = 761;
        break;
      case '17:30':
        left = 791;
        break;
      case '18:00':
        left = 821;
        break;
      case '18:30':
        left = 863;
        break;
      case '19:00':
        left = 881;
        break;
      case '19:30':
        left = 926;
        break;
      case '20:00':
        left = 941;
        break;
      case '20:30':
        left = 971;
        break;
      default:
        left = 0;
    }

    return left;
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
              <tbody className="schedule-tb">
                {vroutes.map(u => {
                  return (
                    <tr key={u._id} className="schedule-tb-tr">

                      {['ABBR', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM']
                        .map((td, i) => {
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
                              <div className="schedule-tb-td-divider">{" "}</div>
                              <div className="schedule-tb-td-divider">{" "}</div>
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
            {renderVOrders()}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default SchedulesScreen;