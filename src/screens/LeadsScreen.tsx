import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import AppContentBox from '../components/layout/AppContentBox';
import AppTitle from '../components/layout/AppTitle';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { Lead } from '../types';
import { isSuccessStatusCode } from '../utils/Helpers';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const LeadsScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const dataTable = useRef<any>(null);

  useEffect(() => {
    getLeads();
  }, []);

  const getLeads = () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/leadsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setData(json.data);
          if (dataTable) {
            dataTable.current = $("#table_id").DataTable({
              "scrollY": "300px",
              data: json.data.map((u: Lead) => {
                return {
                  name: u.objectID,
                  address: 'dev',
                  contact: 'dev',
                  status: 'Active',
                  type: 'Commercial',
                }
              }),
              columns: [
                { title: "Name", data: 'name' },
                { title: "Main Address", data: 'address' },
                { title: "Primary Contact", data: 'contact' },
                { title: "Status", data: 'status'},
                { title: "Type", data: 'type'},
              ]
            });
          }
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
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
              Leads
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ height: '100%' }}>
          <div
            style={{ height: '100%', overflowY: 'auto' }}
          >
            <Table
              ref={dataTable}
              id='table_id'
              style={{ fontSize: '12px' }}
              responsive
              hover
              size="sm"
            >
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
    );
}

export default LeadsScreen;