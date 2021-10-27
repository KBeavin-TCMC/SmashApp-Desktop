import React, { useRef, useState, useEffect, useContext } from 'react';
import { Accordion, Card, Col, FormControl, InputGroup, ListGroup, Row, Tab, Table } from 'react-bootstrap';
import AppTitle from '../components/layout/AppTitle';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { Group, SMT_User } from '../types';
import { isSuccessStatusCode } from '../utils/Helpers';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const BusinessUnitScreen = () => {
  const { grpId, token, role, setToken, setIsAuth } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const { show, hide } = useContext(ToastContext);
  const [franchise, setFranchise] = useState<Group>();
  const [zips, setZips] = useState([]);
  const [employees, setEmployees] = useState<SMT_User[]>();
  const addressTable = useRef<any>(null);
  const documentsTable = useRef<any>(null);
  const zipTable = useRef<any>(null);
  const employeesTable = useRef<any>(null);

  useEffect(() => {
    if (!franchise){
      getFranchise();
    }
    if (franchise) {
      getZips();
      initAddressTable();
      initDocumentsTable();
    }
  }, [franchise]);

  useEffect(() => {
    if (zips) {
      if (zips.length > 0) {
        initZipTable();
      }
    }

  }, [zips]);

  useEffect(() => {
    if (!employees) {
      getEmployees();
    }
    if (employees) {
      initEmployeesTable();
    }
  }, [employees]);

  const getFranchise = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify({ _id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setFranchise(json.data[0]);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  }

  const getZips = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/zipsBy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify({ franchiseID: franchise?.vonigo_franchise_id }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setZips(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  };

  const getEmployees = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/usersBy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setEmployees(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  }

  const initAddressTable = () => {
    if (addressTable) {
      addressTable.current = $("#address-table").DataTable({
        "scrollY": "300px",
        data: [{address: `${franchise?.address.address_street}, ${franchise?.address.address_city}, ${franchise?.address.address_state} ${franchise?.address.address_zip}`, type: "Mailing", status: "Active"}],
        columns: [
          { title: "Address", data: 'address' },
          { title: "Type", data: 'type' },
          { title: "Status", data: 'status' }
        ]
      });
    }
  };

  const drawAddressTable = () => {
    setTimeout(() => {
      addressTable.current.columns.adjust().draw();
    }, 1);
  };

  const initDocumentsTable = () => {
    if (documentsTable) {
      documentsTable.current = $("#documents-table").DataTable({
        "scrollY": "300px",
        data: [],
        columns: [
          { title: "File Name", data: 'name' },
          { title: "File Type", data: 'type' },
          { title: "File Status", data: 'status' }
        ]
      });
    }
  };

  const drawDocumentsTable = () => {
    setTimeout(() => {
      documentsTable.current.columns.adjust().draw();
    }, 1);
  };

  const initZipTable = () => {
    if (zips) {

      if (zipTable) {
        zipTable.current = $("#zip-table").DataTable({
          "scrollY": "300px",
          data: zips.map((u: any) => {
            return {zip: u.zip}
          }),
          columns: [
            { title: "Zip Code", data: 'zip' },
          ]
        });
      }
    }
  };

  const drawZipTable = () => {
    setTimeout(() => {
      zipTable.current.columns.adjust().draw();
    }, 1);
  };

  const initEmployeesTable = () => {
    if (employees) {
      if (employeesTable) {
        employeesTable.current = $("#employees-table").DataTable({
          "scrollY": "300px",
          data: employees.map(u => {
            return {name: `${u.first_name} ${u.last_name}`, email: u.email, role: u.role}
          }),
          columns: [
            { title: "Name", data: 'name' },
            { title: "Email", data: 'email'},
            { title: "Role", data: 'role'}
          ]
        });
      }
    }
  };

  const drawEmployeesTable = () => {
    setTimeout(() => {
      employeesTable.current.columns.adjust().draw();
    }, 1);
  };

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
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#accounting">
                Accounting
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#employees" onClick={() => drawEmployeesTable()}>
                Employees
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#operations">
                Operations
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#pricing">
                Pricing
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px', borderRadius: '0 0 0 .35rem' }} action href="#dispatching">
                Dispatching
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
                    <span>
                      Business Unit
                    </span>
                    <span style={{ float: 'right', color: 'greenyellow' }} onClick={() => setEdit(!edit)}>
                      edit
                    </span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body style={{ height: '100%' }}>
                <div
                  style={{ height: '100%', overflowY: 'auto' }}
                >
                  <Row>
                    <Col>
                      <Tab.Content>
                        <Tab.Pane eventKey="#details">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Business Unit Information</Accordion.Header>
                              <Accordion.Body>
                                <Row>
                                  <Col>
                                    {franchise ? (
                                      <Row>
                                        <Col>
                                        <AppFormInput edit={edit} label='Franchise ID' value={franchise.vonigo_franchise_id} />
                                        <AppFormInput edit={edit} label='Name' value={franchise.name} />
                                        <AppFormInput edit={edit} label='DBA' value={franchise.dba} />
                                        <AppFormInput edit={edit} label='EIN' value={franchise.ein} />
                                        <AppFormInput edit={edit} label='Phone' value={franchise.phone} />
                                        <AppFormInput edit={edit} label='Email' value={franchise.email} />
                                        </Col>
                                        <Col>
                                        <AppFormInput edit={edit} label='Region' value={franchise.region} />
                                        <AppFormInput edit={edit} label='Tax Rate' value={franchise.tax_rate} />
                                        <AppFormInput edit={edit} label='Time Zone' value={franchise.time_zone} />
                                        <AppFormInput edit={edit} label='Launch Date' value={franchise.launch_date.toString()} />
                                        <AppFormInput edit={edit} label='Signing Date' value={franchise.signing_date} />
                                        </Col>
                                      </Row>
                                    ) : (
                                      null
                                    )}
                                  </Col>
                                </Row>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" onClick={() => drawAddressTable()}>
                              <Accordion.Header>Business Unit Addresses</Accordion.Header>
                              <Accordion.Body>
                                <Table
                                  ref={addressTable}
                                  id='address-table'
                                  style={{ fontSize: '12px' }}
                                  responsive
                                  hover
                                  size="sm"
                                >
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" onClick={() => drawDocumentsTable()}>
                              <Accordion.Header>Business Unit Documents</Accordion.Header>
                              <Accordion.Body>
                              <Table
                                  ref={documentsTable}
                                  id='documents-table'
                                  style={{ fontSize: '12px' }}
                                  responsive
                                  hover
                                  size="sm"
                                >
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3"
                             onClick={() => drawZipTable()}
                             >
                              <Accordion.Header>Zip Codes</Accordion.Header>
                              <Accordion.Body>
                              <Table
                                  ref={zipTable}
                                  id='zip-table'
                                  style={{ fontSize: '12px' }}
                                  responsive
                                  hover
                                  size="sm"
                                >
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>Data Import</Accordion.Header>
                              <Accordion.Body>
                                Data Import
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#accounting">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Business Unit Taxes</Accordion.Header>
                              <Accordion.Body>
                                Business Unit Taxes
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Payment Methods</Accordion.Header>
                              <Accordion.Body>
                                Payment Methods
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Authorize.net Credentials</Accordion.Header>
                              <Accordion.Body>
                                Authorize.net Credentials
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Export to QuickBooks</Accordion.Header>
                              <Accordion.Body>
                                Export to QuickBooks
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>QuickBooks Integration Setup</Accordion.Header>
                              <Accordion.Body>
                                QuickBooks Integration Setup
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                              <Accordion.Header>Royalty Statements</Accordion.Header>
                              <Accordion.Body>
                                Royalty Statements
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#employees">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Employees</Accordion.Header>
                              <Accordion.Body>
                              <Table
                                  ref={employeesTable}
                                  id='employees-table'
                                  style={{ fontSize: '12px' }}
                                  responsive
                                  hover
                                  size="sm"
                                >
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Business Unit Contacts</Accordion.Header>
                              <Accordion.Body>
                                Business Unit Contacts
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#operations">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Availability Templates</Accordion.Header>
                              <Accordion.Body>
                                Availability Templates
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Trucks</Accordion.Header>
                              <Accordion.Body>
                                Trucks
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Zones</Accordion.Header>
                              <Accordion.Body>
                                Zones
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#pricing">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Price Lists</Accordion.Header>
                              <Accordion.Body>
                                Price Lists
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dispatching">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Client Confirmation Emails</Accordion.Header>
                              <Accordion.Body>
                                Client Confirmation Emails
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Client Reminders</Accordion.Header>
                              <Accordion.Body>
                                Client Reminders
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Routific Credentials</Accordion.Header>
                              <Accordion.Body>
                                Routific Credentials
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

interface InputProps {
  edit: boolean;
  label: string;
  value: string;
}

const AppFormInput: React.FC<InputProps> = ({ edit, label, value }) => {
  return (
    <div style={{ marginBottom: '5px', fontSize: '12px' }}>
      <span>{label}: </span>
      {edit ? (
        <input value={value} />
      ) : (
        <label>{value}</label>
      )}
    </div>
  )
}

export default BusinessUnitScreen;