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

const InvoicesScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const dataTable = useRef<any>(null);

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/invoicesBy`, {
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
                  id: u.objectID,
                  client: 'dev',
                  issued: 'dev',
                  duedate: 'dev',
                  lastupdated: 'dev',
                  subtotal: 'dev', 
                  total: 'dev',
                  dueamount: 'dev',
                  status: 'dev',
                  qb: 'dev'
                }
              }),
              columns: [
                { title: "ID", data: 'id' },
                { title: "Client", data: 'client' },
                { title: "Issued", data: 'issued' },
                { title: "Due", data: 'duedate'},
                { title: "Last Updated", data: 'lastupdated'},
                { title: "Subtotal", data: 'subtotal'},
                { title: "Total", data: 'total'},
                { title: "Due", data: 'dueamount'},
                { title: "Status", data: 'status'},
                { title: "QB", data: 'qb'}
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
              Invoices
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

export default InvoicesScreen;