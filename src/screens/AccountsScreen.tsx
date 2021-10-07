import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Row, Col, Form, Table } from 'react-bootstrap';
import AppDataTable from '../components/layout/AppDataTable';
import AppTitle from '../components/layout/AppTitle';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { Account } from '../types/crm';
import { isSuccessStatusCode } from '../utils/Helpers';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const AccountsScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [data, setData] = useState<Account[]>([]);
  const [q, setQ] = useState('');
  const dataTable = useRef<any>(null);

  useEffect(() => {
    getAccounts();

    return function cleanup() {
      // TODO: play around with getAccounts();
    }
  }, [])

  const getAccounts = () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/accountsBy`, {
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
              data: json.data.map((u: Account) => {
                return {name: u.account_name, status: u.is_active ? "Active":"Inactive", type: "Commercial", contact: u.owner_name, address: `${u.address.address_street} ${u.address.address_city}, ${u.address.address_state} ${u.address.address_zip}`}
              }),
              columns: [
                {title: "Name", data: 'name'},
                {title: "Status", data: 'status'},
                {title: "Type", data: 'type'},
                {title: "Primary Contact", data: 'contact'},
                {title: "Main Address", data: 'address'}
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
              Accounts
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

export default AccountsScreen;